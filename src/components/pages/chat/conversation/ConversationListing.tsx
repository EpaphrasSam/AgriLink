"use client";

import React from "react";
import ConversationList from "./ConversationList";
import { ConversationItemType } from "@/types/InteractionTypes";

interface ConversationListingProps {
  conversations: ConversationItemType[];
  isFarmer: boolean;
}

const ConversationListing: React.FC<ConversationListingProps> = ({
  conversations,
  isFarmer,
}) => {
  if (conversations.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center text-3xl text-gray-600">
        No conversations found
      </div>
    );
  }
  return (
    <div className="max-w-full mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <ConversationList conversations={conversations} isFarmer={isFarmer} />
    </div>
  );
};

export default ConversationListing;
