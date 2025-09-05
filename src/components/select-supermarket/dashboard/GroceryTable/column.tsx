import { ColumnDef } from "@tanstack/react-table";
import { DataTableRowActions } from "./data-table-row-actions";
import { DataTableColumnHeader } from "./data-table-column-header";
import { InventoryType } from "@/lib/validations/inventory.schema";

export const columns: ColumnDef<InventoryType>[] = [
  {
    accessorKey: "item_id",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="text-sm font-medium text-[#8E95A9]"
        title="Item ID"
      />
    ),
    cell: ({ row }) => (
      <div className="text-sm font-normal text-[#555F7E]">
        {row.getValue("item_id")}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "item",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="text-sm font-medium text-[#8E95A9]"
        title="Item"
      />
    ),
    cell: ({ row }) => (
      <div className="text-sm font-normal text-[#555F7E]">
        {row.getValue("item")}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "buying_price",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="text-sm font-medium text-[#8E95A9]"
        title="Buying Price"
      />
    ),
    cell: ({ row }) => (
      <div className="text-sm font-normal text-[#555F7E]">
        NGN{row.getValue("buying_price")}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="text-sm font-medium text-[#8E95A9]"
        title="Quantity"
      />
    ),
    cell: ({ row }) => (
      <div className="text-sm font-normal text-[#555F7E]">
        {row.getValue("quantity")} Packet
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "value",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="text-sm font-medium text-[#8E95A9]"
        title="Threshold value"
      />
    ),
    cell: ({ row }) => (
      <div className="text-sm font-normal text-[#555F7E]">
        {row.getValue("value")} Packets
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "expiry_date",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="text-sm font-medium text-[#8E95A9]"
        title="Expiry Date"
      />
    ),
    cell: ({ row }) => (
      <div className="text-sm font-normal text-[#555F7E]">
        {row.getValue("expiry_date")}
      </div>
    ),
    enableSorting: false,
    // enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="text-sm font-medium text-[#8E95A9]"
        title="Product Status"
      />
    ),
    cell: ({ row }) => {
      const status: string = row.getValue("status");
      let textColor;

      switch (status.toLowerCase()) {
        case "pending":
          textColor = "text-[#555F7E]";
          break;
        case "approved":
          textColor = "text-occupy-primary";
          break;
        default:
          textColor = "text-[#555F7E]";
          break;
      }

      return (
        <div className={`text-center text-sm font-normal ${textColor}`}>
          {status}
        </div>
      );
    },
    enableSorting: false,
    // enableHiding: false,
  },
  {
    accessorKey: "availability",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="text-sm font-medium text-[#8E95A9]"
        title="Availability"
      />
    ),
    cell: ({ row }) => {
      const availability: string = row.getValue("availability");
      let backgroundColor, textColor;

      switch (availability.toLowerCase()) {
        case "in-stock":
          backgroundColor = "bg-[#C3F8E2]";
          textColor = "text-[#06A561]";
          break;
        case "out of stock":
          backgroundColor = "bg-[#A5A5A55A]";
          textColor = "text-[#A5A5A5]";
          break;
        default:
          backgroundColor = "bg-white";
          textColor = "text-[#555F7E]";
          break;
      }

      return (
        <p
          className={`w-fit rounded-md p-1 px-2 text-center text-sm font-normal ${backgroundColor} ${textColor} bg-opacity-25`}
        >
          {availability}
        </p>
      );
    },
    enableSorting: false,
    // enableHiding: false,
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="text-sm font-medium text-[#8E95A9]"
        title="Actions"
      />
    ),
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
