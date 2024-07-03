"use server";

import { signIn, signOut } from "@/utils/auth/auth";
import { Role } from "@prisma/client";
import { AuthError } from "next-auth";

export const loginAction = async (
  username: string,
  password: string,
  loginType: Role
) => {
  try {
    const signInOptions: Record<string, any> = {
      username,
      password,
      loginType,
      redirect: false,
    };

    await signIn("credentials", signInOptions);
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        error: error.cause?.err?.message || "Invalid credentials",
      };
    } else {
      return { error: "Something went wrong" };
    }
  }
};

export const logoutAction = async () => {
  try {
    await signOut({ redirect: false });
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
