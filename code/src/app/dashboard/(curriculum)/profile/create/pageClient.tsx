"use client";
import { useRouter } from "next/navigation";
import type { EntityMap } from "@/types/entities";
import ProfileEditor from "@/components/profile/ProfileEditor";
import { profileLabels, type ProfileResource } from "@/components/profile/fields";
import { panel } from "@/components/ui/styles";
export default function PageClient({ resource, initial }: { resource: ProfileResource; initial?: EntityMap[ProfileResource] }) {
  const router = useRouter();
  const close = () => router.push("/dashboard/profile");
  return <section className={`${panel} mx-auto max-w-xl space-y-5`}><h1 className="text-2xl font-bold">{initial ? "Editar" : "Adicionar"} {profileLabels[resource].toLowerCase()}</h1><ProfileEditor resource={resource} initial={initial} onDone={close} onCancel={close} /></section>;
}
