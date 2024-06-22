"use client";

import React, { useState, useCallback } from "react";
import { Input, Button, Avatar } from "@nextui-org/react";
import { toast } from "react-hot-toast";
import { formatDate } from "../../../helpers/formatDate";

interface Vote {
  userId: string;
  type: "upvote" | "downvote";
}

const currentUser = {
  id: "3",
  name: "Adam",
  avatar: "https://placehold.co/32",
  role: "Member",
};

interface Reply {
  id: string;
  parentId: string | null;
  content: string;
  author: string;
  userId: string; // Added userId
  avatar: string;
  timestamp: string;
  role: string;
  votedBy: Vote[];
}

interface Post {
  title: string;
  summary: string;
  author: string;
  userId: string; // Already present
  avatar: string;
  timestamp: string;
  role: string;
  replies: Reply[];
}

const initialPost: Post = {
  title: "What is exactly inside /etc/pve/nodes/qemu-server/* ?",
  summary:
    "Hi, I just wondering what's going on inside the path. as far as I know, there is a configuration file of our VM in proxmox. but, I have 2 VMs (CT template actually, both of them) in my locals. but when I check to the path, there is no conf file, its literally empty. is it because I use ct templates rather than VM??? i have no idea about this, the documentation doesnt explain at all.. thanks",
  author: "Skylar Korsgaard",
  userId: "1",
  avatar: "https://placehold.co/40",
  role: "Member",
  timestamp: new Date().toISOString(),
  replies: [],
};

const ForumPage = () => {
  const [post, setPost] = useState<Post>(initialPost);
  const [replyContent, setReplyContent] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [user, setUser] = useState(currentUser);
  const [editingReply, setEditingReply] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");

  const canEditOrDelete = (timestamp: string) => {
    const oneHour = 60 * 60 * 1000;
    return new Date().getTime() - new Date(timestamp).getTime() < oneHour;
  };

  const handleReply = useCallback(
    (parentId: string | null) => {
      if (!user) {
        toast.error("You need to log in to interact");
        return;
      }
      const mainParentId =
        post.replies.find((reply) => reply.id === parentId)?.parentId ||
        parentId;

      const newReply: Reply = {
        id: (post.replies.length + 1).toString(),
        parentId: mainParentId,
        content: replyContent,
        author: user.name,
        userId: user.id, // Added userId
        avatar: user.avatar,
        timestamp: new Date().toISOString(),
        role: user.role,
        votedBy: [],
      };
      setPost({
        ...post,
        replies: [...post.replies, newReply],
      });
      setReplyContent("");
      setReplyTo(null);
    },
    [post, replyContent, user]
  );

  const handleVote = useCallback(
    (id: string, delta: number) => {
      if (!user) {
        toast.error("You need to log in to interact");
        return;
      }
      setPost((prevPost) => ({
        ...prevPost,
        replies: prevPost.replies.map((reply) => {
          if (reply.id === id.toString()) {
            const existingVote = reply.votedBy.find(
              (vote) => vote.userId === user.id
            );
            if (existingVote) {
              if (
                (delta === 1 && existingVote.type === "upvote") ||
                (delta === -1 && existingVote.type === "downvote")
              ) {
                return reply;
              }

              return {
                ...reply,
                votedBy: reply.votedBy.filter(
                  (vote) => vote.userId !== user.id
                ),
              };
            }

            return {
              ...reply,
              votedBy: [
                ...reply.votedBy,
                {
                  userId: user.id,
                  type: delta === 1 ? "upvote" : "downvote",
                },
              ],
            };
          }
          return reply;
        }),
      }));
    },
    [user]
  );

  const handleEdit = useCallback(
    (id: string) => {
      const reply = post.replies.find((reply) => reply.id === id);
      if (
        reply &&
        reply.userId === user.id && // Changed from reply.author === user.name
        canEditOrDelete(reply.timestamp)
      ) {
        setEditingReply(id);
        setEditingContent(reply.content);
      } else {
        toast.error("You cannot edit this reply.");
      }
    },
    [post, user]
  );

  const handleDelete = useCallback(
    (id: string) => {
      const reply = post.replies.find((reply) => reply.id === id);
      const hasSubReplies = post.replies.some((r) => r.parentId === id);
      if (
        reply &&
        reply.userId === user.id && // Changed from reply.author === user.name
        !hasSubReplies &&
        canEditOrDelete(reply.timestamp)
      ) {
        setPost({
          ...post,
          replies: post.replies.filter((reply) => reply.id !== id),
        });
      } else {
        toast.error("You cannot delete this reply.");
      }
    },
    [post, user]
  );

  const handleEditSubmit = useCallback(
    (id: string) => {
      setPost({
        ...post,
        replies: post.replies.map((reply) =>
          reply.id === id ? { ...reply, content: editingContent } : reply
        ),
      });
      setEditingReply(null);
      setEditingContent("");
    },
    [post, editingContent]
  );

  const calculateVotes = (votedBy: Vote[]) => {
    const totalVotes = votedBy.reduce(
      (total, vote) => total + (vote.type === "upvote" ? 1 : -1),
      0
    );
    return totalVotes;
  };

  const renderReplies = useCallback(
    (parentId: string | null) => {
      return post.replies
        .filter((reply) => reply.parentId === parentId)
        .map((reply) => (
          <div key={reply.id} className="ml-4 sm:ml-8 md:ml-12 mt-4">
            <div className="flex items-start">
              <div className="flex flex-col items-center mr-4">
                <button
                  className="text-green-500"
                  onClick={() => handleVote(reply.id, 1)}
                >
                  ▲
                </button>
                <span className="text-zinc-900">
                  {calculateVotes(reply.votedBy)}
                </span>
                <button
                  className="text-zinc-500"
                  onClick={() => handleVote(reply.id, -1)}
                >
                  ▼
                </button>
              </div>
              <div className="flex-1">
                <div className="flex items-center">
                  <Avatar src={reply.avatar} />
                  <div className="ml-3">
                    <p className="text-zinc-900">{reply.author}</p>
                    <p className="text-sm text-zinc-500">{reply.role}</p>
                  </div>
                </div>
                {editingReply === reply.id ? (
                  <Input
                    isClearable
                    fullWidth
                    placeholder="Edit reply..."
                    value={editingContent}
                    isDisabled={!editingContent}
                    onClear={() => setEditingContent("")}
                    onChange={(e) => setEditingContent(e.target.value)}
                  />
                ) : (
                  <p className="mt-2 text-zinc-700">{reply.content}</p>
                )}
                <div className="flex justify-between mt-2">
                  <div className="flex gap-2">
                    {reply.userId === user.id &&
                      canEditOrDelete(reply.timestamp) && (
                        <>
                          <button
                            className="text-zinc-500"
                            onClick={() => setReplyTo(reply.id)}
                            disabled={!user}
                          >
                            Reply
                          </button>
                          <button
                            className="text-zinc-500"
                            onClick={() => handleEdit(reply.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="text-zinc-500"
                            onClick={() => handleDelete(reply.id)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                  </div>

                  <p className="text-sm text-zinc-500 mt-1">
                    {formatDate(reply.timestamp)}
                  </p>
                </div>
                {replyTo === reply.id && (
                  <div className="mt-2">
                    <Input
                      isClearable
                      fullWidth
                      placeholder="Write a reply..."
                      value={replyContent}
                      isDisabled={!replyContent}
                      onClear={() => setReplyContent("")}
                      onChange={(e) => setReplyContent(e.target.value)}
                    />
                    <Button
                      onClick={() => handleReply(reply.id)}
                      className="mt-2"
                      isDisabled={!replyContent}
                      color="primary"
                    >
                      Submit
                    </Button>
                  </div>
                )}
                {editingReply === reply.id && (
                  <div className="mt-2">
                    <Button
                      onClick={() => handleEditSubmit(reply.id)}
                      color="primary"
                      isDisabled={!editingContent}
                    >
                      Submit
                    </Button>
                  </div>
                )}

                {renderReplies(reply.id)}
              </div>
            </div>
          </div>
        ));
    },
    [
      post,
      replyTo,
      user,
      handleReply,
      handleVote,
      replyContent,
      editingReply,
      editingContent,
      handleEditSubmit,
      handleEdit,
      handleDelete,
    ]
  );

  return (
    <div className="p-4 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-zinc-900">{post.title}</h2>
        <p className="mt-4 text-zinc-700">{post.summary}</p>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <Avatar src={post.avatar} />
            <div className="ml-3">
              <p className="text-zinc-900">{post.author}</p>
              <p className="text-sm text-zinc-500">{post.role}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-zinc-500">
              {formatDate(post.timestamp)}
            </p>
          </div>
        </div>
        <div className="flex space-x-4 mt-2">
          <button className="text-zinc-500" onClick={() => setReplyTo(null)}>
            Reply
          </button>
        </div>
        {replyTo === null && (
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
            >
              Submit
            </Button>
          </div>
        )}
      </div>
      <div className="border-t border-zinc-200 pt-4">{renderReplies(null)}</div>
    </div>
  );
};

export default ForumPage;
