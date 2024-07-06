import React from "react";
import ConversationItem from "./ConversationItem";
import { ConversationItemType } from "@/types/InteractionTypes";

interface ConversationListProps {
  conversations: ConversationItemType[];
  isFarmer: boolean;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  isFarmer,
}) => {
  return (
    <div className="w-full">
      {conversations.map((conversation) => (
        <ConversationItem
          key={conversation.id}
          conversation={conversation}
          isFarmer={isFarmer}
        />
      ))}
    </div>
  );
};

export default ConversationList;
