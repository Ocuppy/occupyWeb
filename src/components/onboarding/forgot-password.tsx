// import Image from "next/image";
// import OccupyLogo from "../../../public/occupy-logo.png";
// import { Input } from "../ui/input";
// import Link from "next/link";
// import { Button } from "../ui/button";
// import { useState, useEffect } from "react";
// import { useFormik } from "formik";
// import { forgotPasswordValidationSchema } from "@/formValidation/yup.validation";
// import { useRouter } from "next/navigation";
// import ForgotResponse from "./forgotResponse";
// import { ClapSpinner } from "react-spinners-kit";
// import { useToast } from "../ui/use-toast";
// import isFetchBaseQueryErrorType from "@/store/redux/fetchErrorType";
// import { useSendOtpToResetPwdMutation } from "@/store/redux/services/authSlice/authApiSlice";

// const ForgotPassword = () => {
//   const router = useRouter();
//   const [isComplete, setIsComplete] = useState(false);

//   const [resetPassword, { isLoading, error, isSuccess, data }] =
//     useSendOtpToResetPwdMutation();

//   const { toast } = useToast();

//   const resetForm = () => {
//     setIsComplete(false);
//   };

//   const formik = useFormik({
//     initialValues: {
//       email: "",
//     },
//     validationSchema: forgotPasswordValidationSchema,
//     onSubmit: async (values) => {
//       // console.log(values);
//       resetPassword({ email: values.email });
//     },
//   });

//   useEffect(() => {
//     if (isSuccess) {
//       setIsComplete(true);
//     }
//   }, [isSuccess]);

//   useEffect(() => {
//     if (error) {
//       if (isFetchBaseQueryErrorType(error)) {
//         // const errorData = error.data as {
//         //   messages: { message: string }[];
//         //   detail: string;
//         // } & Record<string, any>;

//         toast({
//           // description: `${errorData.messages[0].message}`,
//           // title: `${errorData.detail} `,
//           title: `Error`,
//           description: `Error sending email`,
//           variant: "destructive",
//         });
//       }
//     }
//   }, [error, toast]);

//   return (
//     <section className="flex min-h-screen w-full lg:relative lg:items-center lg:justify-center">
//       {isLoading && (
//         <div className="fixed right-0 top-0 z-[10000] h-screen w-screen bg-white bg-opacity-20 backdrop-blur-sm">
//           <div className="flex h-full w-full items-center justify-center">
//             <ClapSpinner />
//           </div>
//         </div>
//       )}
//       <div className="left-0 top-0 hidden h-full w-full lg:absolute lg:block">
//         <Image
//           src={"/images/onboarding.png"}
//           alt=""
//           layout="fill"
//           objectFit="cover"
//           className="h-full w-full"
//         />
//       </div>

//       <div className="flex w-full items-center justify-start gap-20 lg:relative lg:z-10 lg:px-8 lg:py-20">
//         <h1 className="hidden w-full max-w-2xl text-5xl font-bold text-[#EBF7FB] lg:block">
//           Manage your Supermarket Operations with ease using our intuitive
//           Dashboard
//         </h1>

//         {/* forget password form */}
//         {!isComplete ? (
//           <div className="flex w-full max-w-lg flex-col items-center gap-8 rounded-lg px-6 py-12 lg:bg-white lg:px-8 lg:shadow-lg">
//             <Image className="w-[120px]" src={OccupyLogo} alt="logo" />
//             <div className="flex w-full flex-col items-start gap-3">
//               <h3 className="text-2xl font-medium text-[#12141A]">
//                 Recover Password
//               </h3>
//               <p className="pb-12 text-sm font-medium text-[#606778]">
//                 Enter your registered email below to receive password reset code
//               </p>
//               {/* input form  */}
//               <form
//                 className="flex w-full flex-col gap-4"
//                 onSubmit={formik.handleSubmit}
//               >
//                 <div className="flex w-full flex-col gap-2">
//                   <label
//                     htmlFor="email"
//                     className="text-sm font-medium text-[#606778]"
//                   >
//                     Email
//                   </label>
//                   <Input
//                     type="email"
//                     id="email"
//                     name="email"
//                     placeholder="Your email"
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     value={formik.values.email}
//                     className={
//                       formik.touched.email && formik.errors.email
//                         ? "w-full border-red-700"
//                         : "w-full"
//                     }
//                   />
//                   {formik.touched.email && formik.errors.email ? (
//                     <div className="text-sm text-red-500">
//                       {formik.errors.email}
//                     </div>
//                   ) : null}
//                 </div>

//                 <div className="w-full">
//                   <Button type="submit" className="w-full rounded-md lg:w-32">
//                     Send Email
//                   </Button>
//                   <p className="pt-4 text-center text-sm text-[#7B8499] lg:text-end">
//                     Remembered Password?{" "}
//                     <Link
//                       href="/auth/login"
//                       className="font-medium text-[#A74E8E] underline"
//                     >
//                       Sign In
//                     </Link>
//                   </p>
//                 </div>
//               </form>
//             </div>
//             <div className="flex w-full items-center justify-center gap-3 text-center text-sm font-light text-black">
//               <Link href="#">Help</Link>
//               <Link href="#">Privacy</Link>
//               <Link href="#">Terms</Link>
//             </div>
//           </div>
//         ) : (
//           <ForgotResponse
//             resetForm={resetForm}
//             resendEmail={() => resetPassword({ email: formik.values.email })}
//           />
//         )}
//       </div>
//     </section>
//   );
// };

// export default ForgotPassword;

import Image from "next/image";
import OccupyLogo from "../../../public/occupy-logo.png";
import { Input } from "../ui/input";
import Link from "next/link";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { forgotPasswordValidationSchema } from "@/formValidation/yup.validation";
import { useRouter } from "next/navigation";
import ForgotResponse from "./forgotResponse";
import { ClapSpinner } from "react-spinners-kit";
import { useToast } from "../ui/use-toast";
import isFetchBaseQueryErrorType from "@/store/redux/fetchErrorType";
import { useSendOtpToResetPwdMutation } from "@/store/redux/services/authSlice/authApiSlice";

const ForgotPassword = () => {
  const router = useRouter();
  const [isComplete, setIsComplete] = useState(false);

  const [resetPassword, { isLoading, error, isSuccess, data }] =
    useSendOtpToResetPwdMutation();

  const { toast } = useToast();

  const resetForm = () => {
    setIsComplete(false);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordValidationSchema,
    onSubmit: async (values) => {
      // console.log(values);
      resetPassword({ email: values.email });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setIsComplete(true);
    }
  }, [isSuccess]);

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
          description: `Error sending email`,
          variant: "destructive",
        });
      }
    }
  }, [error, toast]);

  return (
    <section
      className="flex min-h-screen w-full font-[inter] lg:relative lg:items-center lg:justify-center"
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

        {/* forget password form */}
        {!isComplete ? (
          <div className="flex w-full max-w-lg flex-col items-center gap-8 rounded-lg bg-white px-6 py-12 lg:px-8 lg:shadow-lg">
            <Image className="w-[120px]" src={OccupyLogo} alt="logo" />
            <div className="flex w-full flex-col items-start gap-3">
              <h3 className="text-2xl font-medium text-[#12141A]">
                Recover Password
              </h3>
              <p className="pb-12 text-sm font-medium text-[#606778]">
                Enter your registered email below to receive password reset code
              </p>
              {/* input form  */}
              <form
                className="flex w-full flex-col gap-4"
                onSubmit={formik.handleSubmit}
              >
                <div className="flex w-full flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-[#606778]"
                  >
                    Email
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className={
                      formik.touched.email && formik.errors.email
                        ? "w-full border-red-700"
                        : "w-full"
                    }
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-sm text-red-500">
                      {formik.errors.email}
                    </div>
                  ) : null}
                </div>

                <div className="w-full">
                  <Button type="submit" className="w-full rounded-md">
                    Send Email
                  </Button>
                  <p className="pt-4 text-center text-sm text-[#7B8499] lg:text-end">
                    Remembered Password?{" "}
                    <Link
                      href="/auth/login"
                      className="font-medium text-[#A74E8E] underline"
                    >
                      Sign In
                    </Link>
                  </p>
                </div>
              </form>
            </div>
            <div className="flex w-full items-center justify-center gap-3 text-center text-sm font-light text-black">
              <Link href="#">Help</Link>
              <Link href="#">Privacy</Link>
              <Link href="#">Terms</Link>
            </div>
          </div>
        ) : (
          <ForgotResponse
            resetForm={resetForm}
            resendEmail={() => resetPassword({ email: formik.values.email })}
          />
        )}
      </div>
    </section>
  );
};

export default ForgotPassword;
