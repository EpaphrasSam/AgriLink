import ProductsTable from "@/components/pages/farmer-portal/products/ProductsTable";
import { Divider } from "@nextui-org/react";
import { getFarmerProducts } from "@/services/farmportalService";
import { auth } from "@/utils/auth/auth";

export default async function FarmersProductsPage() {
  const session = await auth();
  const farmerId = session?.user?.farmerDetails?.id;

  const { products, error } = await getFarmerProducts(farmerId!);

  return (
    <div className="sm:p-6 p-3">
      <div className="flex items-center gap-2 text-2xl font-bold">
        Products
        <span className="text-xs font-semibold mt-2 text-zinc-6000">
          {products.length} products found
        </span>
      </div>
      <Divider className="my-4" />
      <ProductsTable products={products!} />
    </div>
  );
}
