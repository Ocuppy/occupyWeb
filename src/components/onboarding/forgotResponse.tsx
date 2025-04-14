import Image from "next/image";
import React from "react";
import mail from "../../../public/icons/mail.svg";
import Link from "next/link";

interface ForgotResponseProps {
  resetForm: () => void;
  resendEmail: () => void;
}

const ForgotResponse: React.FC<ForgotResponseProps> = ({ resetForm,resendEmail }) => {
  return (
    <div className="flex w-full max-w-lg flex-col items-center gap-8 rounded-lg px-6 py-12 lg:bg-white lg:px-8 lg:shadow-lg">
      <Image className="w-[120px]" src={mail} alt="logo" />
      <div className="flex w-full flex-col items-start gap-3">
        <h3 className="text-2xl font-medium text-[#12141A]">Email Sent</h3>
        <p className="pb-12 text-sm font-medium text-[#606778]">
          We have sent you an email at deborah@occupy.com. Check your inbox and
          follow the instruction to reset your account password.
        </p>

        <p className="pt-4 text-center text-sm text-[#7B8499] lg:text-end">
          Did not receive the email?{" "}
          <Link href="#" onClick={resendEmail} className="font-medium text-[#A74E8E] underline">
            Resend Email
          </Link>
        </p>
        <p className="pt-4 text-center text-sm text-[#7B8499] lg:text-end">
          Received the Email?{" "}
          <Link
            href="/auth/reset-password"
            className="font-medium text-[#A74E8E] underline"
          >
            Proceed to enter Code
          </Link>
        </p>
        <p className="pt-4 text-center text-sm text-[#7B8499] lg:text-end">
          Wrong Email Address?{" "}
          <Link
            href="#"
            onClick={resetForm}
            className="font-medium text-[#A74E8E] underline"
          >
            Change Email Address
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotResponse;
