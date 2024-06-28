import React from "react";
import ConversationItem from "./ConversationItem";

interface ConversationListProps {
  conversations: {
    id: string;
    user: {
      name: string;
      avatar: string;
    };
    lastMessage: {
      body?: string;
      imageUrl?: string;
      timestamp: string;
    };
  }[];
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
}) => {
  return (
    <div className="w-full">
      {conversations.map((conversation) => (
        <ConversationItem key={conversation.id} conversation={conversation} />
      ))}
    </div>
  );
};

export default ConversationList;
