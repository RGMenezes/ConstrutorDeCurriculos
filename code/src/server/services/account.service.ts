import type { AccountInfo } from "@/types/account";
import "server-only";
import { z } from "zod";
import { requireUser } from "../auth";
import { connectDB } from "../db/mongoose";
import { ServiceError } from "../errors";
import { addressesModel } from "../models/addresses";
import { curriculumsModel } from "../models/curriculums";
import { feedbacksModel } from "../models/feedbacks";
import { formationModel } from "../models/formation";
import { languagesModel } from "../models/languages";
import { linksModel } from "../models/links";
import { profilesModel } from "../models/profiles";
import { skillsModel } from "../models/skills";
import { UserModel } from "../models/user";
import { workModel } from "../models/work";
import { Model } from "mongoose";

type OwnedModel = Model<{ user_id: string }>;


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
    const models = [profilesModel, addressesModel, linksModel, workModel, formationModel, skillsModel, languagesModel, feedbacksModel, curriculumsModel] as unknown as OwnedModel[];
    await db.connection.transaction(async session => {
      for (const model of models) {
        await model.deleteMany({ user_id: user.id }).session(session);
      }
      await UserModel.deleteOne({ _id: user.id }).session(session);
    });
  }
};
