import "server-only";
import { randomUUID } from "node:crypto";
import { Schema, model, models, type Model } from "mongoose";
export interface AppUser { _id: string; provider: string; providerAccountId: string; name: string; email: string; image: string; }
const schema = new Schema<AppUser>({
  _id: { type: String, default: randomUUID },
  provider: { type: String, required: true },
  providerAccountId: { type: String, required: true },
  name: { type: String, default: "" }, email: { type: String, default: "" }, image: { type: String, default: "" }
}, { timestamps: true });
schema.index({ provider: 1, providerAccountId: 1 }, { unique: true });
export const UserModel = (models.AppUser as Model<AppUser> | undefined) ?? model<AppUser>("AppUser", schema);
