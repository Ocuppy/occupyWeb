import Flex from "@/components/shared/Flex";
import ActionButtons from "./ActionButtons";
import { NotificationFormFields } from "@/data";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const NotificationSettings = () => {
  return (
    <div className="flex flex-col gap-6 items-center">
      <div className="flex w-full flex-col gap-2 ">
        {NotificationFormFields.map((field, index) => (
          <div key={index}>
            <Flex className="gap-4">
              <Switch />
              <div>
                <p className="font-medium text-[#212330] mb-2">{field.label}</p>
                <p className="text-[12px] text-[#848484]">
                  {field.description}
                </p>
              </div>
            </Flex>
            <Separator className="my-4" />
          </div>
        ))}
      </div>
      <ActionButtons
        onClickPrimaryBtn={() => {}}
        onClickSecondaryBtn={() => {}}
        primaryBtnTitle="Save Update"
        secondaryBtnTitle="Cancel"
      />
    </div>
  );
};

export default NotificationSettings;
