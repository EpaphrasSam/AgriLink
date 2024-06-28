"use client";

import React, { useState, useEffect } from "react";
import ConversationList from "./ConversationList";

const mockConversations = [
  {
    id: "1",
    user: {
      name: "Alice",
      avatar: "/logo.png",
    },
    lastMessage: {
      body: "Hello! How are you?",
      timestamp: new Date().toISOString(),
    },
  },
  {
    id: "2",
    user: {
      name: "Bob",
      avatar: "/logo.png",
    },
    lastMessage: {
      imageUrl: "/path/to/image.jpg",
      timestamp: new Date().toISOString(),
    },
  },
];

const ConversationListing: React.FC = () => {
  const [conversations, setConversations] = useState(mockConversations);

  useEffect(() => {}, []);

  return (
    <div className="max-w-full mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <ConversationList conversations={conversations} />
    </div>
  );
};

export default ConversationListing;
