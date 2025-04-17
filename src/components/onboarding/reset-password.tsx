import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { useFormik } from "formik";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/inputOtp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import OccupyLogo from "../../../public/occupy-logo.png";
import Image from "next/image";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "../ui/input";
import { ClapSpinner } from "react-spinners-kit";
import { useToast } from "../ui/use-toast";
import isFetchBaseQueryErrorType from "@/store/redux/fetchErrorType";
import { useResetPwdMutation } from "@/store/redux/services/authSlice/authApiSlice";
import { setCredentials } from "@/store/redux/services/authSlice/authSlice";
import { useAppDispatch } from "@/store/redux/hooks";

interface FormValues {
  otp: string;
  newPassword: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetPassword, { isLoading, error, isSuccess, data }] =
    useResetPwdMutation();

  const { toast } = useToast();
  const dispatch = useAppDispatch();

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
    onSubmit: async (values) => {
      const { otp, newPassword } = values;
      resetPassword({ token: otp, new_password: newPassword });
    },
  });

  if (isSuccess) {
    toast({
      title: "Success",
      description: "Password reset successfully",
      variant: "default",
    });

    setTimeout(() => {
      router.push("/auth/login");
    }, 1500);
  }

  useEffect(() => {
    if (error) {
      if (isFetchBaseQueryErrorType(error)) {
        toast({
          title: `Error`,
          description: `Error resetting password`,
          variant: "destructive",
        });
      }
    }
  }, [error, toast]);

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-white md:bg-[#F9FBFD]">
      {isLoading && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-white bg-opacity-20 backdrop-blur-sm">
          <ClapSpinner />
        </div>
      )}

      <div className="w-full max-w-xl px-4 py-8 sm:px-6 sm:py-12 lg:rounded-lg lg:bg-white lg:shadow-lg">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <Image
            className="w-[100px] sm:w-[120px]"
            src={OccupyLogo}
            alt="logo"
          />

          {/* Content */}
          <div className="w-full text-center">
            <h3 className="text-xl font-medium text-[#12141A] sm:text-2xl">
              OTP Verification
            </h3>
            <p className="mt-2 text-sm text-[#606778]">
              Please enter the 6-digit verification code that was sent to your
              mail. It&apos;s valid for 30 minutes.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={formik.handleSubmit}
            className="mx-auto w-full max-w-md"
          >
            {/* OTP Input */}
            <div className="flex flex-col items-center gap-4">
              <InputOTP
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                onChange={(value: string) => formik.setFieldValue("otp", value)}
                className="justify-center"
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
                <div className="text-sm text-red-500">{formik.errors.otp}</div>
              )}
            </div>

            {/* Password Section */}
            <div className="mt-8 text-center">
              <h3 className="text-xl font-medium text-[#12141A] sm:text-2xl">
                Create New Password
              </h3>
              <p className="mt-2 text-sm text-[#606778]">
                Your new password must be different from any of your previous
                passwords.
              </p>
            </div>

            <div className="mt-6 space-y-4">
              {/* New Password */}
              <div className="relative">
                <label
                  htmlFor="newPassword"
                  className="mb-1 block text-sm font-medium text-[#606778]"
                >
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
                      ? "border-red-700"
                      : ""
                  }
                />
                <button
                  type="button"
                  className="absolute right-3 top-9 text-gray-400"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {formik.touched.newPassword && formik.errors.newPassword && (
                  <div className="mt-1 text-sm text-red-500">
                    {formik.errors.newPassword}
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <label
                  htmlFor="confirmPassword"
                  className="mb-1 block text-sm font-medium text-[#606778]"
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
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                      ? "border-red-700"
                      : ""
                  }
                />
                <button
                  type="button"
                  className="absolute right-3 top-9 text-gray-400"
                  onClick={toggleVisibility}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <div className="mt-1 text-sm text-red-500">
                      {formik.errors.confirmPassword}
                    </div>
                  )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <Button
                type="submit"
                className="w-full py-3 text-sm sm:text-base"
              >
                Reset Password
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ResetPassword;
