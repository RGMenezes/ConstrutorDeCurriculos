"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { ILanguage } from "@/types/language";
import { createClient } from "@/utils/supabase/server";

export async function getLanguage() {
  const supabase = await createClient(await cookies());

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Usuário não autenticado" };
  }

  const { data, error } = await supabase
    .from("language")
    .select("*")
    .eq("user_id", user.id)
    .order("language", { ascending: true });

  if (error) {
    console.error("Erro ao buscar idiomas:", error.message);
    return { error: "Falha ao buscar idiomas" };
  }

  return { success: true, data };
}

export async function upsertLanguage(languageData: ILanguage) {
  const supabase = await createClient(await cookies());

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Usuário não autenticado" };
  }

  const safeLanguage = {
    ...languageData,
    user_id: user.id,
    created_at: languageData.created_at === "" ? null : languageData.created_at,
    updated_at: languageData.updated_at === "" ? null : languageData.updated_at,
  };

  const { data, error } = await supabase
    .from("language")
    .upsert(safeLanguage)
    .select();

  if (error) {
    console.error("Erro ao salvar idioma:", error.message);
    return { error: "Falha ao sincronizar idioma com o banco" };
  }

  revalidatePath("/dashboard/curriculum/language");

  return { success: true, data };
}

export async function deleteLanguage(id: string) {
  const supabase = await createClient(await cookies());

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Usuário não autenticado" };
  }

  const { error } = await supabase
    .from("language")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    console.error("Erro ao deletar idioma:", error.message);
    return { error: "Falha ao deletar idioma" };
  }

  revalidatePath("/dashboard/curriculum/language");

  return { success: true };
}
