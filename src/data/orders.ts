// orders.js or orders.ts
import { OrderType } from "@/lib/validations/schema";

const orders: OrderType[] = [
  {
    order_id: "#302012",
    product: {
      name: "Fix login bug",
      image: "/images/product1.jpg",
      additionalDetails: "+3",
    },
    status: "in-progress",
    customer: {
      name: "Bug Smith",
      email: "bugsmith@example.com",
    },
    total: "$125",
    date: new Date("2024-05-24"),
    payment: "Visa",
  },
  {
    order_id: "#23422",
    product: {
      name: "again jc",
      image: "/images/product2.jpg",
      additionalDetails: "+2",
    },
    status: "declined",
    customer: {
      name: "Just Being",
      email: "justbeing@example.com",
    },
    total: "$450",
    date: new Date("2024-05-24"),
    payment: "Mastercard",
  },
];

export default orders;
