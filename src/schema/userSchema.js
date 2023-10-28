import { object, string, bool } from "yup";

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const usernameRegex = /^[a-zA-Z0-9_]+$/;

export const loginUserSchema = object().shape({
  email: string()
    .email("Please enter a Email address.")
    .matches(emailRegex, "Email address is not valid."),
  password: string()
    .required("No password provided.")
    .matches(
      passwordRegex,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number.",
    ),
});

export const resetPasswordSchema = object().shape({
  password: string()
    .required("No password provided.")
    .matches(
      passwordRegex,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number.",
    ),
});

export const forgotPasswordSchema = object().shape({
  email: string()
    .email("Please enter a Email address.")
    .matches(emailRegex, "Email address is not valid."),
});

export const signUpSchema = object().shape({
  name: string().required("Please enter your Name."),
  username: string()
    .matches(
      usernameRegex,
      "Invalid username, no spaces or special characters are allowed",
    )
    .required("Username is required"),
  email: string()
    .email("Please enter a Email address.")
    .matches(emailRegex, "Email address is not valid."),
  password: string()
    .required("Please enter a password.")
    .matches(
      passwordRegex,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number.",
    ),
});
