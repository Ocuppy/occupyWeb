import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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
    cell: ({ row }) => (
      <div className="w-[80px] text-occupy-primary">{row.getValue("order_id")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "product",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Product" />,
    cell: ({ row }) => {
      const product = row.getValue("product") as {
        name: string;
        image: string;
        additionalDetails?: string;
      };
      return (
        <div className="flex items-center">
          <div className="bg-[#E0E2E7] h-[44px] w-[44px] rounded-lg">
            <Image src={product.image} alt={product.name} width={50} height={50} />
          </div>
          <div className="ml-2 flex flex-col">
            <span className="text-sm">{product.name}</span>
            {product.additionalDetails && (
              <span className="text-xs text-gray-500">
                {product.additionalDetails} other products
              </span>
            )}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
    cell: ({ row }) => {
      const field = row.getValue("date") as Date;
      return <div className="text-sm">{field?.toDateString()}</div>;
    },
  },
  {
    accessorKey: "customer",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" />,
    cell: ({ row }) => {
      const customer = row.getValue("customer") as { name: string; email: string };
      return (
        <div className="flex flex-col">
          <span className="text-sm">{customer.name}</span>
          <span className="text-xs text-gray-500">{customer.email}</span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "total",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total" />,
    cell: ({ row }) => <div className="text-sm">{row.getValue("total")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "payment",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Payment" />,
    cell: ({ row }) => <div className="text-sm">{row.getValue("payment")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => <div className="text-sm">{row.getValue("status")}</div>,
  },
  {
    id: "actions",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Actions" />,
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
