import { columns } from "@/components/select-supermarket/Order-Page/ongoing/column";
import { DataTable } from "@/components/select-supermarket/Order-Page/ongoing/data-table";
import orders from "@/data/orders";
import { useGetSuperMarketOrdersQuery } from "@/store/redux/services/superMarketOrdersSlice/superMarketOrdersApiSlice";
import { useRouter } from "next/router";
import { useEffect } from "react";

const SupermarketOrdersPage = () => {
  const router = useRouter();
  const { id: supermarket_id } = router.query;

  const { data, error, isLoading, refetch } = useGetSuperMarketOrdersQuery(
    { supermarket_id },
    { skip: !supermarket_id },
  );

  useEffect(() => {
    console.log("Orders Data", data);
  }, [data]);

  return (
    <div className="max-w-screen flex w-full flex-col">
      <DataTable data={orders} columns={columns} />
    </div>
  );
};

export default SupermarketOrdersPage;
