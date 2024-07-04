import prisma from "@/utils/prisma";
import { Prisma, Role } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { signIn } from "@/utils/auth/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      email,
      username,
      password,
      role,
      bio,
      about,
      region,
      town,
      image,
      userId,
    } = body;

    let user;

    if (userId) {
      user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [{ email: email }, { username: username }],
        },
      });

      if (existingUser) {
        if (existingUser.email === email) {
          return NextResponse.json(
            { error: "Email already exists" },
            { status: 409 }
          );
        } else if (existingUser.username === username) {
          return NextResponse.json(
            { error: "Username already exists" },
            { status: 409 }
          );
        }
      }

      user = await prisma.user.create({
        data: {
          email,
          username,
          password: hashedPassword,
          role,
        },
      });
    }

    if (role === Role.FARMER) {
      await prisma.farmer.create({
        data: {
          userId: user.id,
          bio,
          about,
          region,
          town,
          image,
        },
      });
    }

    await signIn("credentials", {
      username: user.username,
      password: password,
      loginType: user.role,
      logInUser: true,
      redirect: false,
    });

    return NextResponse.json({ message: "Signup successful" }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case "P2002":
          const target = error.meta?.target as string[];
          switch (true) {
            case target.includes("username"):
              return NextResponse.json(
                { error: "Username already exists" },
                { status: 409 }
              );
            case target.includes("email"):
              return NextResponse.json(
                { error: "Email already exists" },
                { status: 409 }
              );
          }
          break;
        default:
          return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
          );
      }
    } else {
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}
