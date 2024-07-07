import { Role } from "@prisma/client";
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      image?: string | null;
      username?: string | null;
      role: Role;
      farmerDetails?: {
        id: string;
        name: string;
        bio: string;
        region: string;
        about: string;
        town: string;
        image: string;
        paystackSubAccountCode: string | null;
      } | null;
    };
  }
}
