import OrderCard from "@/components/select-supermarket/Order-Page/OrderCard";
import { columns } from "@/components/select-supermarket/Order-Page/Riders/column";
import { DataTable } from "@/components/select-supermarket/Order-Page/Riders/data-table";

import riders from "@/data/riders";
import React from "react";

const ridersAssigning = () => {
  return (
    <div className="flex  w-full max-w-screen flex-col">
      <OrderCard />
      <DataTable data={riders} columns={columns} />
    </div>
  );
};

export default ridersAssigning;
