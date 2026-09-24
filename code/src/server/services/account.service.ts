import "server-only";
import { z } from "zod";
import { requireUser } from "../auth";
import { connectDB } from "../db/mongoose";
import { UserModel } from "../models/user";
import { ServiceError } from "../errors";
import type { AccountInfo } from "@/types/account";
import { profilesModel } from "../models/profiles";
import { addressesModel } from "../models/addresses";
import { linksModel } from "../models/links";
import { workModel } from "../models/work";
import { formationModel } from "../models/formation";
import { skillsModel } from "../models/skills";
import { languagesModel } from "../models/languages";
import { feedbacksModel } from "../models/feedbacks";
import { curriculumsModel } from "../models/curriculums";
export const accountService = {
  async get(): Promise<AccountInfo> { return requireUser(); },
  async update(input: unknown): Promise<AccountInfo> {
    const user = await requireUser();
    const { name } = z.object({ name: z.string().trim().min(1).max(200) }).parse(input);
    const updated = await UserModel.findByIdAndUpdate(user.id, { $set: { name } }, { new: true });
    if (!updated) throw new ServiceError("Conta não encontrada.", 404);
    return { ...user, name: updated.name };
  },
  async remove() {
    const user = await requireUser();
    const db = await connectDB();
    // Atlas / replica set: data and account are removed atomically.
    await db.connection.transaction(async session => {
      for (const model of [profilesModel, addressesModel, linksModel, workModel, formationModel, skillsModel, languagesModel, feedbacksModel, curriculumsModel]) {
        await model.deleteMany({ user_id: user.id }).session(session);
      }
      await UserModel.deleteOne({ _id: user.id }).session(session);
    });
  }
};
