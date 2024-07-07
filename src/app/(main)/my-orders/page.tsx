import MyOrders from "@/components/pages/orders/MyOrders";
import { auth } from "@/utils/auth/auth";
import { getMyOrders } from "@/services/ordersService";
import { Divider } from "@nextui-org/react";

export default async function MyOrdersPage() {
  const session = await auth();
  const { orders, error } = await getMyOrders(session?.user?.id!);

  return (
    <div className="p-6">
      <h1 className="text-2xl text-gray-700 font-bold mb-4">My Orders</h1>
      <Divider className="my-4" />
      {orders.length > 0 ? (
        <MyOrders orders={orders} />
      ) : (
        <div className="h-screen flex items-center justify-center">
          <p className="text-gray-500 text-3xl font-bold">No orders found.</p>
        </div>
      )}
    </div>
  );
}
