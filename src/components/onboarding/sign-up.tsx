// import Image from "next/image";
// import OccupyLogo from "../../../public/occupy-logo.png";
// import { Input } from "../ui/input";
// import Link from "next/link";
// import { Button } from "../ui/button";
// import { useEffect, useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { Eye, EyeOff } from "lucide-react";
// import { signupValidationSchema } from "@/formValidation/yup.validation";
// import { useRouter } from "next/navigation";
// import { useSignUpMutation } from "@/store/redux/services/authSlice/authApiSlice";
// import { useGetEstatesQuery } from "@/store/redux/services/superMarketSlice/superMarketApiSlice";
// import { useAppDispatch } from "@/store/redux/hooks";
// import { setCredentials } from "@/store/redux/services/authSlice/authSlice";
// import { ClapSpinner } from "react-spinners-kit";
// import { useToast } from "../ui/use-toast";
// import isFetchBaseQueryErrorType from "@/store/redux/fetchErrorType";
// import {
//   Select,
//   SelectItem,
//   SelectTrigger,
//   SelectContent,
//   SelectValue,
// } from "../ui/select";

// const Signup = () => {
//   const {
//     data: estateList,
//     isLoading: loadingEstate,
//     error: estatesError,
//   } = useGetEstatesQuery("");
//   const [showPassword, setShowPassword] = useState(false);
//   const router = useRouter();

//   const togglePasswordVisibility = () => {
//     setShowPassword((prev) => !prev);
//   };

//   const formik = useFormik({
//     initialValues: {
//       firstName: "",
//       lastName: "",
//       email: "",
//       estate: "",
//       password: "",
//     },
//     validationSchema: signupValidationSchema,
//

//   const dispatch = useAppDispatch();

//   const [registerUser, { isLoading, isSuccess, error, data }] =
//     useSignUpMutation();

//   if (isSuccess) {
//     dispatch(setCredentials({ token: data.password }));
//     router.push("/auth/verify");
//   }

//   const { toast } = useToast();
//   useEffect(() => {
//     if (error && "data" in error) {
//       if (isFetchBaseQueryErrorType(error)) {
//         // const errors = Object.keys(error.data as Record<string, any>);
//         // errors.forEach((item) => {
//         //   toast({
//         //     // title: `${item.charAt(0).toUpperCase() + item.slice(1)}`,
//         //     // description: `${(error.data as Record<string, any>)[item]?.[0]}`,
//         //     title: `Error`,
//         //     description: `Error signing up`,
//         //     variant: "destructive",
//         //   });
//         // });
//         toast({
//           // title: `${item.charAt(0).toUpperCase() + item.slice(1)}`,
//           // description: `${(error.data as Record<string, any>)[item]?.[0]}`,
//           title: `Error`,
//           description: `Error signing up`,
//           variant: "destructive",
//         });
//       }
//     }
//   }, [error, toast]);

//   return (
//     <section
//       className="flex min-h-screen w-full lg:relative lg:items-center lg:justify-center"
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
//       <div className="flex w-full flex-col items-center justify-start gap-20 py-20 lg:relative lg:z-10 lg:flex-row lg:px-8 lg:py-10">
//         <h1 className="hidden w-full max-w-2xl text-5xl font-bold text-[#EBF7FB] lg:block">
//           Manage your Supermarket Operations with ease using our intuitive
//           Dashboard
//         </h1>

//         {/* signup form */}
//         <div className="flex w-full max-w-lg flex-col items-center gap-8 rounded-lg bg-white px-6 py-10 lg:px-8 lg:py-14 lg:shadow-lg">
//           <Image
//             onClick={() => router.push("/")}
//             className="w-[120px]"
//             src={OccupyLogo}
//             alt="logo"
//           />
//           <div className="flex flex-col items-start gap-3">
//             <h3 className="text-2xl font-medium text-[#12141A]">
//               Welcome, let&apos;s create an account
//             </h3>
//             <p className="pb-12 text-sm font-medium text-[#606778]">
//               Create an account to keep track of your customers, and
//               contributors. Once your account has been created then don’t forget
//               to verify your account through mail.
//             </p>
//             {/* input form  */}
//             <form
//               className="flex flex-col gap-4"
//               onSubmit={formik.handleSubmit}
//             >
//               <div className="items-center lg:flex lg:gap-6">
//                 <div className="mb-4 flex flex-col gap-2 lg:mb-0">
//                   <label
//                     htmlFor="firstName"
//                     className="text-sm font-medium text-[#606778]"
//                   >
//                     First Name
//                   </label>
//                   <Input
//                     type="text"
//                     id="firstName"
//                     name="firstName"
//                     placeholder="Your first name"
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     value={formik.values.firstName}
//                     className={
//                       formik.touched.firstName && formik.errors.firstName
//                         ? "border-red-700"
//                         : ""
//                     }
//                   />
//                   {formik.touched.firstName && formik.errors.firstName ? (
//                     <div className="text-sm text-red-500">
//                       {formik.errors.firstName}
//                     </div>
//                   ) : null}
//                 </div>
//                 <div className="flex flex-col gap-2">
//                   <label
//                     htmlFor="lastName"
//                     className="text-sm font-medium text-[#606778]"
//                   >
//                     Last Name
//                   </label>
//                   <Input
//                     type="text"
//                     id="lastName"
//                     name="lastName"
//                     placeholder="Your last name"
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     value={formik.values.lastName}
//                     className={
//                       formik.touched.lastName && formik.errors.lastName
//                         ? "border-red-700"
//                         : ""
//                     }
//                   />
//                   {formik.touched.lastName && formik.errors.lastName ? (
//                     <div className="text-sm text-red-500">
//                       {formik.errors.lastName}
//                     </div>
//                   ) : null}
//                 </div>
//               </div>
//               {/* second input */}
//               {/* <div className="items-center lg:flex lg:gap-6"> */}
//               <div className="mb-4 flex flex-col gap-2 lg:mb-0">
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
//                       ? "border-red-700"
//                       : ""
//                   }
//                 />
//                 {formik.touched.email && formik.errors.email ? (
//                   <div className="text-sm text-red-500">
//                     {formik.errors.email}
//                   </div>
//                 ) : null}
//               </div>
//               {/* </div> */}

//               {/* third input */}
//               {/* <div className="relative flex flex-col gap-2"> */}
//               <div className="flex flex-col gap-2">
//                 <label
//                   htmlFor="phone"
//                   className="text-sm font-medium text-[#606778]"
//                 >
//                   Current Estate
//                 </label>
//                 <Select
//                   name="estate"
//                   onValueChange={(val) => {
//                     formik.setFieldValue("estate", val);
//                   }}
//                   defaultValue={formik.values.estate}
//                   required={true}
//                 >
//                   <SelectTrigger className="bg-[#F9F9FC]">
//                     <SelectValue placeholder="Select Estate" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {estateList &&
//                       estateList.map(
//                         (
//                           item: {
//                             id: number;
//                             address: string;
//                             name: string;
//                           },
//                           // index,
//                         ) => (
//                           <SelectItem
//                             key={`${item.address}-${item.id}- `}
//                             value={`${item.id}`}
//                             onBlur={(e) =>
//                               formik.setFieldTouched("estate", true)
//                             }
//                           >
//                             {item.name} - {item.address}
//                           </SelectItem>
//                         ),
//                       )}
//                   </SelectContent>
//                 </Select>
//                 {formik.errors.estate ? (
//                   <div className="text-sm text-red-500">
//                     {formik.errors.estate}
//                   </div>
//                 ) : null}
//                 {/* <Input
//                   type="text"
//                   id="phone"
//                   name="phone"
//                   placeholder="Your phone number"
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   value={formik.values.phone}
//                   className={
//                     formik.touched.phone && formik.errors.phone
//                       ? "border-red-700"
//                       : ""
//                   }
//                 /> */}
//                 {/* {formik.touched.phone && formik.errors.phone ? (
//                   <div className="text-sm text-red-500">
//                     {formik.errors.phone}
//                   </div>
//                 ) : null} */}
//               </div>
//               {/* </div> */}
//               {/* fourth input */}
//               <div className="relative flex flex-col gap-2">
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
//                       ? "border-red-700"
//                       : ""
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
//               <article className="inline-flex gap-3">
//                 <p className="text-sm font-light text-[#7B8499]">
//                   By continuing you agree to the Occupy{" "}
//                   <Link
//                     href={"#"}
//                     className="font-medium text-[#A74E8E] underline"
//                   >
//                     terms of service{" "}
//                   </Link>{" "}
//                   and{" "}
//                   <Link
//                     href={"#"}
//                     className="font-medium text-[#A74E8E] underline"
//                   >
//                     privacy policy
//                   </Link>
//                   .
//                 </p>
//               </article>

//               <div className="text-end">
//                 <button
//                   type="submit"
//                   className="w-full rounded-md bg-occupy-primary p-3 text-white lg:w-32"
//                 >
//                   Continue
//                 </button>
//                 <p className="pt-4 text-center text-sm text-[#7B8499] lg:text-end">
//                   Already registered?{" "}
//                   <Link
//                     href="/auth/login"
//                     className="font-medium text-[#A74E8E] underline"
//                   >
//                     Sign In
//                   </Link>
//                 </p>
//               </div>
//             </form>
//           </div>
//           <div className="flex items-center justify-center gap-3 text-center text-sm font-light text-black">
//             <Link href="#">Help</Link>
//             <Link href="#">Privacy</Link>
//             <Link href="#">Terms</Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Signup;

import Image from "next/image";
import OccupyLogo from "../../../public/occupy-logo.png";
import { Input } from "../ui/input";
import Link from "next/link";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/router";
import { useToast } from "../ui/use-toast";
import { ClapSpinner } from "react-spinners-kit";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "../ui/select";

const baseUrl = "https://backend.occupymart.com";

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://35.238.25.33";

const Signup = () => {
  const [formType, setFormType] = useState("signup"); // Define formType state
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    estate: "",
    password: "",
  });

  const router = useRouter();
  const { toast } = useToast();

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [estateList, setEstateList] = useState<
    { id: number; address: string; name: string }[]
  >([]);
  const [fetchingEstates, setFetchingEstates] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Fetch estates
  useEffect(() => {
    const fetchEstates = async () => {
      setFetchingEstates(true);
      try {
        const response = await fetch(`${baseUrl}/api/admin/estates/`);
        if (!response.ok) {
          throw new Error("Failed to fetch estates.");
        }
        const data = await response.json();
        setEstateList(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Unable to fetch estates. Please try again.",
          variant: "destructive",
        });
        console.error("Error fetching estates:", error);
      } finally {
        setFetchingEstates(false);
      }
    };

    fetchEstates();
  }, []);

  const validateForm = () => {
    const validationErrors: { [key: string]: string } = {};

    if (!formValues.firstName) {
      validationErrors.firstName = "First Name is required";
    }

    if (!formValues.lastName) {
      validationErrors.lastName = "Last Name is required";
    }

    if (!formValues.email) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      validationErrors.email = "Invalid email address";
    }

    if (!formValues.estate) {
      validationErrors.estate = "Please select an estate";
    }

    if (!formValues.password) {
      validationErrors.password = "Password is required";
    } else if (formValues.password.length < 8) {
      validationErrors.password = "Password must be at least 8 characters";
    }

    return validationErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const registerUser = async (userData: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    user_type: string;
    current_estate: string;
  }) => {
    const response = await fetch(`${baseUrl}/api/accounts/account/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || "Registration failed.");
    }

    return await response.json();
  };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const validationErrors = validateForm();
  //   if (Object.keys(validationErrors).length > 0) {
  //     setErrors(validationErrors);
  //     return;
  //   }

  //   setErrors({});
  //   setIsLoading(true);

  //   try {
  //     const response = await fetch(
  //       `${baseUrl}/api/accounts/account/register/`,
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           first_name: formValues.firstName,
  //           last_name: formValues.lastName,
  //           email: formValues.email,
  //           password: formValues.password,
  //           user_type: "SO", // Supermarket Owner
  //           current_estate: formValues.estate, // Keep as string for now
  //         }),
  //       },
  //     );

  //     // Log the full response for debugging
  //     const responseText = await response.text();
  //     console.log("Response status:", response.status);
  //     console.log("Response text:", responseText);

  //     if (!response.ok) {
  //       throw new Error(responseText || "Registration failed");
  //     }

  //     const data = await JSON.parse(responseText);

  //     toast({
  //       title: "Success",
  //       description: "Account created successfully. Please verify your email.",
  //       variant: "default",
  //     });

  //     router.push("/auth/verify");
  //   } catch (error: any) {
  //     console.error("Full registration error:", error);

  //     toast({
  //       title: "Error",
  //       description: error.message || "An unexpected error occurred",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const endpoint =
        formType === "signup"
          ? `${baseUrl}/api/accounts/account/register/`
          : `${baseUrl}/api/accounts/account/login/`;

      const payload =
        formType === "signup"
          ? {
              first_name: formValues.firstName,
              last_name: formValues.lastName,
              email: formValues.email,
              password: formValues.password,
              user_type: "SO", // Enforce "SO" user type on signup
              current_estate: formValues.estate,
            }
          : {
              email: formValues.email,
              password: formValues.password,
            };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();
      console.log("Response status:", response.status);
      console.log("Response text:", responseText);

      if (!response.ok) {
        throw new Error(responseText || "Operation failed");
      }

      const data = JSON.parse(responseText);

      if (formType === "login" && data.user_type !== "SO") {
        throw new Error("Access denied: Only Supermarket Owners are allowed.");
      }

      toast({
        title: "Success",
        description:
          formType === "signup"
            ? "Account created successfully. Please verify your email."
            : "Logged in successfully!",
        variant: "default",
      });

      router.push(formType === "signup" ? "/auth/verify" : "/dashboard");
    } catch (error: any) {
      console.error("Error:", error);

      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
      <div className="flex w-full flex-col items-center justify-start gap-20 py-20 lg:relative lg:z-10 lg:flex-row lg:px-8 lg:py-10">
        <h1 className="hidden w-full max-w-2xl text-5xl font-bold text-[#EBF7FB] lg:block">
          Manage your Supermarket Operations with ease using our intuitive
          Dashboard
        </h1>

        <div className="flex w-full max-w-lg flex-col items-center gap-8 rounded-lg bg-white px-6 py-10 lg:px-8 lg:py-14 lg:shadow-lg">
          <Image
            className="w-[120px] cursor-pointer"
            src={OccupyLogo}
            alt="logo"
            onClick={() => console.log("Redirect to home")}
          />
          <div className="flex flex-col items-start gap-3">
            <h3 className="text-2xl font-medium text-[#12141A]">
              Welcome, let&apos;s create an account
            </h3>
            <p className="pb-12 text-sm font-medium text-[#606778]">
              Create an account to keep track of your customers and
              contributors. Once your account has been created, don’t forget to
              verify your account through mail.
            </p>
            <form
              className="flex w-full flex-col gap-4"
              onSubmit={handleSubmit}
            >
              <div className="lg:flex lg:gap-6">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="firstName"
                    className="text-[16px] font-medium text-[#606778]"
                  >
                    First Name
                  </label>
                  <Input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Your first name"
                    onChange={handleChange}
                    value={formValues.firstName}
                    className={errors.firstName ? "border-red-700" : ""}
                  />
                  {errors.firstName && (
                    <div className="text-sm text-red-500">
                      {errors.firstName}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="lastName"
                    className="text-[16px] font-medium text-[#606778]"
                  >
                    Last Name
                  </label>
                  <Input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Your last name"
                    onChange={handleChange}
                    value={formValues.lastName}
                    className={errors.lastName ? "border-red-700" : ""}
                  />
                  {errors.lastName && (
                    <div className="text-sm text-red-500">
                      {errors.lastName}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-[16px] font-medium text-[#606778]"
                >
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your email"
                  onChange={handleChange}
                  value={formValues.email}
                  className={errors.email ? "border-red-700" : ""}
                />
                {errors.email && (
                  <div className="text-sm text-red-500">{errors.email}</div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="estate"
                  className="text-[16px] font-medium text-[#606778]"
                >
                  Current Estate
                </label>

                <Select
                  name="estate"
                  onValueChange={(value) =>
                    setFormValues((prev) => ({ ...prev, estate: value }))
                  }
                  value={formValues.estate}
                >
                  <SelectTrigger className="h-[37px] bg-[#F9F9FC] font-semibold">
                    <SelectValue placeholder="Select Estate" />
                  </SelectTrigger>
                  <SelectContent>
                    {fetchingEstates ? (
                      <SelectItem value="loading">
                        Loading estates...
                      </SelectItem>
                    ) : (
                      estateList.map((estate) => (
                        <SelectItem
                          key={estate.id}
                          value={estate.id.toString()}
                          className="font-semibold"
                        >
                          {estate.name} - {estate.address}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>

                {errors.estate && (
                  <div className="text-sm text-red-500">{errors.estate}</div>
                )}
              </div>
              <div className="relative flex flex-col gap-2">
                <label
                  htmlFor="password"
                  className="text-[16px] font-medium text-[#606778]"
                >
                  Password
                </label>
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Must be at least 8 characters"
                  onChange={handleChange}
                  value={formValues.password}
                  className={errors.password ? "border-red-700" : ""}
                />
                <div
                  className="absolute right-4 top-[3.50rem] cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <Eye /> : <EyeOff />}
                </div>
                {errors.password && (
                  <div className="text-sm text-red-500">{errors.password}</div>
                )}
              </div>
              <article className="inline-flex gap-3">
                <p className="text-sm font-light text-[#7B8499]">
                  {" "}
                  By continuing you agree to the Occupy{" "}
                  <Link
                    href={"#"}
                    className="font-medium text-[#A74E8E] underline"
                  >
                    terms of service{" "}
                  </Link>{" "}
                  and{" "}
                  <Link
                    href={"#"}
                    className="font-medium text-[#A74E8E] underline"
                  >
                    privacy policy
                  </Link>
                  .
                </p>
              </article>

              <div className="flex w-full flex-col items-center">
                <Button
                  disabled={isLoading}
                  className="mt-6 w-full bg-[#A74E8E] text-sm font-medium text-white hover:bg-[#37c283]"
                >
                  Continue
                </Button>
                <p className="pt-4 text-center text-sm text-[#7B8499] lg:text-end">
                  Already registered?{" "}
                  <Link
                    href="/auth/login"
                    className="font-medium text-[#A74E8E] underline"
                  >
                    Sign In
                  </Link>
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 text-center text-sm font-light text-black">
                <Link href="#">Help</Link>
                <Link href="#">Privacy</Link>
                <Link href="#">Terms</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
