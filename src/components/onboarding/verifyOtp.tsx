import Image from "next/image";
import OccupyLogo from "../../../public/occupy-logo.png";
import Link from "next/link";
import { Button } from "../ui/button";
import { Formik, Form, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
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

  const handleSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
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
    <section className="lg:relative font-[inter] w-full min-h-screen flex lg:items-center lg:justify-center">
      <div className="lg:absolute hidden lg:block top-0 left-0 w-full h-full">
        <Image
          src={"/images/onboarding.png"}
          alt=""
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
        />
      </div>

      <div className="lg:relative lg:z-10 flex items-center gap-20 justify-start w-full lg:py-20 lg:px-8">
        <h1 className="text-[#EBF7FB] hidden lg:block font-bold text-5xl w-full max-w-2xl">
          Manage your Supermarket Operations with ease using our intuitive Dashboard
        </h1>

        <div className="lg:bg-white px-6 lg:px-8 py-12 w-full max-w-lg rounded-lg lg:shadow-lg flex flex-col gap-8 items-center">
          <Image className="w-[120px]" src={OccupyLogo} alt="logo" />
          <div className="flex flex-col items-start gap-3 w-full">
            <h3 className="text-[#12141A] font-medium text-2xl">OTP verification</h3>
            <p className="text-sm text-[#606778] font-medium pb-12">
              Please enter the 6-digit verification code that was sent to your mail. It’s valid
              for 30 minutes
            </p>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue, errors, touched }: FormikProps<FormValues>) => (
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
                    <div className="text-red-500 text-sm mt-2">{errors.otp}</div>
                  )}
                  <div className="text-end w-full md:mt-4 mt-8">
                    <Button type="submit" className="w-full lg:w-32 rounded-md">
                      Proceed
                    </Button>
                    <p className="text-sm text-[#7B8499] text-center lg:text-end pt-4">
                      Didn’t receive Code?{" "}
                      <span className="text-[#A74E8E] font-medium underline">
                        {formatTime(timeLeft)}
                      </span>
                    </p>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div className="flex items-center text-sm font-light text-center text-black justify-center gap-3 w-full">
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
