"use client";

import {
    Button,
    Dialog,
    Card,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Stepper,
    Step,
} from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { Translate } from "translate-easy";
import { ChevronLeft, EyeIcon, EyeOffIcon, InfoIcon } from "lucide-react";
import { loginUserSchema } from "@/schema/userSchema";

const ForgotPassword = ({ handleOpen, open, socket }) => {
    // const socket = useRef(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirm_password] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const [activeStep, setActiveStep] = useState(0);
    const [isLastStep, setIsLastStep] = useState(false);
    const [isFirstStep, setIsFirstStep] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    if (socket) {
        socket.current.on("user-resetPasswordClicked", userEmail => {
            if (userEmail === email) {
                setActiveStep(2)
            }
        });
    }

    const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
    const toggleShowPassword = () => setShowPassword(!showPassword);

    const verifyEmail = async () => {
        if (!email) return
        setErrMsg('')
        setLoading(true);

        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/forgot-password`, { email });

            if (data.status) {
                // toast.success(<Translate>Please check your Email to proceed</Translate>);
                setActiveStep(1)
            } else {
                setErrMsg(<Translate>{data.message}</Translate>);
            }
        } catch (error) {
            toast.error(error);
            console.error(error)
        }
        setLoading(false);
    }

    const resetPassword = async () => {
        if (!password) return
        if (password !== confirm_password)
            return setErrMsg(<Translate>Passwords does not match</Translate>);

        setErrMsg('')
        try {
            loginUserSchema.validateSync(
                {
                    password: password,
                },

                { abortEarly: false },
            );
        } catch (error) {
            setErrMsg(error.errors);
            toast.error(error);
            return;
        }
        setLoading(true);

        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/reset-password`, { email, password });

            if (data.status) {
                toast.success(<Translate>All set you can now login</Translate>);
                handleOpen()
                // setActiveStep(1)
            } else {
                setErrMsg(<Translate>{data.message}</Translate>);
            }
        } catch (error) {
            toast.error(error);
            console.error(error)
        }
        setLoading(false);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (activeStep === 0) verifyEmail()
        if (activeStep === 2) resetPassword()
    }

    return (
        <>
            <Dialog
                size="sm"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-[24rem]">

                    <form onSubmit={handleSubmit} noValidate={activeStep === 2 ? true : false}>
                        <CardBody className="flex flex-col gap-4">
                            <Stepper
                                activeStep={activeStep}
                                isLastStep={(value) => setIsLastStep(value)}
                                isFirstStep={(value) => setIsFirstStep(value)}
                            >
                                <Step >1</Step>
                                <Step >2</Step>
                                <Step >3</Step>
                            </Stepper>
                            <Typography variant="h4" color="blue-gray">
                                {activeStep === 0 && <Translate>Forgot Password</Translate>}
                                {activeStep === 1 && <Translate>Verify your email address</Translate>}
                                {activeStep === 2 && <Translate>Create new password</Translate>}
                            </Typography>
                            {activeStep === 1 && <ChevronLeft className="top-3 left-5 cursor-pointer bg-indigo-500/50 p-1 rounded-md" size={29} onClick={handlePrev} />}

                            {activeStep === 0 && (
                                <>
                                    <Typography
                                        className="mb-3 font-normal"
                                        variant="paragraph"
                                        color="gray"
                                    >
                                        <Translate>Enter your email to reset your password.</Translate>
                                    </Typography>
                                    <Typography className="-mb-2" variant="h6">
                                        <Translate>Your Email</Translate>
                                    </Typography>
                                    <Input label="Email" type="email" size="lg" required value={email} onChange={(e) => setEmail(e.target.value)} />
                                    {errMsg && <p className="text-red-400">*{errMsg}</p>}</>
                            )}
                            {activeStep === 1 && (<h3 className="text-xl font-semibold">
                                <Translate>Please check your Email to proceed</Translate>
                            </h3>)}
                            {activeStep === 1 && <p><Translate>If you can't see the email please check the spam emails</Translate></p>}
                            {activeStep === 2 && (
                                <>
                                    <Typography
                                        className="mb-3 font-normal"
                                        variant="paragraph"
                                        color="gray"
                                    >
                                        <Translate>Enter your new password.</Translate>
                                    </Typography>
                                    <Typography className="-mb-2" variant="h6">
                                        <Translate>Your password</Translate>
                                    </Typography>
                                    <Input label="Password" type={showPassword ? "text" : "password"} size="lg" icon={
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
                                    } required value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="flex items-center gap-1 text-xs font-normal text-gray-400 md:text-sm"
                                    >
                                        <InfoIcon className="-mt-px h-6 w-6 text-yellow-800" />
                                        <Translate>
                                            Use at least 8 characters, one uppercase, one lowercase and one
                                            number.
                                        </Translate>
                                    </Typography>
                                    <Typography className="-mb-2" variant="h6">
                                        <Translate>Confirm Your password</Translate>
                                    </Typography>
                                    <Input label="Confirm password" type={showPassword ? "text" : "password"} size="lg" required value={confirm_password} onChange={(e) => setConfirm_password(e.target.value)} />
                                    {errMsg && <p className="text-red-400">*{errMsg}</p>}</>
                            )}
                        </CardBody>
                        <CardFooter className="pt-0">
                            {activeStep !== 1 &&
                                <Button variant="gradient" type="submit" disabled={loading} color="indigo" fullWidth>
                                    <Translate>Submit</Translate>
                                </Button>
                            }
                        </CardFooter>
                    </form>
                </Card>
            </Dialog>
        </>

    )
}

export default ForgotPassword