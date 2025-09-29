import AdminTablePagination from "@/components/shared/AdminTablePagination";
import CustomAvatar from "@/components/shared/CustomAvatar";
import CustomDropdown from "@/components/shared/CustomDropdown";
import { CustomTable } from "@/components/shared/CustomTable";
import Flex from "@/components/shared/Flex";
import {
  ArrowDownIcon,
  ExportIcon,
  FilterIcon,
} from "@/components/shared/Icons";
import SearchBar from "@/components/shared/SearchBar";
import SeeAllButton from "@/components/shared/SeeAllButton";
import SpaceBetween from "@/components/shared/SpaceBetween";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TableCell, TableHead, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { BaggageClaimIcon, UserIcon } from "lucide-react";
import { useState } from "react";

const tableHeadings = [
  "Riders",
  "Amount",
  "Account details",
  "Description",
  "Status",
];
const TableHeadChildren = () => (
  <TableRow className="bg-[#F3F3FF] ">
    {tableHeadings.map((head, idx) => (
      <TableHead className="py-6" key={idx + head}>
        {head}
      </TableHead>
    ))}
  </TableRow>
);

const statusObj: Record<"pending" | "paid", string> = {
  pending: "bg-[#77797E] text-white text-[12px] p-2 rounded-md",
  paid: "bg-[#26B726] text-white text-[12px] p-2 rounded-md",
};

const Page = () => {
  const tabsList = [
    { label: "Pending Payment", value: "pending", icon: <UserIcon /> },
    {
      label: "Approved Payment",
      value: "approved",
      icon: <BaggageClaimIcon />,
    },
  ];
  const [activeTab, setActiveTab] = useState("pending");
  return (
    <div className="rounded-lg border border-[#E4E4E7] bg-white p-4 ">
      <SpaceBetween>
        <p className="text-[#0A112F] text-[20px] font-medium">
          Withdrawals/Transaction History
        </p>
        <SeeAllButton onClick={() => {}} />
      </SpaceBetween>

      <div>
        <SpaceBetween className="my-6">
          <Flex>
            <SearchBar onSearch={(val) => {
              // console.log(val)
              }} />
            <CustomDropdown
              BtnComponent={<FilterIcon />}
              dropdownData={[
                { label: "Something", onClick: () => {
                  // console.log("something")
                } },
                {
                  label: "Something 1",
                  onClick: () => {
                    // console.log("something")
                  },
                },
              ]}
            />
          </Flex>
          <Flex>
            <Button>Approve all Payment</Button>
            <CustomDropdown
              BtnComponent={
                <Flex>
                  <ExportIcon />
                  <p>Export</p>
                  <ArrowDownIcon />
                </Flex>
              }
              triggerClassName="py-2"
              dropdownData={[
                { label: "Something", onClick: () => {
                  // console.log("something")
                } },
                {
                  label: "Something 1",
                  onClick: () => {
                    // console.log("something")
                  },
                },
              ]}
            />
          </Flex>
        </SpaceBetween>
      </div>
      <div className="grid grid-cols-2">
        {tabsList.map((tab, i) => (
          <div key={i} className="border-b">
            <Button
              className={cn(
                "px-0 gap-4 hover:bg-transparent hover:text-occupy-primary hover-opacity-80",
                activeTab === tab.value &&
                  "text-occupy-primary border-b-[3px] rounded-[0px] border-b-occupy-primary transition-all duration-300"
              )}
              onClick={() => setActiveTab(tab.value)}
              variant={"ghost"}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </Button>
          </div>
        ))}
      </div>
      <CustomTable TableHeadComponent={<TableHeadChildren />}>
        {[1, 2, 3, 4, 5, 6].map((item, rowIndex: number) => {
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
                    GTbank
                  </p>
                  <p className="text-[#70707A] text-[14px]">
                    0171007786 . Deborah Occupy
                  </p>
                </div>
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
                  className={
                    activeTab === "pending" ? statusObj.pending : statusObj.paid
                  }
                >
                  {activeTab === "approved" ? "Paid" : "Pending"}
                </Badge>
              </TableCell>
            </TableRow>
          );
        })}
      </CustomTable>
      <Separator className="my-6" />
      <div>
        <AdminTablePagination currentPage={1} totalPages={5} />
      </div>
    </div>
  );
};

export default Page;
