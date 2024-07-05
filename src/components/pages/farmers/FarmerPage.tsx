"use client";
import { Tabs, Tab } from "@nextui-org/react";
import FarmersAbout from "@/components/pages/farmers/FarmersAbout";
import Image from "next/image";
import FarmersProducts from "./FarmersProduct";
import { FarmerType } from "@/types/FarmerType";

interface FarmerPageProps {
  farmer: FarmerType;
}

const FarmerPage = ({ farmer }: FarmerPageProps) => {
  if (!farmer) {
    return (
      <div className="h-screen flex justify-center items-center text-3xl font-bold text-gray-500">
        Farmer not found
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col items-center justify-center bg-white">
      <div className="flex flex-start items-center bg-white p-4 w-full max-w-4xl mb-4">
        <Image
          src={farmer.image}
          alt="Farm Logo"
          className="h-16 w-16 rounded-full"
          width={100}
          height={100}
        />
        <div className="ml-4">
          <h1 className="text-2xl font-bold">{farmer.name}</h1>
          <p className="text-gray-500 font-semibold text-sm">{farmer.bio}</p>
        </div>
      </div>
      <div className="content w-full max-w-4xl p-4 bg-white">
        <Tabs size="lg" fullWidth color="success" variant="underlined">
          <Tab title="About">
            <FarmersAbout farmer={farmer} reviews={farmer.reviews} />
          </Tab>
          <Tab title="Products">
            <FarmersProducts products={farmer.products} />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default FarmerPage;
