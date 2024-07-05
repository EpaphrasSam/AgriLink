import FarmerInteractionsTabs from "@/components/pages/farmer-portal/interactions/FarmerInteractionsTabs";
import { getFarmerInteractions } from "@/services/farmportalService";
import { auth } from "@/utils/auth/auth";

export default async function FarmerInteractionsPage() {
  const session = await auth();
  const { interactions, error } = await getFarmerInteractions(
    session?.user?.farmerDetails?.id!
  );
  return (
    <div className="p-6">
      <FarmerInteractionsTabs interactions={interactions} />
    </div>
  );
}
