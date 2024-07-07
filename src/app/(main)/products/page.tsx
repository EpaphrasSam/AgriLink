import ProductListing from "@/components/pages/products/ProductListing";
import { getAllProducts } from "@/services/productsService";

export const dynamic = "force-dynamic";

export default async function Products() {
  const { products, error } = await getAllProducts();

  return (
    <div className="py-6 px-2">
      <ProductListing products={products} />
    </div>
  );
}
