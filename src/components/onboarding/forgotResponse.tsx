import Image from "next/image";
import React from "react";
import mail from "../../../public/icons/mail.svg";
import Link from "next/link";

interface ForgotResponseProps {
  resetForm: () => void;
}

const ForgotResponse: React.FC<ForgotResponseProps> = ({ resetForm }) => {
  return (
    <div className="lg:bg-white px-6 lg:px-8 py-12 w-full max-w-lg rounded-lg lg:shadow-lg flex flex-col gap-8 items-center">
      <Image className="w-[120px]" src={mail} alt="logo" />
      <div className="flex flex-col items-start gap-3 w-full">
        <h3 className="text-[#12141A] font-medium text-2xl">Email Sent</h3>
        <p className="text-sm text-[#606778] font-medium pb-12">
          We have sent you an email at deborah@occupy.com. Check your inbox and follow the
          instruction to reset your account password.
        </p>

        <p className="text-sm text-[#7B8499] text-center lg:text-end pt-4">
          Did not receive the email?{" "}
          <Link href="#" className="text-[#A74E8E] font-medium underline">
            Resend Email
          </Link>
        </p>
        <p className="text-sm text-[#7B8499] text-center lg:text-end pt-4">
          Received the Email?{" "}
          <Link href="/auth/reset-password" className="text-[#A74E8E] font-medium underline">
            Proceed to enter Code
          </Link>
        </p>
        <p className="text-sm text-[#7B8499] text-center lg:text-end pt-4">
          Wrong Email Address?{" "}
          <Link href="#" onClick={resetForm} className="text-[#A74E8E] font-medium underline">
            Change Email Address
          </Link>
        </p>
      </div>
      <div className="flex items-center text-sm font-light text-center text-black justify-center gap-3 w-full">
        <Link href="#">Help</Link>
        <Link href="#">Privacy</Link>
        <Link href="#">Terms</Link>
      </div>
    </div>
  );
};

export default ForgotResponse;
