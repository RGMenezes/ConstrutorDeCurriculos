"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { IProfile } from "@/types/resume";
import { createClient } from "@/utils/supabase/server";

export async function getProfile() {
  const supabase = await createClient(await cookies());

  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user) {
    return { error: "Usuário não autenticado" };
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    console.error("Erro ao buscar perfis:", error.message);
    return { error: "Falha ao buscar perfis" };
  }

  return { success: true, data: data ?? [] };
}

export async function upsertProfile(profileData: IProfile) {
  const supabase = await createClient(await cookies());

  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user) {
    return { error: "Usuário não autenticado" };
  }

  let query;
  if (profileData.id) {
    query = supabase
      .from("profiles")
      .update({ ...profileData, user_id: user.id })
      .eq("id", profileData.id)
      .eq("user_id", user.id)
      .select();
  } else {
    query = supabase
      .from("profiles")
      .insert({ ...profileData, user_id: user.id })
      .select();
  }

  const { data, error } = await query;

  if (error) {
    console.error("Erro ao salvar perfil:", error.message);
    return { error: "Falha ao sincronizar com o banco" };
  }

  revalidatePath("/dashboard/profile");
  
  return { success: true, data };
}

export async function deleteProfile(id: string) {
  const supabase = await createClient(await cookies());

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Usuário não autenticado" };
  }

  const { error } = await supabase
    .from("profiles")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    console.error("Erro ao deletar perfil:", error.message);
    return { error: "Falha ao deletar perfil" };
  }

  revalidatePath("/dashboard/profile");

  return { success: true };
}