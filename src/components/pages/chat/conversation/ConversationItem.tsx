import React from "react";
import { Avatar } from "@nextui-org/react";
import { format } from "date-fns";
import Link from "next/link";

interface ConversationItemProps {
  conversation: {
    id: string;
    user: {
      name: string;
      avatar: string;
    };
    lastMessage: {
      body: string;
      timestamp: string;
    };
  };
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
}) => {
  const isFarmer = true;
  return (
    <Link
      href={
        isFarmer
          ? `/farmer-portal/interactions/chat/${conversation.id}`
          : `/farmers/chat/${conversation.id}`
      }
      className="flex items-center p-4 border-b cursor-pointer hover:bg-gray-100"
    >
      <Avatar
        src={conversation.user.avatar}
        alt={conversation.user.name}
        className="w-12 h-12 rounded-full"
      />
      <div className="ml-4 flex-1">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-semibold">{conversation.user.name}</h4>
          <span className="text-sm text-gray-500">
            {format(new Date(conversation.lastMessage.timestamp), "p")}
          </span>
        </div>
        <p className="text-sm text-gray-500 truncate">
          {conversation.lastMessage.body}
        </p>
      </div>
    </Link>
  );
};

export default ConversationItem;
