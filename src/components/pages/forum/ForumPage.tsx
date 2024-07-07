"use client";

import React, { useState, useCallback } from "react";
import { Input, Button, Avatar } from "@nextui-org/react";
import { toast } from "react-hot-toast";
import { formatDate } from "../../../helpers/formatDate";
import { useSession } from "next-auth/react";
import { addReply } from "@/services/interactionService";
import {
  ForumPostsWithReplies,
  ForumPostWithUser,
} from "@/types/InteractionTypes";
import { MdStar, MdStarBorder } from "react-icons/md";

interface ForumPageProps {
  forum: ForumPostsWithReplies;
}

interface ReplyTo {
  id: string | null;
  parentId: string | null;
}

const ForumPage = ({ forum }: ForumPageProps) => {
  const { data: session } = useSession();
  const user = session?.user;
  const [replyContent, setReplyContent] = useState("");
  const [replyTo, setReplyTo] = useState<ReplyTo>({ id: null, parentId: null });
  const [loading, setLoading] = useState(false);

  const handleReply = useCallback(
    async (parentId: string | null) => {
      if (!user) {
        toast.error("You need to log in to interact");
        return;
      }
      setLoading(true);
      const { newReply, error } = await addReply({
        content: replyContent,
        forumId: forum.id,
        parentId,
      });
      setLoading(false);
      if (error) {
        toast.error("Failed to add reply");
      } else {
        toast.success("Reply added successfully!");
        setReplyContent("");
        setReplyTo({ id: null, parentId: null });
      }
    },
    [replyContent, user, forum.id]
  );

  const renderReplies = useCallback(
    (replies: ForumPostWithUser[], parentId: string | null) => {
      return replies
        .filter((reply) => reply.parentPostId === parentId)
        .map((reply) => (
          <div
            key={reply.id}
            className={`${
              reply.parentPostId !== null ? "ml-4 sm:ml-8 md:ml-12" : ""
            } mt-4`}
          >
            <div className="flex items-start">
              <div className="flex-1">
                <div className="flex items-center">
                  <Avatar />
                  <div className="ml-3">
                    <div className="flex items-center">
                      <p className="text-zinc-900">
                        {reply.user.farmer
                          ? reply.user.farmer.name
                          : reply.user.username}
                      </p>
                      {reply.isFarmer && <MdStarBorder color="gray" />}
                    </div>
                    <p className="text-xs text-gray-400">
                      {reply.isFarmer ? "FARMER" : "CONSUMER"}
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-zinc-700">{reply.content}</p>
                <div className="flex justify-between mt-2">
                  <div className="flex gap-2">
                    <button
                      className="text-zinc-500"
                      onClick={() =>
                        setReplyTo({
                          id: reply.id,
                          parentId: reply.parentPostId || reply.id,
                        })
                      }
                      disabled={!user}
                    >
                      Reply
                    </button>
                  </div>
                  <p className="text-sm text-zinc-500 mt-1">
                    {formatDate(reply.createdAt.toISOString())}
                  </p>
                </div>
                {replyTo.id === reply.id && (
                  <div className="mt-2">
                    <Input
                      isClearable
                      fullWidth
                      placeholder="Write a reply..."
                      value={replyContent}
                      onClear={() => setReplyContent("")}
                      onChange={(e) => setReplyContent(e.target.value)}
                    />
                    <Button
                      onClick={() => handleReply(replyTo.parentId)}
                      className="mt-2"
                      isDisabled={!replyContent}
                      color="primary"
                      isLoading={loading}
                    >
                      Submit
                    </Button>
                  </div>
                )}
                {renderReplies(reply.replies, reply.id)}
              </div>
            </div>
          </div>
        ));
    },
    [replyTo, user, handleReply, replyContent, loading]
  );

  return (
    <div className="p-4 mx-auto bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-zinc-900">{forum.title}</h2>
        <p className="mt-4 text-zinc-700">{forum.summary}</p>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <Avatar />
            <div className="ml-3">
              <p className="text-zinc-900">{forum.createdBy.username}</p>
              <p className="text-xs text-gray-400">CONSUMER</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-zinc-500">
              {formatDate(forum.createdAt.toISOString())}
            </p>
          </div>
        </div>
        <div className="flex space-x-4 mt-2">
          <button
            className="text-zinc-500"
            onClick={() => setReplyTo({ id: null, parentId: null })}
          >
            Reply
          </button>
        </div>
        {replyTo.id === null && (
          <div className="mt-2">
            <Input
              isClearable
              fullWidth
              placeholder="Write a reply..."
              value={replyContent}
              onClear={() => setReplyContent("")}
              onChange={(e) => setReplyContent(e.target.value)}
            />
            <Button
              onClick={() => handleReply(null)}
              className="mt-2"
              isDisabled={!replyContent}
              color="primary"
              isLoading={loading}
            >
              Submit
            </Button>
          </div>
        )}
      </div>
      <div className="border-t border-zinc-200 pt-4">
        {renderReplies(forum.posts, null)}
      </div>
    </div>
  );
};

export default ForumPage;
