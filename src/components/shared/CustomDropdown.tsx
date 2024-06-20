import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface DropdownMenuContent {
  label: string;
  onClick: () => void;
  Icon?: any;
}
const CustomDropdown = ({
  BtnComponent,
  dropdownData,
  triggerClassName,
}: {
  BtnComponent: React.JSX.Element;
  dropdownData: DropdownMenuContent[];
  triggerClassName?: string;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "!px-2 border border-[#C4C4C4] py-3 rounded-md ",
          triggerClassName
        )}
      >
        {BtnComponent}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        {dropdownData.map(({ label, onClick, Icon }, index) => (
          <DropdownMenuItem className="" key={index} onClick={onClick}>
            {Icon && (
              <Icon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            )}
            <span>{label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CustomDropdown;
