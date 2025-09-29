import ControlledCustomDialog from "@/components/shared/ControlledCustomDialog";
import Flex from "@/components/shared/Flex";
import MappedFormFields from "@/components/shared/MappedFormFields";
import SpaceBetween from "@/components/shared/SpaceBetween";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { IModalProps } from "@/types";
import { useForm } from "react-hook-form";
import useSteps from "@/hooks/useSteps";
import { CloseIcon } from "./CloseIcon";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";

const InitiateWithdrawalModal = ({
  isOpen,
  toggleOpenState,
}: Pick<IModalProps, "isOpen" | "toggleOpenState">) => {
  const form = useForm<any>({
    // resolver: zodResolver(schemas[activetab]),
    defaultValues: {},
  });

  const onSubmit = (data: any) => {
    // console.log(data);
  };
  const withdrawalFormFields = [
    {
      name: "amount",
      label: "Withdrawal Amount",
      placeholder: "Enter Withdrawal Amount",
      type: "number",
    },
    {
      name: "bank",
      label: "Bank",
      placeholder: "Select Bank",
      type: "select",
      options: [],
    },
    {
      name: "accountNumber",
      label: "Account Number",
      placeholder: "Enter Account Number",
      type: "number",
    },
  ];

  const { goBack, goNext, isFirstStep } = useSteps();
  const [value, setValue] = useState("");
  return (
    <ControlledCustomDialog
      showCloseButton={false}
      isOpen={isOpen}
      toggleOpenState={toggleOpenState!}
      className="bg-white nunito p-6  sm:max-w-[480px] md:max-w-[800px]"
    >
      <div>
        <SpaceBetween>
          <p className="text-[24px] text-[#161616]">
            {isFirstStep
              ? "Initiate Withdrawal"
              : "Initiate Withdrawal Confirmation"}
          </p>
          <Button
            className="hover:bg-transparent hover:opacity-[85%] hover:duration-500"
            variant="ghost"
            onClick={toggleOpenState}
          >
            <CloseIcon />
          </Button>
        </SpaceBetween>
        <Separator className="my-4" />
        {isFirstStep ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <div className="grid sm:grid-cols-2 gap-4">
                <MappedFormFields
                  form={form}
                  formFieldValues={withdrawalFormFields}
                />
              </div>
              <Flex className="justify-end">
                <Button onClick={toggleOpenState} variant={"outline"}>
                  Discard
                </Button>
                <Button onClick={goNext}>Initiate Withdawal</Button>
              </Flex>
            </form>
          </Form>
        ) : (
          <>
            <p className="text-[#606778] text-[14px] font-medium">
              Please enter the 6-digit verification code that was sent to your
              mail. It’s valid for 30 minutes. This is to validate your
              Withdrawal
            </p>
            <div className="my-6">
              <InputOTP
                maxLength={8}
                value={value}
                onChange={(value) => setValue(value)}
              >
                <InputOTPGroup className="w-full">
                  {[...Array(8)].map((_, index) => (
                    <InputOTPSlot
                      className="size-[40px] md:size-[64px]"
                      key={index}
                      index={index}
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>
            <Flex className="justify-end">
              <Button onClick={goBack} variant={"outline"}>
                Back
              </Button>
              <Button onClick={toggleOpenState}>Authenticate Withdawal</Button>
            </Flex>
          </>
        )}
      </div>
    </ControlledCustomDialog>
  );
};

export default InitiateWithdrawalModal;
