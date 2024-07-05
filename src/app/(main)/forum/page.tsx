import ForumListing from "@/components/pages/forum/ForumListing";
import { fetchAllForumPost } from "@/services/interactionService";

export default async function Forum() {
  const { forums, error } = await fetchAllForumPost();
  return (
    <div className="p-6 flex justify-center items-center">
      <div className="max-w-3xl w-full">
        <ForumListing forums={forums} />
      </div>
    </div>
  );
}
