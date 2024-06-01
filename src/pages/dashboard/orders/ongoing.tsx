import OrderSummary from "@/components/dashboard-layout/Order-Page/OrderSummary";
import { columns } from "@/components/dashboard-layout/Order-Page/ongoing/column";
import { DataTable } from "@/components/dashboard-layout/Order-Page/ongoing/data-table";
import orders from "@/data/orders";
import React from "react";

const ongoing = () => {
  return (
    <div className="flex  w-full max-w-screen flex-col">
      <OrderSummary />
      <DataTable data={orders} columns={columns} />
    </div>
  );
};

export default ongoing;
