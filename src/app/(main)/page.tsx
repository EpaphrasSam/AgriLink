import Banner from "@/components/pages/home/Banner";
import PopularProducts from "@/components/pages/home/PopularProducts";
import TopRatedCarousel from "@/components/pages/home/TopRatedCarousel";
import { Button, Divider } from "@nextui-org/react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>
        <Banner />
      </div>
      <div className="p-6">
        <div className="w-full flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Top Rated Farmers</h2>
          <TopRatedCarousel />
        </div>
        <div className="w-full flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Popular Products</h2>
          <PopularProducts />
        </div>
        <div className="w-full my-8 flex flex-col items-center justify-center gap-8">
          <h2 className="text-2xl font-bold">Discover even more products</h2>
          <Button size="lg" radius="sm" color="success">
            <Link href="/products">View all products</Link>
          </Button>
        </div>
        <div className="w-full flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Latest Products</h2>
          <PopularProducts />
        </div>
      </div>
    </>
  );
}
