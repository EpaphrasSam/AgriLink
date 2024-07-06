import { Avatar } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";
import {
  IoChevronBack,
  IoSearchOutline,
  IoVideocamOutline,
} from "react-icons/io5";

interface MessageHeaderProps {
  name: string;
  isOnline: boolean;
  avatar: string;
}

const MessageHeader: React.FC<MessageHeaderProps> = ({
  name,
  isOnline,
  avatar,
}) => {
  const router = useRouter();
  return (
    <div className="bg-white w-full flex border-b sm:px-4 px-4 py-3 lg:px-6 justify-between items-center shadow-sm h-16">
      <div className="flex gap-3 items-center">
        <div className="text-blue-500 hover:text-blue-700 transition cursor-pointer w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center">
          <IoChevronBack className="w-6 h-6" onClick={() => router.back()} />
        </div>
        <div className="flex items-center justify-start cursor-pointer gap-3">
          <Avatar src={avatar} alt={name} className="w-10 h-10 rounded-full" />
          <div className="flex flex-col">
            <div className="capitalize font-medium">{name}</div>
            <div className="text-sm text-gray-500">
              {isOnline ? "Online" : "Offline"}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex items-center justify-end gap-2 md:gap-4">
        <div className="text-blue-500 hover:text-blue-700 transition cursor-pointer w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center">
          <IoVideocamOutline className="w-5 h-5" />
        </div>
        <div className="text-blue-500 hover:text-blue-700 transition cursor-pointer w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center">
          <IoSearchOutline className="w-5 h-5" />
        </div>
      </div> */}
    </div>
  );
};

export default MessageHeader;
