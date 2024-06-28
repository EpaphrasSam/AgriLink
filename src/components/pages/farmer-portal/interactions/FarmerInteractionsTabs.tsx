"use client";

import { Tab, Tabs } from "@nextui-org/react";
import React from "react";
import FarmerForum from "./FarmerForum";
import FarmerChats from "./FarmerChats";
import { useRouter, useSearchParams } from "next/navigation";

const forums = [
  {
    id: 1,
    title: "General Discussion",
    author: {
      name: "John Doe",
      avatar:
        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080jpg",
    },
    summary: "This is a general discussion forum.",
    replies: 10,
    participants: [
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080jpg",
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080jpg",
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080jpg",
    ],
  },
  {
    id: 2,
    title: "Tech Talk",
    author: {
      name: "Jane Smith",
      avatar:
        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080jpg",
    },
    summary: "Discuss the latest in tech.",
    replies: 25,
    participants: [
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080jpg",
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080jpg",
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080jpg",
    ],
  },
];

const FarmerInteractionsTabs = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tab = searchParams.get("tab");

  const handleTabChange = (key: any) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("tab", key);
    router.push(`?${newParams.toString()}`);
  };
  return (
    <Tabs
      selectedKey={tab}
      size="lg"
      fullWidth
      color="primary"
      variant="solid"
      onSelectionChange={handleTabChange}
    >
      <Tab key="forum" title="Forum">
        <FarmerForum forums={forums} />
      </Tab>
      <Tab key="chats" title="Chats">
        <FarmerChats />
      </Tab>
    </Tabs>
  );
};

export default FarmerInteractionsTabs;
