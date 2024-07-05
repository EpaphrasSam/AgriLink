import FarmerPage from "@/components/pages/farmers/FarmerPage";
import { getFarmerBySlug } from "@/services/farmersService";

export default async function FarmersPage({
  params,
}: {
  params: { slug: string };
}) {
  const { farmer, error } = await getFarmerBySlug(params.slug);

  return (
    <div className="py-6 px-2">
      <FarmerPage farmer={farmer!} />
    </div>
  );
}
