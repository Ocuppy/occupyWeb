import OrderSummary from "@/components/dashboard-layout/Order-Page/OrderSummary";
import { columns } from "@/components/dashboard-layout/Order-Page/Riders/column";
import { DataTable } from "@/components/dashboard-layout/Order-Page/Riders/data-table";

import riders from "@/data/riders";
import React from "react";

const ridersAssigning = () => {
  return (
    <div className="flex  w-full max-w-screen flex-col">
      <OrderSummary />
      <DataTable data={riders} columns={columns} />
    </div>
  );
};

export default ridersAssigning;
