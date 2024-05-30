import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { RiderType } from "@/lib/validations/riders.schema";
import { DataTableRowActions } from "./data-table-row-actions";
import { DataTableColumnHeader } from "./data-table-column-header";

export const columns: ColumnDef<RiderType>[] = [
  {
    accessorKey: "order_id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Order ID" />,
    cell: ({ row }) => <div className="text-xs">{row.getValue("order_id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "item",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Item Ordered" />,
    cell: ({ row }) => <div className="text-xs">{row.getValue("item")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "customer",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Customer Name" />,
    cell: ({ row }) => <div className="text-xs">{row.getValue("customer")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "riders",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Rider's Assigned" />,
    cell: ({ row }) => <div className="text-xs">{row.getValue("riders")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "address",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Address" />,
    cell: ({ row }) => <div className="text-xs">{row.getValue("address")} Packets</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "quantities",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Quantities" />,
    cell: ({ row }) => <div className="text-xs">{row.getValue("quantities")}</div>,
    enableSorting: false,
    // enableHiding: false,
  },
  {
    accessorKey: "prices",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Prices" />,
    cell: ({ row }) => <div className="text-xs">NGN{row.getValue("prices")}</div>,
    enableSorting: false,
    // enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Order Status" />,
    cell: ({ row }) => {
      const status: string = row.getValue("status");
      let backgroundColor, textColor;

      switch (status.toLowerCase()) {
        case "delivered":
          backgroundColor = "bg-[#06A561]";
          textColor = "text-[#06A561] font-bold";
          break;
        case "assigned":
          backgroundColor = "bg-[#A5A5A5]";
          textColor = "text-[#A5A5A5] font-bold";
          break;
        case "in-transit":
          backgroundColor = "bg-[#005EFF]";
          textColor = "text-[#005EFF] font-bold";
          break;
        default:
          backgroundColor = "bg-white";
          textColor = "text-gray-800";
          break;
      }

      return (
        <div
          className={`text-xs text-center px-2 py-1 rounded-md ${backgroundColor} ${textColor} bg-opacity-25`}
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
    header: ({ column }) => <DataTableColumnHeader column={column} title="Actions" />,
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
