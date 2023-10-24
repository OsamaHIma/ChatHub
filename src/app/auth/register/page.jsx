"use client";

import MotionLayout from "@/components/MotionLayout";
import { signUpSchema } from "@/schema/userSchema";
import { Button, Input, Spinner, Typography } from "@material-tailwind/react";
import axios from "axios";
import { EyeIcon, EyeOffIcon, InfoIcon, MailOpen } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { Translate } from "translate-easy";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handelInputChange = (event) => {
    const { value, name } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handelSubmit = async (event) => {
    event.preventDefault();

    setError(null);
    try {
      signUpSchema.validateSync(
        {
          name: formData.name,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          password: formData.confirm_password,
        },

        { abortEarly: false },
      );
    } catch (error) {
      setError(error.errors);
      return;
    }

    if (formData.password !== formData.confirm_password)
      return toast.error(<Translate>Passwords does not match</Translate>);

    setLoading(true);

    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/register`, formData);

      if (data.status || data.token) {
        toast.success(<Translate>Registered successfully, Now please confirm your email address by clicking "Confirm Email" in the email that has been sent to you, if you can't see the email please check the spam emails</Translate>, {
          icon: <MailOpen />,
          position:"top-center"
        });
      } else {
        toast.error(<Translate>{data.message}</Translate>);
      }
    } catch (error) {
      toast.error(error);
    }
    setLoading(false);
  };

  return (
    <MotionLayout>
      <section className="paddings relative innerWidth py-16 text-center overflow-hidden">
        <div className="w-96 -z-10 h-72 left-14 md:left-5 md:h-96 bg-indigo-300/50 dark:bg-gray-800/50 rounded-3xl backdrop-blur-xl shadow-inner absolute" />
        <div className="w-96 -z-10 h-72 md:h-96 bg-indigo-300/50 dark:bg-gray-800/50 rounded-3xl backdrop-blur-xl shadow-inner absolute right-7 bottom-5" />
        <h1 className="my-7 text-indigo-50 text-2xl font-bold md:text-5xl">
          <Translate>Sing UP</Translate>
        </h1>
        <p className="text-gray-200 ">
          <Translate>
            Are you ready for more secure chat with no FPI in the middle?
          </Translate>
        </p>
        <form
          className="mx-auto my-10 flex max-w-2xl flex-col gap-7 rounded-xl shadow-xl backdrop-blur-2xl px-7 py-16"
          noValidate
          onSubmit={handelSubmit}
        >
          <Input
            color="white"
            size="lg"
            className="text-gray-300"
            label={<Translate>Name</Translate>}
            type="text"
            required
            name="name"
            onChange={handelInputChange}
            error={error}
          />
          <div>
            <Input
              color="white"
              size="lg"
              className="text-gray-300"
              label={<Translate>User Name</Translate>}
              type="text"
              required
              name="username"
              onChange={handelInputChange}
              error={error}
            />
            <Typography
              variant="small"
              color="gray"
              className="mt-3 flex items-center gap-1 text-xs font-normal dark:text-gray-300 md:text-sm"
            >
              <InfoIcon className="-mt-px h-5 w-5 text-red-800 dark:text-red-500" />
              <Translate>CAN'T BE CHANGED LATER!</Translate>
            </Typography>
            <Typography
              variant="small"
              color="gray"
              className="mt-3 flex items-center gap-1 text-xs font-normal dark:text-gray-300 md:text-sm"
            >
              <InfoIcon className="-mt-px h-5 w-5 text-yellow-800 dark:text-yellow-500" />
              <Translate>No spaces or special characters are allowed</Translate>
            </Typography>
          </div>
          <Input
            color="white"
            size="lg"
            className="text-gray-300"
            label={<Translate>Email</Translate>}
            type="email"
            required
            name="email"
            onChange={handelInputChange}
            error={error}
          />
          <div>
            <Input
              color="white"
              size="lg"
              className="text-gray-300"
              label={<Translate>Password</Translate>}
              type={showPassword ? "text" : "password"}
              required
              name="password"
              onChange={handelInputChange}
              error={error}
              icon={
                showPassword ? (
                  <EyeIcon
                    onClick={toggleShowPassword}
                    className=" cursor-pointer"
                  />
                ) : (
                  <EyeOffIcon
                    onClick={toggleShowPassword}
                    className=" cursor-pointer"
                  />
                )
              }
            />
            <Typography
              variant="small"
              color="gray"
              className="mt-3 flex items-center gap-1 text-xs font-normal dark:text-gray-300 md:text-sm"
            >
              <InfoIcon className="-mt-px h-6 w-6 text-yellow-800 dark:text-yellow-500" />
              <Translate>
                Use at least 8 characters, one uppercase, one lowercase and one
                number.
              </Translate>
            </Typography>
          </div>
          <Input
            color="white"
            size="lg"
            className="text-gray-300"
            label={<Translate>Confirm Password</Translate>}
            type={showPassword ? "text" : "password"}
            required
            name="confirm_password"
            onChange={handelInputChange}
            error={error}
          />
          {error && (
            <ol className="mx-4 flex list-decimal flex-col gap-1 text-red-500 ltr:text-left rtl:text-right">
              {error.map((err, key) => {
                return (
                  <li key={key} className="my-1">
                    *<Translate>{err}</Translate>
                  </li>
                );
              })}
            </ol>
          )}
          <Button type="submit" variant="gradient"
            color="indigo" size="lg" disabled={loading}>
            {loading ? (
              <Spinner scale={1.7} className="mx-auto" />
            ) : (
              <Translate>Sign Up</Translate>
            )}
          </Button>
          <h3>
            <Translate>Already have an account?</Translate>{" "}
            <Link
              href="/auth/login"
              className="text-indigo-500 underline-offset-4 hover:underline"
            >
              <Translate>Login</Translate>
            </Link>{" "}
          </h3>
        </form>
      </section>
    </MotionLayout>
  );
};

export default Register;
