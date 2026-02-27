import styles from "./page.module.css";
import A from "@/components/base/A";
import Text from "@/components/base/Text";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Section from "@/components/layout/Section";
import IllustrationResumeAmico from "@/components/illustrations/IllustrationResumeAmico";
import Link from "@/components/base/Link";
import { MdContactPage } from "react-icons/md";
import CardStep from "@/components/cards/CardStep";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Section className={styles.hero}>
          <Text variant="h1">Construa seu Currículo!</Text>
          <Text variant="p2">O currículo que você faria se tivesse tempo, específico para a sua vaga. <strong>Nós fazemos em minutos</strong>.</Text>
          <div className={styles.heroActions}>
            <Link variant="buttonPrimary" Icon={MdContactPage} href="/dashboard">Construir</Link>
          </div>
          <div className={styles.illustrationContainer}>
            <IllustrationResumeAmico  className={styles.illustration}/>
            <A variant="author" target="_blank" rel="external" href="https://storyset.com/online">Online illustrations by Storyset</A>
          </div>
        </Section>

        <Section className={styles.howItWorks}>
          <Text variant="h2">Como funciona?</Text>
        
          <div className={styles.steps}>
            <CardStep stepNumber={1} title="Preencha seus dados" description="Cadastre seus links, formações e experiências uma única vez." />
            <CardStep stepNumber={2} title="Selecione os itens" description="Para cada vaga, escolha quais experiências e skills quer exibir." />
            <CardStep stepNumber={3} title="Gere o Currículo" description="Simples assim. Um currículo novo em segundos, focado na vaga." />
          </div>

          <div className={styles.heroActions}>
            <Link variant="buttonSecondary" detached Icon={MdContactPage} href="/dashboard">Construir</Link>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}
