import { Button } from "@nextui-org/react";
import React from "react";
import Link from "next/link";
import { IoIosCreate } from "react-icons/io";
import ForumCard from "./ForumCard";

interface ForumListingProps {
  forums: {
    id: number;
    title: string;
    author: {
      name: string;
      avatar: string;
    };
    summary: string;
    replies: number;
    participants: string[];
  }[];
}

const ForumListing = ({ forums }: ForumListingProps) => {
  return (
    <div>
      <div className="flex items-center justify-end mb-4">
        <Button
          variant="ghost"
          radius="sm"
          color="primary"
          startContent={<IoIosCreate size={20} />}
        >
          Create New Topic
        </Button>
      </div>
      {forums.map((forum) => (
        <ForumCard key={forum.id} forum={forum} />
      ))}
    </div>
  );
};

export default ForumListing;
