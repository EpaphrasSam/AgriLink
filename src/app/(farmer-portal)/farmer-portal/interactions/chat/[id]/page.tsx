import Chat from "@/components/pages/chat/Chat";
import { getOrCreateConversation } from "@/services/interactionService";
import { auth } from "@/utils/auth/auth";

export const dynamic = "force-dynamic";

export default async function FarmerChat({
  params: { id },
}: {
  params: { id: string };
}) {
  const session = await auth();
  const { conversation, error } = await getOrCreateConversation(
    id,
    session?.user.farmerDetails?.id!
  );

  return <Chat conversation={conversation!} session={session} />;
}
