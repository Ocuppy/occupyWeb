import React, { useState } from "react";
import { Button } from "../ui/button";
import { Formik, FormikHelpers, FormikProps, useFormik } from "formik";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/inputOtp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import OccupyLogo from "../../../public/occupy-logo.png";
import Image from "next/image";
import * as Yup from "yup";
import { useRouter } from "next/router";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "../ui/input";

interface FormValues {
  otp: string;
  newPassword: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const validationSchema = Yup.object({
    otp: Yup.string()
      .matches(/^[0-9a-zA-Z]{6}$/, "OTP must be exactly 6 characters")
      .required("OTP is required"),
    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("New Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), undefined], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      const { otp, newPassword } = values;
      console.log("Form values submitted:", { otp, newPassword });
      router.push("/dashboard");
    },
  });

  return (
    <main className="md:bg-[#F9FBFD] bg-white w-full min-h-screen flex flex-col lg:items-center lg:justify-center">
      <div className="lg:bg-white px-6 lg:px-8 my-20 py-12 w-full max-w-xl rounded-lg lg:shadow-lg flex flex-col gap-8 items-center">
        <Image className="w-[120px]" src={OccupyLogo} alt="logo" />
        <div className="flex flex-col items-start gap-3 w-full">
          <h3 className="text-[#12141A] font-medium text-2xl">OTP Verification</h3>
          <p className="text-sm text-[#606778] font-medium pb-12">
            Please enter the 6-digit verification code that was sent to your mail. It’s valid
            for 30 minutes.
          </p>
          <form onSubmit={formik.handleSubmit} className="w-full">
            <InputOTP
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
              onChange={(value: string) => formik.setFieldValue("otp", value)}
            >
              <InputOTPGroup>
                {[...Array(6)].map((_, index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    error={!!(formik.touched.otp && formik.errors.otp)}
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
            {formik.errors.otp && formik.touched.otp && (
              <div className="text-red-500 text-sm mt-2">{formik.errors.otp}</div>
            )}

            <div className="flex flex-col items-start gap-3 w-full mt-8">
              <h3 className="text-[#12141A] font-medium text-2xl">Create New Password</h3>
              <p className="text-sm text-[#606778] font-medium pb-12">
                Your new password must be different from any of your previous passwords.
              </p>

              <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col gap-2 w-full relative">
                  <label htmlFor="newPassword" className="font-medium text-sm text-[#606778]">
                    New Password
                  </label>
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="newPassword"
                    name="newPassword"
                    placeholder="Enter Password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.newPassword}
                    className={
                      formik.touched.newPassword && formik.errors.newPassword
                        ? "border-red-700 w-full"
                        : "w-full"
                    }
                  />
                  <div
                    className="absolute top-10 right-4 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </div>
                  {formik.touched.newPassword && formik.errors.newPassword ? (
                    <div className="text-red-500 text-sm">{formik.errors.newPassword}</div>
                  ) : null}
                </div>

                <div className="flex flex-col gap-2 w-full relative">
                  <label
                    htmlFor="confirmPassword"
                    className="font-medium text-sm text-[#606778]"
                  >
                    Confirm Password
                  </label>
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    className={
                      formik.touched.confirmPassword && formik.errors.confirmPassword
                        ? "border-red-700 w-full"
                        : "w-full"
                    }
                  />
                  <div
                    className="absolute top-10 right-4 cursor-pointer"
                    onClick={toggleVisibility}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </div>
                  {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                    <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
                  ) : null}
                </div>
              </div>

              <div className="text-end w-full mt-8">
                <Button type="submit" className="w-full lg:w-40 rounded-md">
                  Reset Password
                </Button>
              </div>
            </div>
          </form>
        </div>
        <div className="flex items-center text-sm font-light text-center text-black justify-center gap-3 w-full">
          <Link href="#">Help</Link>
          <Link href="#">Privacy</Link>
          <Link href="#">Terms</Link>
        </div>
      </div>
    </main>
  );
};

export default ResetPassword;
