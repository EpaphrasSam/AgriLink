import ForumPage from "@/components/pages/forum/ForumPage";
import { getForumPostById } from "@/services/interactionService";
import { Spinner } from "@nextui-org/react";
import { Suspense } from "react";

export default async function FarmerForumPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const { forum, error } = await getForumPostById(id);

  return (
    <div className="p-6">
      <Suspense
        fallback={
          <div className="h-screen flex justify-center items-center">
            <Spinner />
          </div>
        }
      >
        <ForumPage forum={forum!} />
      </Suspense>
    </div>
  );
}
