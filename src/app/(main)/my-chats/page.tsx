import ConversationListing from "@/components/pages/chat/conversation/ConversationListing";
import { getAllConversations } from "@/services/interactionService";
import { auth } from "@/utils/auth/auth";

export const dynamic = "force-dynamic";

export default async function MyChats() {
  const session = await auth();
  const { conversations, error } = await getAllConversations(
    session?.user.id!,
    false
  );

  return (
    <div className="p-6">
      <ConversationListing conversations={conversations} isFarmer={false} />
    </div>
  );
}
