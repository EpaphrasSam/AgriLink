import FarmersListing from "@/components/pages/farmers/FarmersListing";
import { getAllFarmers } from "@/services/farmersService";

export const dynamic = "force-dynamic";

export default async function Farmers() {
  const { farmers, error } = await getAllFarmers();

  return (
    <div className="p-6">
      <FarmersListing farmers={farmers} />
    </div>
  );
}
