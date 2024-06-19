"use client";
import { useState } from "react";
import img from "../../../../../public/logo.png";
import Image from "next/image";
import { Product } from "@/types/ProductTypes";
import { Bio } from "@/types/BioTypes";
import CardItems from "@/components/global/CardItems";

const bios: Bio[] = [
  { id: 1, bio: "we  have made it in life" },
  { id: 2, bio: "we  have made it in life" },
  { id: 3, bio: "we  have made it in life" },
  { id: 4, bio: "we  have made it in life" },
];

const products: Product[] = [
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
];

function Header() {
  return (
    <div className="flex flex-start bg-white p-4 w-full max-w-4xl mb-7">
      <Image src={img} alt="Farm Logo" className="h-16 w-16 rounded-full" />{" "}
      {/* Update the src path */}
      <div className="ml-4">
        <h1 className="text-2xl font-bold">Acme Farms</h1>
        <p className="text-green-500">
          Selling the freshest produce and meat from the heartland
        </p>
        <p className="text-gray-500">1000 followers</p>
      </div>
    </div>
  );
}
function About() {
  return (
    <div className="mt-4 p-4 shadow-lg">
      <h1 className="text-xl font-bold">Bio</h1>
      <p>
        Acme Farms is a family-owned business that has been providing fresh,
        local produce to the community for over 20 years. Our mission is to
        provide the highest quality products at the best prices, while
        supporting local farmers and the community. We are committed to
        sustainability and environmental responsibility, and we strive to be
        good stewards of the land. We offer a wide variety of products,
        including fruits, vegetables, meats, cheeses, eggs, and more. Our
        products are free of pesticides, hormones, and other harmful chemicals,
        and we pride ourselves on their freshness and flavor. We are dedicated
        to providing our customers with the best possible shopping experience,
        and we welcome your feedback and suggestions. Thank you for supporting
        local businesses and farmers.
      </p>
    </div>
  );
}

function Products() {
  return (
    <div className="w-full py-4 flex">
      {products.map((product) => (
        <CardItems key={product.id} product={product} showFarmer={false} />
      ))}
    </div>
  );
}
function Items() {
  return (
    <div className="mt-4 p-4 bg-white">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {products.map((product) => (
          <div>
            <div
              key={product.id}
              className="shadow-lg rounded-lg overflow-hidden"
            >
              <Image
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover"
                width={500}
                height={500}
              />
            </div>
            <div className="p-4">
              <h2 className="font-bold">{product.title}</h2>
              <p className="text-gray-800">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Forums() {
  return (
    <div className="mt-4 p-4">
      <h1 className="text-xl font-bold">Forums</h1>
      <p>
        Join our discussions on various farming topics and share your
        experiences and knowledge with the community.
      </p>
    </div>
  );
}

export default function FarmersPage() {
  const [activeTab, setActiveTab] = useState("about");

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center bg-white">
      <Header />
      <div className="flex justify-between w-6/12  bg-white pt-2 mb-4">
        <div
          className={`flex-grow text-gray-600 hover:text-green-500 cursor-pointer px-4 pb-2 font-medium text-lg ${
            activeTab === "about"
              ? "text-green-500  border-green-500 border-b-3 "
              : "border-transparent"
          }`}
          onClick={() => handleTabClick("about")}
          // style={{ borderBottomWidth: 4 }}
        >
          About
        </div>
        <div
          className={`flex-grow text-gray-600 hover:text-green-500 cursor-pointer px-4 pb-2 font-medium text-lg ${
            activeTab === "products"
              ? "text-green-500 border-green-500 border-b-3"
              : "border-transparent"
          }`}
          onClick={() => handleTabClick("products")}
          // style={{ borderBottomWidth: 4 }}
        >
          Products
        </div>
        <div
          className={` flex-grow text-gray-600 hover:text-green-500 cursor-pointer px-4 pb-2 font-medium text-lg ${
            activeTab === "forums"
              ? "text-green-500 border-green-500 border-b-3"
              : "border-transparent"
          }`}
          onClick={() => handleTabClick("forums")}
          // style={{ borderBottomWidth: 4 }}
        >
          Forums
        </div>
      </div>
      <div className="content w-full max-w-4xl p-4  mt-4 bg-white">
        {activeTab === "about" && <About />}
        {activeTab === "products" && <Products />}
        {activeTab === "forums" && <Forums />}
      </div>
    </div>
  );
}
