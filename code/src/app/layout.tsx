import type { Metadata } from "next";
import { Inter, Space_Grotesk as SpaceGrotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = SpaceGrotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

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
    "Supabase",
  ],
  authors: [{ name: "Rafael da Gloria Menezes", url: "https://github.com/RGMenezes" }],
  openGraph: {
    title: "Construtor de Currículo - Profissional e Minimalista",
    description: "Crie seu currículo em poucos minutos com uma interface limpa e focada no que importa: sua experiência.",
    url: "https://seu-dominio-do-projeto.vercel.app",
    siteName: "Construtor de Currículo",
    locale: "pt_BR",
    type: "website",
  },
};


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        {children}
      </body>
    </html>
  );
}
