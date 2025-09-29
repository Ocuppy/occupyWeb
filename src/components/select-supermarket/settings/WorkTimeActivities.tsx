import Flex from "@/components/shared/Flex";
import ActionButtons from "@/components/shared/form/ActionButtons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import Select from "react-select";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

const baseUrl = "http://203.161.60.248:8000/";

const WorkTimeActivities = ({
  step2FormField,
  addNewField,
}: {
  step2FormField: any[];
  addNewField?: () => void;
}) => {
  const { toast } = useToast();
  const [addLoading, setAddLoading] = useState(false);

  const handleWorkTimeActivitiesSubmit = async () => {
    try {
      setAddLoading(true);
      const response = await fetch(`${baseUrl}/work-time-activities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // data
        }),
      });
      const data = await response.json();
      if (data.success) {
        toast({
          title: "Work Time Activities",
          description: "Work Time Activities added successfully",
          variant: "default",
        });
      } else {
        toast({
          title: "Work Time Activities",
          description: "Work Time Activities failed to add",
          variant: "destructive",
        });
      }
    } catch (error) {
      setAddLoading(false);
      toast({
        title: "Work Time Activities",
        description: "Work Time Activities failed to add",
        variant: "destructive",
      });
    }
  };

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
                        // console.log(e, "eeeee");
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
                        // console.log(e, "eeeee");
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
        <ActionButtons
          isLoading={addLoading}
          onSubmit={handleWorkTimeActivitiesSubmit}
        />
      </div>
    </Flex>
  );
};

export default WorkTimeActivities;
