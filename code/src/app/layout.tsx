import AppProviders from "@/providers/AppProviders";
import { auth } from "@/lib/auth";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Construtor de Currículo | Crie seu CV Profissional",
  description: "Crie, gerencie e exporte currículos profissionais de forma simples, minimalista e eficiente. Desenvolvido para destacar sua carreira no mercado.",
  keywords: [
    "Construtor de Currículo",
    "Gerador de CV",
    "Currículo Profissional",
    "Carreira",
    "Emprego",
    "Next.js",
    "TypeScript",
    "MongoDB",
  ],
  authors: [{ name: "Rafael da Gloria Menezes", url: "https://github.com/RGMenezes" }],
  openGraph: {
    title: "Construtor de Currículo - Profissional e Minimalista",
    description: "Crie seu currículo em poucos minutos com uma interface limpa e focada no que importa: sua experiência.",
    siteName: "Construtor de Currículo",
    locale: "pt_BR",
    type: "website",
  },
};


export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <AppProviders session={session}>{children}</AppProviders>
      </body>
    </html>
  );
}
