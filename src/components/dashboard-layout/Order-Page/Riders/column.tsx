import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { RiderType } from "@/lib/validations/riders.schema";
import { DataTableRowActions } from "./data-table-row-actions";
import { DataTableColumnHeader } from "./data-table-column-header";

export const columns: ColumnDef<RiderType>[] = [
  {
    accessorKey: "order_id",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="text-sm font-medium text-[#8E95A9]"
        title="Order ID"
      />
    ),
    cell: ({ row }) => (
      <div className="text-sm font-normal text-[#555F7E]">{row.getValue("order_id")}</div>
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
        title="Item Ordered"
      />
    ),
    cell: ({ row }) => (
      <div className="text-sm font-normal text-[#555F7E]">{row.getValue("item")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "customer",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="text-sm font-medium text-[#8E95A9]"
        title="Customer Name"
      />
    ),
    cell: ({ row }) => (
      <div className="text-sm font-normal text-[#555F7E]">{row.getValue("customer")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "riders",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="text-sm font-medium text-[#8E95A9]"
        title="Rider's Assigned"
      />
    ),
    cell: ({ row }) => (
      <div className="text-sm font-normal text-[#555F7E]">{row.getValue("riders")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="text-sm font-medium text-[#8E95A9]"
        title="Address"
      />
    ),
    cell: ({ row }) => (
      <div className="text-sm font-normal text-[#555F7E]">
        {row.getValue("address")} Packets
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "quantities",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="text-sm font-medium text-[#8E95A9]"
        title="Quantities"
      />
    ),
    cell: ({ row }) => (
      <div className="text-sm font-normal text-[#555F7E]">{row.getValue("quantities")}</div>
    ),
    enableSorting: false,
    // enableHiding: false,
  },
  {
    accessorKey: "prices",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="text-sm font-medium text-[#8E95A9]"
        title="Prices"
      />
    ),
    cell: ({ row }) => (
      <div className="text-sm font-normal text-[#555F7E]">NGN{row.getValue("prices")}</div>
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
        title="Order Status"
      />
    ),
    cell: ({ row }) => {
      const status: string = row.getValue("status");
      let backgroundColor, textColor;

      switch (status.toLowerCase()) {
        case "delivered":
          backgroundColor = "bg-[#06A561]";
          textColor = "text-[#06A561]";
          break;
        case "assigned":
          backgroundColor = "bg-[#A5A5A5]";
          textColor = "text-[#A5A5A5]";
          break;
        case "in-transit":
          backgroundColor = "bg-[#005EFF]";
          textColor = "text-[#005EFF]";
          break;
        default:
          backgroundColor = "bg-white";
          textColor = "text-[#555F7E]";
          break;
      }

      return (
        <div
          className={`text-sm font-normal text-center p-1 rounded-md ${backgroundColor} ${textColor} bg-opacity-25`}
        >
          {status}
        </div>
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
