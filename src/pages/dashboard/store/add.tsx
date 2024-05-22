import CustomForm from "@/components/shared/CustomForm";
import ActionButtons from "@/components/shared/form/ActionButtons";
import {
  withSteppedFormContextProvider,
  useSteppedFormContext,
} from "@/context/SteppedFormContext";
import { AddStoreFormFields } from "@/data";
import { AddStoreSchema } from "@/formValidation";
import { NextPageWithLayout } from "@/pages/_app";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import Flex from "@/components/shared/Flex";
import Select from "react-select";
import { IFieldValue } from "@/types";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { InformationIcon } from "@/assets/icon/icons";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
// import "react-select/dist/react-select.css";

const Page: NextPageWithLayout = () => {
  const { savedFormValues, onSaveFormValues, currentStep, goNext } =
    useSteppedFormContext();
  const isFirstStep = currentStep === 1;
  const [value, onChange] = useState("10:00");
  const daysOfWeek = [
    { label: "Monday", value: "Monday" },
    { label: "Tuesday", value: "Tuesday" },
    { label: "Wednesday", value: "Wednesday" },
    { label: "Thursday", value: "Thursday" },
    { label: "Friday", value: "Friday" },
    { label: "Saturday", value: "Saturday" },
    { label: "Sunday", value: "Sunday" },
  ];
  const defaultStep2Fields = [
    { label: "Days of Activities", name: "activityDays", options: daysOfWeek },
    { label: "Opening Time", name: "openingTime" },
    { label: "Closing Time", name: "closingTime" },
  ];
  const [step2FormField, setFormField] = useState<IFieldValue[][]>([
    defaultStep2Fields,
  ]);

  const addNewField = () => {
    if (step2FormField.length === 3) return;
    else setFormField([...step2FormField, defaultStep2Fields]);
  };

  const stepState = [
    {
      title: "Supermarket Information",
      desc: "Supermarket/Partners Information",
    },
    {
      title: "Work Time Activities",
      desc: "You can set up the supermarket activity period",
    },
  ];

  return (
    <div className="p-6 rounded-md h-full bg-white">
      <Flex className="items-start h-full gap-8">
        <div className="h-full grow overflow-auto hideScroll border-dashed border rounded-md bg-white px-6 py-6">
          <>
            {isFirstStep ? (
              <CustomForm
                FormSchema={AddStoreSchema}
                defaultValues={
                  savedFormValues || {
                    inspectionDate: "",
                    phoneNumber: null,
                    supermarketAddress: "",
                    supermarketLocation: "",
                    supermarketName: "",
                  }
                }
                fields={AddStoreFormFields}
                onSubmit={(data) => {
                  console.log("data", data);
                  onSaveFormValues(data);
                  goNext();
                }}
              >
                <ActionButtons />
              </CustomForm>
            ) : (
              <Flex className="h-full flex items-start justify-center">
                <div className="w-full">
                  <Flex className="flex-col gap-4">
                    {step2FormField.map((field, index) => (
                      <Flex key={index} className="w-full">
                        {field.map((item, idx) => (
                          <>
                            {item?.options ? (
                              <Select
                                key={idx}
                                closeMenuOnSelect={false}
                                // components={animatedComponents}
                                defaultValue={savedFormValues?.workTime}
                                isMulti
                                options={item.options}
                                className="w-1/2"
                              />
                            ) : (
                              <Input
                                key={idx}
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
                  <div className="mt-4">
                    <Button
                      onClick={addNewField}
                      className="text-occupy-primary gap-4 px-0 font-semibold"
                      variant={"ghost"}
                    >
                      <PlusIcon />
                      <span>Add Sub-sequent days</span>
                    </Button>
                  </div>
                  <ActionButtons />
                </div>
              </Flex>
            )}
          </>
        </div>
        <div className="flex-col bg-white rounded-md border-dashed border p-4 flex gap-4">
          {stepState.map((item, idx) => (
            <>
              <Flex className="gap-4" key={idx}>
                <InformationIcon />
                <div className="flex-col justify-start items-start">
                  <p
                    className={cn(
                      "text-[#212330] font-medium",
                      idx === currentStep - 1 && "text-occupy-primary"
                    )}
                  >
                    {item.title}
                  </p>
                  <p className="text-[12px] text-[#848484]">{item.desc}</p>
                </div>
              </Flex>
              {idx !== stepState.length - 1 && <Separator />}
            </>
          ))}
        </div>
      </Flex>
    </div>
  );
};

export default withSteppedFormContextProvider(Page);
