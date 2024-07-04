import FarmerProfile from "@/components/pages/farmer-portal/profile/FarmerProfile";
import { auth } from "@/utils/auth/auth";

export default async function FarmerProfilePage() {
  const session = await auth();
  return (
    <div className="p-6">
      <FarmerProfile
        farmerDetails={session?.user?.farmerDetails!}
        username={session?.user?.username!}
      />
    </div>
  );
}
