"use client";

import { Document, Page, Text, View, StyleSheet, PDFViewer } from "@react-pdf/renderer";
import styles from "./PDFdefault.module.css";
import pdfStyles from "./pdfStyles";
import { IProfile, IAdresses, IExternalLink } from "@/types/resume";
import { IWork } from "@/types/work";
import { IFormation } from "@/types/formation";
import { ISkill } from "@/types/skill";
import { ILanguage } from "@/types/language";
import { IFeedback } from "@/types/feedback";
import MDparser from "./MDparser";
import { formatDateBR } from "@/utils/dateFormat";


interface PDFdefaultProps {
  profile?: IProfile | null;
  address?: IAdresses | null;
  links?: IExternalLink[];
  work?: IWork[];
  formation?: IFormation[];
  skills?: ISkill[];
  languages?: ILanguage[];
  feedbacks?: IFeedback[];
  height?: number | string;
}
const stylesPDF = StyleSheet.create({
  page: {
    padding: 25,
    paddingTop: 35,
    paddingBottom: 40,
    fontSize: 11,
    fontFamily: "Times-Roman",
    color: "#000000",
  },
  section: {
    gap: 8,
  },
  sectionColumn: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  column4: {
    flex: 1,
    minWidth: 120,
    justifyContent: "flex-start",
  },
  column2: {
    flex: 1,
    minWidth: 200,
    justifyContent: "flex-start",
  },
  feedback: {
    padding: 3,
  }
});

export default function PDFdefault({
  profile,
  address,
  links = [],
  work = [],
  formation = [],
  skills = [],
  languages = [],
  feedbacks = [],
  height = 600,
}: PDFdefaultProps) {
  // Agrupamento de habilidades por categoria (incluindo idiomas)
  const allSkills = [...skills];
  if (languages.length > 0) {
    allSkills.push(...languages.map(l => ({
      name: l.language + (l.proficiency ? ` (${l.proficiency})` : ""),
      category: "Idiomas",
      user_id: ""
    })));
  }
  const groupedSkills = allSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill.name);
    return acc;
  }, {} as Record<string, string[]>);
  const skillEntries = Object.entries(groupedSkills);

  // Componente PDF como React
  const MyDoc = (
    <Document>
      <Page size="A4" style={stylesPDF.page}>

        {profile && (
          <View>
            {profile.name && <Text style={pdfStyles.h1}>{profile.name}</Text>}

            {(profile.email || address?.city || address?.state || address?.country || profile.phone) && 
              <Text style={pdfStyles.text}>
                {[address?.city, address?.state, address?.country].filter(Boolean).join(", ")} |
                Telefone: {profile.phone} |
                Email: <Text style={pdfStyles.link}>{profile.email}</Text>
              </Text>
            }
            
            {links.length > 0 && 
              <View style={pdfStyles.rowContainer}>
                {links.map((link, i) => 
                  <Text key={i} style={pdfStyles.text}>
                    {link.name}: <Text style={pdfStyles.link}>{link.url}</Text>
                    {i < links.length - 1 && " | "}
                  </Text>
                )}
              </View>
            }

          </View>
        )}

        <View style={pdfStyles.lh} />

        {profile?.description && <View>
          <Text style={pdfStyles.h2}>Resumo profissional</Text>
          <MDparser md={profile.description} />
        </View>}

        <View style={pdfStyles.lh} />
        
        {formation.length > 0 && (
          <View>
            <Text style={pdfStyles.h2}>Formação Acadêmica</Text>

            <View style={stylesPDF.sectionColumn}>
              {formation.map((f, i) => (
                <View key={i} style={stylesPDF.column2}>
                  <Text style={pdfStyles.strong}>{f.degree} ({f.type})</Text>
                  <Text style={pdfStyles.em}>{f.institution}</Text>
                  <Text style={pdfStyles.text}>{f.status}</Text>
                  {f.start_date && <Text style={pdfStyles.text}>
                    De: {formatDateBR(f.start_date) + " "} 
                    até {f.end_date ? formatDateBR(f.end_date) : "Atual"}
                  </Text>}
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={pdfStyles.lh} />

        {work.length > 0 && (
          <View>
            <Text style={pdfStyles.h2}>Experiências Profissionais</Text>

            <View style={stylesPDF.section}>
              {work.map((w, i) => (
                <View key={i} style={stylesPDF.section}>
                  <View>
                    <View style={pdfStyles.rowContainer}>
                      <Text style={pdfStyles.strong}>{w.company} </Text>
                      <Text style={pdfStyles.text}> — </Text>
                      <Text style={pdfStyles.em}>{w.position}</Text>
                    </View>

                    {w.start_date && <Text style={pdfStyles.text}>
                        De: {formatDateBR(w.start_date)} até {w.end_date ? formatDateBR(w.end_date) : "Atual"}
                    </Text>}
                  </View>

                  {w.description && <MDparser md={w.description} />}
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={pdfStyles.lh} />

        {skills.length > 0 && (
          <View style={stylesPDF.section}>
            <Text style={pdfStyles.h2}>Habilidades</Text>

            <View style={stylesPDF.sectionColumn}>
              {skillEntries.map(([cat, names]) => (
                <View key={cat} style={stylesPDF.column4}>
                  <Text style={pdfStyles.strong}>{cat}:</Text>
                  <Text style={pdfStyles.text}>{names.join(", ")}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={pdfStyles.lh} />

        {feedbacks.length > 0 && (
          <View>
            <Text style={pdfStyles.h2}>Feedbacks</Text>

            <View style={stylesPDF.sectionColumn}>
              {feedbacks.map((f, i) => (
                <View key={i} style={stylesPDF.column2}>
                  <View style={pdfStyles.rowContainer}>
                    <Text style={pdfStyles.strong}>{f.name} </Text>
                    <Text style={pdfStyles.text}>({f.position} - {f.company})</Text>
                  </View>

                  {f.contact && <Text style={pdfStyles.link}>{f.contact}</Text>}

                  <View style={stylesPDF.feedback}>
                    {f.feedback && <Text style={pdfStyles.em}>&ldquo;{f.feedback}&rdquo;</Text>}
                  </View>

                  {f.link_url && <Text style={pdfStyles.text}>
                    {f.link_name}: <Text style={pdfStyles.link}>{f.link_url}</Text>
                  </Text>}
                </View>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );

  return (
    <div className={styles.previewWrapper}>
      <PDFViewer className={styles.pdfViewer} width="100%" height={height}>
        {MyDoc}
      </PDFViewer>
    </div>
  );
}
