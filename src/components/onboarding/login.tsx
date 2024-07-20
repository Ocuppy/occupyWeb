import Image from "next/image";
import OccupyLogo from "../../../public/occupy-logo.png";
import { Input } from "../ui/input";
import Link from "next/link";
import { Button } from "../ui/button";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff } from "lucide-react";
import { loginValidationSchema } from "@/formValidation/yup.validation";
import { useRouter } from "next/navigation";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      console.log(values);
      router.push("/dashboard");
    },
  });

  return (
    <section
      className="flex min-h-screen w-full font-[inter] lg:relative lg:items-center lg:justify-center"
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

        {/* login form */}
        <div className="flex w-full max-w-lg flex-col items-center gap-8 rounded-lg bg-white px-6 py-12 lg:px-8 lg:shadow-lg">
          <Image className="w-[120px]" src={OccupyLogo} alt="logo" />
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

              <div className="relative flex w-full flex-col gap-2">
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
                      ? "w-full border-red-700"
                      : "w-full"
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
                  className="w-full rounded-md bg-occupy-primary p-3 text-white lg:w-32"
                >
                  Login
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

export default Login;
