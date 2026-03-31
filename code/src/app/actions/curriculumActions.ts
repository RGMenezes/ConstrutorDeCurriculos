"use server";


import { revalidatePath } from "next/cache";
import { ICurriculum } from "@/types/curriculum";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

const table = "curriculum";


export async function createCurriculumAction(
  curriculum: Omit<ICurriculum, "id" | "created_at" | "updated_at" | "user_id">
) {
  const supabase = await createClient(await cookies());
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    return { success: false, error: "Usuário não autenticado" };
  }
  const insertData = { ...curriculum, user_id: user.id };
  // address_id e link_id já são opcionais no tipo Curriculum
  const { data, error } = await supabase
    .from(table)
    .insert([insertData])
    .select();
  if (error) return { success: false, error: error.message };
  revalidatePath("/dashboard");
  return { success: true, data: data?.[0] };
}


export async function updateCurriculumAction(
  id: string,
  updates: Partial<ICurriculum>
) {
  const supabase = await createClient(await cookies());
  // address_id e link_id já são opcionais no tipo Curriculum
  const { data, error } = await supabase
    .from(table)
    .update(updates)
    .eq("id", id)
    .select();
  if (error) return { success: false, error: error.message };
  revalidatePath("/dashboard");
  return { success: true, data: data?.[0] };
}

export async function deleteCurriculumAction(id: string) {
  const supabase = await createClient(await cookies());
  const { error } = await supabase
    .from(table)
    .delete()
    .eq("id", id);
  if (error) return { success: false, error: error.message };
  revalidatePath("/dashboard");
  return { success: true };
}

export async function getCurriculums() {
  const supabase = await createClient(await cookies());
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    return { error: "Usuário não autenticado" };
  }
  const { data, error } = await supabase
    .from("curriculum")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });
  if (error) {
    return { error: error.message };
  }
  return { success: true, data };
}
