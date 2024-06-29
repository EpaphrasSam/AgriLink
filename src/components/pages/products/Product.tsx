"use client";

import React, { useState } from "react";
import { Avatar, Button, Divider, Image } from "@nextui-org/react";
import RatingsAndReviews from "../reviews/RatingsAndReviews";
import ImageCarousel from "@/components/global/ImageCarousel";
import useCartStore from "@/store/useCartStore";
import Link from "next/link";

const product = {
  name: "Organic Apples",
  description:
    "Our Organic Apples are handpicked from the finest orchards, ensuring that each apple is of the highest quality. These apples are grown without the use of synthetic pesticides or fertilizers, making them a healthier choice for you and your family. They are fresh, juicy, and packed with natural sweetness, perfect for snacking, baking, or adding to your favorite recipes. Our commitment to organic farming practices means that you can enjoy these delicious apples with the peace of mind that they are free from harmful chemicals. Experience the crisp texture and delightful flavor of our Organic Apples, and taste the difference that organic farming makes.",
  price: "GHS 5.99",
  images: [
    "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
    "https://th.bing.com/th/id/R.787713fb0b1b8606feb684abbce18f64?rik=hTGIqVDhAl6jdQ&riu=http%3a%2f%2fwww.wallpaperup.com%2fuploads%2fwallpapers%2f2013%2f02%2f05%2f34896%2fde2e06f99a18826a5b4341753b7faec1.jpg&ehk=cotRWZz3tydhNVWOxghOzSwm3YNajMYgxFrA2k7qbqg%3d&risl=&pid=ImgRaw&r=0",
    "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
    "https://th.bing.com/th/id/R.787713fb0b1b8606feb684abbce18f64?rik=hTGIqVDhAl6jdQ&riu=http%3a%2f%2fwww.wallpaperup.com%2fuploads%2fwallpapers%2f2013%2f02%2f05%2f34896%2fde2e06f99a18826a5b4341753b7faec1.jpg&ehk=cotRWZz3tydhNVWOxghOzSwm3YNajMYgxFrA2k7qbqg%3d&risl=&pid=ImgRaw&r=0",
  ],
};

const farmer = {
  name: "John Doe",
  bio: "A passionate farmer with over 20 years of experience in organic farming.",
  image:
    "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
};

const sampleProductReviews = [
  {
    id: "1",
    productName: "Carrots",
    reviews: [
      {
        id: "1",
        user: "John Doe",
        userImage:
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
        date: "March 22, 2023",
        comment: "Great product!",
        rating: 5,
        replies: [
          {
            id: "1",
            user: "Farmer Joe",
            userImage:
              "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
            date: "March 23, 2023",
            comment: "Thank you, John! We're glad you liked the carrots.",
          },
        ],
      },
      {
        id: "2",
        user: "Jane Smith",
        userImage:
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
        date: "March 24, 2023",
        comment: "Very fresh and crunchy.",
        rating: 4,
        replies: [],
      },
    ],
  },
  {
    id: "2",
    productName: "Milk",
    reviews: [
      {
        id: "3",
        user: "Alice Johnson",
        userImage:
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
        date: "March 25, 2023",
        comment: "Very fresh and tasty.",
        rating: 4,
        replies: [
          {
            id: "2",
            user: "Farmer Joe",
            userImage:
              "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
            date: "March 26, 2023",
            comment: "Thank you, Alice! We appreciate your feedback.",
          },
        ],
      },
      {
        id: "4",
        user: "Bob Brown",
        userImage:
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
        date: "March 26, 2023",
        comment: "Good quality.",
        rating: 5,
        replies: [],
      },
    ],
  },
  {
    id: "3",
    productName: "Tomatoes",
    reviews: [
      {
        id: "5",
        user: "Charlie Davis",
        userImage:
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
        date: "March 27, 2023",
        comment: "Crisp and fresh.",
        rating: 4,
        replies: [],
      },
      {
        id: "6",
        user: "Diana Evans",
        userImage:
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
        date: "March 28, 2023",
        comment: "Delicious and juicy.",
        rating: 5,
        replies: [
          {
            id: "3",
            user: "Farmer Joe",
            userImage:
              "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
            date: "March 29, 2023",
            comment: "Thank you, Diana! We're happy you enjoyed the tomatoes.",
          },
        ],
      },
    ],
  },
  {
    id: "4",
    productName: "Eggs",
    reviews: [
      {
        id: "7",
        user: "Eve Foster",
        userImage:
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
        date: "March 29, 2023",
        comment: "Sweet and juicy.",
        rating: 5,
        replies: [],
      },
      {
        id: "8",
        user: "Frank Green",
        userImage:
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
        date: "March 30, 2023",
        comment: "Perfect for cooking.",
        rating: 4,
        replies: [
          {
            id: "4",
            user: "Farmer Joe",
            userImage:
              "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
            date: "March 31, 2023",
            comment: "Thank you, Frank! We're glad you liked the eggs.",
          },
        ],
      },
    ],
  },
  {
    productName: "Lettuce",
    reviews: [
      {
        id: "9",
        user: "Grace Hill",
        userImage:
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
        date: "March 31, 2023",
        comment: "Very refreshing.",
        rating: 5,
        replies: [],
      },
      {
        id: "10",
        user: "Henry Ivy",
        userImage:
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
        date: "April 1, 2023",
        comment: "Sweet and delicious.",
        rating: 5,
        replies: [
          {
            id: "5",
            user: "Farmer Joe",
            userImage:
              "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
            date: "April 2, 2023",
            comment: "Thank you, Henry! We're happy you enjoyed the lettuce.",
          },
        ],
      },
    ],
  },
  {
    id: "5",
    productName: "Cheese",
    reviews: [
      {
        id: "11",
        user: "Ivy Johnson",
        userImage:
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
        date: "April 3, 2023",
        comment: "Delicious and creamy.",
        rating: 5,
        replies: [],
      },
      {
        id: "12",
        user: "Jack King",
        userImage:
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
        date: "April 4, 2023",
        comment: "Great taste and texture.",
        rating: 4,
        replies: [
          {
            id: "6",
            user: "Farmer Joe",
            userImage:
              "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
            date: "April 5, 2023",
            comment: "Thank you, Jack! We're glad you liked the cheese.",
          },
        ],
      },
    ],
  },
  {
    id: "6",
    productName: "Apples",
    reviews: [
      {
        id: "13",
        user: "Karen Lee",
        userImage:
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
        date: "April 6, 2023",
        comment: "Sweet and juicy.",
        rating: 5,
        replies: [],
      },
      {
        id: "14",
        user: "Larry Moore",
        userImage:
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
        date: "April 7, 2023",
        comment: "Very fresh and tasty.",
        rating: 4,
        replies: [
          {
            id: "7",
            user: "Farmer Joe",
            userImage:
              "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
            date: "April 8, 2023",
            comment: "Thank you, Larry! We're happy you enjoyed the apples.",
          },
        ],
      },
    ],
  },
  {
    id: "7",
    productName: "Potatoes",
    reviews: [
      {
        id: "15",
        user: "Megan Nelson",
        userImage:
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
        date: "April 9, 2023",
        comment: "Perfect for cooking.",
        rating: 4,
        replies: [],
      },
      {
        id: "16",
        user: "Nathan Owens",
        userImage:
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
        date: "April 10, 2023",
        comment: "Good quality and taste.",
        rating: 5,
        replies: [
          {
            id: "8",
            user: "Farmer Joe",
            userImage:
              "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
            date: "April 11, 2023",
            comment: "Thank you, Nathan! We're glad you liked the potatoes.",
          },
        ],
      },
    ],
  },
  {
    id: "8",
    productName: "Oranges",
    reviews: [
      {
        id: "17",
        user: "Olivia Parker",
        userImage:
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
        date: "April 12, 2023",
        comment: "Very refreshing.",
        rating: 5,
        replies: [],
      },
      {
        id: "18",
        user: "Paul Quinn",
        userImage:
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
        date: "April 13, 2023",
        comment: "Sweet and juicy.",
        rating: 5,
        replies: [],
      },
    ],
  },
];

const isUserLoggedIn = true;

const Product = () => {
  const addToCart = useCartStore((state) => state.addToCart);

  const onReply = (reviewId: string, reply: string) => {
    // Handle reply logic
  };

  const onAddReview = (rating: string, comment: string) => {
    // Handle add review logic
  };

  return (
    <div className="p-6">
      <div className="w-full max-w-3xl mx-auto">
        <ImageCarousel images={product.images} />
      </div>
      <div className="mt-6">
        <h1 className="text-3xl my-6 font-bold text-center">{product.name}</h1>
        <p className="text-lg mt-2">{product.description}</p>
        <p className="text-xl font-semibold text-gray-500 mt-2">
          {product.price}
        </p>
        <div className="flex justify-end">
          <Button
            className="mt-2"
            color="primary"
            // onClick={() => addToCart(product)}
          >
            Add to Cart
          </Button>
        </div>
      </div>
      <Divider className="my-6" />
      <div className="mt-6 flex items-start">
        <Avatar
          src={farmer.image}
          alt={farmer.name}
          className="rounded-full"
          size="lg"
        />
        <div className="ml-4">
          <h2 className="text-2xl font-bold">{farmer.name}</h2>
          <p className="text-lg">{farmer.bio}</p>
          <Link href={`/farmers/chat/1`}>
            <Button
              className="mt-2"
              variant="flat"
              color="success"
              onClick={() => {}}
            >
              Contact Farmer
            </Button>
          </Link>
        </div>
      </div>
      <Divider className="my-6" />
      <div className="mt-6">
        <RatingsAndReviews
          reviews={sampleProductReviews[0].reviews}
          isFarmerPortal={false}
          isUserLoggedIn={isUserLoggedIn}
          onReply={onReply}
          onAddReview={onAddReview}
        />
      </div>
    </div>
  );
};

export default Product;
