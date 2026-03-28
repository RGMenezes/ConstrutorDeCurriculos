"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { ISkill } from "@/types/skill";
import { createClient } from "@/utils/supabase/server";

export async function getSkill() {
  const supabase = await createClient(await cookies());

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Usuário não autenticado" };
  }

  const { data, error } = await supabase
    .from("skill")
    .select("*")
    .eq("user_id", user.id)
    .order("category", { ascending: true });

  if (error) {
    console.error("Erro ao buscar habilidades:", error.message);
    return { error: "Falha ao buscar habilidades" };
  }

  return { success: true, data };
}

export async function upsertSkill(skillData: ISkill) {
  const supabase = await createClient(await cookies());

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Usuário não autenticado" };
  }

  const safeSkill = {
    ...skillData,
    user_id: user.id,
    created_at: skillData.created_at === "" ? null : skillData.created_at,
    updated_at: skillData.updated_at === "" ? null : skillData.updated_at,
  };

  const { data, error } = await supabase
    .from("skill")
    .upsert(safeSkill)
    .select();

  if (error) {
    console.error("Erro ao salvar habilidade:", error.message);
    return { error: "Falha ao sincronizar habilidade com o banco" };
  }

  revalidatePath("/dashboard/curriculum/skill");

  return { success: true, data };
}

export async function deleteSkill(id: string) {
  const supabase = await createClient(await cookies());

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Usuário não autenticado" };
  }

  const { error } = await supabase
    .from("skill")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    console.error("Erro ao deletar habilidade:", error.message);
    return { error: "Falha ao deletar habilidade" };
  }

  revalidatePath("/dashboard/curriculum/skill");

  return { success: true };
}
