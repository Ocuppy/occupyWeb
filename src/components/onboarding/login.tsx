// import Image from "next/image";
// import OccupyLogo from "../../../public/occupy-logo.png";
// import { Input } from "../ui/input";
// import Link from "next/link";
// import { Button } from "../ui/button";
// import { useState, useEffect } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { Eye, EyeOff } from "lucide-react";
// import { loginValidationSchema } from "@/formValidation/yup.validation";
// import { useRouter } from "next/navigation";
// import { useAppDispatch } from "@/store/redux/hooks";
// import { ClapSpinner } from "react-spinners-kit";
// import { useToast } from "../ui/use-toast";
// import isFetchBaseQueryErrorType from "@/store/redux/fetchErrorType";
// import { useLoginMutation } from "@/store/redux/services/authSlice/authApiSlice";
// import { setCredentials } from "@/store/redux/services/authSlice/authSlice";

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);

//   const [login, { isLoading, error, data, isSuccess }] = useLoginMutation();

//   const dispatch = useAppDispatch();
//   const router = useRouter();

//   const togglePasswordVisibility = () => {
//     setShowPassword((prev) => !prev);
//   };

//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     validationSchema: loginValidationSchema,
//     onSubmit: async (values) => {
//       login({ email: values.email, password: values.password });
//     },
//   });

//   if (isSuccess) {
//     dispatch(
//       setCredentials({
//         token: data.access,
//         userType: data.user_type,
//         userID: data.user_id,
//         profileID: data.profile_id,
//       }),
//     );
//     router.push("/dashboard");
//   }
//   const { toast } = useToast();

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
//           description: `Error signing in`,
//           title: `Error`,
//           variant: "destructive",
//         });
//       }
//     }
//   }, [error, toast]);

//   return (
//     <section
//       className="flex min-h-screen w-full font-[inter] lg:relative lg:items-center lg:justify-center"
//       style={{
//         backgroundImage: `url('/images/onboarding.png')`,
//         backgroundSize: "cover",
//       }}
//     >
//       {isLoading && (
//         <div className="fixed right-0 top-0 z-[10000] h-screen w-screen bg-white bg-opacity-20 backdrop-blur-sm">
//           <div className="flex h-full w-full items-center justify-center">
//             <ClapSpinner />
//           </div>
//         </div>
//       )}
//       <div className="flex w-full flex-col items-center justify-start gap-20 py-20 lg:relative lg:z-10 lg:flex-row lg:px-8">
//         <h1 className="hidden w-full max-w-2xl text-5xl font-bold text-[#EBF7FB] lg:block">
//           Manage your Supermarket Operations with ease using our intuitive
//           Dashboard
//         </h1>

//         {/* login form */}
//         <div className="flex w-full max-w-lg flex-col items-center gap-8 rounded-lg bg-white px-6 py-12 lg:px-8 lg:shadow-lg">
//           <Image
//             onClick={() => router.push("/")}
//             className="w-[120px]"
//             src={OccupyLogo}
//             alt="logo"
//           />
//           <div className="flex w-full flex-col items-start gap-3">
//             <h3 className="text-2xl font-medium text-[#12141A]">Login</h3>
//             <p className="pb-12 text-sm font-medium text-[#606778]">
//               Login to Access Your Account
//             </p>
//             {/* input form  */}
//             <form
//               className="flex w-full flex-col gap-4"
//               onSubmit={formik.handleSubmit}
//             >
//               <div className="flex w-full flex-col gap-2">
//                 <label
//                   htmlFor="email"
//                   className="text-sm font-medium text-[#606778]"
//                 >
//                   Email
//                 </label>
//                 <Input
//                   type="email"
//                   id="email"
//                   name="email"
//                   placeholder="Your email"
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   value={formik.values.email}
//                   className={
//                     formik.touched.email && formik.errors.email
//                       ? "w-full border-red-700"
//                       : "w-full"
//                   }
//                 />
//                 {formik.touched.email && formik.errors.email ? (
//                   <div className="text-sm text-red-500">
//                     {formik.errors.email}
//                   </div>
//                 ) : null}
//               </div>

//               <div className="relative flex w-full flex-col gap-2">
//                 <label
//                   htmlFor="password"
//                   className="text-sm font-medium text-[#606778]"
//                 >
//                   Password
//                 </label>
//                 <Input
//                   type={showPassword ? "text" : "password"}
//                   id="password"
//                   name="password"
//                   placeholder="Must be at least 8 characters"
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   value={formik.values.password}
//                   className={
//                     formik.touched.password && formik.errors.password
//                       ? "w-full border-red-700"
//                       : "w-full"
//                   }
//                 />
//                 <div
//                   className="absolute right-4 top-[2.85rem] cursor-pointer"
//                   onClick={togglePasswordVisibility}
//                 >
//                   {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
//                 </div>
//                 {formik.touched.password && formik.errors.password ? (
//                   <div className="text-sm text-red-500">
//                     {formik.errors.password}
//                   </div>
//                 ) : null}
//               </div>
//               <article className="inline-flex w-full gap-3">
//                 <p className="text-sm font-light text-[#7B8499]">
//                   Can&apos;t remember your password?{" "}
//                   <Link
//                     href={"/auth/forgot-password"}
//                     className="font-medium text-[#A74E8E] underline"
//                   >
//                     Forget Password
//                   </Link>
//                 </p>
//               </article>

//               <div className="w-full text-end">
//                 <button
//                   type="submit"
//                   className="w-full rounded-md bg-occupy-primary p-3 text-white lg:w-32"
//                 >
//                   Login
//                 </button>
//                 <p className="pt-4 text-center text-sm text-[#7B8499] lg:text-end">
//                   New to Occupy?{" "}
//                   <Link
//                     href="/auth/signup"
//                     className="font-medium text-[#A74E8E] underline"
//                   >
//                     Sign Up
//                   </Link>
//                 </p>
//               </div>
//             </form>
//           </div>
//           <div className="flex w-full items-center justify-center gap-3 text-center text-sm font-light text-black">
//             <Link href="#">Help</Link>
//             <Link href="#">Privacy</Link>
//             <Link href="#">Terms</Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Login;

import Image from "next/image";
import OccupyLogo from "../../../public/occupy-logo.png";
import { Input } from "../ui/input";
import Link from "next/link";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff } from "lucide-react";
import { loginValidationSchema } from "@/formValidation/yup.validation";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/redux/hooks";
import { ClapSpinner } from "react-spinners-kit";
import { useToast } from "../ui/use-toast";
import isFetchBaseQueryErrorType from "@/store/redux/fetchErrorType";
import { useLoginMutation } from "@/store/redux/services/authSlice/authApiSlice";
import { setCredentials } from "@/store/redux/services/authSlice/authSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [login, { isLoading, error, data, isSuccess }] = useLoginMutation();

  const dispatch = useAppDispatch();
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Define the validation schema outside useFormik
  const loginValidationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema, // Correct way to pass schema
    onSubmit: async (values) => {
      login({ email: values.email, password: values.password });
    },
  });

  const { toast } = useToast();

  useEffect(() => {
    if (isSuccess) {
      if (data.user_type !== "SO") {
        toast({
          title: "Access Denied",
          description:
            "Only Supermarket Owners are allowed to access this platform.",
          variant: "destructive",
        });
        return; // Prevent further actions
      }

      dispatch(
        setCredentials({
          token: data.access,
          userType: data.user_type,
          userID: data.user_id,
          profileID: data.profile_id,
        }),
      );

      router.push("/select-supermarket");
    }
  }, [isSuccess, data, dispatch, router, toast]);

  useEffect(() => {
    if (error) {
      if (isFetchBaseQueryErrorType(error)) {
        const errorData = error.data as {
          messages?: { message: string }[];
          detail?: string;
        } & Record<string, any>;

        let errorMessage = "Invalid email or password"; // Default message

        // Check for specific error cases
        if (errorData.detail) {
          errorMessage = errorData.detail;
        } else if (errorData.messages?.[0]?.message) {
          errorMessage = errorData.messages[0].message;
        } else if (error.status === 401) {
          errorMessage = "Invalid email or password";
        }

        toast({
          description: errorMessage,
          title: "Login Failed",
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

        {/* login form */}
        <div className="flex w-full max-w-lg flex-col items-center gap-8 rounded-lg bg-white px-6 py-12 lg:px-8 lg:shadow-lg">
          <Image
            onClick={() => router.push("/")}
            className="w-[120px]"
            src={OccupyLogo}
            alt="logo"
          />
          <div className="flex w-full flex-col items-start gap-3">
            <h3 className="text-2xl font-medium text-[#12141A]">Login</h3>
            <p className="pb-12 text-sm font-medium text-[#606778]">
              Login to Access Your Account
            </p>
            {/* input form  */}
            <form
              className="flex w-full flex-col gap-4"
              onSubmit={formik.handleSubmit}
            >
              <div className="flex w-full flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-lg font-medium text-[#606778]"
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
                  className={`w-full bg-white text-lg ${formik.touched.email && formik.errors.email ? "border-occupy-primary" : ""} // Added text and placeholder colors text-[#101828]`}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-lg font-medium text-red-500">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>

              <div className="relative flex w-full flex-col gap-2">
                <label
                  htmlFor="password"
                  className="text-lg font-medium text-[#606778]"
                >
                  Password
                </label>
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Must be at least 8 characters"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className={`w-full border-[#D0D5DD] bg-white text-lg ${formik.touched.password && formik.errors.password ? "border-occupy-primary" : ""} // Added text and placeholder colors text-[#101828]`}
                />
                <div
                  className="absolute right-4 top-[2.85rem] cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-lg font-medium text-red-500">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
              <article className="inline-flex w-full gap-3">
                <p className="text-sm font-light text-[#7B8499]">
                  Can&apos;t remember your password?{" "}
                  <Link
                    href={"/auth/forgot-password"}
                    className="font-medium text-[#A74E8E] underline"
                  >
                    Forget Password
                  </Link>
                </p>
              </article>

              <div className="w-full text-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-md bg-occupy-primary p-3 text-white lg:w-32"
                >
                  {isLoading ? "Logining in..." : "Login"}
                </button>
                <p className="pt-4 text-center text-sm text-[#7B8499] lg:text-end">
                  New to Occupy?{" "}
                  <Link
                    href="/auth/signup"
                    className="font-medium text-[#A74E8E] underline"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
