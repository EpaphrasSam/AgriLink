import FarmersReviewsTabs from "@/components/pages/farmer-portal/reviews/FarmersReviewsTabs";
import { getFarmerAndProductReviews } from "@/services/farmportalService";
import { auth } from "@/utils/auth/auth";

export default async function ReviewsPage() {
  const session = await auth();
  const { farmer, error } = await getFarmerAndProductReviews(
    session?.user.farmerDetails?.id!
  );

  return (
    <div className="p-6">
      <FarmersReviewsTabs farmer={farmer!!} />
    </div>
  );
}
