import Image from "next/image";
import OccupyLogo from "../../../public/occupy-logo.png";
import { Input } from "../ui/input";
import Link from "next/link";
import { Button } from "../ui/button";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff } from "lucide-react";
import { signupValidationSchema } from "@/formValidation/yup.validation";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema: signupValidationSchema,
    onSubmit: (values) => {
      console.log(values);
      router.push("/auth/verify");
    },
  });

  return (
    <section
      className="flex min-h-screen w-full lg:relative lg:items-center lg:justify-center"
      style={{
        backgroundImage: `url('/images/onboarding.png')`,
        backgroundSize: "cover",
      }}
    >
      <div className="flex w-full flex-col items-center justify-start gap-20 py-20 lg:relative lg:z-10 lg:flex-row lg:px-8 lg:py-10">
        <h1 className="hidden w-full max-w-2xl text-5xl font-bold text-[#EBF7FB] lg:block">
          Manage your Supermarket Operations with ease using our intuitive
          Dashboard
        </h1>

        {/* signup form */}
        <div className="flex w-full max-w-lg flex-col items-center gap-8 rounded-lg bg-white px-6 py-10 lg:px-8 lg:py-14 lg:shadow-lg">
          <Image className="w-[120px]" src={OccupyLogo} alt="logo" />
          <div className="flex flex-col items-start gap-3">
            <h3 className="text-2xl font-medium text-[#12141A]">
              Welcome, let&apos;s create an account
            </h3>
            <p className="pb-12 text-sm font-medium text-[#606778]">
              Create an account to keep track of your customers, and
              contributors. Once your account has been created then don’t forget
              to verify your account through mail.
            </p>
            {/* input form  */}
            <form
              className="flex flex-col gap-4"
              onSubmit={formik.handleSubmit}
            >
              <div className="items-center lg:flex lg:gap-6">
                <div className="mb-4 flex flex-col gap-2 lg:mb-0">
                  <label
                    htmlFor="firstName"
                    className="text-sm font-medium text-[#606778]"
                  >
                    First Name
                  </label>
                  <Input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Your first name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                    className={
                      formik.touched.firstName && formik.errors.firstName
                        ? "border-red-700"
                        : ""
                    }
                  />
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <div className="text-sm text-red-500">
                      {formik.errors.firstName}
                    </div>
                  ) : null}
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="lastName"
                    className="text-sm font-medium text-[#606778]"
                  >
                    Last Name
                  </label>
                  <Input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Your last name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                    className={
                      formik.touched.lastName && formik.errors.lastName
                        ? "border-red-700"
                        : ""
                    }
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <div className="text-sm text-red-500">
                      {formik.errors.lastName}
                    </div>
                  ) : null}
                </div>
              </div>
              {/* second input */}
              <div className="items-center lg:flex lg:gap-6">
                <div className="mb-4 flex flex-col gap-2 lg:mb-0">
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
                        ? "border-red-700"
                        : ""
                    }
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-sm text-red-500">
                      {formik.errors.email}
                    </div>
                  ) : null}
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-[#606778]"
                  >
                    Phone Number
                  </label>
                  <Input
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="Your phone number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                    className={
                      formik.touched.phone && formik.errors.phone
                        ? "border-red-700"
                        : ""
                    }
                  />
                  {formik.touched.phone && formik.errors.phone ? (
                    <div className="text-sm text-red-500">
                      {formik.errors.phone}
                    </div>
                  ) : null}
                </div>
              </div>
              {/* third input */}
              <div className="relative flex flex-col gap-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-[#606778]"
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
                  className={
                    formik.touched.password && formik.errors.password
                      ? "border-red-700"
                      : ""
                  }
                />
                <div
                  className="absolute right-4 top-[2.85rem] cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-sm text-red-500">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
              <article className="inline-flex gap-3">
                <p className="text-sm font-light text-[#7B8499]">
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

              <div className="text-end">
                <button
                  type="submit"
                  className="w-full rounded-md bg-occupy-primary p-3 text-white lg:w-32"
                >
                  Continue
                </button>
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
            </form>
          </div>
          <div className="flex items-center justify-center gap-3 text-center text-sm font-light text-black">
            <Link href="#">Help</Link>
            <Link href="#">Privacy</Link>
            <Link href="#">Terms</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
