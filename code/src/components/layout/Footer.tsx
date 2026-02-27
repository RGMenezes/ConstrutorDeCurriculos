"use client";

import Text from "../base/Text";
import NavPage from "../interaction/NavPage";
import styles from "./Footer.module.css";
import Section from "./Section";
import { MdOutlineDashboard } from "react-icons/md";
import Link from "../base/Link";
import A from "../base/A";

export default function Footer(){
  const date = new Date();
  return (
    <footer className={styles.footer}>
      <Section>
        <Text variant="h3">Construtor de Currículos</Text>

        <div className={styles.content}>

          <NavPage isLogged={false}/>
          <Link variant="buttonSecondary" href="/dashboard" Icon={MdOutlineDashboard}>Dashboard</Link>
          <NavPage isLogged={true} gridIcons/>

        </div>

        <div>
          <Text>© <A href="https://rgmenezes.vercel.app" hrefLang="pt-br" target="_blank" rel="external">RGMenezes</A> | {date.getFullYear()}</Text>
          <Text variant="p3">faelgmp@gmail.com</Text>
        </div>
      </Section>
    </footer>
  );
}