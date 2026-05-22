import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Demo Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        return {
          id: credentials.email,
          email: credentials.email,
          name: credentials.email.includes("teacher") ? "Ms. Rivera" : "Demo Learner",
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};
