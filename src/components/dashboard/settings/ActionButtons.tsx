import { Button } from "@/components/ui/button";
import Flex from "@/components/shared/Flex";

const ActionButtons = ({
  onClickPrimaryBtn,
  onClickSecondaryBtn,
  primaryBtnTitle,
  secondaryBtnTitle,
}: {
  onClickPrimaryBtn: () => void;
  onClickSecondaryBtn: () => void;
  primaryBtnTitle: string;
  secondaryBtnTitle: string;
}) => {
  return (
    <div className="w-full flex justify-center">
      <Flex>
        <Button onClick={onClickPrimaryBtn} type="submit">
          {primaryBtnTitle}
        </Button>
        <Button onClick={onClickSecondaryBtn} type="button" variant={"outline"}>
          {secondaryBtnTitle}
        </Button>
      </Flex>
    </div>
  );
};

export default ActionButtons;
