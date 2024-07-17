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

        {/* signup form */}
        <div className="lg:bg-white px-6 lg:px-8 py-20 w-full max-w-lg rounded-lg lg:shadow-lg flex flex-col gap-8 items-center">
          <Image className="w-[120px]" src={OccupyLogo} alt="logo" />
          <div className="flex flex-col items-start gap-3">
            <h3 className="text-[#12141A] font-medium text-2xl ">
              Welcome, let's create an account
            </h3>
            <p className="text-sm text-[#606778] font-medium pb-12">
              Create an account to keep track of your customers, and contributors. Once your
              account has been created then don’t forget to verify your account through mail.
            </p>
            {/* input form  */}
            <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
              <div className="lg:flex lg:gap-6 items-center">
                <div className="flex flex-col gap-2 mb-4 lg:mb-0">
                  <label htmlFor="firstName" className="font-medium text-sm text-[#606778]">
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
                    <div className="text-red-500 text-sm">{formik.errors.firstName}</div>
                  ) : null}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="lastName" className="font-medium text-sm text-[#606778]">
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
                      formik.touched.lastName && formik.errors.lastName ? "border-red-700" : ""
                    }
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <div className="text-red-500 text-sm">{formik.errors.lastName}</div>
                  ) : null}
                </div>
              </div>
              {/* second input */}
              <div className="lg:flex lg:gap-6 items-center">
                <div className="flex flex-col gap-2 mb-4 lg:mb-0">
                  <label htmlFor="email" className="font-medium text-sm text-[#606778]">
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
                      formik.touched.email && formik.errors.email ? "border-red-700" : ""
                    }
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500 text-sm">{formik.errors.email}</div>
                  ) : null}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="font-medium text-sm text-[#606778]">
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
                      formik.touched.phone && formik.errors.phone ? "border-red-700" : ""
                    }
                  />
                  {formik.touched.phone && formik.errors.phone ? (
                    <div className="text-red-500 text-sm">{formik.errors.phone}</div>
                  ) : null}
                </div>
              </div>
              {/* third input */}
              <div className="flex flex-col gap-2 relative">
                <label htmlFor="password" className="font-medium text-sm text-[#606778]">
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
                    formik.touched.password && formik.errors.password ? "border-red-700" : ""
                  }
                />
                <div
                  className="absolute top-10 right-4 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500 text-sm">{formik.errors.password}</div>
                ) : null}
              </div>
              <article className="inline-flex gap-3">
                <p className="font-light text-sm text-[#7B8499]">
                  By continuing you agree to the Occupy{" "}
                  <Link href={"#"} className="text-[#A74E8E] font-medium underline">
                    terms of service{" "}
                  </Link>{" "}
                  and{" "}
                  <Link href={"#"} className="text-[#A74E8E] font-medium underline">
                    privacy policy
                  </Link>
                  .
                </p>
              </article>

              <div className="text-end">
                <Button type="submit" className="w-full lg:w-32 rounded-md">
                  Continue
                </Button>
                <p className="text-sm text-[#7B8499] text-center lg:text-end pt-4">
                  Already registered?{" "}
                  <Link href="/auth/login" className="text-[#A74E8E] font-medium underline">
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          </div>
          <div className="flex items-center text-sm font-light text-center text-black justify-center gap-3">
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
