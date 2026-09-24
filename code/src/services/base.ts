import type { AxiosInstance } from "axios";
import type { EntityInput, EntityMap, Resource } from "@/types/entities";
export function createResourceService<K extends Resource>(api: AxiosInstance, resource: K) {
  const path = `/${resource}`;
  return {
    async list() { return (await api.get<{ data: EntityMap[K][] }>(path)).data.data; },
    async get(id: string) { return (await api.get<{ data: EntityMap[K] }>(`${path}/${encodeURIComponent(id)}`)).data.data; },
    async save(input: EntityInput<K>, id?: string) {
      const response = id
        ? await api.put<{ data: EntityMap[K] }>(`${path}/${encodeURIComponent(id)}`, input)
        : await api.post<{ data: EntityMap[K] }>(path, input);
      return response.data.data;
    },
    async remove(id: string) { await api.delete(`${path}/${encodeURIComponent(id)}`, { data: {} }); }
  };
}
