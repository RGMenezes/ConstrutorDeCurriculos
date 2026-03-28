"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { IWork } from "@/types/work";
import { createClient } from "@/utils/supabase/server";

export async function getWork() {
  const supabase = await createClient(await cookies());

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Usuário não autenticado" };
  }

  const { data, error } = await supabase
    .from("work")
    .select("*")
    .eq("user_id", user.id)
    .order("start_date", { ascending: false });

  if (error) {
    console.error("Erro ao buscar experiências:", error.message);
    return { error: "Falha ao buscar experiências" };
  }

  return { success: true, data };
}

export async function upsertWork(workData: IWork) {
  const supabase = await createClient(await cookies());

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Usuário não autenticado" };
  }

  const safeWork = {
    ...workData,
    user_id: user.id,
    start_date: workData.start_date === "" ? null : workData.start_date,
    end_date: !workData.end_date || workData.end_date === "" ? null : workData.end_date,
  };

  const { data, error } = await supabase
    .from("work")
    .upsert(safeWork)
    .select();

  if (error) {
    console.error("Erro ao salvar experiência:", error.message);
    return { error: "Falha ao sincronizar experiência com o banco" };
  }

  revalidatePath("/dashboard/curriculum/work");

  return { success: true, data };
}

export async function deleteWork(id: string) {
  const supabase = await createClient(await cookies());

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Usuário não autenticado" };
  }

  const { error } = await supabase
    .from("work")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    console.error("Erro ao deletar experiência:", error.message);
    return { error: "Falha ao deletar experiência" };
  }

  revalidatePath("/dashboard/curriculum/work");

  return { success: true };
}
