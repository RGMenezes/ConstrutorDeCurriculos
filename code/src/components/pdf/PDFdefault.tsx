"use client";

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import pdfStyles from "./pdfStyles";
import MDparser from "./MDparser";
import { formatDateBR } from "@/utils/dateFormat";
import CardPDF from "../cards/CardPdf";
import { ICurriculumPopulated } from "@/types/curriculumPopulated";

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

export default function PDFdefault({ curriculum }: { curriculum: ICurriculumPopulated }) {
  const {
    profile,
    address,
    links = [],
    work = [],
    formation = [],
    skills = [],
    languages = [],
    feedbacks = [],
    layout,
    name,
    id
  } = curriculum;

  // Agrupamento de habilidades por categoria (incluindo idiomas)
  const allSkills = [...skills];
  if (languages && languages.length > 0) {
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


        {profile?.description && <>
          <View style={pdfStyles.lh} />
          <View>
            <Text style={pdfStyles.h2}>Resumo profissional</Text>
            <MDparser md={profile.description} />
          </View>
        </>
        }
        
        {formation.length > 0 && <>
          <View style={pdfStyles.lh} />
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
        </>}

        {work.length > 0 && <>
          <View style={pdfStyles.lh} />
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
        </>}

        {skills.length > 0 && <>
          <View style={pdfStyles.lh} />
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
        </>}

        {feedbacks.length > 0 && <>
          <View style={pdfStyles.lh} />
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
        </>}
      </Page>
    </Document>
  );

  return (
    <CardPDF doc={MyDoc} name={name} layout={layout} id={id}/>
  );
}
