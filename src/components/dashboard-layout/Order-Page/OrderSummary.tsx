import OrderBox from "./OrderBox";

const OrderSummary = () => {
  return (
    <div>
      <div className="w-full  pb-12">
        <div className="flex flex-col lg:flex-row gap-3">
          <OrderBox title={"Total Orders"} count={0} />
          <OrderBox title={"Incoming Order"} count={0} />
          <OrderBox title={"On Transit"} count={0} />
          <OrderBox title={"Rejected Order"} count={0} />
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
