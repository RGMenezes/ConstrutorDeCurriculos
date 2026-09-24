import type { AxiosInstance } from "axios";
import type { AccountInfo } from "@/types/account";
export function createAccountService(api: AxiosInstance) {
  return {
    async get() { return (await api.get<{ data: AccountInfo }>("/account")).data.data; },
    async update(name: string) { return (await api.put<{ data: AccountInfo }>("/account", { name })).data.data; },
    async remove() { await api.delete("/account", { data: {} }); }
  };
}
