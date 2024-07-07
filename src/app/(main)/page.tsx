import Banner from "@/components/pages/home/Banner";
import PopularProducts from "@/components/pages/home/PopularProducts";
import RecentProducts from "@/components/pages/home/RecentProducts";
import TopRatedFarmers from "@/components/pages/home/TopRatedFarmers";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { getTopRatedFarmers } from "@/services/farmersService";
import {
  getPopularProducts,
  getRecentProducts,
} from "@/services/productsService";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { farmers: topRatedFarmers } = await getTopRatedFarmers();
  const { products: popularProducts } = await getPopularProducts();
  const { products: recentProducts } = await getRecentProducts();

  return (
    <>
      <div>
        <Banner />
      </div>
      <div className="p-6">
        <div className="w-full flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Top Rated Farmers</h2>
          <TopRatedFarmers farmers={topRatedFarmers} />
        </div>
        <div className="w-full flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Popular Products</h2>
          <PopularProducts products={popularProducts} />
        </div>
        <div className="w-full my-8 flex flex-col items-center justify-center gap-8">
          <h2 className="text-2xl font-bold">Discover even more products</h2>
          <Button size="lg" radius="sm" color="success">
            <Link href="/products">View all products</Link>
          </Button>
        </div>
        <div className="w-full flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Latest Products</h2>
          <RecentProducts products={recentProducts} />
        </div>
      </div>
    </>
  );
}
