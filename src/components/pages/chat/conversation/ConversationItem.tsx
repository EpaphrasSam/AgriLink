import React from "react";
import { Avatar } from "@nextui-org/react";
import { format } from "date-fns";
import Link from "next/link";
import { FaImage } from "react-icons/fa";
import { ConversationItemType } from "@/types/InteractionTypes";

interface ConversationItemProps {
  conversation: ConversationItemType;
  isFarmer: boolean;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  isFarmer,
}) => {
  const lastMessage = conversation.messages[0];
  const displayName = isFarmer
    ? conversation.user.username
    : conversation.farmer.name;
  const avatar = isFarmer ? "" : conversation.farmer.image;

  const isOwnMessage = isFarmer
    ? lastMessage.senderFarmerId === conversation.farmer.id
    : lastMessage.senderUserId === conversation.user.id;

  return (
    <Link
      href={
        isFarmer
          ? `/farmer-portal/interactions/chat/${conversation.user.id}`
          : `/farmers/chat/${conversation.farmer.id}`
      }
      className="flex items-center p-4 border-b cursor-pointer hover:bg-gray-100"
    >
      <Avatar
        src={avatar || ""}
        alt={displayName}
        className="w-12 h-12 rounded-full"
      />
      <div className="ml-4 flex-1">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-semibold">{displayName}</h4>
          <span className="text-sm text-gray-500">
            {format(new Date(lastMessage.createdAt), "p")}
          </span>
        </div>
        <p className="text-sm text-gray-500 truncate">
          {isOwnMessage && "YOU: "}
          {lastMessage.content ? (
            lastMessage.content
          ) : (
            <span className="flex items-center">
              <FaImage className="mr-1" /> Photo
            </span>
          )}
        </p>
      </div>
    </Link>
  );
};

export default ConversationItem;
