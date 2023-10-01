"use client";

import MotionLayout from "@/components/MotionLayout";
import { signUpSchema } from "@/schema/userSchema";
import { Button, Input, Spinner, Typography } from "@material-tailwind/react";
import axios from "axios";
import { EyeIcon, EyeOffIcon, InfoIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const [check, setCheck] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handelInputChange = (event) => {
    const { value, name } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const router = useRouter();
  // const handelInputChange = async (event) => {
  //   const { value, name } = event.target;
  //   setFormData({ ...formData, [name]: value });
  //   if (name == "username" || name === "email") {
  //     const { data } = await axios.post(
  //       "http://localhost:5000/api/auth/check",
  //       { username: formData.username, email: formData.email },
  //     );
  //     if (!data.status) {
  //       setCheck(data.message);
  //     } else {
  //       setCheck("");
  //     }
  //   }
  // };

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
      const { data } = await axios.post(`/api/register`, formData);

      if (data.status || data.token) {
        await signIn("credentials", {
          redirect: false,
          email: formData.email,
          password: formData.password,
        });
        toast.success(<Translate>Registered successfully</Translate>);
        router.push(`/`);
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
      <section className="paddings innerWidth py-16 !pt-32 text-center">
        <h1 className="my-7 text-2xl font-bold md:text-5xl">
          <Translate>Sing UP</Translate>
        </h1>
        <p className="text-gray-400 ">
          <Translate>
            Are you ready for more secure chat with no FPI in the middle?
          </Translate>
        </p>
        <form
          className="mx-auto mt-14 flex max-w-2xl flex-col gap-7 rounded-xl bg-slate-100 px-7 py-16 dark:bg-gray-800"
          noValidate
          onSubmit={handelSubmit}
        >
          <Input
            color="indigo"
            size="lg"
            className="text-stone-800 dark:text-gray-300"
            label={<Translate>Name</Translate>}
            type="text"
            required
            name="name"
            onChange={handelInputChange}
            error={error}
          />
          <div>
            <Input
              color="indigo"
              size="lg"
              className="text-stone-800 dark:text-gray-300"
              label={<Translate>User Name</Translate>}
              type="text"
              required
              name="username"
              onChange={handelInputChange}
              error={error}
            />
            {check && (
              <Typography
                variant="small"
                color="gray"
                className="mt-2 flex items-center gap-1 text-xs font-normal dark:text-gray-300 md:text-sm"
              >
                <InfoIcon className="-mt-px h-6 w-6 text-red-800 dark:text-red-500" />
                <Translate>{check}</Translate>
              </Typography>
            )}
          </div>
          <Input
            color="indigo"
            size="lg"
            className="text-stone-800 dark:text-gray-300"
            label={<Translate>Email</Translate>}
            type="email"
            required
            name="email"
            onChange={handelInputChange}
            error={error}
          />
          <div>
            <Input
              color="indigo"
              size="lg"
              className="text-stone-800 dark:text-gray-300"
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
            color="indigo"
            size="lg"
            className="text-stone-800 dark:text-gray-300"
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
          <Button type="submit" className="bg-indigo-600 " size="lg">
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
              className="text-blue-500 underline-offset-4 hover:underline"
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
