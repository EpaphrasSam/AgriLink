import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../prisma";
import { passwordValidator } from "../../helpers/bcryptValidator";
import { Role } from "@prisma/client";

async function validateUser(
  username: string,
  password: string,
  loginType: Role,
  logInUser: boolean
): Promise<any | null> {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    include: {
      farmer: {
        select: {
          id: true,
          name: true,
          bio: true,
          region: true,
          town: true,
          image: true,
        },
      },
    },
  });

  if (!user || !user.password) {
    throw new Error("Invalid credentials");
  }

  if (loginType === Role.FARMER && user.role !== Role.FARMER) {
    throw new Error("No Farmer Account found");
  }

  if (!logInUser) {
    const isCorrectPassword = await passwordValidator(password, user.password);
    if (!isCorrectPassword) {
      throw new Error("Invalid credentials");
    }
  }

  return user;
}

export default {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        loginType: { label: "Login Type", type: "text" },
      },
      async authorize(credentials, req): Promise<any | null> {
        const body = await req.json();
        const { logInUser } = body;
        if (
          !credentials ||
          typeof credentials.username !== "string" ||
          typeof credentials.password !== "string" ||
          typeof credentials.loginType !== "string"
        ) {
          throw Error("Invalid credentials");
        }
        try {
          const user = await validateUser(
            credentials.username,
            credentials.password,
            credentials.loginType as Role,
            logInUser
          );
          if (!user) {
            throw new Error("Invalid credentials");
          }
          return user;
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
