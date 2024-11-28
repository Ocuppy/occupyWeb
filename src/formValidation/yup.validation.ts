import * as Yup from "yup";

// Signup
export const signupValidationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  estate: Yup.string().required("Estate is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

//   Login
export const loginValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

// Forgot password
export const forgotPasswordValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Email is required"),
});
