import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

// Usuários mockados para o boilerplate
const MOCK_USERS = [
  {
    id: "1",
    name: "Administrador",
    email: "admin@pedidocerto.com",
    role: "backoffice",
    password: "admin123",
  },
  {
    id: "2",
    name: "Gerente",
    email: "gerente@pedidocerto.com",
    role: "manager",
    password: "gerente123",
  },
];

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key-for-development",
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Senha", type: "password", placeholder: "Senha" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Buscar usuário mockado
        const user = MOCK_USERS.find(
          (u) =>
            u.email === credentials.email &&
            u.password === credentials.password,
        );

        if (!user) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role as "backoffice" | "manager",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "backoffice" | "manager";
      }
      return session;
    },
  },
};
