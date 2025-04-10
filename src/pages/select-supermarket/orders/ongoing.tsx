import OrderCard from "@/components/select-supermarket/Order-Page/OrderCard";
import { columns } from "@/components/select-supermarket/Order-Page/ongoing/column";
import { DataTable } from "@/components/select-supermarket/Order-Page/ongoing/data-table";
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
