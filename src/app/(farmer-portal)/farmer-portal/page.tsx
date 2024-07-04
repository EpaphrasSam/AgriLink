import StatisticsCards from "@/components/pages/farmer-portal/dashboard/StatisticsCards";
import OrdersTable from "@/components/pages/farmer-portal/orders/OrdersTable";
import { getFarmerOrders, getFarmerStats } from "@/services/farmportalService";
import { auth } from "@/utils/auth/auth";
import { Divider } from "@nextui-org/react";

const orders: any[] = [
  {
    id: "abcdefg",
    orderID: "ORD001",
    createdAt: "2023-01-01T10:00:00Z",
    amount: 150.0,
    userName: "John Doe",
    userEmail: "john.doe@example.com",
    contact: "1234567890",
    shippingStatus: "Pending",
    shippingAddress: "123 Accra Street, Accra, Ghana",
    products: [
      {
        id: "PROD001",
        name: "Product 1",
        price: 50.0,
        slug: "product-1",
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0XJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
        ],
        quantity: 1,
      },
      {
        id: "hijklmn",
        name: "Product 2",
        price: 100.0,
        slug: "product-2",
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0XJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
        ],
        quantity: 1,
      },
    ],
  },
  {
    id: "opqrstu",
    orderID: "ORD002",
    createdAt: "2023-01-02T11:00:00Z",
    amount: 200.0,
    userName: "Jane Smith",
    userEmail: "jane.smith@example.com",
    contact: "0987654321",
    shippingStatus: "Shipping",
    shippingAddress: "456 Kumasi Road, Kumasi, Ghana",
    products: [
      {
        id: "vwxyzab",
        name: "Product 3",
        price: 200.0,
        slug: "product-3",
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0XJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
        ],
        quantity: 1,
      },
    ],
  },
  {
    id: "cdefghi",
    orderID: "ORD003",
    createdAt: "2023-01-03T12:00:00Z",
    amount: 300.0,
    userName: "Alice Johnson",
    userEmail: "alice.johnson@example.com",
    contact: "1122334455",
    shippingStatus: "Completed",
    shippingAddress: "789 Takoradi Avenue, Takoradi, Ghana",
    products: [
      {
        id: "PROD004",
        name: "Product 4",
        price: 150.0,
        slug: "product-4",
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0XJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
        ],
        quantity: 2,
      },
    ],
  },
  {
    id: "defghij",
    orderID: "ORD004",
    createdAt: "2023-01-04T13:00:00Z",
    amount: 400.0,
    userName: "Bob Brown",
    userEmail: "bob.brown@example.com",
    contact: "2233445566",
    shippingStatus: "Canceled",
    shippingAddress: "101 Cape Coast Road, Cape Coast, Ghana",
    products: [
      {
        id: "PROD005",
        name: "Product 5",
        price: 400.0,
        slug: "product-5",
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0XJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
        ],
        quantity: 1,
      },
    ],
  },
  {
    id: "efghijk",
    orderID: "ORD005",
    createdAt: "2023-01-05T14:00:00Z",
    amount: 500.0,
    userName: "Charlie Davis",
    userEmail: "charlie.davis@example.com",
    contact: "3344556677",
    shippingStatus: "Pending",
    shippingAddress: "202 Tamale Street, Tamale, Ghana",
    products: [
      {
        id: "PROD006",
        name: "Product 6",
        price: 250.0,
        slug: "product-6",
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0XJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
        ],
        quantity: 2,
      },
    ],
  },
  {
    id: "fghijkl",
    orderID: "ORD006",
    createdAt: "2023-01-06T15:00:00Z",
    amount: 600.0,
    userName: "David Evans",
    userEmail: "david.evans@example.com",
    contact: "4455667788",
    shippingStatus: "Shipping",
    shippingAddress: "303 Sunyani Road, Sunyani, Ghana",
    products: [
      {
        id: "PROD007",
        name: "Product 7",
        price: 300.0,
        slug: "product-7",
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0XJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
        ],
        quantity: 2,
      },
    ],
  },
  {
    id: "ghijklm",
    orderID: "ORD007",
    createdAt: "2023-01-07T16:00:00Z",
    amount: 700.0,
    userName: "Eve Foster",
    userEmail: "eve.foster@example.com",
    contact: "5566778899",
    shippingStatus: "Completed",
    shippingAddress: "404 Ho Street, Ho, Ghana",
    products: [
      {
        id: "PROD008",
        name: "Product 8",
        price: 350.0,
        slug: "product-8",
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0XJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
        ],
        quantity: 2,
      },
    ],
  },
  {
    id: "ijklmnop",
    orderID: "ORD008",
    createdAt: "2023-01-08T17:00:00Z",
    amount: 800.0,
    userName: "Frank Green",
    userEmail: "frank.green@example.com",
    contact: "6677889900",
    shippingStatus: "Canceled",
    shippingAddress: "505 Koforidua Road, Koforidua, Ghana",
    products: [
      {
        id: "PROD009",
        name: "Product 9",
        price: 400.0,
        slug: "product-9",
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0XJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
        ],
        quantity: 2,
      },
    ],
  },
  {
    id: "jklmnopq",
    orderID: "ORD009",
    createdAt: "2023-01-09T18:00:00Z",
    amount: 900.0,
    userName: "Grace Harris",
    userEmail: "grace.harris@example.com",
    contact: "7788990011",
    shippingStatus: "Pending",
    shippingAddress: "606 Sekondi Street, Sekondi, Ghana",
    products: [
      {
        id: "PROD010",
        name: "Product 10",
        price: 450.0,
        slug: "product-10",
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0XJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
        ],
        quantity: 2,
      },
    ],
  },
  {
    id: "klmnopqr",
    orderID: "ORD010",
    createdAt: "2023-01-10T19:00:00Z",
    amount: 1000.0,
    userName: "Henry Irving",
    userEmail: "henry.irving@example.com",
    contact: "8899001122",
    shippingStatus: "Shipping",
    shippingAddress: "707 Wa Road, Wa, Ghana",
    products: [
      {
        id: "PROD011",
        name: "Product 11",
        price: 500.0,
        slug: "product-11",
        images: [
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0XJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
        ],
        quantity: 2,
      },
    ],
  },
];

export default async function FarmerDashboard() {
  const session = await auth();
  const { stats, error: statsError } = await getFarmerStats(session?.user?.id!);
  const { orders, error: ordersError } = await getFarmerOrders(
    session?.user?.id!,
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
