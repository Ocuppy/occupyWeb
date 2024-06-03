import Flex from "@/components/shared/Flex";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Router from "next/router";

const AddProduct = () => {
  return (
    <div className="p-6 flex flex-col gap-6">
      <Flex className="justify-between">
        <div className="flex flex-col gap-3">
          <h1>Add Product</h1>
          <Link href={"/dashboard"}>breadcrumb</Link>
        </div>
        <Flex>
          <Button
            onClick={() => Router.push("/dashboard/inventory")}
            className="py-1 px-3 bg-transparent border text-[#5D6679]"
          >
            Cancel
          </Button>
          <Button className="py-1 px-3">Save Product</Button>
        </Flex>
      </Flex>
    </div>
  );
};

export default AddProduct;
