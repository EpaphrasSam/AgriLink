import { Button, Input } from "@nextui-org/react";
import { CldUploadButton, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import React, { useState } from "react";
import { LuSend } from "react-icons/lu";
import { MdAddPhotoAlternate } from "react-icons/md";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  onUpload: (url: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  onUpload,
}) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="flex items-center space-x-4 p-4 border-t">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
        onSuccess={(result: any) => onUpload(result.info.secure_url)}
      >
        <MdAddPhotoAlternate
          size={30}
          className="cursor-pointer hover:opacity-75"
        />
      </CldUploadButton>
      <Input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        variant="bordered"
        radius="full"
        placeholder="Type a message"
      />
      <Button
        variant="solid"
        color="primary"
        onClick={handleSendMessage}
        isIconOnly
        radius="full"
      >
        <LuSend size={24} />
      </Button>
    </div>
  );
};

export default MessageInput;
