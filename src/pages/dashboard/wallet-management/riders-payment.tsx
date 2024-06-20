import { AnalyticsIcon } from "@/assets/icon/icons";
import { walletData } from "@/components/dashboard/wallet-management/mockdata";
import CustomAvatar from "@/components/shared/CustomAvatar";
import { CustomTable } from "@/components/shared/CustomTable";
import CustomTabslist from "@/components/shared/CustomTablist";
import Flex from "@/components/shared/Flex";
import {
  PreviousPayrollIcon,
  UpcomingPayrollIcon,
} from "@/components/shared/Icons";
import SeeAllButton from "@/components/shared/SeeAllButton";
import SpaceBetween from "@/components/shared/SpaceBetween";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableHead, TableRow } from "@/components/ui/table";
import { Tabs } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { DotIcon } from "lucide-react";
import Router from "next/router";

const tableHeadings = ["Riders", "Amount", "Description", "Status"];
const TableHeadChildren = () => (
  <TableRow className="bg-[#F3F3FF] ">
    {tableHeadings.map((head, idx) => (
      <TableHead className="py-6" key={idx + head}>
        {head}
      </TableHead>
    ))}
  </TableRow>
);

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
const statusObj: Record<"pending" | "paid", string> = {
  pending: "bg-[#77797E] text-white text-[12px] p-2 rounded-md",
  paid: "bg-[#26B726] text-white text-[12px] p-2 rounded-md",
};

const payrollStatusObj: Record<"pending" | "paid", string> = {
  pending: "bg-[#FEEDDA] text-[#FAA745] hover:bg-[#feedda]",
  paid: "bg-[#CEEFDF] text-[#0AAF60] hover:bg-[#ceefdf]",
};

const PayrollItem = ({
  date,
  title,
  value,
  status,
}: {
  date: string;
  title: string;
  value: string;
  status: "pending" | "paid";
}) => {
  const formattedValue = value.split(".");
  return (
    <div className="w-full">
      <SpaceBetween className="flex-wrap">
        <p className="text-[16px] text-[#70707A]">{title}</p>
        <p className="text-[16px] text-[#70707A]">{date}</p>
      </SpaceBetween>
      <SpaceBetween className="flex-wrap">
        <p className="text-[32px] text-[#0a112f] font-medium">
          {formattedValue[0]}
          <span className="text-[#9096A2] text-[20px]">
            .{formattedValue[1]}
          </span>
        </p>
        <Badge
          className={cn(
            "rounded-full px-1 pr-3 uppercase hover:opacity-90",
            payrollStatusObj[status]
          )}
        >
          <DotIcon />
          {status}
        </Badge>
      </SpaceBetween>
    </div>
  );
};

const RidersPayment = () => {
  return (
    <div className="p-6 flex flex-col gap-4 ">
      <div className="grid lg:grid-cols-[60%,40%] gap-4">
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
      <div className="flex flex-col-reverse lg:grid lg:grid-cols-[65%,35%] gap-4">
        <div className="rounded-lg border p-4 ">
          <SpaceBetween>
            <p className="text-[18px] font-medium text-[#0a112f]">
              Withdrawals/Transaction History
            </p>
            <SeeAllButton
              onClick={() =>
                Router.push("/dashboard/wallet-management/withdrawals")
              }
            />
          </SpaceBetween>
          <CustomTable TableHeadComponent={<TableHeadChildren />}>
            {walletData.map((item: never, rowIndex: number) => {
              const isEven = (rowIndex + 1) % 2 === 0;
              return (
                <TableRow className="border-transparent" key={rowIndex}>
                  <TableCell>
                    <Flex>
                      <CustomAvatar src="" alt="" fallback="AM" />
                      <div>
                        <p className="text-[#0A112F] mb-2 text-[16px] font-medium">
                          Arlene Mcroy
                        </p>
                        <p className="text-[#70707A] text-[14px]">Bicycle</p>
                      </div>
                    </Flex>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-[#0A112F] mb-1 text-[16px] font-medium">
                        NGN5,000
                        <span className="text-[#9096A2] font-medium text-[14px]">
                          .1
                        </span>
                      </p>
                      <p className="text-[#70707A] text-[14px]">
                        1 Jun, 2022 . 8:00am
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-[#0A112F] text-[14px] ">
                      Payout for the Month of March
                    </p>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={isEven ? statusObj.paid : statusObj.pending}
                    >
                      {isEven ? "Paid" : "Pending"}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </CustomTable>
        </div>
        <div className="flex flex-col gap-4">
          <div className="rounded-lg border p-4 ">
            <Flex className="items-start gap-4">
              <PreviousPayrollIcon />
              <PayrollItem
                title="Previous Payroll"
                date="March 1, 2022"
                value="$58,764.25"
                status="paid"
              />
            </Flex>
          </div>
          <div className="rounded-lg border p-4 ">
            <Flex className="items-start gap-4">
              <UpcomingPayrollIcon />
              <PayrollItem
                title="Upcoming Payroll"
                date="April 1, 2022"
                value="$58,764.25"
                status="pending"
              />
            </Flex>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RidersPayment;
