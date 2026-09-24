import "server-only";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { connectDB } from "../db/mongoose";
import { curriculumsModel } from "../models/curriculums";
import type { Model } from "mongoose";
import type { EntityMap, Resource } from "@/types/entities";
import type { Stored } from "../models/base";
import { requireUser } from "../auth";
import { ServiceError } from "../errors";
import { entitySchemas } from "@/schemas/entities";
export function toDTO<K extends Resource>(value: unknown): EntityMap[K] {
  const { _id, ...data } = JSON.parse(JSON.stringify(value));
  return { ...data, id: String(_id) };
}
export function createDataService<K extends Resource>(resource: K, model: Model<Stored<K>>) {
  const validId = (id: string) => {
    if (!z.string().uuid().safeParse(id).success) throw new ServiceError("Identificador inválido.");
  };
  return {
    async list(): Promise<EntityMap[K][]> {
      const user = await requireUser();
      const order: Record<string, 1 | -1> = resource === "work" || resource === "formation" ? { start_date: -1, _id: 1 } : { created_at: -1, _id: 1 };
      const records = await model.find({ user_id: user.id }).sort(order).lean();
      return records.map(record => toDTO<K>(record));
    },
    async get(id: string): Promise<EntityMap[K]> {
      validId(id);
      const user = await requireUser();
      const record = await model.findOne({ _id: id, user_id: user.id }).lean();
      if (!record) throw new ServiceError("Registro não encontrado.", 404);
      return toDTO<K>(record);
    },
    async save(input: unknown, id?: string): Promise<EntityMap[K]> {
      if (id) validId(id);
      const user = await requireUser();
      // Zod strips id, user_id and timestamps from untrusted input.
      const data = entitySchemas[resource].parse(input);
      if (resource === "curriculums") {
        const { validateReferences } = await import("./references");
        await validateReferences(data, user.id);
      }
      if (id) {
        const record = await model.findOneAndUpdate({ _id: id, user_id: user.id }, { $set: data }, { new: true, runValidators: true }).lean();
        if (!record) throw new ServiceError("Registro não encontrado.", 404);
        revalidatePath("/dashboard", "layout");
        return toDTO<K>(record);
      }
      const record = await model.create({ ...data, user_id: user.id });
      revalidatePath("/dashboard", "layout");
      return toDTO<K>(record.toObject());
    },
    async remove(id: string) {
      validId(id);
      const user = await requireUser();
      const db = await connectDB();
      const referenceFields: Partial<Record<Resource, string>> = {
        profiles: "profile_ids", addresses: "address_ids", links: "link_ids", work: "work_ids",
        formation: "formation_ids", skills: "skill_ids", languages: "language_ids", feedbacks: "feedback_ids"
      };
      await db.connection.transaction(async session => {
        const result = await model.deleteOne({ _id: id, user_id: user.id }).session(session);
        if (!result.deletedCount) throw new ServiceError("Registro não encontrado.", 404);
        const field = referenceFields[resource];
        if (field) await curriculumsModel.updateMany({ user_id: user.id, [field]: id }, { $pull: { [field]: id } }).session(session);
      });
      revalidatePath("/dashboard", "layout");
    }
  };
}
