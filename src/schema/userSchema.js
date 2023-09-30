import { object, string, bool } from "yup";

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const loginUserSchema = object().shape({
  email: string()
    .email("Please enter a Email address.")
    .matches(emailRegex, "Email address is not valid."),
  password: string()
    .required("No password provided.")
    .matches(
      passwordRegex,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number."
    ),
});

export const forgotPasswordSchema = object().shape({
  email: string()
    .email("Please enter a Email address.")
    .matches(emailRegex, "Email address is not valid."),
});

export const contactSchema = object().shape({
  name: string().required("Please enter your Name."),
 
  email: string()
    .email("Please enter a Email address.")
    .matches(emailRegex, "Email address is not valid."),
  message: string().required("Please enter a message."),
  // phone: string().matches(/^\d{10}$/, "Please enter a valid phone number.").optional(),
});

export const signUpSchema = object().shape({
  name: string().required("Please enter your Name."),
  username: string().required("Please enter your Username."),
  email: string()
    .email("Please enter a Email address.")
    .matches(emailRegex, "Email address is not valid."),
  password: string()
    .required("Please enter a password.")
    .matches(
      passwordRegex,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number."
    ),
  // termsCheckbox: bool().oneOf(
  //   [true],
  //   "You must accept the Terms and Conditions"
  // ),
});
