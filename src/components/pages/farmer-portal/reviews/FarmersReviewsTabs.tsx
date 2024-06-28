"use client";

import React from "react";
import { Tab, Tabs } from "@nextui-org/react";
import FarmerReviews from "./FarmerReviews";
import ProductsReview from "./ProductsReview";

const sampleReviews = [
  {
    id: "1",
    user: "John Doe",
    userImage:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
    date: "March 22, 2023",
    comment:
      "I love the fresh produce and the variety of products available. The fruits are always so juicy. The prices are reasonable. The staff are friendly and helpful.",
    rating: 5,
    replies: [
      {
        id: "1",
        user: "Sarah",
        userImage:
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
        date: "March 22, 2023",
        comment:
          "Thank you for your positive feedback, John! We're glad to hear that you enjoy our fresh products and find our staff helpful. We hope to continue providing you with great service!",
      },
    ],
  },
  {
    id: "2",
    user: "Sarah Smith",
    userImage:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
    date: "March 24, 2023",
    comment:
      "I love the fresh produce and the variety of products available. The fruits are always so juicy. The prices are reasonable. The staff are friendly and helpful.",
    rating: 3,
    replies: [],
  },
  {
    id: "3",
    user: "Jeremy",
    userImage:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
    date: "March 24, 2023",
    comment:
      "I love the fresh produce and the variety of products available. The fruits are always so juicy. The prices are reasonable. The staff are friendly and helpful.",
    rating: 4,
    replies: [],
  },
  {
    id: "3",
    user: "Sam",
    userImage:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
    date: "March 24, 2023",

    rating: 2,
    replies: [],
  },
];

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

const FarmersReviewsTabs = () => {
  return (
    <Tabs size="lg" fullWidth color="primary" variant="solid">
      <Tab title="Farmer">
        <FarmerReviews reviews={sampleReviews} />
      </Tab>
      <Tab title="Products">
        <ProductsReview products={sampleProductReviews} />
      </Tab>
    </Tabs>
  );
};

export default FarmersReviewsTabs;
