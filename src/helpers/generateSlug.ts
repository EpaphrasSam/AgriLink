import slugify from "slugify";
import prisma from "@/utils/prisma";

export const generateSlug = (productName: string, farmerName: string) => {
  const slug = `${productName}-${farmerName}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
  return slug;
};

export const generateFarmerSlug = async (farmerName: string, id?: string) => {
  let slug = slugify(farmerName, { lower: true });
  let slugExists = await prisma.farmer.findUnique({
    where: { slug },
  });

  if (slugExists && slugExists.id !== id) {
    const uniqueSuffix = Date.now().toString(36);
    slug = `${slug}-${uniqueSuffix}`;
  }

  return slug;
};
