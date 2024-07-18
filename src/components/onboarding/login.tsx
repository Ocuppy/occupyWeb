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

        {/* login form */}
        <div className="lg:bg-white px-6 lg:px-8 py-12 w-full max-w-lg rounded-lg lg:shadow-lg flex flex-col gap-8 items-center">
          <Image className="w-[120px]" src={OccupyLogo} alt="logo" />
          <div className="flex flex-col items-start gap-3 w-full">
            <h3 className="text-[#12141A] font-medium text-2xl">Login</h3>
            <p className="text-sm text-[#606778] font-medium pb-12">
              Login to Access Your Account
            </p>
            {/* input form  */}
            <form className="flex flex-col gap-4 w-full" onSubmit={formik.handleSubmit}>
              <div className="flex flex-col gap-2 w-full">
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
                    formik.touched.email && formik.errors.email
                      ? "border-red-700 w-full"
                      : "w-full"
                  }
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500 text-sm">{formik.errors.email}</div>
                ) : null}
              </div>

              <div className="flex flex-col gap-2 w-full relative">
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
                    formik.touched.password && formik.errors.password
                      ? "border-red-700 w-full"
                      : "w-full"
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
              <article className="inline-flex gap-3 w-full">
                <p className="font-light text-sm text-[#7B8499]">
                  Can&apos;t remember your password?{" "}
                  <Link
                    href={"/auth/forgot-password"}
                    className="text-[#A74E8E] font-medium underline"
                  >
                    Forget Password
                  </Link>
                </p>
              </article>

              <div className="text-end w-full">
                <Button type="submit" className="w-full lg:w-32 rounded-md">
                  Login
                </Button>
                <p className="text-sm text-[#7B8499] text-center lg:text-end pt-4">
                  New to Occupy?{" "}
                  <Link href="/auth/signup" className="text-[#A74E8E] font-medium underline">
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
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

export default Login;
