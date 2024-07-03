import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      image?: string | null;
      username?: string | null;
      role?: string | null;
      farmerDetails?: {
        id: string;
        bio: string;
        region: string;
        town: string;
        image: string;
      } | null;
    };
  }
}
