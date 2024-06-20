"use client";
const product = {
  id: 3,
  title: "Milk",
  category: "Dairy",
  price: 3.99,
  rating: 3,
  image:
    "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
  farm: "Vickys farm",
  bio: "Bobby is a cute man with a big heart.",
};

interface AboutProp {
  about: string;
}

export default function About({ about }: AboutProp) {
  return (
    <div className="mt-4 p-4 shadow-lg">
      <h1 className="text-xl font-bold">Bio</h1>
      <p>{about}</p>
    </div>
  );
}
