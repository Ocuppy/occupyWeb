import React from "react";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import IconButton from "../shared/IconButton";
import { BellIcon } from "lucide-react";
import { Button } from "../ui/button";
import { AngleLeftIcon, UserClockIcon } from "@/assets/icon/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const DashboardHeader = () => {
  return (
    <header className="flex pl-8 pr-4 left-[250px] right-0 z-10 fixed items-center h-[100px] bg-white">
      <div className="flex w-full justify-between items-center">
        <Input
          className="max-w-[300px]"
          placeholder="Search your grocery products etc . . . "
        />
        <div className="flex gap-8 items-center">
          <div className="flex items-center space-x-2">
            <Switch id="online-mode" />
            <Label htmlFor="online-mode">Airplane Mode</Label>
          </div>
          <Button
            onClick={() => {}}
            className="rounded-lg px-4 py-6 bg-[#f6f6f6] text-black"
          >
            <UserClockIcon width={21} className={``} />
          </Button>
          <Button
            onClick={() => {}}
            className="rounded-lg px-4 py-6 bg-[#f6f6f6] text-black"
          >
            <BellIcon width={21} className={``} />
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
      </div>
    </header>
  );
};

export default DashboardHeader;
