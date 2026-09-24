import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { connectDB } from "./db/mongoose";
import { UserModel } from "./models/user";
import { ServiceError } from "./errors";
export const currentUser = cache(async () => {
  const session = await auth();
  if (!session?.user?.id) return null;
  await connectDB();
  const user = await UserModel.findById(session.user.id).lean();
  return user ? { id: user._id, name: user.name, email: user.email, image: user.image, provider: user.provider } : null;
});
export async function requireUser() {
  const user = await currentUser();
  if (!user) throw new ServiceError("Sua sessão expirou. Entre novamente.", 401);
  return user;
}
export async function requirePageUser() {
  const user = await currentUser();
  if (!user) redirect("/login");
  return user;
}
