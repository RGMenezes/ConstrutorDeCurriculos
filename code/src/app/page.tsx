import styles from "./page.module.css";
import A from "@/components/base/A";
import Text from "@/components/base/Text";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Section from "@/components/layout/Section";
import IllustrationResumeAmico from "@/components/illustrations/IllustrationResumeAmico";
import Link from "@/components/base/Link";
import { MdAutoAwesome, MdContactPage, MdLockOutline, MdTune } from "react-icons/md";
import CardStep from "@/components/cards/CardStep";

export default function Home() {
  const features = [
    {
      title: "Direto ao ponto",
      description: "Sem perder horas montando layout: foque no conteúdo certo para a vaga.",
      Icon: MdAutoAwesome,
    },
    {
      title: "Personalizado por vaga",
      description: "Selecione experiências e habilidades para cada oportunidade em segundos.",
      Icon: MdTune,
    },
    {
      title: "Seus dados protegidos",
      description: "Você controla o que entra no PDF final e pode editar tudo quando quiser.",
      Icon: MdLockOutline,
    },
  ];

  return (
    <>
      <Header />

      <main className={styles.main}>
        <Section className={styles.hero}>
          <div className={styles.heroText}>
            <span className={styles.badge}>Currículos estratégicos, sem enrolação!</span>
            <Text variant="h1" className={styles.heroTitle}>Construa seu Currículo com foco real na vaga</Text>
            <Text variant="p1" className={styles.heroSubtitle}>
              O currículo que você faria se tivesse tempo. Você organiza suas informações uma vez e gera versões objetivas para diferentes oportunidades em minutos.
            </Text>

            <div className={styles.heroActions}>
              <Link variant="buttonPrimary" Icon={MdContactPage} href="/dashboard">Começar Agora</Link>
              <Link variant="buttonSecondary" href="#como-funciona">Ver Como Funciona</Link>
            </div>

            <div className={styles.heroStats}>
              <div className={styles.statCard}>
                <Text variant="h3">1x</Text>
                <Text variant="p2">Cadastro único dos seus dados</Text>
              </div>
              <div className={styles.statCard}>
                <Text variant="h3">N versões</Text>
                <Text variant="p2">Currículos para vagas diferentes</Text>
              </div>
              <div className={styles.statCard}>
                <Text variant="h3">PDF</Text>
                <Text variant="p2">Pronto para enviar em segundos</Text>
              </div>
            </div>
          </div>

          <div className={styles.illustrationContainer}>
            <IllustrationResumeAmico  className={styles.illustration}/>
            <A variant="author" target="_blank" rel="external" href="https://storyset.com/online">Online illustrations by Storyset</A>
          </div>
        </Section>

        <Section className={styles.features}>
          <Text variant="h2">Por que usar?</Text>
          <Text variant="p1" className={styles.sectionSubtitle}>
            Em vez de reescrever currículo toda semana, você adapta somente o que importa.
          </Text>

          <div className={styles.featureGrid}>
            {features.map(({ title, description, Icon }) => (
              <article className={styles.featureCard} key={title}>
                <Icon className={styles.featureIcon} size={30} />
                <Text variant="h3">{title}</Text>
                <Text variant="p1">{description}</Text>
              </article>
            ))}
          </div>
        </Section>

        <Section id="como-funciona" className={styles.howItWorks}>
          <Text variant="h2">Como funciona?</Text>
          <Text variant="p1" className={styles.sectionSubtitle}>Fluxo simples para transformar seu histórico em currículos direcionados.</Text>
        
          <div className={styles.steps}>
            <CardStep stepNumber={1} title="Preencha seus dados" description="Cadastre seus links, formações e experiências uma única vez." />
            <CardStep stepNumber={2} title="Selecione os itens" description="Para cada vaga, escolha quais experiências e skills quer exibir." />
            <CardStep stepNumber={3} title="Gere o Currículo" description="Simples assim. Um currículo novo em segundos, focado na vaga." />
          </div>
        </Section>

        <Section className={styles.cta}>
          <Text variant="h2">Seu próximo currículo começa agora</Text>
          <Text variant="p1" className={styles.ctaText}>
            Menos tempo formatando. Mais tempo se preparando para entrevistas.
          </Text>
          <div className={styles.heroActions}>
            <Link variant="buttonPrimary" detached Icon={MdContactPage} href="/dashboard">Montar Meu Currículo</Link>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}
