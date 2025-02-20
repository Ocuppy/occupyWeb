import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { InventoryType } from "@/lib/validations/inventory.schema";
import { Pencil } from "lucide-react";
import Image from "next/image";

type ViewProps = {
  data: InventoryType;
};

export default function ViewDialog({ data }: ViewProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-medium text-[#383E49]">{data.item}</h1>
        <div className="flex items-center gap-3">
          <Button className="w-[99px] border bg-transparent py-1 text-[#5D6679]">
            {" "}
            <Pencil className="mr-2 h-4 w-4" /> Edit
          </Button>
          <Button className="w-[99px] border bg-transparent py-1 text-[#5D6679]">
            Download
          </Button>
        </div>
      </div>
      <h1 className="inline-block border-b-4 border-occupy-primary pb-3 text-base text-[#48505E]">
        Overview
      </h1>
      <div className="flex items-start justify-start gap-72">
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-semibold text-[#48505E]">
            Primary Details
          </h1>
          <div className="flex items-center justify-start gap-12">
            <div className="flex flex-col gap-6">
              <span className="text-sm font-medium text-[#858D9D]">
                Product name
              </span>
              <span className="text-sm font-medium text-[#858D9D]">
                Product ID
              </span>
              <span className="text-sm font-medium text-[#858D9D]">
                Product category
              </span>
              <span className="text-sm font-medium text-[#858D9D]">Price</span>
            </div>
            <div className="flex flex-col gap-6">
              <span className="text-sm font-medium text-[#858D9D]">
                {data.item}
              </span>
              <span className="text-sm font-medium text-[#858D9D]">
                {data.id}
              </span>
              <span className="text-sm font-medium text-[#858D9D]">
                Instant food
              </span>
              <span className="text-sm font-medium text-[#858D9D]">
                NGN{data.buying_price}
              </span>
            </div>
          </div>
        </div>
        <div className="rounded-lg border-4 border-dashed p-4">
          <Image src="/images/groce.png" alt="product" />
        </div>
      </div>
    </>
  );
}
