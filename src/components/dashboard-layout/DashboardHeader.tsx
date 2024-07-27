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
    <header className="fixed right-0 z-10 flex h-[100px] w-full items-center bg-white pl-[270px] pr-4">
      <Flex className="w-full justify-between pl-10">
        <input
          type="search"
          name=""
          id=""
          className="h-10 w-full max-w-[500px] rounded-lg bg-[#F9FAFB] px-3 py-6 text-sm ring-offset-white file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
          placeholder="Search your grocery products etc..."
        />
        {/* <Input
          className=""
          placeholder="Search your grocery products etc . . . "
        /> */}
        <div className="flex items-center gap-8">
          <div className="flex items-center space-x-2">
            <Label htmlFor="online-mode">Online</Label>
            <Switch id="online-mode" />
          </div>
          <Button
            onClick={() => {}}
            className="rounded-lg bg-[#f6f6f6] px-4 py-6 text-black"
          >
            <UserClockIcon width={21} />
          </Button>
          <Button
            onClick={() => {}}
            className="rounded-lg bg-[#f6f6f6] px-4 py-6 text-black"
          >
            <BellIcon width={21} />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="relative flex items-center gap-8 rounded-md border p-2">
                <div className="flex flex-col">
                  <p className="text-[14px] font-medium opacity-[80%]">
                    Andrew Smith
                  </p>
                  <p className="text-[10px] uppercase opacity-[40%]">
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
