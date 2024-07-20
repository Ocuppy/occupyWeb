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

interface FormValues {
  otp: string;
}

const VerifyOtp: React.FC = () => {
  const router = useRouter();

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
    console.log("OTP entered:", values.otp);
    router.push("/dashboard");
  };

  const [timeLeft, setTimeLeft] = useState(30 * 60);

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
      <div className="flex w-full flex-col items-center justify-start gap-20 py-20 lg:relative lg:z-10 lg:flex-row lg:px-8">
        <h1 className="hidden w-full max-w-2xl text-5xl font-bold text-[#EBF7FB] lg:block">
          Manage your Supermarket Operations with ease using our intuitive
          Dashboard
        </h1>

        <div className="flex w-full max-w-lg flex-col items-center gap-8 rounded-lg bg-white px-6 py-12 lg:px-8 lg:shadow-lg">
          <Image className="w-[120px]" src={OccupyLogo} alt="logo" />
          <div className="flex w-full flex-col items-start gap-3">
            <h3 className="text-2xl font-medium text-[#12141A]">
              OTP verification
            </h3>
            <p className="pb-12 text-sm font-medium text-[#606778]">
              Please enter the 6-digit verification code that was sent to your
              mail. It’s valid for 30 minutes
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
                <Form className="w-full">
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
                  {errors.otp && touched.otp && (
                    <div className="mt-2 text-sm text-red-500">
                      {errors.otp}
                    </div>
                  )}
                  <div className="mt-8 w-full text-end md:mt-4">
                    <button
                      type="submit"
                      className="w-full rounded-md bg-occupy-primary p-3 text-white lg:w-32"
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
          <div className="flex w-full items-center justify-center gap-3 text-center text-sm font-light text-black">
            <Link href="#">Help</Link>
            <Link href="#">Privacy</Link>
            <Link href="#">Terms</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifyOtp;
