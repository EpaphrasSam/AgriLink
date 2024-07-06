"use server";

import {
  ConversationWithDetails,
  ForumPostsWithReplies,
} from "@/types/InteractionTypes";
import { auth } from "@/utils/auth/auth";
import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";

export const fetchAllForumPost = async () => {
  try {
    const forums = await prisma.forum.findMany({
      include: {
        posts: {
          include: {
            user: true,
            replies: {
              include: {
                user: true,
                replies: {
                  include: {
                    user: true,
                  },
                },
              },
            },
          },
        },
        createdBy: true,
      },
    });
    return { forums, error: null };
  } catch (error: any) {
    return { forums: [], error: error.message };
  }
};

export const getForumPostById = async (id: string) => {
  try {
    const forum = await prisma.forum.findUnique({
      where: { id },
      include: {
        posts: {
          include: {
            user: {
              include: {
                farmer: true,
              },
            },
            replies: {
              include: {
                user: {
                  include: {
                    farmer: true,
                  },
                },
                replies: {
                  include: {
                    user: {
                      include: {
                        farmer: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        createdBy: true,
      },
    });
    return { forum, error: null };
  } catch (error: any) {
    return { forum: null, error: error.message };
  }
};

export const addForumPost = async (data: {
  title: string;
  summary: string;
}) => {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("Unauthorized");
    }
    const userId = session.user.id;
    const newForum = await prisma.forum.create({
      data: {
        title: data.title,
        summary: data.summary,
        createdById: userId,
      },
    });
    revalidatePath("/forum");
    revalidatePath("/farmer-portal/interactions");
    return { newForum, error: null };
  } catch (error: any) {
    return { newForum: null, error: error.message };
  }
};

export const addReply = async (data: {
  content: string;
  forumId: string;
  parentId: string | null;
}) => {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("Unauthorized");
    }
    const userId = session.user.id;
    const farmer = session?.user?.farmerDetails;
    const newReply = await prisma.forumPost.create({
      data: {
        content: data.content,
        forumId: data.forumId,
        parentPostId: data.parentId,
        userId,
        isFarmer: !!farmer,
      },
    });
    revalidatePath(`/forum/${data.forumId}`);
    return { newReply, error: null };
  } catch (error: any) {
    return { newReply: null, error: error.message };
  }
};

export const getOrCreateConversation = async (
  userId: string,
  farmerId: string
) => {
  try {
    let conversation = await prisma.conversation.findFirst({
      where: {
        userId,
        farmerId,
      },
      include: {
        user: true,
        farmer: true,
        messages: {
          include: {
            senderUser: true,
            senderFarmer: true,
          },
        },
      },
    });

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          userId,
          farmerId,
        },

        include: {
          user: true,
          farmer: true,
          messages: {
            include: {
              senderUser: true,
              senderFarmer: true,
            },
          },
        },
      });
    }

    const transformedMessages = conversation.messages.map((message) => ({
      ...message,
      senderUser: message.senderUser || undefined,
      senderFarmer: message.senderFarmer || undefined,
    }));

    const transformedConversation: ConversationWithDetails = {
      ...conversation,
      messages: transformedMessages,
    };

    return { conversation: transformedConversation, error: null };
  } catch (error: any) {
    return { conversation: null, error: error.message };
  }
};

export const getAllConversations = async (
  userId: string,
  isFarmer: boolean
) => {
  try {
    const conversations = await prisma.conversation.findMany({
      where: isFarmer ? { farmerId: userId } : { userId },
      include: {
        user: true,
        farmer: true,
        messages: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    });

    return { conversations, error: null };
  } catch (error: any) {
    return { conversations: [], error: error.message };
  }
};
