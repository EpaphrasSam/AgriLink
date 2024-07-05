import Product from "@/components/pages/products/Product";
import { getProductBySlug } from "@/services/productsService";

export default async function ProductPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const { product, error } = await getProductBySlug(slug);

  return <Product product={product!} />;
}
