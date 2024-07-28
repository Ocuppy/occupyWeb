// components/TransactionTable.tsx
import Image from "next/image";
import { FC } from "react";

interface Product {
  name: string;
  category: string;
  price: string;
  date: string;
  description: string;
  //   status: "Available" | "Out of Stock";
  status: "Available" | "Unavailable";
}

const products: Product[] = [
  {
    name: "Product A",
    category: "Category 1",
    price: "NGN5,000.12",
    date: "1 Jun, 2022",
    description: "Description for Product A",
    status: "Available",
  },
  {
    name: "Product B",
    category: "Category 2",
    price: "NGN3,000.00",
    date: "2 Jun, 2022",
    description: "Description for Product B",
    status: "Unavailable",
  },
  {
    name: "Product C",
    category: "Category 1",
    price: "NGN7,000.50",
    date: "3 Jun, 2022",
    description: "Description for Product C",
    status: "Available",
  },
  {
    name: "Product D",
    category: "Category 3",
    price: "NGN2,500.00",
    date: "4 Jun, 2022",
    description: "Description for Product D",
    status: "Available",
  },
];

const TransactionsTable: FC = () => {
  return (
    <div className="w-full rounded-lg bg-white p-4 shadow">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Transaction History</h2>
        <a href="#" className="text-purple-600">
          See All
        </a>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto text-left">
          <thead className="bg-[#f3f3ff]">
            <tr className="text-sm font-semibold text-[#8E95A9]">
              <th className="px-4 py-5">Product</th>
              <th className="px-4 py-5">Price</th>
              <th className="px-4 py-5">Description</th>
              <th className="px-4 py-5">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="border-b text-sm">
                <td className="px-4 py-2">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 overflow-hidden rounded-full">
                      <Image
                        src="/images/fresh-fruit.png"
                        alt="Product Image"
                        width={40}
                        height={40}
                      />
                    </div>
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-gray-500">
                        {product.category}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2">
                  <div className="font-medium">{product.price}</div>
                  <div className="text-sm text-gray-500">{product.date}</div>
                </td>
                <td className="px-4 py-2">{product.description}</td>
                <td className="px-4 py-2">
                  <span
                    className={`rounded-full px-3 py-1.5 text-xs ${product.status === "Available" ? "bg-green-200 text-green-800" : "bg-gray-200 text-gray-800"}`}
                  >
                    {product.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsTable;
