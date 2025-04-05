import { months } from "@/lib/utils";

export const lineChartData = {
  labels: months({ count: 12 }),
  datasets: [
    {
      label: "Transactions",
      data: [65, 59, 80, 81, 56, 55, 60],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
};

export const keys = [
  "amount",
  "customerName",
  "referenceId",
  "channel",
  "paidOn",
];

export const walletData: Record<string, any> = [
  {
    amount: 15000,
    customerName: "John Doe",
    referenceId: "REF123456",
    channel: "Bank transfer",
    paidOn: "2023-05-01T10:30:00Z",
  },
  {
    amount: 7500,
    customerName: "Jane Smith",
    referenceId: "REF123457",
    channel: "Cash",
    paidOn: "2023-05-02T14:20:00Z",
  },
  {
    amount: 12000,
    customerName: "Michael Johnson",
    referenceId: "REF123458",
    channel: "Bank transfer",
    paidOn: "2023-05-03T09:15:00Z",
  },
  {
    amount: 20000,
    customerName: "Emily Davis",
    referenceId: "REF123459",
    channel: "Cash",
    paidOn: "2023-05-04T11:45:00Z",
  },
  {
    amount: 9500,
    customerName: "David Wilson",
    referenceId: "REF123460",
    channel: "Bank transfer",
    paidOn: "2023-05-05T16:30:00Z",
  },
  {
    amount: 5000,
    customerName: "Sarah Brown",
    referenceId: "REF123461",
    channel: "Cash",
    paidOn: "2023-05-06T13:00:00Z",
  },
  {
    amount: 18000,
    customerName: "Chris Lee",
    referenceId: "REF123462",
    channel: "Bank transfer",
    paidOn: "2023-05-07T17:45:00Z",
  },
  {
    amount: 22000,
    customerName: "Laura Martinez",
    referenceId: "REF123463",
    channel: "Cash",
    paidOn: "2023-05-08T12:30:00Z",
  },
  {
    amount: 14000,
    customerName: "James Anderson",
    referenceId: "REF123464",
    channel: "Bank transfer",
    paidOn: "2023-05-09T15:20:00Z",
  },
  {
    amount: 6000,
    customerName: "Linda Thompson",
    referenceId: "REF123465",
    channel: "Cash",
    paidOn: "2023-05-10T10:10:00Z",
  },
];
