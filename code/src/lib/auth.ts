import "server-only";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { connectDB } from "@/server/db/mongoose";
import { UserModel } from "@/server/models/user";
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google, GitHub],
  session: { strategy: "jwt", maxAge: 7 * 24 * 60 * 60 },
  pages: { signIn: "/login", error: "/login" },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        await connectDB();
        // Provider + account ID is the identity. Never merge accounts by an unverified email.
        const identity = { provider: account.provider, providerAccountId: account.providerAccountId };
        await UserModel.init();
        const record = await UserModel.findOneAndUpdate(identity, {
          $setOnInsert: { ...identity, name: user.name ?? "", email: user.email ?? "", image: user.image ?? "" }
        }, { upsert: true, new: true, runValidators: true });
        if (!record) throw new Error("Não foi possível criar a conta.");
        token.userId = record._id;
        token.name = record.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && typeof token.userId === "string") session.user.id = token.userId;
      return session;
    }
  }
});
