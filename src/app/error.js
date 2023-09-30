"use client";
import Image from "next/image";
import Link from "next/link";
import { Translate } from "translate-easy";
import { Button } from "@material-tailwind/react";
import { ArrowLeft } from "lucide-react";

function Error({ errorMessage }) {
  // "use server";
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <section className="relative">
      <div className="gradient absolute right-[100px] top-10 h-80 w-80 bg-indigo-600/30 blur-[100px]" />

      <div className="container mx-auto min-h-screen px-6 py-12 lg:flex lg:items-center lg:gap-12">
        <div className="wf-ull lg:w-1/2">
          <p className="text-sm font-medium text-red-500 dark:text-red-400">
            Error Code: 500
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            {errorMessage}
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            <Translate>
              We&apos;re sorry, but something went wrong. Please try again later
            </Translate>
            .
          </p>

          <div className="mt-6 flex items-center gap-x-3">
            <Button
              onClick={handleGoBack}
              variant="outline"
              className="flex w-1/2 items-center justify-center rtl:flex-row-reverse gap-x-2 text-sm dark:border-gray-700 text-gray-200 dark:hover:bg-gray-800 sm:w-auto"
            >
              <ArrowLeft />

              <span><Translate translations={{ar:"عد للخلف"}}>Go back</Translate></span>
            </Button>

            <Link href="/">
              <Button className="bg-indigo-400 w-1/2 shrink-0 py-4 text-sm tracking-wide text-white sm:w-auto">
                <Translate translations={{ ar: "عد للصفحة الرئيسية" }}>
                  Take me home
                </Translate>
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative mt-12 w-full lg:mt-0 lg:w-1/2">
          <Image
            className="w-full max-w-lg lg:mx-auto"
            width={300}
            height={300}
            priority
            src="/serverError.svg"
            alt="505"
          />
        </div>
      </div>
    </section>
  );
}

export default Error;
