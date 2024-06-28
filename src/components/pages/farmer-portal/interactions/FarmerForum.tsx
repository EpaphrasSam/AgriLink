import React from "react";
import ForumCard from "../../forum/ForumCard";

interface FarmerForumProps {
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

const FarmerForum = ({ forums }: FarmerForumProps) => {
  return (
    <div>
      {forums.map((forum) => (
        <ForumCard key={forum.id} forum={forum} isFarmer={true} />
      ))}
    </div>
  );
};

export default FarmerForum;
