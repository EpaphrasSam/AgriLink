export interface FarmerOrders {
  id: string;
  orderID: string;
  createdAt: Date;
  amount: number;
  userName: string;
  userEmail: string;
  contact: string;
  shippingStatus: string;
  shippingAddress: string;
  quantity: number;
  products: {
    id: string;
    name: string;
    price: number;
    slug: string;
    images: string[];
  }[];
}

export interface UserOrder {
  id: string;
  orderID: string;
  createdAt: Date;
  amount: number;
  name: string;
  contact: string;
  shippingStatus: string;
  shippingAddress: string;
  quantity: number;
  products: {
    id: string;
    name: string;
    price: number;
    slug: string;
    images: string[];
  }[];
  farmer: {
    id: string;
    name: string;
  };
}
