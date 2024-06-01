import Flex from "@/components/shared/Flex";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import CategoryItem from "../dashboard/CategoryItem";

const Inventory = () => {
  return (
    <div className="mt-12">
      <h1>Inventory page</h1>
      <p>a brief paragraph, page in construction</p>

      <ScrollArea className="w-full mt-12">
        <Flex className="">
          {Array(12)
            .fill("i")
            .map((_, idx) => (
              <CategoryItem key={idx} title={`Product ${idx + 1}`} />
            ))}
        </Flex>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default Inventory;
