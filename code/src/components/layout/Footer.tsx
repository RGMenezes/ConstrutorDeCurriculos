"use client";

import { FaRegFilePdf } from "react-icons/fa";
import A from "../base/A";
import Text from "../base/Text";
import NavPage from "../interaction/NavPage";
import styles from "./Footer.module.css";
import Section from "./Section";

export default function Footer(){
  const date = new Date();
  return (
    <footer className={styles.footer}>
      <Section>
        <Text variant="h3">RGMenezes</Text>

        <div className={styles.content}>
          <NavPage />

          <A variant="buttonSecondary" download href="/files/curriculum-rafael-da-gloria-menezes.pdf" Icon={FaRegFilePdf}>Currículo</A>

          <ul className={styles.iconList}>
          </ul>

        </div>

        <Text>© Rafael da Gloria Menezes | {date.getFullYear()}</Text>
      </Section>
    </footer>
  );
}