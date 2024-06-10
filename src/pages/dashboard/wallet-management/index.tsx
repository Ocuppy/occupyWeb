import {
  keys,
  lineChartData,
  walletData,
} from "@/components/dashboard/wallet-management/mockdata";
import CustomTabslist from "@/components/shared/CustomTablist";
import DataChart from "@/components/shared/DataChart";
import Flex from "@/components/shared/Flex";
import SpaceBetween from "@/components/shared/SpaceBetween";
import WalletBalance from "@/components/shared/WalletBalance";
import { Tabs } from "@/components/ui/tabs";
import chartStyles from "@/components/dashboard/wallet-management/chart.module.css";
import { Button } from "@/components/ui/button";
import { CustomTable } from "@/components/shared/CustomTable";
import { TableCell, TableHead, TableRow } from "@/components/ui/table";
import CustomSelect from "@/components/shared/CustomSelect";
import { format } from "date-fns";
import { useDisclosure } from "@/hooks/useDisclosure";
import ViewTransactiondetailModal from "@/components/dashboard/wallet-management/ViewTransactiondetailModal";
import InitiateWithdrawalModal from "@/components/dashboard/wallet-management/InitiateWithdrawalModal";

const tableHeadings = ["Amount", "Customer", "Reference", "Channel", "Paid On"];

const TableHeadChildren = () => (
  <TableRow>
    {tableHeadings.map((head, idx) => (
      <TableHead key={idx + head}>{head}</TableHead>
    ))}
    <TableHead></TableHead>
  </TableRow>
);

const Page = () => {
  const { isOpen: isViewOpen, toggleOpenState: toggleViewOpenState } =
    useDisclosure();
  const {
    isOpen: isWithdrawalOpen,
    toggleOpenState: toggleWithdrawalOpenState,
  } = useDisclosure();
  return (
    <div className="p-6 rounded-md h-full bg-white">
      <p className="text-[20px] text-[#1C2A53] font-medium">
        Wallet Management
      </p>
      <Flex className="gap-8 items-start">
        <WalletBalance walletName="XYZ Wallet" walletNumber="444 221 224 ***" />
        <SpaceBetween>
          <div>
            <Tabs defaultValue="Week">
              <CustomTabslist tabsList={["Week", "Month", "Year"]} />
            </Tabs>
            <div className={chartStyles.chart}>
              <DataChart
                type="line"
                data={lineChartData}
                options={{ responsive: true }}
              />
            </div>
          </div>
          <div className="w-[260px] border border-[#E0E0E0] p-4 rounded-lg">
            <Flex className="justify-between">
              <p className="text-[12px] font-semibold">Total Revenue</p>
              <div className=" flex items-center text-[10px]">
                <p className="whitespace-nowrap">Sort by:</p>
                <CustomSelect
                  selectTriggerClassName="text-[10px] py-1 h-fit px-2"
                  options={["Monthly", "Yearly"]}
                  onChangeValue={() => {}}
                  selectValue="Monthly"
                />
              </div>
            </Flex>
            <Flex>
              <p className="font-bold text-[26px] text-[#333333]">203k</p>
              <svg
                width="19"
                height="11"
                viewBox="0 0 19 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.751 1.19238V5.69238C18.751 6.14238 18.451 6.44238 18.001 6.44238C17.551 6.44238 17.251 6.14238 17.251 5.69238V2.99238L11.401 8.84238C11.101 9.14238 10.651 9.14238 10.351 8.84238L7.12598 5.61738L2.02598 10.7174C1.87598 10.8674 1.72598 10.9424 1.50098 10.9424C1.27598 10.9424 1.12598 10.8674 0.975977 10.7174C0.675977 10.4174 0.675977 9.96738 0.975977 9.66738L6.60098 4.04238C6.90098 3.74238 7.35098 3.74238 7.65098 4.04238L10.876 7.26738L16.201 1.94238H13.501C13.051 1.94238 12.751 1.64238 12.751 1.19238C12.751 0.742383 13.051 0.442383 13.501 0.442383H18.001C18.076 0.442383 18.226 0.442383 18.301 0.517383C18.451 0.592383 18.601 0.742383 18.676 0.892383C18.751 0.967383 18.751 1.11738 18.751 1.19238Z"
                  fill="#27AE60"
                />
              </svg>
              <p className="text-[10px] font-semibold text-[#27AE60]">12.5%</p>
            </Flex>
          </div>
        </SpaceBetween>
      </Flex>
      <Flex className="justify-end gap-4">
        <Button className="font-[400]" onClick={toggleWithdrawalOpenState}>
          Initiate Withdrawal
        </Button>
        <Button className="font-[400]" variant={"outline"}>
          Filters
        </Button>
        <Button className="font-[400]" variant={"outline"}>
          Download all
        </Button>
      </Flex>
      <CustomTable
        currentPage={3}
        totalPages={8}
        TableHeadComponent={<TableHeadChildren />}
      >
        {walletData.map((item: never, rowIndex: number) => (
          <TableRow key={rowIndex}>
            {keys.map((key, cellIndex) => (
              <TableCell key={cellIndex + String(item[key])}>
                {key === "paidOn" ? format(item[key], "PPP") : item[key]}
              </TableCell>
            ))}
            <TableCell>
              <Button
                variant={"link"}
                onClick={toggleViewOpenState}
                className="py-0 px-0 text-occupy-primary text-[14px]"
              >
                View
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </CustomTable>
      <ViewTransactiondetailModal
        isOpen={isViewOpen}
        toggleOpenState={toggleViewOpenState}
      />
      <InitiateWithdrawalModal
        isOpen={isWithdrawalOpen}
        toggleOpenState={toggleWithdrawalOpenState}
      />
    </div>
  );
};

export default Page;
