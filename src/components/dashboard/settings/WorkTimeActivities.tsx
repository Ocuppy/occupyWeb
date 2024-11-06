import Flex from "@/components/shared/Flex";
import ActionButtons from "@/components/shared/form/ActionButtons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Select from "react-select";
import { PlusIcon } from "lucide-react";
import React from "react";

const WorkTimeActivities = ({
  step2FormField,
  addNewField,
}: {
  step2FormField: any[];
  addNewField?: () => void;
}) => {
  return (
    <Flex className="flex h-full items-center justify-center">
      <div className="w-full">
        <Flex className="flex-col gap-4">
          {step2FormField.map((field, index) => (
            <Flex key={index} className="w-full">
              {field.map((item: any, idx: number) => (
                <>
                  {item?.options ? (
                    <Select
                      key={idx}
                      closeMenuOnSelect={false}
                      // components={animatedComponents}
                      onChange={(e) => {
                        console.log(e, "eeeee");
                      }}
                      defaultValue={""}
                      isMulti
                      options={item.options}
                      className="w-1/2"
                    />
                  ) : (
                    <Input
                      key={idx}
                      onChange={(e) => {
                        console.log(e, "eeeee");
                      }}
                      className="w-1/4"
                      placeholder="hh:mm"
                      type="time"
                    />
                  )}
                </>
              ))}
            </Flex>
          ))}
        </Flex>
        <div className="mb-12 mt-4">
          <Button
            onClick={addNewField}
            className="gap-4 px-0 font-semibold text-occupy-primary"
            variant={"ghost"}
          >
            <PlusIcon />
            <span>Add Sub-sequent days</span>
          </Button>
        </div>
        <ActionButtons />
      </div>
    </Flex>
  );
};

export default WorkTimeActivities;
