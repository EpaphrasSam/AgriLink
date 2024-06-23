"use client";

import React, { useState } from "react";
import MessageBox from "./MessageBox";
import MessageInput from "./MessageInput";
import MessageHeader from "./MessageHeader";
import { Card } from "@nextui-org/react";

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: "1",
      body: "Hello!",
      sender: { id: "1", name: "Alice", avatar: "/logo.png" },
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      body: "Hi there!",
      sender: { id: "2", name: "Bob", avatar: "/logo.png" },
      createdAt: new Date().toISOString(),
    },
  ]);

  const handleSendMessage = (message: string) => {
    const newMessage = {
      id: (messages.length + 1).toString(),
      body: message,
      sender: { id: "1", name: "Alice", avatar: "/logo.png" },
      createdAt: new Date().toISOString(),
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="h-[90.5vh] max-w-full mx-auto">
      <Card radius="none" className="flex flex-col h-full">
        <MessageHeader />
        <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-4">
          {messages.map((message) => (
            <MessageBox
              key={message.id}
              message={message}
              isOwn={message.sender.id === "1"}
            />
          ))}
        </div>
        <MessageInput onSendMessage={handleSendMessage} />
      </Card>
    </div>
  );
};

export default Chat;
