import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import { label_options, priority_options, status_options } from "../../filters";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { OrderType } from "@/lib/validations/schema";

export const columns: ColumnDef<OrderType>[] = [
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
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("order_id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "product",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Product" />,
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("product")}</div>,
    // cell: ({ row }) => {
    //   const label = label_options.find((label: any) => label.value === row.original.label);

    //   return (
    //     <div className="flex space-x-2">
    //       {label && <Badge variant="outline">{label.label}</Badge>}
    //       <span className="max-w-[500px] truncate font-medium">{row.getValue("product")}</span>
    //     </div>
    //   );
    // },
  },
  {
    accessorKey: "date",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
    cell: ({ row }) => {
      const field = row.getValue("date") as Date;
      return <div>{field?.toDateString()}</div>;
    },
  },
  {
    accessorKey: "customer",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" />,
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("customer")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "total",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total" />,
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("total")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "payment",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Payment" />,
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("payment")}</div>,
    // filterFn: (row, id, value) => {
    //   return value.includes(row.getValue(id));
    // },
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    // cell: ({ row }) => {
    //   const status = status_options.find(
    //     (status: any) => status.value === row.getValue("status")
    //   );

    //   if (!status) {
    //     return null;
    //   }

    //   return (
    //     <div className="flex w-[100px] items-center">
    //       {status.icon && <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
    //       <span>{status.label}</span>
    //     </div>
    //   );
    // },

    cell: ({ row }) => <div className="w-[80px]">{row.getValue("status")}</div>,
    // filterFn: (row, id, value) => {
    //   return value.includes(row.getValue(id));
    // },
  },
  {
    id: "actions",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Actions" />,
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
