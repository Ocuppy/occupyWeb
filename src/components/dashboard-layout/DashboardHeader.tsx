import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { BellIcon } from "lucide-react";
import { Button } from "../ui/button";
import { AngleLeftIcon, UserClockIcon } from "@/assets/icon/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Flex from "../shared/Flex";

const DashboardHeader = () => {
  return (
    <header className="flex pr-4 pl-[270px] w-full right-0 z-10 fixed items-center h-[100px] bg-white">
      <Flex className="w-full pl-10 justify-between">
        <Input
          className="max-w-[300px]"
          placeholder="Search your grocery products etc . . . "
        />
        <div className="flex gap-8 items-center">
          <div className="flex items-center space-x-2">
            <Switch id="online-mode" />
            <Label htmlFor="online-mode">Online</Label>
          </div>
          <Button
            onClick={() => {}}
            className="rounded-lg px-4 py-6 bg-[#f6f6f6] text-black"
          >
            <UserClockIcon width={21} />
          </Button>
          <Button
            onClick={() => {}}
            className="rounded-lg px-4 py-6 bg-[#f6f6f6] text-black"
          >
            <BellIcon width={21} />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex gap-8 items-center relative p-2 border rounded-md ">
                <div className="flex  flex-col">
                  <p className="font-medium opacity-[80%] text-[14px]">
                    Andrew Smith
                  </p>
                  <p className="uppercase opacity-[40%] text-[10px]">
                    Supermarket
                  </p>
                </div>
                <AngleLeftIcon width={16} className="rotate-[-90deg]" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Something</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Flex>
    </header>
  );
};

export default DashboardHeader;
