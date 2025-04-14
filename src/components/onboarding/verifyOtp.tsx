import Image from "next/image";
import OccupyLogo from "../../../public/occupy-logo.png";
import Link from "next/link";
import { Button } from "../ui/button";
import { Formik, Form, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/inputOtp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useState, useEffect } from "react";
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

  const [verifyAccount, { isLoading, isSuccess, error, data }] =
    useVerifyAccountMutation();
  const initialValues: FormValues = {
    otp: "",
  };

  const validationSchema = Yup.object({
    otp: Yup.string()
      .matches(/^[0-9a-zA-Z]{6}$/, "OTP must be exactly 6 characters")
      .required("OTP is required"),
  });

  const handleSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>,
  ) => {
    // console.log("OTP entered:", values.otp);
    verifyAccount({ token: values.otp });
  };

  if (isSuccess) {
    router.push("/auth/login");
  }
  const { toast } = useToast();

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
          title: `Error `,
          description: `Error verifying`,
          variant: "destructive",
        });
      }
    }
  }, [error, toast]);

  const [timeLeft, setTimeLeft] = useState(2 * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => (prevTimeLeft > 0 ? prevTimeLeft - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
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
          Manage your Supermarket Operations with ease using our intuitive
          Dashboard
        </h1>

        <div className="flex w-full flex-col items-center gap-8 rounded-lg bg-white px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:shadow-lg">
          {/* Logo */}
          <Image className="w-[100px] sm:w-[120px]" src={OccupyLogo} alt="logo" />
  
          {/* Content Container */}
          <div className="flex w-full flex-col items-center gap-3"> {/* Changed to items-center */}
            <h3 className="text-xl sm:text-2xl font-medium text-[#12141A] text-center"> {/* Added text-center */}
              OTP verification
            </h3>
            <p className="pb-6 sm:pb-12 text-sm text-center font-medium text-[#606778]">
              Please enter the 6-digit verification code that was sent to your
              mail. It's valid for 2 minutes. {/* Changed from 30 to 2 minutes */}
            </p>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({
                setFieldValue,
                errors,
                touched,
              }: FormikProps<FormValues>) => (
                <Form className="w-full max-w-xs mx-auto">
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
                    <div className="mt-2 text-sm text-red-500 text-center">
                      {errors.otp}
                    </div>
                  )}
                  <div className="mt-8 w-full md:mt-4 text-center">
                    <button
                      type="submit"
                      className="w-full rounded-md bg-occupy-primary p-3 text-sm sm:text-base text-white"
                    >
                      Proceed
                    </button>
                    <p className="pt-4 text-center text-sm text-[#7B8499] lg:text-end">
                      Didn’t receive Code?{" "}
                      <span className="font-medium text-[#A74E8E] underline">
                        {formatTime(timeLeft)}
                      </span>
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
