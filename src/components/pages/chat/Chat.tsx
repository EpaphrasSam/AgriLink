"use client";

import React, { useState, useEffect, useRef } from "react";
import Pusher from "pusher-js";
import MessageBox from "./MessageBox";
import MessageInput from "./MessageInput";
import MessageHeader from "./MessageHeader";
import { Card } from "@nextui-org/react";
import { ConversationWithDetails } from "@/types/InteractionTypes";
import axios from "axios";
import { Session } from "next-auth";
import toast from "react-hot-toast";

interface ChatProps {
  conversation: ConversationWithDetails;
  session: Session | null;
}

const Chat: React.FC<ChatProps> = ({ conversation, session }) => {
  const [messages, setMessages] = useState<any[]>(conversation.messages);
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channel = pusher.subscribe(`chat-${conversation.id}`);
    channel.bind("message", (data: any) => {
      setMessages((prevMessages) => {
        const lastMessage = prevMessages[prevMessages.length - 1];
        if (
          lastMessage &&
          (lastMessage.content === data.message.content ||
            lastMessage.image === data.message.image)
        ) {
          return [...prevMessages.slice(0, -1), data.message];
        }
        return [...prevMessages, data.message];
      });
    });

    return () => {
      pusher.unsubscribe(`chat-${conversation.id}`);
    };
  }, [conversation.id]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    const newMessage = {
      id: Date.now().toString(),
      content: message,
      image: null,
      senderUserId: session?.user.farmerDetails ? null : session?.user.id,
      senderFarmerId: session?.user.farmerDetails
        ? session?.user.farmerDetails.id
        : null,
      conversationId: conversation.id,
      createdAt: new Date().toISOString(),
      sending: true,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    try {
      const response = await axios.post("/api/chat", {
        content: message,
        senderId: session?.user.farmerDetails
          ? session?.user.farmerDetails.id
          : session?.user.id,
        senderType: session?.user.farmerDetails ? "farmer" : "user",
        conversationId: conversation.id,
      });

      if (response.status === 200) {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === newMessage.id ? { ...msg, sending: false } : msg
          )
        );
      } else {
        toast.error("Failed to send message");
        setMessages((prevMessages) =>
          prevMessages.filter((msg) => msg.id !== newMessage.id)
        );
      }
    } catch (error) {
      toast.error("Failed to send message");
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== newMessage.id)
      );
    }
  };

  const handleUpload = async (url: string) => {
    const newMessage = {
      id: Date.now().toString(),
      content: null,
      image: url,
      senderUserId: session?.user.farmerDetails ? null : session?.user.id,
      senderFarmerId: session?.user.farmerDetails
        ? session?.user.farmerDetails.id
        : null,
      conversationId: conversation.id,
      createdAt: new Date().toISOString(),
      sending: true,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    try {
      const response = await axios.post("/api/chat", {
        image: url,
        senderId: session?.user.farmerDetails
          ? session?.user.farmerDetails.id
          : session?.user.id,
        senderType: session?.user.farmerDetails ? "farmer" : "user",
        conversationId: conversation.id,
      });

      if (response.status === 200) {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === newMessage.id ? { ...msg, sending: false } : msg
          )
        );
      } else {
        toast.error("Failed to send image");
        setMessages((prevMessages) =>
          prevMessages.filter((msg) => msg.id !== newMessage.id)
        );
      }
    } catch (error) {
      toast.error("Failed to send image");
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== newMessage.id)
      );
    }
  };

  return (
    <div className="h-[90.5vh] bg-white max-w-full mx-auto overflow-hidden">
      <Card radius="none" className="flex flex-col h-full">
        <MessageHeader
          avatar={session?.user.farmerDetails ? "" : conversation.farmer.image}
          name={
            session?.user.farmerDetails
              ? conversation.user.username
              : conversation.farmer.name
          }
          isOnline={true}
        />
        <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-4">
          {messages.map((message) => (
            <MessageBox
              key={message.id}
              message={message}
              isOwn={
                session?.user.farmerDetails
                  ? message.senderFarmerId === session?.user.farmerDetails.id
                  : message.senderUserId === session?.user.id
              }
            />
          ))}
          <div ref={messageEndRef} />
        </div>
        <MessageInput
          onSendMessage={handleSendMessage}
          onUpload={handleUpload}
        />
      </Card>
    </div>
  );
};

export default Chat;
