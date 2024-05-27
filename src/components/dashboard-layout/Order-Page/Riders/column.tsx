import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "../../data-table/data-table-column-header";
import { RiderType } from "@/lib/validations/riders.schema";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<RiderType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "order_id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Order ID" />,
    cell: ({ row }) => <div className="text-occupy-primary">{row.getValue("order_id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "item",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Item Ordered" />,
    cell: ({ row }) => <div className="text-sm">{row.getValue("item")}</div>,
  },
  {
    accessorKey: "customer",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Customer Name" />,
    cell: ({ row }) => <div className="text-sm">{row.getValue("customer")}</div>,
  },
  {
    accessorKey: "riders",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Rider's Assigned" />,
    cell: ({ row }) => <div className="text-sm">{row.getValue("riders")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "address",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Address" />,
    cell: ({ row }) => <div className="text-sm">{row.getValue("address")} Packets</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "quantities",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Quantities" />,
    cell: ({ row }) => <div className="text-sm">{row.getValue("quantities")}</div>,
  },
  {
    accessorKey: "prices",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Prices" />,
    cell: ({ row }) => <div className="text-sm">NGN{row.getValue("prices")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Order Status" />,
    cell: ({ row }) => <div className="text-sm">{row.getValue("status")}</div>,
  },
  {
    id: "actions",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Actions" />,
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
