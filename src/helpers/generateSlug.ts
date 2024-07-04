export const generateSlug = (productName: string, farmerName: string) => {
  const slug = `${productName}-${farmerName}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
  return slug;
};
