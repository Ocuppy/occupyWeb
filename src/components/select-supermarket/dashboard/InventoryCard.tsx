import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Flex from "@/components/shared/Flex";
import CardBox from "../Order-Page/CardBox";

const InventoryCard = () => {
  return (
    <div>
      <ScrollArea className="w-full">
        <Flex className="">
          <CardBox title={"Total Inventory"} count={0} percentage={5} />
          <CardBox title={"Pending Order"} count={0} percentage={5} />
          <CardBox title={"On Transit"} count={0} percentage={5} />
          <CardBox title={"Fulfilled Completed Order"} count={0} percentage={5} />
          <CardBox title={"Returned Order"} count={0} percentage={5} />
          <CardBox title={"Canceled Order"} count={0} percentage={5} />
        </Flex>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default InventoryCard;
