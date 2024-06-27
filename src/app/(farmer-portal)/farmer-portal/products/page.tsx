import ProductsTable from "@/components/pages/farmer-portal/products/ProductsTable";
import { Divider } from "@nextui-org/react";

const products = [
  {
    id: "1",
    name: "Organic Apple",
    price: 10,
    rating: 4.5,
    category: "Fruits",
    description: "A fresh and juicy organic apple.",
    images: [
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
    ],
  },
  {
    id: "2",
    name: "Organic Banana",
    price: 20,
    rating: 3.5,
    category: "Fruits",
    description: "A sweet and ripe organic banana.",
    images: [
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
    ],
  },
  {
    id: "3",
    name: "Organic Orange",
    price: 30,
    rating: 4.5,
    category: "Onions",
    description: "A tangy and vitamin-rich organic orange.",
    images: [
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
    ],
  },
  {
    id: "4",
    name: "Organic Tomato",
    price: 40,
    rating: 4.5,
    category: "Tomatoes",
    description: "A juicy and flavorful organic tomato.",
    images: [
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
    ],
  },
  {
    id: "5",
    name: "Organic Carrot",
    price: 50,
    rating: 4.5,
    category: "Carrots",
    description: "A crunchy and nutrient-packed organic carrot.",
    images: [
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
    ],
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
