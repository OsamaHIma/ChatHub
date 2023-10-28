"use client";

import ForgotPassword from "@/components/ForgotPassword";
import MotionLayout from "@/components/MotionLayout";
import { loginUserSchema } from "@/schema/userSchema";
import { Button, Checkbox, Input, Spinner } from "@material-tailwind/react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { Translate } from "translate-easy";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const socket = useRef(null);
  const [isRememberedUser, setIsRememberedUser] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [openForgotPasswordModal, setOpenForgotPasswordModal] = useState(false);
  const router = useRouter();
  const handleOpenForgotPasswordModal = () => setOpenForgotPasswordModal((cur) => !cur);


  useEffect(() => {
    socket.current = io(process.env.NEXT_PUBLIC_BASE_URL);
  }, []);

  const handelInputChange = (event) => {
    const { value, name } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handelSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      loginUserSchema.validateSync(
        {
          email: formData.email,
          password: formData.password,
        },

        { abortEarly: false },
      );
    } catch (error) {
      setError(error.errors);
      toast.error(error);
      return;
    }

    setLoading(true);
    try {
      const user = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (!user.error) {
        handleRememberUser();
        router.push(`/`);
        toast.success(<Translate>Singed in successfully</Translate>);
      } else {
        setError([user.error]);
      }
    } catch (err) {
      toast.error(<Translate>{err.code || err.message || err}</Translate>);
      console.error("error sing in user" + err);
    }
    setLoading(false);
  };

  const handleRememberUser = () => {
    if (isRememberedUser) {
      localStorage.setItem(
        "current-user",
        JSON.stringify({ email: formData.email, password: formData.password }),
      );
    } else {
      localStorage.removeItem("current-user");
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("current-user"));
    if (!user) return;
    setIsRememberedUser(true);
    formData.email = user.email;
    formData.password = user.password;
  }, []);

  return (
    <MotionLayout>
      <section className="paddings relative innerWidth py-16 text-center overflow-hidden">
        <div className="w-96 -z-10 h-72 left-14 md:left-5 md:h-96 bg-indigo-300/50 dark:bg-gray-800/50 rounded-3xl backdrop-blur-xl shadow-inner absolute" />
        <div className="w-96 -z-10 h-72 md:h-96 bg-indigo-300/50 dark:bg-gray-800/50 rounded-3xl backdrop-blur-xl shadow-inner absolute right-7 bottom-5" />
        <h1 className="my-7 text-indigo-50 text-2xl font-bold md:text-5xl">
          <Translate>Log In</Translate>
        </h1>
        <p className="text-gray-100">
          <Translate>
            Welcome back!
          </Translate>
        </p>
        <ForgotPassword open={openForgotPasswordModal} socket={socket.current && socket} handleOpen={handleOpenForgotPasswordModal} />
        {/* <div className="mt-5 flex flex-col gap-7 w-full items-center justify-center ">
          <Button variant="gradient" title="Sign in with Google" size="lg" className="w-72 flex items-center gap-3 justify-center" color="white" onClick={() => signIn("google")}>
            Google
            <img src="/google.svg" className="w-7" alt="google sign in" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="h-[3px] w-32 bg-gray-300 rounded-md" />
            <p className="text-2xl text-gray-50">OR</p>
            <div className="h-[3px] w-32 bg-gray-300 rounded-md" />
          </div>
        </div> */}
        <form
          className="mx-auto my-10 flex max-w-2xl shadow-xl flex-col gap-7 rounded-xl backdrop-blur-2xl px-7 py-16"
          noValidate
          onSubmit={handelSubmit}
        >
          <Input
            color="white"
            className="text-gray-300 focus:shadow-lg"
            size="lg"
            label={<Translate>Email</Translate>}
            type="email"
            required
            value={formData.email}
            name="email"
            onChange={handelInputChange}
            error={error}
          />
          <Input
            color="white"
            className="text-gray-300"
            size="lg"
            label={<Translate>Password</Translate>}
            type={showPassword ? "text" : "password"}
            required
            value={formData.password}
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
          <div className="flex items-center justify-between">
            <div className="flex h-full w-full items-center justify-between">
              <Checkbox
                label={
                  <div className="text-gray-300">
                    <Translate>Remember Me</Translate>
                  </div>
                }
                onChange={(e) => setIsRememberedUser(e.target.checked)}
                checked={isRememberedUser}
                value={isRememberedUser || ""}
                id="remember-me"
              />
            </div>
            <button
              onClick={handleOpenForgotPasswordModal}
              type="button"
              className="text-indigo-500 whitespace-nowrap text-sm underline-offset-4 hover:underline"
            >
              <Translate>Forgot Password</Translate>
            </button>
          </div>
          {error && (
            <ol className="mx-4 flex list-decimal flex-col gap-1 text-red-500 ltr:text-left rtl:text-right">
              {error.map((err, key) => {
                return (
                  <li key={key} className="my-1">
                    *
                    <Translate>
                      {/* {err === "Request failed with status code 401"
                        ? "Wrong Email Or Password"
                        : err} */}
                      {err}
                    </Translate>
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
              <Translate>Log In</Translate>
            )}
          </Button>
          <h3>
            <Translate>No account? no problem</Translate>{" "}
            <Link
              href="/auth/register"
              className="text-indigo-500 underline-offset-4 hover:underline"
            >
              <Translate>Register Now</Translate>
            </Link>{" "}
          </h3>
        </form>
      </section>
    </MotionLayout>
  );
};

export default Login;
