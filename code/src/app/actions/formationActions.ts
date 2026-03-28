"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { IFormation } from "@/types/formation";
import { createClient } from "@/utils/supabase/server";

export async function getFormation() {
  const supabase = await createClient(await cookies());

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Usuário não autenticado" };
  }

  const { data, error } = await supabase
    .from("formation")
    .select("*")
    .eq("user_id", user.id)
    .order("start_date", { ascending: false });

  if (error) {
    console.error("Erro ao buscar formações:", error.message);
    return { error: "Falha ao buscar formações" };
  }

  return { success: true, data };
}

export async function upsertFormation(formationData: IFormation) {
  const supabase = await createClient(await cookies());

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Usuário não autenticado" };
  }

  // Corrigir campos de data vazios para null
  const safeFormation = {
    ...formationData,
    user_id: user.id,
    start_date: formationData.start_date === "" ? null : formationData.start_date,
    end_date: !formationData.end_date || formationData.end_date === "" ? null : formationData.end_date,
  };

  const { data, error } = await supabase
    .from("formation")
    .upsert(safeFormation)
    .select();

  if (error) {
    console.error("Erro ao salvar formação:", error.message);
    return { error: "Falha ao sincronizar formação com o banco" };
  }

  revalidatePath("/dashboard/curriculum/formation");

  return { success: true, data };
}

export async function deleteFormation(id: string) {
  const supabase = await createClient(await cookies());

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Usuário não autenticado" };
  }

  const { error } = await supabase
    .from("formation")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    console.error("Erro ao deletar formação:", error.message);
    return { error: "Falha ao deletar formação" };
  }

  revalidatePath("/dashboard/curriculum/formation");

  return { success: true };
}
