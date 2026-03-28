"use client";

import Section from "@/components/layout/Section";
import Text from "@/components/base/Text";
import Button from "@/components/base/Button";
import IllustrationResumeAmico from "@/components/illustrations/IllustrationResumeAmico";
import styles from "./not-found.module.css";
import { useRouter } from "next/navigation";
import Article from "@/components/layout/Article";
import { RxReset } from "react-icons/rx";

export default function NotFound() {
  const router = useRouter();
  return (
    <Section>
      <div className={styles.illustration}><IllustrationResumeAmico /></div>

      <Article className={styles.article}>
        <Text variant="h1">404</Text>
        <Text variant="h3">Página não encontrada</Text>
        <Text variant="p2">
        Opa! Não conseguimos encontrar a página que você procurou.<br />
        Verifique o <strong>endereço</strong> ou <strong>volte</strong>.
        </Text>
      </Article>

      <Button variant="buttonPrimary" Icon={RxReset} onClick={() => router.back()}>Voltar</Button>
    </Section>
  );
}
