import ProductsTable from "@/components/pages/farmer-portal/products/ProductsTable";
import { Divider } from "@nextui-org/react";

const products = [
  {
    id: "1",
    name: "Organic Apple",
    price: 10,
    rating: 4.5,
    category: "Fruits",
  },
  {
    id: "2",
    name: "Organic Banana",
    price: 20,
    rating: 3.5,
    category: "Fruits",
  },
  {
    id: "3",
    name: "Organic Orange",
    price: 30,
    rating: 4.5,
    category: "Onions",
  },
  {
    id: "4",
    name: "Organic Tomato",
    price: 40,
    rating: 4.5,
    category: "Tomatoes",
  },
  {
    id: "5",
    name: "Organic Carrot",
    price: 50,
    rating: 4.5,
    category: "Carrots",
  },
];

export default function FarmersProductsPage() {
  return (
    <div className="sm:p-6 p-3">
      <div className="flex items-center gap-2 text-2xl font-bold">
        Products
        <span className="text-xs font-semibold mt-2 text-zinc-6000">
          {products.length} products found
        </span>
      </div>
      <Divider className="my-4" />
      <ProductsTable products={products} />
    </div>
  );
}
