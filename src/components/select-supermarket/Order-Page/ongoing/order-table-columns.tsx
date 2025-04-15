import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { format } from "date-fns";

// Define a type that matches the API order structure
export type APIOrderType = {
  id: number;
  user: {
    pk: number;
    user: {
      pk: number;
      first_name: string;
      last_name: string;
      phonenumber: string | null;
      customerprofile: {
        id: number;
        address: string | null;
        date_updated: string;
        default_supermarket: string | null;
      };
      current_estate: number;
      photo: string;
    };
    default_supermarket: string | null;
    address: string | null;
  };
  delivery_driver: any | null;
  ordered_items: {
    id: number;
    product: {
      id: string;
      discounted_percentage: number;
      name: string;
      description: string;
      product_image: string;
      price: string;
      discounted_price: string;
      quantity: number;
      in_stock: boolean;
      date_updated: string;
      category: number;
      supermarket: string;
    };
    quantity: number;
    order: number;
  }[];
  delivery_address: string;
  status: string;
  payment_choice: string;
  has_paid: boolean;
  delivery_fee: string;
  service_charge: string;
  date_created: string;
  supermarket: string;
  estate: number;
};

// Helper function to calculate time difference and format it according to design
const formatTimeDifference = (dateString: string): string => {
  const orderDate = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.floor(
    (now.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffInDays === 0) {
    const diffInHours = Math.floor(
      (now.getTime() - orderDate.getTime()) / (1000 * 60 * 60),
    );
    return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
  } else if (diffInDays < 3) {
    return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
  } else if (diffInDays < 30) {
    return `${diffInDays} days ago`;
  } else {
    return format(orderDate, "d MMM yyyy");
  }
};

// Helper function to format payment choice for display
const formatPaymentChoice = (paymentChoice: string): string => {
  switch (paymentChoice) {
    case "on_delivery":
      return "Cash on Delivery";
    case "card":
      return "Card";
    case "transfer":
      return "Transfer";
    case "paypal":
      return "Paypal";
    default:
      return paymentChoice
        .replace("_", " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());
  }
};

// Format total amount from ordered items, delivery fee and service charge
const calculateTotal = (order: APIOrderType): string => {
  const itemsTotal = order.ordered_items.reduce((total, item) => {
    return total + parseFloat(item.product.price) * item.quantity;
  }, 0);

  const deliveryFee = parseFloat(order.delivery_fee) || 0;
  const serviceCharge = parseFloat(order.service_charge) || 0;

  const grandTotal = itemsTotal + deliveryFee + serviceCharge;
  return `$${grandTotal.toFixed(2)}`;
};

export const orderTableColumns: ColumnDef<APIOrderType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
        className="mb-1 translate-y-[1px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="mb-1 translate-y-[1px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="text-sm font-medium text-[#333843]"
        title="Order ID"
      />
    ),
    cell: ({ row }) => (
      <div className="text-sm text-occupy-primary">
        #{row.original.id.toString().padStart(5, "0")}
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: "product",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="text-sm font-medium text-[#333843]"
        title="Product"
      />
    ),
    cell: ({ row }) => {
      const order = row.original;
      const mainProduct = order.ordered_items[0].product;
      const additionalProductsCount = order.ordered_items.length - 1;

      return (
        <div className="flex items-center">
          <div className="h-[44px] w-[44px] rounded-lg border-none bg-[#E0E2E7]">
            <Image
              src={mainProduct.product_image}
              alt={mainProduct.name}
              width={50}
              height={50}
            />
          </div>
          <div className="ml-2 flex flex-col">
            <span className="text-sm font-medium text-[#333843]">
              {mainProduct.name}
            </span>
            {additionalProductsCount > 0 && (
              <span className="text-xs text-[#667085]">
                +{additionalProductsCount} other products
              </span>
            )}
          </div>
        </div>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "date_created",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="text-sm font-medium text-[#333843]"
        title="Date"
      />
    ),
    cell: ({ row }) => {
      const dateString = row.getValue("date_created") as string;
      return (
        <div className="text-sm font-medium text-[#667085]">
          {formatTimeDifference(dateString)}
        </div>
      );
    },
    sortingFn: "datetime",
  },
  {
    id: "customer",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="text-sm font-medium text-[#333843]"
        title="Customer"
      />
    ),
    cell: ({ row }) => {
      const order = row.original;
      const fullName = `${order.user.user.first_name} ${order.user.user.last_name}`;
      // Using a placeholder email since the API data doesn't seem to have user email
      const email = `${order.user.user.first_name.toLowerCase()}.${order.user.user.last_name.toLowerCase()}@email.com`;

      return (
        <div className="flex flex-col">
          <span className="text-sm font-medium text-[#333843]">{fullName}</span>
          <span className="text-xs text-[#667085]">{email}</span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "total",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="text-sm font-medium text-[#333843]"
        title="Total"
      />
    ),
    cell: ({ row }) => (
      <div className="text-sm font-medium text-[#667085]">
        {calculateTotal(row.original)}
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "payment_choice",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="text-sm font-medium text-[#333843]"
        title="Payment"
      />
    ),
    cell: ({ row }) => (
      <div className="text-sm font-medium text-[#667085]">
        {formatPaymentChoice(row.getValue("payment_choice") as string)}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="text-sm font-medium text-[#333843]"
        title="Status"
      />
    ),
    cell: ({ row }) => {
      // standardizing status values
      const statusValue: string = (
        row.getValue("status") as string
      ).toLowerCase();
      let status: string, backgroundColor, textColor;

      switch (statusValue) {
        case "pending":
          status = "Pending";
          backgroundColor = "bg-[#E46A11]";
          textColor = "text-[#E46A11] font-bold";
          break;
        case "processing":
          status = "Processing";
          backgroundColor = "bg-[#066cd1]";
          textColor = "text-[#06284a] font-bold";
          break;
        case "shipped":
          status = "Shipped";
          backgroundColor = "bg-[#13B2E4]";
          textColor = "text-[#13B2E4] font-bold";
          break;
        case "delivered":
          status = "Delivered";
          backgroundColor = "bg-[#0D894F]";
          textColor = "text-[#0D894F] font-bold";
          break;
        case "cancelled":
          status = "Cancelled";
          backgroundColor = "bg-[#F04438]";
          textColor = "text-[#F04438] font-bold";
          break;
        default:
          status = statusValue.charAt(0).toUpperCase() + statusValue.slice(1);
          backgroundColor = "bg-white";
          textColor = "text-gray-800";
          break;
      }

      return (
        <div
          className={`rounded-full p-1 text-center text-sm font-semibold ${backgroundColor} ${textColor} bg-opacity-25`}
        >
          {status}
        </div>
      );
    },
    enableSorting: true,
  },
  //   {
  //     id: "actions",
  //     header: ({ column }) => (
  //       <DataTableColumnHeader
  //         column={column}
  //         className="text-sm font-medium text-[#333843]"
  //         title="Actions"
  //       />
  //     ),
  //     cell: ({ row }) => <DataTableRowActions row={row} />,
  //   },
];
