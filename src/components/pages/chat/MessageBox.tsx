import React from "react";
import { format } from "date-fns";
import clsx from "clsx";

interface MessageBoxProps {
  message: {
    id: string;
    body: string;
    sender: {
      id: string;
      name: string;
      avatar: string;
    };
    createdAt: string;
  };
  isOwn: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({ message, isOwn }) => {
  const container = clsx("flex  gap-3 p-4 select-none", isOwn && "justify-end");
  const body = clsx("flex flex-col gap-1", isOwn && "items-end");
  const messageClass = clsx(
    "text-sm w-fit overflow-hidden px-4 py-2.5",
    isOwn
      ? "bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-b-xl rounded-tl-xl"
      : "bg-gray-100 rounded-b-xl rounded-tr-xl text-gray-800"
  );

  return (
    <div className={container}>
      <div className={body}>
        <div className={messageClass}>{message.body}</div>
        <div
          className={clsx("flex items-center gap-1", !isOwn && "justify-end")}
        >
          <div className="text-xs text-gray-400">
            {format(new Date(message.createdAt), "p")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
