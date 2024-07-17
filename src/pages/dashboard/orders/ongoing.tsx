import OrderCard from "@/components/dashboard/Order-Page/OrderCard";
import { columns } from "@/components/dashboard/Order-Page/ongoing/column";
import { DataTable } from "@/components/dashboard/Order-Page/ongoing/data-table";
import orders from "@/data/orders";
import React from "react";

const ongoing = () => {
  return (
    <div className="flex  w-full max-w-screen flex-col">
      <OrderCard />
      <DataTable data={orders} columns={columns} />
    </div>
  );
};

export default ongoing;
