import OrderSummary from "@/components/dashboard-layout/Order-Page/OrderSummary";
import { columns } from "@/components/dashboard-layout/data-table/column";
import { DataTable } from "@/components/dashboard-layout/data-table/data-table";
import orders from "@/data/orders";
import React from "react";

const ongoing = () => {
  return (
    <div className="flex  min-h-screen w-full max-w-screen flex-col">
      <OrderSummary />
      <DataTable data={orders} columns={columns} />
    </div>
  );
};

export default ongoing;
