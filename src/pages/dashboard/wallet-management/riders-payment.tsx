import CustomTabslist from "@/components/shared/CustomTablist";
import Flex from "@/components/shared/Flex";
import SpaceBetween from "@/components/shared/SpaceBetween";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const PayrollDetail = ({
  title,
  amount,
  className,
}: {
  title: string;
  amount: string;
  className: string;
}) => {
  const formattedAmount = amount.split(".");
  return (
    <div className="grid gap-2 grid-cols-[auto,1fr]">
      <div className={cn("w-[3px] h-full", className)}></div>
      <div>
        <p className="text-[#70707A] text-[14px]">{title}</p>
        <p className="text-[24px] text-[#0a112f]">
          {formattedAmount[0]}
          <span className="text-[#9096A2]">
            {formattedAmount[1] && `.${formattedAmount[1]}`}
          </span>
        </p>
      </div>
    </div>
  );
};
const RidersPayment = () => {
  return (
    <div className="p-6 ">
      <div className="grid grid-cols-[60%,40%] gap-4">
        <div className="rounded-lg border p-4 ">
          <SpaceBetween>
            <p className="text-[20px] text-[#0a112f]">Total Outstanding</p>
            <Tabs>
              <CustomTabslist tabsList={["1M", "3M", "6M", "1Y"]} />
            </Tabs>
          </SpaceBetween>
          <SpaceBetween>
            <p className="text-[32px] text-[#0a112f] font-medium">
              NGN12,135<span className="text-[#9096A2] text-[20px]">.69</span>
            </p>
            <Flex>
              <Badge
                className="rounded-full font-medium px-1"
                variant={"approved"}
              >
                +23%
              </Badge>
              <p className="text-[14px] text-[#70707A]">vs last month</p>
            </Flex>
          </SpaceBetween>
        </div>
        <div className="rounded-lg border p-4 ">
          <SpaceBetween>
            <p className="text-[20px] text-[#0a112f]">Payroll Summary</p>
            <Button variant={"link"} className="text-occupy-primary font-bold">
              View report
            </Button>
          </SpaceBetween>
          <p className="text-[#70707A] text-[16px]">From 1-31 March, 2022</p>
          <Flex className="flex-wrap gap-6 mt-8">
            <PayrollDetail
              amount="NGN181.34"
              className="bg-[#51C6FB]"
              title="Payment"
            />
            <PayrollDetail
              amount="NGN37.13"
              className="bg-[#0A112F]"
              title="Pending"
            />
            <PayrollDetail
              amount="NGN234.20"
              className="bg-occupy-primary"
              title="Paid"
            />
          </Flex>
        </div>
      </div>
    </div>
  );
};

export default RidersPayment;
