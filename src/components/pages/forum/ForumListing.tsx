"use client";

import {
  Button,
  Divider,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Input,
  Textarea,
} from "@nextui-org/react";
import React, { useState } from "react";
import { IoIosCreate } from "react-icons/io";
import ForumCard from "./ForumCard";
import { ForumWithPost } from "@/types/InteractionTypes";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { addForumPost } from "@/services/interactionService";

interface ForumListingProps {
  forums: ForumWithPost[];
}

const ForumListing = ({ forums }: ForumListingProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: session } = useSession();
  const farmer = session?.user?.farmerDetails;
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");

  const handleAddPost = async () => {
    setLoading(true);
    const { newForum, error } = await addForumPost({ title, summary });
    setLoading(false);
    if (error) {
      toast.error("Error creating forum post");
    } else {
      toast.success("Forum post created successfully!");
    }
    onOpenChange();
  };
  return (
    <>
      {!farmer && (
        <div className="flex items-center justify-end mb-4">
          <Button
            variant="ghost"
            radius="sm"
            color="primary"
            startContent={<IoIosCreate size={20} />}
            onClick={onOpen}
          >
            Create New Forum
          </Button>
        </div>
      )}
      <Divider className="my-4" />
      {forums.length > 0 ? (
        forums.map((forum) => (
          <ForumCard key={forum.id} forum={forum} isFarmer={!!farmer} />
        ))
      ) : (
        <div className="flex items-center justify-center h-screen">
          <div className="text-3xl font-bold text-gray-500">
            No forums found
          </div>
        </div>
      )}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onOpenChange}>
        <ModalContent>
          <ModalHeader>Create New Topic</ModalHeader>
          <ModalBody>
            <Input
              label="Title"
              labelPlacement="outside"
              fullWidth
              radius="sm"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
              label="Summary"
              labelPlacement="outside"
              fullWidth
              radius="sm"
              placeholder="Enter Summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
            <ModalFooter>
              <Button
                variant="light"
                color="danger"
                radius="sm"
                onClick={onOpenChange}
              >
                Cancel
              </Button>
              <Button
                variant="solid"
                color="primary"
                radius="sm"
                onClick={handleAddPost}
                isLoading={loading}
              >
                Create
              </Button>
            </ModalFooter>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ForumListing;
