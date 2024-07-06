import {
  Farmer,
  Forum,
  ForumPost,
  User,
  Conversation,
  Message,
} from "@prisma/client";

export interface ForumWithPost extends Forum {
  posts: ForumPost[];
  createdBy: User;
}

export interface ForumPostsWithReplies extends Forum {
  posts: ForumPostWithUser[];
  createdBy: User;
}

export interface ForumPostWithUser extends ForumPost {
  user: UserWithFarmer;
  replies: ForumPostWithUser[];
}

export interface UserWithFarmer extends User {
  farmer: Farmer | null;
}

export interface ConversationWithDetails extends Conversation {
  user: User;
  farmer: Farmer;
  messages: (Message & {
    senderUser?: User;
    senderFarmer?: Farmer;
  })[];
}

export interface ConversationItemType {
  id: string;
  user: User;
  farmer: Farmer;
  messages: (Message & {
    senderUser?: User;
    senderFarmer?: Farmer;
  })[];
}
