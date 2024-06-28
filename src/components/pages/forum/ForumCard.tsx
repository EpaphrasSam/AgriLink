"use client";

import { Button, Avatar, AvatarGroup, Card } from "@nextui-org/react";
import { IoIosCreate } from "react-icons/io";
import Link from "next/link";

interface ForumCardProps {
  forum: {
    id: number;
    title: string;
    author: {
      name: string;
      avatar: string;
    };
    summary: string;
    replies: number;
    participants: string[];
  };
  isFarmer?: boolean;
}

const ForumCard: React.FC<ForumCardProps> = ({
  forum: { id, title, author, summary, replies, participants },
  isFarmer = false,
}) => {
  return (
    <Link
      href={
        isFarmer ? `/farmer-portal/interactions/forum/${id}` : `/forum/${id}`
      }
      key={id}
    >
      <Card isPressable fullWidth className="mb-6 p-4">
        <div className="flex items-center mb-2">
          <Avatar src={author.avatar} />
          <div className="ml-3">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-sm text-gray-500">Started by {author.name}</p>
          </div>
        </div>
        <p className="text-gray-700 mb-2">{summary}</p>
        <div className="flex items-center w-full justify-between">
          <p className="text-sm text-gray-500">{replies} replies</p>
          <AvatarGroup>
            {participants.map((avatar, index) => (
              <Avatar key={index} src={avatar} size="sm" />
            ))}
          </AvatarGroup>
        </div>
      </Card>
    </Link>
  );
};

export default ForumCard;
