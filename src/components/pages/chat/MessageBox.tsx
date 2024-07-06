import React from "react";
import { format } from "date-fns";
import clsx from "clsx";
import { Message } from "@prisma/client";
import { Image } from "@nextui-org/react";
import { FaSpinner } from "react-icons/fa";

interface MessageBoxProps {
  message: Message & { sending?: boolean };
  isOwn: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({
  message,
  isOwn,
}: MessageBoxProps) => {
  const container = clsx("flex gap-3 p-4 select-none", isOwn && "justify-end");
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
        {message.content && (
          <div className={messageClass}>
            <p>{message.content}</p>
          </div>
        )}
        {message.image && (
          <Image src={message.image} alt="Uploaded" className="max-w-xs" />
        )}
        <div
          className={clsx("flex items-center gap-1", !isOwn && "justify-end")}
        >
          <div className="text-xs text-gray-400">
            {format(new Date(message.createdAt), "p")}
          </div>
          {message.sending && (
            <FaSpinner className="animate-spin text-gray-400" />
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
