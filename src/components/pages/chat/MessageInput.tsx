import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { LuSend } from "react-icons/lu";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="flex items-center space-x-4 p-4 border-t">
      <Input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        variant="bordered"
        radius="full"
        placeholder="Type a message"
      />
      <Button
        variant="light"
        color="primary"
        onClick={handleSendMessage}
        isIconOnly
      >
        <LuSend size={24} />
      </Button>
    </div>
  );
};

export default MessageInput;
