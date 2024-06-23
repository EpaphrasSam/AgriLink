import React from "react";

interface MessageProps {
  message: {
    id: string;
    body: string;
    sender: {
      id: string;
      name: string;
      avatar: string;
    };
  };
}

const Message: React.FC<MessageProps> = ({ message }) => {
  return (
    <div className="flex items-start space-x-4">
      <img
        src={message.sender.avatar}
        alt={message.sender.name}
        className="w-10 h-10 rounded-full"
      />
      <div>
        <div className="text-sm font-medium">{message.sender.name}</div>
        <div className="text-sm">{message.body}</div>
      </div>
    </div>
  );
};

export default Message;
