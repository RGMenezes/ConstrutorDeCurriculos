"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { IFeedback } from "@/types/feedback";
import { createClient } from "@/utils/supabase/server";

export async function getFeedback() {
  const supabase = await createClient(await cookies());

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Usuário não autenticado" };
  }

  const { data, error } = await supabase
    .from("feedback")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erro ao buscar feedbacks:", error.message);
    return { error: "Falha ao buscar feedbacks" };
  }

  return { success: true, data };
}

export async function upsertFeedback(feedbackData: IFeedback) {
  const supabase = await createClient(await cookies());

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Usuário não autenticado" };
  }

  const safeFeedback = {
    ...feedbackData,
    user_id: user.id,
    created_at: feedbackData.created_at === "" ? null : feedbackData.created_at,
    updated_at: feedbackData.updated_at === "" ? null : feedbackData.updated_at,
  };

  const { data, error } = await supabase
    .from("feedback")
    .upsert(safeFeedback)
    .select();

  if (error) {
    console.error("Erro ao salvar feedback:", error.message);
    return { error: "Falha ao sincronizar feedback com o banco" };
  }

  revalidatePath("/dashboard/curriculum/profile");

  return { success: true, data };
}

export async function deleteFeedback(id: string) {
  const supabase = await createClient(await cookies());

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Usuário não autenticado" };
  }

  const { error } = await supabase
    .from("feedback")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    console.error("Erro ao deletar feedback:", error.message);
    return { error: "Falha ao deletar feedback" };
  }

  revalidatePath("/dashboard/curriculum/profile");

  return { success: true };
}
