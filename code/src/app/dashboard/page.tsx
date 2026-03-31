"use client";

import Text from "@/components/base/Text";
import Section from "@/components/layout/Section";
import styles from "./page.module.css";
import A from "@/components/base/A";
import { FaUser, FaBriefcase, FaGraduationCap, FaStar, FaLanguage, FaCommentDots, FaCog, FaPlus } from "react-icons/fa";
import { useCurriculums } from "@/hooks/useCurriculums";
import Loading from "../loading";
import WrapperCurriculum from "./WrapperCurriculum";

export default function DashboardPage() {
  const { curriculums, loading, error } = useCurriculums();

  // Links para as áreas da dashboard
  const navLinks = [
    { href: "/dashboard/profile", label: "Perfil", Icon: FaUser },
    { href: "/dashboard/work", label: "Experiências", Icon: FaBriefcase },
    { href: "/dashboard/formation", label: "Formação", Icon: FaGraduationCap },
    { href: "/dashboard/skill", label: "Habilidades", Icon: FaStar },
    { href: "/dashboard/language", label: "Idiomas", Icon: FaLanguage },
    { href: "/dashboard/feedback", label: "Feedbacks", Icon: FaCommentDots },
    { href: "/dashboard/settings", label: "Configurações", Icon: FaCog },
  ];

  return (
    <Section>
      <Text variant="h2" className={styles.title}>Dashboard</Text>

      {/* Navegação principal */}
      <nav className={styles.dashboardNav}>
        {navLinks.map(({ href, label, Icon }) => (
          <A key={href} href={href} variant="buttonSecondary" Icon={Icon} iconPosition="left" className={styles.dashboardNavLink}>
            {label}
          </A>
        ))}
        <A href="/dashboard/curriculum/create" variant="buttonPrimary" Icon={FaPlus} iconPosition="left" className={styles.dashboardNavLink}>
          Novo Currículo
        </A>
      </nav>

      {/* Seção de currículos */}
      <section className={styles.curriculumsSection}>
        <Text variant="h3" className={styles.sectionTitle}>Meus Currículos</Text>
        {loading ? (
          <Loading />
        ) : error ? (
          <Text variant="p2" className={styles.errorMsg}>{error}</Text>
        ) : curriculums.length === 0 ? (
          <Text variant="p2">Nenhum currículo cadastrado ainda.</Text>
        ) : (
          <div className={styles.curriculumsGrid}>
            {curriculums.map((curriculum) => (
              <WrapperCurriculum key={curriculum.id} curriculum={curriculum} />
            ))}
          </div>
        )}
      </section>
    </Section>
  );
}