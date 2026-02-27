import { BiTargetLock } from "react-icons/bi";
import styles from "./page.module.css";
import A from "@/components/base/A";
import Tag from "@/components/base/Tag";
import Text from "@/components/base/Text";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Section from "@/components/layout/Section";

export default function Home() {
  return (
    <>
      <Header />
      <Section className={styles.hero}>
        <Text variant="h1">Olá, bem-vindo!</Text>
        <Text variant="p2">Sou Rafael, dev full-stack. Aqui você vai ver alguns sites e apps que fiz e como foram elaborados.</Text>
        <div className={styles.heroActions}>
          <A variant="buttonSecondary" href="#contacts">Contato</A>
          <A variant="buttonPrimary" href="#projects">Projetos</A>
        </div>
        <div className={styles.illustrationContainer}>
          <A variant="author" target="_blank" rel="external" href="https://storyset.com/online">Online illustrations by Storyset</A>
        </div>
      </Section>

      <main>
        <Section id="projects">
          <Text variant="h2">Projetos</Text>

          <div className={styles.grid}>
          </div>
        </Section>
                
        <Section id="aboutMe" className={styles.aboutMeSection}>
          <Text variant="h2">Sobre Mim</Text>

          <article className={styles.aboutMeArticle}>
            <div className={styles.aboutMeContent}>
              <Tag Icon={BiTargetLock}>Aberto a oportunidades!</Tag>
            </div>
          </article>
        </Section>

        <Section id="feedbacks" className={styles.feedbackSection}>
          <Text variant="h3">Feedbacks</Text>
          <div className={styles.grid}>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}
