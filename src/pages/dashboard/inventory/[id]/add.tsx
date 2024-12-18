import AddProduct from "@/components/dashboard/inventory/Forms/AddProduct";
import { withSteppedFormContextProvider } from "@/contexts/SteppedFormContext";
import { NextPageWithLayout } from "@/pages/_app";

const Page: NextPageWithLayout = () => {
  return (
    <div>
      <AddProduct />
    </div>
  );
};

export default withSteppedFormContextProvider(Page);
