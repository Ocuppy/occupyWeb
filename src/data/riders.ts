import { RiderType } from "@/lib/validations/riders.schema";

const riders: RiderType[] = [
  {
    order_id: "#302012",
    item: "Item 1",
    status: "Delivered",
    customer: "Bug Smith",
    riders: "5",
    address: "FCT, Abuja",
    quantities: "Visa",
    prices: "500",
  },
  {
    order_id: "#302012",
    item: "golang",
    status: "Assigned",
    customer: "John doe",
    riders: "5",
    address: "New Karu, Nas. State",
    quantities: "Visa",
    prices: "500",
  },
  {
    order_id: "#302012",
    item: "kelehi",
    status: "in-transit",
    customer: "John doe",
    riders: "5",
    address: "New Karu, Nas. State",
    quantities: "Visa",
    prices: "500",
  },
];

export default riders;
