import StatisticsCards from "@/components/pages/farmer-portal/dashboard/StatisticsCards";
import OrdersTable from "@/components/pages/farmer-portal/orders/OrdersTable";
import { getFarmerOrders, getFarmerStats } from "@/services/farmportalService";
import { auth } from "@/utils/auth/auth";
import { Divider } from "@nextui-org/react";

export default async function FarmerDashboard() {
  const session = await auth();
  const { stats, error: statsError } = await getFarmerStats(
    session?.user?.farmerDetails?.id!
  );
  const { orders, error: ordersError } = await getFarmerOrders(
    session?.user?.farmerDetails?.id!,
    true
  );
  return (
    <div className="sm:p-6 p-3">
      <p className="text-2xl font-bold">Dashboard</p>
      <Divider className="my-4" />
      <StatisticsCards stats={stats!} />
      <div className="mt-8">
        <OrdersTable orders={orders} isRecentOnly={true} />
      </div>
    </div>
  );
}
