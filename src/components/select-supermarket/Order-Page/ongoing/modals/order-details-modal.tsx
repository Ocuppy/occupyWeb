import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { APIOrderType } from "../order-table-columns";
import { useAcceptOrderMutation } from "@/store/redux/services/superMarketOrdersSlice/superMarketOrdersApiSlice";

interface OrderDetailsProps {
  order: APIOrderType;
}

export function OrderDetails({ order }: OrderDetailsProps) {
  // Calculate totals
  const itemsTotal = order.ordered_items.reduce(
    (total, item) =>
      total + parseFloat(item.product.discounted_price) * item.quantity,
    0,
  );
  const deliveryFee = parseFloat(order.delivery_fee) || 0;
  const serviceCharge = parseFloat(order.service_charge) || 0;
  const total = itemsTotal + deliveryFee + serviceCharge;

  const [acceptOrder, { isLoading, isSuccess, isError }] =
    useAcceptOrderMutation();

  const renderActionButtons = () => {
    if (order.status !== "pending" || isSuccess) {
      return <Button>Completed</Button>;
    }

    return (
      <div className="flex justify-center gap-4 pt-4">
        <Button
          onClick={() => acceptOrder({ order_id: order.id })}
          disabled={isLoading}
        >
          {isLoading ? "Accepting..." : "Accept"}
        </Button>
        <Button variant="outline">Reject</Button>
      </div>
    );
  };

  return (
    <section className="w-full">
      <div className="max-h-[85vh] space-y-6 overflow-y-auto p-4">
        {/* Customer Details */}
        <div>
          <h2 className="mb-2 text-base font-medium">Customer Details</h2>
          <div className="space-y-1">
            <p>
              <span className="text-sm font-medium text-[#858D9D]">
                Customer name:
              </span>{" "}
              {`${order.user.user.first_name} ${order.user.user.last_name}`}
            </p>
            <p>
              <span className="text-sm font-medium text-[#858D9D]">
                Contact Number:
              </span>{" "}
              {order.user.user.phonenumber || "Not provided"}
            </p>
          </div>
        </div>

        {/* Products Ordered */}
        <div>
          <h2 className="mb-2 text-lg font-semibold">Product Ordered</h2>
          <div className="overflow-hidden rounded-lg border">
            <div className="grid grid-cols-3 bg-gray-100 p-2 font-medium">
              <div>Product</div>
              <div>Quantity</div>
              <div>Status</div>
            </div>
            <div className="divide-y">
              {order.ordered_items.map((item) => (
                <div key={item.id} className="grid grid-cols-3 p-2">
                  <div>{item.product.name}</div>
                  <div>{item.quantity}</div>
                  <div>
                    {item.product.in_stock ? (
                      <input type="checkbox" className="h-4 w-4" />
                    ) : (
                      <Badge variant="destructive">Out of stock</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Delivery Method */}
        <div>
          <h2 className="mb-2 text-lg font-semibold">Delivery method</h2>
          <p>
            {order.payment_choice === "ondelivery"
              ? "Standard Door Delivery"
              : "Express Delivery"}
          </p>
        </div>

        {/* Customer Address */}
        <div>
          <h2 className="mb-2 text-lg font-semibold">Customer Address</h2>
          <div className="space-y-1">
            <p>
              {order.delivery_address ||
                order.user.address ||
                "Address not provided"}
            </p>
          </div>
        </div>

        {/* Payment Details */}
        <div className="w-1/2">
          <h2 className="mb-2 text-lg font-semibold">Payment Details</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Items Total:</span>
              <span>{itemsTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Fees:</span>
              <span>{deliveryFee.toLocaleString()}</span>
            </div>
            {serviceCharge > 0 && (
              <div className="flex justify-between">
                <span>Service Charge:</span>
                <span>{serviceCharge.toLocaleString()}</span>
              </div>
            )}
            <div className="mt-2 flex justify-between border-t pt-2 font-bold">
              <span>Total:</span>
              <span>{total.toLocaleString()}</span>
            </div>
            <div className="flex gap-5 pt-2">
              <span>Payment Status:</span>
              <Badge variant={order.has_paid ? "default" : "destructive"}>
                {order.has_paid ? "Paid" : "Not Paid"}
              </Badge>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mx-auto grid place-items-center">
          {renderActionButtons()}
        </div>
      </div>
    </section>
  );
}
