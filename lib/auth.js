import GitHubProvider from "next-auth/providers/github";
import { prisma } from "./prisma";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      // Enrich the session with the user's org and role from the database
      // so downstream API routes can trust session.user.orgId.
      if (session.user?.email) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: { orgId: true, role: true },
          });
          if (dbUser) {
            session.user.orgId = dbUser.orgId;
            session.user.role = dbUser.role;
          }
        } catch (err) {
          // Intentionally silent: DB may be unavailable during local dev before
          // the schema is migrated. The user will just lack orgId/role in their
          // session until a DB connection is established.
          console.warn("[auth] Could not enrich session from DB:", err?.message);
        }
      }
      return session;
    },
  },
};
