import Pusher from "pusher";
import prisma from "@/utils/prisma"; // Adjust the import path as necessary
import { NextRequest, NextResponse } from "next/server";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { content, image, senderId, senderType, conversationId } = body;

  try {
    const message = await prisma.message.create({
      data: {
        content,
        image,
        conversationId,
        ...(senderType === "user"
          ? { senderUserId: senderId }
          : { senderFarmerId: senderId }),
      },
    });

    await pusher.trigger(`chat-${conversationId}`, "message", {
      message,
    });

    return NextResponse.json({ status: "Message sent", message });
  } catch (error) {
    return NextResponse.json({ error: "Failed to send message" });
  }
}
