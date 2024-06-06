import Flex from "./Flex";
import { TabsList, TabsTrigger } from "../ui/tabs";
import CustomSelect from "./CustomSelect";
import { addSpaceRemoveUnderscore } from "@/lib/utils";
import { ReactNode } from "react";

const CustomTabslist = ({
  tabsList,
  children,
}: // activeTab,
// handleTabClick,
{
  tabsList: string[];
  children?: ReactNode;
  // handleTabClick: (val: string) => void;
  // activeTab: string;
}) => {
  return (
    <Flex className="justify-between mb-4 items-center flex-wrap">
      <div className="">
        <TabsList className="flex w-fit gap-2">
          {tabsList.map((tab, index) => (
            <TabsTrigger key={index + tab} value={tab}>
              {addSpaceRemoveUnderscore(tab)}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {/* <div className="block sm:hidden">
        <CustomSelect
          selectTriggerClassName="!text-[#000000] gap-4"
          onChangeValue={handleTabClick}
          options={tabsList}
          selectValue={activeTab}
        />
      </div> */}
      {children}
    </Flex>
  );
};

export default CustomTabslist;
