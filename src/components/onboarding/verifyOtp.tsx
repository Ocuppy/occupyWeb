import Image from "next/image";
import OccupyLogo from "../../../public/occupy-logo.png";
import Link from "next/link";
import { Button } from "../ui/button";
import { Formik, Form, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/inputOtp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useState, useEffect, useRef } from "react";
import { useVerifyAccountMutation } from "@/store/redux/services/authSlice/authApiSlice";
import { useAppDispatch } from "@/store/redux/hooks";
import { ClapSpinner } from "react-spinners-kit";
import { useToast } from "../ui/use-toast";
import isFetchBaseQueryErrorType from "@/store/redux/fetchErrorType";

interface FormValues {
  otp: string;
}

const VerifyOtp: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();
  const navigationTimeoutRef = useRef<NodeJS.Timeout>();
  
  const [verifyAccount, { isLoading, isSuccess, error }] = useVerifyAccountMutation();
  const [timeLeft, setTimeLeft] = useState(2 * 60);

  const initialValues: FormValues = {
    otp: "",
  };

  const validationSchema = Yup.object({
    otp: Yup.string()
      .matches(/^[0-9a-zA-Z]{6}$/, "OTP must be exactly 6 characters")
      .required("OTP is required"),
  });

  const handleSubmit = (values: FormValues) => {
    verifyAccount({ token: values.otp });
  };

  // Handle success case
  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Success",
        description: "OTP Verification successful",
        variant: "default",
      });

      navigationTimeoutRef.current = setTimeout(() => {
        router.push("/auth/login");
      }, 1500);
    }

    // Cleanup timeout on unmount or when success state changes
    return () => {
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, [isSuccess, router, toast]);

  // Handle error case
  useEffect(() => {
    if (error) {
      if (isFetchBaseQueryErrorType(error)) {
        const errorData = error.data as {
          messages?: { message: string }[];
          detail?: string;
        } & Record<string, any>;

        toast({
          title: "Error",
          description: errorData?.messages?.[0]?.message || errorData?.detail || "Error verifying OTP",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      }
    }
  }, [error, toast]);

  // Handle countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        const newTimeLeft = prevTimeLeft - 1;
        return newTimeLeft > 0 ? newTimeLeft : 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleResendCode = () => {
    if (timeLeft === 0) {
      // Add logic to resend OTP
      setTimeLeft(2 * 60); // Reset timer
      toast({
        title: "Code Resent",
        description: "A new verification code has been sent to your email",
      });
    }
  };

  return (
    <section
      className="flex min-h-screen w-full lg:relative lg:items-center lg:justify-center"
      style={{
        backgroundImage: `url('/images/onboarding.png')`,
        backgroundSize: "cover",
      }}
    >
      {isLoading && (
        <div className="fixed right-0 top-0 z-[10000] h-screen w-screen bg-white bg-opacity-20 backdrop-blur-sm">
          <div className="flex h-full w-full items-center justify-center">
            <ClapSpinner />
          </div>
        </div>
      )}
      
      <div className="flex w-full flex-col items-center justify-start gap-20 py-20 lg:relative lg:z-10 lg:flex-row lg:px-8">
        <h1 className="hidden w-full max-w-2xl text-5xl font-bold text-[#EBF7FB] lg:block">
          Manage your Supermarket Operations with ease using our intuitive Dashboard
        </h1>

        <div className="flex w-full flex-col items-center gap-8 rounded-lg bg-white px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:shadow-lg">
          {/* Logo */}
          <Image
            className="w-[100px] sm:w-[120px]"
            src={OccupyLogo}
            alt="logo"
          />

          {/* Content Container */}
          <div className="flex w-full flex-col items-center gap-3">
            <h3 className="text-center text-xl font-medium text-[#12141A] sm:text-2xl">
              OTP verification
            </h3>
            <p className="pb-6 text-center text-sm font-medium text-[#606778] sm:pb-12">
              Please enter the 6-digit verification code that was sent to your
              mail. It&rsquo;s valid for 2 minutes.
            </p>
            
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue, errors, touched }: FormikProps<FormValues>) => (
                <Form className="mx-auto w-full max-w-xs">
                  <div className="mx-auto w-fit">
                    <InputOTP
                      maxLength={6}
                      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                      onChange={(value: string) => setFieldValue("otp", value)}
                    >
                      <InputOTPGroup>
                        {[...Array(6)].map((_, index) => (
                          <InputOTPSlot
                            key={index}
                            index={index}
                            error={!!(touched.otp && errors.otp)}
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  
                  {errors.otp && touched.otp && (
                    <div className="mt-2 text-center text-sm text-red-500">
                      {errors.otp}
                    </div>
                  )}
                  
                  <div className="mt-8 w-full text-center md:mt-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full rounded-md bg-occupy-primary p-3 text-sm text-white sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Verifying..." : "Proceed"}
                    </button>
                    
                    <p className="pt-4 text-center text-sm text-[#7B8499] lg:text-end">
                      Didn&apos;t receive Code?{" "}
                      {timeLeft > 0 ? (
                        <span className="font-medium text-[#A74E8E]">
                          {formatTime(timeLeft)}
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={handleResendCode}
                          className="font-medium text-[#A74E8E] underline hover:no-underline"
                        >
                          Resend Code
                        </button>
                      )}
                    </p>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifyOtp;