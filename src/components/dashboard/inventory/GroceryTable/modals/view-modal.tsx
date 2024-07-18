import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { InventoryType } from "@/lib/validations/inventory.schema";
import { Pencil } from "lucide-react";
import { Image, X } from "lucide-react";

type ViewProps = {
  data: InventoryType;
};

export default function ViewDialog({ data }: ViewProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-medium text-xl text-[#383E49]">{data.item}</h1>
        <div className="flex items-center gap-3">
          <Button className="py-1 w-[99px] bg-transparent border text-[#5D6679]">
            {" "}
            <Pencil className="mr-2 h-4 w-4" /> Edit
          </Button>
          <Button className="py-1 w-[99px] bg-transparent border text-[#5D6679]">
            Download
          </Button>
        </div>
      </div>
      <h1 className="text-[#48505E] pb-3 text-base inline-block border-b-4 border-occupy-primary">
        Overview
      </h1>
      <div className="flex items-start justify-start gap-72">
        <div className="flex flex-col gap-6">
          <h1 className="font-semibold text-2xl text-[#48505E]">Primary Details</h1>
          <div className="flex items-center justify-start gap-12">
            <div className="flex flex-col gap-6">
              <span className="text-[#858D9D] font-medium text-sm">Product name</span>
              <span className="text-[#858D9D] font-medium text-sm">Product ID</span>
              <span className="text-[#858D9D] font-medium text-sm">Product category</span>
              <span className="text-[#858D9D] font-medium text-sm">Price</span>
            </div>
            <div className="flex flex-col gap-6">
              <span className="text-[#858D9D] font-medium text-sm">{data.item}</span>
              <span className="text-[#858D9D] font-medium text-sm">{data.id}</span>
              <span className="text-[#858D9D] font-medium text-sm">Instant food</span>
              <span className="text-[#858D9D] font-medium text-sm">NGN{data.buying_price}</span>
            </div>
          </div>
        </div>
        <div className="rounded-lg p-4 border-dashed border-4">
          <img src="/images/groce.png" alt="product" />
        </div>
      </div>
    </>
  );
}
