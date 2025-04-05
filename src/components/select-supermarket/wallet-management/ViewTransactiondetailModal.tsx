import ControlledCustomDialog from "@/components/shared/ControlledCustomDialog";
import CustomAvatar from "@/components/shared/CustomAvatar";
import Flex from "@/components/shared/Flex";
import SpaceBetween from "@/components/shared/SpaceBetween";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { IModalProps } from "@/types";
import { MailWarningIcon } from "lucide-react";
import { ReactNode } from "react";

const CloseIcon = () => (
  <svg
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21.7811 0.9375H3.11442C2.40718 0.9375 1.7289 1.21845 1.2288 1.71855C0.728705 2.21865 0.447754 2.89692 0.447754 3.60417V22.2708C0.447754 22.9781 0.728705 23.6564 1.2288 24.1565C1.7289 24.6565 2.40718 24.9375 3.11442 24.9375H21.7811C22.4883 24.9375 23.1666 24.6565 23.6667 24.1565C24.1668 23.6564 24.4478 22.9781 24.4478 22.2708V3.60417C24.4478 2.89692 24.1668 2.21865 23.6667 1.71855C23.1666 1.21845 22.4883 0.9375 21.7811 0.9375ZM17.2478 19.6042L12.4478 14.8042L7.64775 19.6042L5.78109 17.7375L10.5811 12.9375L5.78109 8.1375L7.64775 6.27083L12.4478 11.0708L17.2478 6.27083L19.1144 8.1375L14.3144 12.9375L19.1144 17.7375L17.2478 19.6042Z"
      fill="#ADB7BE"
    />
  </svg>
);

const DetailsComp = ({
  title,
  value,
  children,
  removeSeparator,
}: {
  title: string;
  value: string;
  children?: ReactNode;
  removeSeparator?: boolean;
}) => (
  <>
    <Flex className="mt-8 mb-4 justify-between">
      <p>{title}</p>
      <Flex>
        <p>{value}</p>
        {children}
      </Flex>
    </Flex>
    {!removeSeparator && <Separator />}
  </>
);

const AnalyticsDetail = ({
  title,
  value,
}: {
  title: string;
  value: string;
}) => (
  <div>
    <p className="text-[#9D99AC] text-[12px] mb-1">{title}</p>
    <p className="text-[#101828] text-[16px]">{value}</p>
  </div>
);

const ViewTransactiondetailModal = ({
  isOpen,
  toggleOpenState,
}: Pick<IModalProps, "isOpen" | "toggleOpenState">) => {
  return (
    <ControlledCustomDialog
      CloseIcon={CloseIcon}
      isOpen={isOpen}
      toggleOpenState={toggleOpenState!}
      className="bg-white nunito p-6  sm:max-w-[480px] md:max-w-[800px]"
    >
      <div className="px-6  py-4 bg-[#FBFBFB] rounded-[24px]">
        <SpaceBetween>
          <Flex>
            <CustomAvatar src="" alt="" fallback="SM" className="size-[60px]" />
            <div>
              <p className="text-[16px] text-[#101828]">Jonathan Eke</p>
              <p className="text-[#9d99ac] text-[12px] font-[400]">
                Paid on Oct 23, 2023
              </p>
            </div>
          </Flex>
          <p className="text-[#101828] font-bold">NGN 5,000.32</p>
        </SpaceBetween>
        <div className="pr-8">
          <DetailsComp title="Reference:" value="occupy-user-37492ad7901342s" />
          <DetailsComp title="Channel" value="Card" />
          <DetailsComp
            title="Paid at:"
            value="Friday, October 27, 2023 8.58am"
          />
          <DetailsComp title="Total Money" value="NGN9,500.00" />
          <DetailsComp title="Your Account:" value="NGN9,000.00" />
          <DetailsComp title="Occupy Admin" value="NGN500.00" />
          <SpaceBetween className="pt-8 pb-12">
            <Flex className="gap-4">
              <MailWarningIcon />
              <p className="text-[14px] font-semibold text-[#060f27]">
                Blacklist this customer
              </p>
            </Flex>
            <Switch />
          </SpaceBetween>
          <div className="mt-8 mb-6">
            <p className="text-[18px] text-[#101828] mb-4">Analytics</p>
            <div className="grid grid-cols-2 gap-12">
              <AnalyticsDetail title="Payment Type" value="Mastercard Debit" />
              <AnalyticsDetail
                title="Card Number"
                value="52233829 * * * * 3221"
              />
              <AnalyticsDetail title="IP Address" value="105.113.26.42" />
              <AnalyticsDetail title="IP Address" value="Guaranty Trust Bank" />
            </div>
          </div>
        </div>
      </div>
    </ControlledCustomDialog>
  );
};

export default ViewTransactiondetailModal;
