"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { IAdresses } from "@/types/resume";
import { createClient } from "@/utils/supabase/server";

export async function getAddresses() {
  const supabase = await createClient(await cookies());

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Usuário não autenticado" };
  }

  const { data, error } = await supabase
    .from("addresses")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    console.error("Erro ao buscar endereços:", error.message);
    return { error: "Falha ao buscar endereços" };
  }

  return { success: true, data };
}

export async function upsertAddress(addressData: IAdresses) {
  const supabase = await createClient(await cookies());

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Usuário não autenticado" };
  }

  const { data, error } = await supabase
    .from("addresses")
    .upsert({
      ...addressData,
      user_id: user.id,
    })
    .select();

  if (error) {
    console.error("Erro ao salvar endereço:", error.message);
    return { error: "Falha ao sincronizar endereço com o banco" };
  }

  revalidatePath("/dashboard/profile");

  return { success: true, data };
}

export async function deleteAddress(id: string) {
  const supabase = await createClient(await cookies());

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Usuário não autenticado" };
  }

  const { error } = await supabase
    .from("addresses")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    console.error("Erro ao deletar endereço:", error.message);
    return { error: "Falha ao deletar endereço" };
  }

  revalidatePath("/dashboard/profile");

  return { success: true };
}
