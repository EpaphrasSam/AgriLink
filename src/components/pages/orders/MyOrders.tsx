"use client";

import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Chip,
  Pagination,
} from "@nextui-org/react";
import { UserOrder } from "@/types/OrdersTypes";
import OrderAccordion from "@/components/pages/farmer-portal/orders/OrderAccordion";

interface MyOrdersProps {
  orders: UserOrder[];
}

const getShippingStatusChip = (shippingStatus: string) => {
  let color:
    | "default"
    | "primary"
    | "warning"
    | "success"
    | "danger"
    | undefined = "default";
  let text = "";

  switch (shippingStatus) {
    case "Pending":
      color = "warning";
      text = "Pending";
      break;
    case "Shipping":
      color = "primary";
      text = "Shipping";
      break;
    case "Completed":
      color = "success";
      text = "Completed";
      break;
    case "Canceled":
      color = "danger";
      text = "Canceled";
      break;

    default:
      text = "Unknown";
  }

  return (
    <Chip color={color} size="md" variant="flat">
      {text}
    </Chip>
  );
};

const MyOrders = ({ orders }: MyOrdersProps) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const paginatedOrders = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return orders.slice(start, end);
  }, [page, orders]);

  const pages = Math.ceil(orders.length / rowsPerPage);

  const isEmpty = orders.length === 0;

  return (
    <>
      <Table
        aria-label="User Orders"
        bottomContent={
          pages > 1 && (
            <div className="flex w-full justify-center mt-4">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          )
        }
        classNames={{
          table: isEmpty ? "min-h-[400px]" : "",
        }}
      >
        <TableHeader>
          <TableColumn>Order ID</TableColumn>
          <TableColumn>Order Date</TableColumn>
          <TableColumn>Farmer</TableColumn>
          <TableColumn>Product(s)</TableColumn>
          <TableColumn>Address</TableColumn>
          <TableColumn>Total</TableColumn>
          <TableColumn>Status</TableColumn>
        </TableHeader>
        {isEmpty ? (
          <TableBody emptyContent={"No orders available."}>{[]}</TableBody>
        ) : (
          <TableBody items={paginatedOrders} aria-colspan={3}>
            {(order: UserOrder) => (
              <TableRow key={order.id}>
                <TableCell>#{order.orderID}</TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col items-start">
                    <p className="capitalize text-sm">{order.farmer.name}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <OrderAccordion
                    data={order.products.map((product) => ({
                      ...product,
                      quantity: order.quantity,
                    }))}
                    type="Products"
                  />
                </TableCell>
                <TableCell>{order.shippingAddress}</TableCell>
                <TableCell>GHS {order.amount}</TableCell>
                <TableCell>
                  {getShippingStatusChip(order.shippingStatus)}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        )}
      </Table>
    </>
  );
};

export default MyOrders;
