import OrdersTable from "@/components/pages/farmer-portal/orders/OrdersTable";
import { getFarmerOrders } from "@/services/farmportalService";
import { Divider } from "@nextui-org/react";

export default async function OrdersPage() {
  const { orders, error } = await getFarmerOrders();
  return (
    <div className="sm:p-6 p-3">
      <div className="flex items-center gap-2 text-2xl font-bold">
        Orders
        <span className="text-xs font-semibold mt-2 text-zinc-600">
          {orders.length} Orders found
        </span>
      </div>
      <Divider className="my-4" />
      <OrdersTable orders={orders} isRecentOnly={false} />
    </div>
  );
}
