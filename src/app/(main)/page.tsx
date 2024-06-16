import Banner from "@/components/pages/home/Banner";
import TopRatedCarousel from "@/components/pages/home/TopRatedCarousel";

export default function Home() {
  return (
    <>
      <div>
        <Banner />
      </div>
      <div className="p-6">
        <TopRatedCarousel />
      </div>
    </>
  );
}
