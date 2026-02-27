"use client";

import styles from "./page.module.css";
import Button from "@/components/base/Button";
import Link from "@/components/base/Link";
import Text from "@/components/base/Text";
import Checkbox from "@/components/inputs/Checkbox";
import Section from "@/components/layout/Section";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  const supabase = createClient();
  const [autorized, setAuthorized] = useState(false);

  const handleLogin = async () => {
    if (!autorized) {
      alert("Você precisa aceitar os termos para continuar.");
      return;
    }

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
  };

  return (
    <Section className={styles.container}>
      <Text variant="h1">Login</Text>
      <Button Icon={FaGoogle} onClick={handleLogin}>Entrar com Google</Button>
      <Checkbox onValueChange={setAuthorized}>
        Estou ciente e aceito os <Link href="/terms">Termos</Link>, as <Link href="/privacy">Políticas</Link> e o uso de <Link href="/cookies"> Cookies</Link>.
      </Checkbox>
    </Section>
  );
}