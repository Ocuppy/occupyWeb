import React, { useState, useEffect } from "react";
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

  console.log(data, error);

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
    onSubmit: async (values, actions) => {
      const { otp, newPassword } = values;
      resetPassword({ token: otp, new_password: newPassword });
      // console.log("Form values submitted:", { otp, newPassword });
    },
  });

  if (isSuccess) {
    dispatch(setCredentials({ token: data.password }));

    router.push("/dashboard");
  }

  useEffect(() => {
    if (error) {
      if (isFetchBaseQueryErrorType(error)) {
        // const errorData = error.data as {
        //   messages: { message: string }[];
        //   detail: string;
        // } & Record<string, any>;

        toast({
          // description: `${errorData.messages[0].message}`,
          // title: `${errorData.detail} `,
          title: `Error`,
          description: `Error resetting password`,
          variant: "destructive",
        });
      }
    }
  }, [error, toast]);

  return (
    <main className="flex min-h-screen w-full flex-col bg-white md:bg-[#F9FBFD] lg:items-center lg:justify-center">
      {isLoading && (
        <div className="fixed right-0 top-0 z-[10000] h-screen w-screen bg-white bg-opacity-20 backdrop-blur-sm">
          <div className="flex h-full w-full items-center justify-center">
            <ClapSpinner />
          </div>
        </div>
      )}
      <div className="my-20 flex w-full max-w-xl flex-col items-center gap-8 rounded-lg px-6 py-12 lg:bg-white lg:px-8 lg:shadow-lg">
        <Image className="w-[120px]" src={OccupyLogo} alt="logo" />
        <div className="flex w-full flex-col items-start gap-3">
          <h3 className="text-2xl font-medium text-[#12141A]">
            OTP Verification
          </h3>
          <p className="pb-12 text-sm font-medium text-[#606778]">
            Please enter the 6-digit verification code that was sent to your
            mail. It’s valid for 30 minutes.
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
              <div className="mt-2 text-sm text-red-500">
                {formik.errors.otp}
              </div>
            )}

            <div className="mt-8 flex w-full flex-col items-start gap-3">
              <h3 className="text-2xl font-medium text-[#12141A]">
                Create New Password
              </h3>
              <p className="pb-12 text-sm font-medium text-[#606778]">
                Your new password must be different from any of your previous
                passwords.
              </p>

              <div className="flex w-full flex-col gap-4">
                <div className="relative flex w-full flex-col gap-2">
                  <label
                    htmlFor="newPassword"
                    className="text-sm font-medium text-[#606778]"
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
                        ? "w-full border-red-700"
                        : "w-full"
                    }
                  />
                  <div
                    className="absolute right-4 top-10 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </div>
                  {formik.touched.newPassword && formik.errors.newPassword ? (
                    <div className="text-sm text-red-500">
                      {formik.errors.newPassword}
                    </div>
                  ) : null}
                </div>

                <div className="relative flex w-full flex-col gap-2">
                  <label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium text-[#606778]"
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
                        ? "w-full border-red-700"
                        : "w-full"
                    }
                  />
                  <div
                    className="absolute right-4 top-10 cursor-pointer"
                    onClick={toggleVisibility}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </div>
                  {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword ? (
                    <div className="text-sm text-red-500">
                      {formik.errors.confirmPassword}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="mt-8 w-full text-end">
                <Button type="submit" className="w-full rounded-md">
                  Reset Password
                </Button>
              </div>
            </div>
          </form>
        </div>
        <div className="flex w-full items-center justify-center gap-3 text-center text-sm font-light text-black">
          <Link href="#">Help</Link>
          <Link href="#">Privacy</Link>
          <Link href="#">Terms</Link>
        </div>
      </div>
    </main>
  );
};

export default ResetPassword;
