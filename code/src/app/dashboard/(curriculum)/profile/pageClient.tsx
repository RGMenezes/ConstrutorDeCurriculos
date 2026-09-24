"use client";
import ProfileSection from "@/components/profile/ProfileSection";
export default function PageClient() {
  return <div className="space-y-6"><ProfileSection resource="profiles" title="Perfis pessoais" /><ProfileSection resource="addresses" title="Localizações" /><ProfileSection resource="links" title="Links profissionais" /></div>;
}
