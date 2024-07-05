"use client";

import { Avatar, Card } from "@nextui-org/react";
import Link from "next/link";
import { formatDate } from "@/helpers/formatDate";
import { ForumWithPost } from "@/types/InteractionTypes";

interface ForumCardProps {
  forum: ForumWithPost;
  isFarmer?: boolean;
}

const ForumCard = ({
  forum: { id, title, summary, createdAt, createdBy, posts },
  isFarmer = false,
}: ForumCardProps) => {
  return (
    <Link
      href={
        isFarmer ? `/farmer-portal/interactions/forum/${id}` : `/forum/${id}`
      }
      key={id}
    >
      <Card isPressable fullWidth className="mb-6 p-4">
        <div className="flex flex-row gap-2 mb-2">
          <Avatar alt={createdBy.username} size="lg" />
          <div className="flex flex-col items-start">
            <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
            <p className="text-base font-medium text-gray-500">
              {createdBy.username}
            </p>
          </div>
        </div>
        <p className="text-gray-700 mb-2">{summary}</p>
        <div className="w-full flex flex-row items-center justify-between">
          <p className="text-sm text-gray-500">{posts.length} replies</p>
          <p className="text-sm text-gray-500">
            {formatDate(createdAt.toString())}
          </p>
        </div>
      </Card>
    </Link>
  );
};

export default ForumCard;
