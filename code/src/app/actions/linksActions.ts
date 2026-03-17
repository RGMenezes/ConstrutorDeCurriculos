"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { IExternalLink } from "@/types/resume";
import { createClient } from "@/utils/supabase/server";

export async function getExternalLinks() {
  const supabase = await createClient(await cookies());

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Usuário não autenticado" };
  }

  const { data, error } = await supabase
    .from("external_links")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    console.error("Erro ao buscar links:", error.message);
    return { error: "Falha ao buscar links" };
  }

  return { success: true, data };
}

export async function upsertExternalLink(linkData: IExternalLink) {
  const supabase = await createClient(await cookies());

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Usuário não autenticado" };
  }

  const { data, error } = await supabase
    .from("external_links")
    .upsert({
      ...linkData,
      user_id: user.id,
    })
    .select();

  if (error) {
    console.error("Erro ao salvar link:", error.message);
    return { error: "Falha ao sincronizar link com o banco" };
  }

  revalidatePath("/dashboard/profile");

  return { success: true, data };
}

export async function deleteExternalLink(id: string) {
  const supabase = await createClient(await cookies());

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Usuário não autenticado" };
  }

  const { error } = await supabase
    .from("external_links")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    console.error("Erro ao deletar link:", error.message);
    return { error: "Falha ao deletar link" };
  }

  revalidatePath("/dashboard/profile");

  return { success: true };
}
