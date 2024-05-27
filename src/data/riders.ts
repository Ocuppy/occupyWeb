import { RiderType } from "@/lib/validations/riders.schema";

const riders: RiderType[] = [
  {
    order_id: "#302012",
    item: "Item 1",
    status: "in-progress",
    customer: "Bug Smith",
    riders: "5",
    address: "FCT, Abuja",
    quantities: "Visa",
    prices: "500",
  },
  {
    order_id: "#302012",
    item: "golang",
    status: "in-progress",
    customer: "John doe",
    riders: "5",
    address: "New Karu, Nas. State",
    quantities: "Visa",
    prices: "500",
  },
];

export default riders;
