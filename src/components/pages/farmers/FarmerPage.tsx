"use client";
import { Tabs, Tab } from "@nextui-org/react";
import FarmersAbout from "@/components/pages/farmers/FarmersAbout";
import Image from "next/image";
import FarmersProducts from "./FarmersProduct";

const farmer = {
  id: 1,
  name: "Vickys farm",
  bio: "Vickys farm is a farm located in Canada.",
  about: "Vickys farm is a farm located in Canada.",
  image:
    "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
  products: [
    {
      id: 1,
      title: "Strawberries",
      category: "Fruit",
      price: 5.99,
      rating: 4,
      image:
        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
      farm: "Vickys farm",
    },
    {
      id: 2,
      title: "Carrots",
      category: "Vegetables",
      price: 2.99,
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
      farm: "Vickys farm",
    },
    {
      id: 3,
      title: "Milk",
      category: "Dairy",
      price: 3.99,
      rating: 3,
      image:
        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
      farm: "Vickys farm",
    },
    {
      id: 4,
      title: "Orange",
      category: "Fruit",
      price: 10.99,
      rating: 4,
      image:
        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
      farm: "Vickys farm",
    },
  ],
};

export default function FarmerPage() {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-white">
      <div className="flex flex-start bg-white p-4 w-full max-w-4xl mb-4">
        <Image
          src={farmer.image}
          alt="Farm Logo"
          className="h-16 w-16 rounded-full"
          width={100}
          height={100}
        />{" "}
        <div className="ml-4">
          <h1 className="text-2xl font-bold">{farmer.name}</h1>
          <p className="text-green-500">{farmer.bio}</p>
        </div>
      </div>
      <div className="content w-full max-w-4xl p-4 bg-white">
        <Tabs size="lg" fullWidth color="success" variant="underlined">
          <Tab title="About">
            <FarmersAbout about={farmer.about} />
          </Tab>
          <Tab title="Products">
            <FarmersProducts products={farmer.products} />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
