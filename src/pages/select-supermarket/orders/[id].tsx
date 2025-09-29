import { DataTable } from "@/components/select-supermarket/Order-Page/ongoing/data-table";
import orders from "@/data/orders";
import { useGetSuperMarketOrdersQuery } from "@/store/redux/services/superMarketOrdersSlice/superMarketOrdersApiSlice";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { orderTableColumns as columns } from "@/components/select-supermarket/Order-Page/ongoing/order-table-columns";

const SupermarketOrdersPage = () => {
  const router = useRouter();
  const { id: supermarket_id } = router.query;

  const { data, error, isLoading, refetch } = useGetSuperMarketOrdersQuery(
    { supermarket_id },
    { skip: !supermarket_id },
  );

  // console.log(data);

  return (
    <div className="max-w-screen flex w-full flex-col">
      {isLoading ? (
        <div>Loading orders...</div>
      ) : error ? (
        <div>Error loading orders. Please try again.</div>
      ) : (
        <DataTable
          data={data ? [...data].sort((a: any, b: any) => b.id - a.id) : []}
          columns={columns}
        />
      )}
    </div>
  );
};

export default SupermarketOrdersPage;
