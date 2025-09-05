import { useRef } from "react";
import { Input } from "../ui/input";
import { SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const SearchBar = ({
  onSearch,
  placeholder = "Search ..",
  inputClassname,
}: {
  onSearch: (value: string) => void;
  placeholder?: string;
  inputClassname?: string;
}) => {
  const ref = useRef<HTMLInputElement | null>(null);
  return (
    <div className="relative w-full max-w-[400px]">
      <Input
        ref={ref}
        placeholder={placeholder}
        className={cn(
          "pl-12 py-4 border-[#C4C4C4] rounded-[20px]",
          inputClassname
        )}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch(ref.current?.value as string);
          }
        }}
      />

      <span className="absolute text-grey-500 left-4 top-[50%] translate-y-[-50%]">
        <SearchIcon />
      </span>
    </div>
  );
};

export default SearchBar;
