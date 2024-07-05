"use client";

import { Tab, Tabs } from "@nextui-org/react";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ForumWithPost } from "@/types/InteractionTypes";
import ConversationListing from "../../chat/conversation/ConversationListing";
import ForumCard from "../../forum/ForumCard";

interface FarmerInteractionsTabsProps {
  interactions: {
    forums: ForumWithPost[];
    conversations: any[];
  };
}

const FarmerInteractionsTabs = ({
  interactions,
}: FarmerInteractionsTabsProps) => {
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
        {interactions.forums.map((forum) => (
          <ForumCard key={forum.id} forum={forum} isFarmer={true} />
        ))}
      </Tab>
      <Tab key="chats" title="Chats">
        <ConversationListing />;
      </Tab>
    </Tabs>
  );
};

export default FarmerInteractionsTabs;
