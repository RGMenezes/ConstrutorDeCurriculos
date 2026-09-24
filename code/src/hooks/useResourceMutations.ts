"use client";
import { useServices } from "./useServices";
import { useData } from "@/providers/DataProvider";
import { errorMessage } from "@/lib/http/error";
import type { EntityInput, EntityMap, Resource } from "@/types/entities";
import type { createResourceService } from "@/services/base";
export function useResourceMutations<K extends Resource>(resource: K) {
  const services = useServices();
  const store = useData();
  const service = services[resource] as ReturnType<typeof createResourceService<K>>;
  return {
    async save(input: EntityInput<K> & { id?: string }) {
      try {
        const data: EntityMap[K] = await service.save(input, input.id);
        store.replace(resource, data);
        return { success: true as const, data, error: undefined };
      } catch (error) { return { success: false as const, data: undefined, error: errorMessage(error) }; }
    },
    async remove(id: string) {
      try { await service.remove(id); store.remove(resource, id); return { success: true, error: undefined }; }
      catch (error) { return { success: false, error: errorMessage(error) }; }
    }
  };
}
