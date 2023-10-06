"use client";
import Image from "next/image";
import Link from "next/link";
import { Translate } from "translate-easy";
import { motion } from "framer-motion";
import { useState } from "react";
import { Facebook, Github, Twitter } from "lucide-react";
// import TermsModal from "./TermsModal";

import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { footerVariants } from "@/utils/motion";


const Footer = () => {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  // // const [showTermsModal, setShowTermsModal] = useState(false);

  const handelPrivacyModal = () => {
    setShowPrivacyModal(!showPrivacyModal);
  };

  // const handelTermsModal = () => {
    // setShowTermsModal(!showTermsModal);
  // };
  return (
    <motion.footer
      variants={footerVariants}
      whileInView="show"
      initial="hidden"
      viewport={{ once: true }}
      className="relative py-3 bg-stone-50 dark:bg-gray-800"
    >
      <div className="bg-gradient-to-b from-stone-200 to-transparent dark:from-gray-900 w-full h-44 absolute -top-4 left-0"></div>
      <div className="mx-auto w-full max-w-screen-xl px-4 pt-6 lg:pt-8">
        <div className="md:flex md:justify-between items-center">
          <div className="mb-6 md:mb-0 z-10">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="logo"
                className="rounded-full z-10 bg-indigo-600 px-3 py-2 dark:bg-transparent"
                width={153}
                height={153}
              />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3 z-10">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                <Translate>Hot links</Translate>
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link href="/upload" className="hover:underline">
                    <Translate>Upload</Translate>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    <Translate>Dashboard</Translate>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                <Translate>Follow us</Translate>
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link
                    href="https://github.com/osamaHIma"
                    className="hover:underline "
                  >
                    Github
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Discord
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                <Translate>Legal</Translate>
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li
                  className="mb-4 hover:underline cursor-pointer"
                  onClick={handelPrivacyModal}
                >
                  <Translate>Privacy Policy</Translate>
                </li>
                <li
                 
                  className="mb-4 hover:underline cursor-pointer"
                >
                  <Translate>Terms &amp; Conditions</Translate>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <Link href="#" className="hover:underline">
              ChatHub™
            </Link>
            . <Translate>All Rights Reserved</Translate>.
          </span>
          <div className="flex mt-4 gap-3 sm:justify-center sm:mt-0">
            <Link
              href="#"
            >
              <Facebook className="text-gray-500 hover:text-gray-700 dark:hover:text-white transition-colors duration-500" />
              <span className="sr-only">Facebook page</span>
            </Link>
            {/* <Link
              href="#"
              className="text-gray-500 hover:text-gray-700 dark:hover:text-white transition-colors duration-500"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 21 16"
              >
                <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
              </svg>
              <span className="sr-only">Discord community</span>
            </Link> */}
            <Link href="#">
              <Twitter className="text-gray-500 hover:text-gray-700 dark:hover:text-white transition-colors duration-500" />

              <span className="sr-only">Twitter page</span>
            </Link>
            <Link href="#">
              <Github className="text-gray-500 hover:text-gray-700 dark:hover:text-white transition-colors duration-500" />
              <span className="sr-only">GitHub account</span>
            </Link>
          </div>
        </div>
      </div>
      <Dialog
        open={showPrivacyModal}
        handler={handelPrivacyModal}
        className="bg-stone-200 list-decimal dark:bg-stone-900 overflow-y-auto max-h-96"
      >
        <DialogHeader className="dark:text-slate-200">
          <Translate>Privacy Policy</Translate>
        </DialogHeader>
        <DialogBody divider>
          <p className="my-3 dark:text-gray-50">
            <Translate>
              At &quot;ChatHub&quot;, we are committed to protecting your
              privacy and ensuring the security of your personal information.
              This Privacy Policy outlines how we collect, use, and safeguard
              the information you provide to us through our website
            </Translate>
            .
          </p>
          <li className="my-3 dark:text-gray-50">
            <strong className="text-indigo-400 font-semibold">
              <Translate>Information Collection</Translate>:
            </strong>
            <br />{" "}
            <Translate>
              We may collect personal information, such as your name, email
              address, and phone number, when you sign up for our services or
              interact with our website
            </Translate>
            .
          </li>
          <li className="my-3 dark:text-gray-50">
            <strong className="text-indigo-400 font-semibold">
              <Translate>Information Usage</Translate>:
            </strong>
            <br />{" "}
            <Translate>
              We use the collected information to provide and improve our
              services, communicate with you, and personalize your experience on
              our website
            </Translate>
            .
          </li>
          <li className="my-3 dark:text-gray-50">
            <strong className="text-indigo-400 font-semibold">
              <Translate>Information Sharing</Translate>:
            </strong>
            <br />{" "}
            <Translate>
              We do not sell, rent, or lease your personal information to third
              parties. However, we may share your information with trusted
              service providers who assist us in operating our website and
              providing the requested services
            </Translate>
            .
          </li>
          <li className="my-3 dark:text-gray-50">
            <strong className="text-indigo-400 font-semibold">
              <Translate>Security</Translate>:
            </strong>
            <br />{" "}
            <Translate>
              We implement security measures to protect your personal
              information from unauthorized access, alteration, disclosure, or
              destruction
            </Translate>
            .
          </li>
          <li className="my-3 dark:text-gray-50">
            <strong className="text-indigo-400 font-semibold">
              <Translate>Third-Party Links</Translate>:
            </strong>
            <br />{" "}
            <Translate>
              Our website may contain links to third-party websites. We are not
              responsible for the privacy practices or content of these
              websites. We encourage you to review the privacy policies of those
              websites
            </Translate>
            .
          </li>
          <li className="my-3 dark:text-gray-50">
            <strong className="text-indigo-400 font-semibold">
              <Translate>Changes to the Privacy Policy</Translate>:
            </strong>
            <br />{" "}
            <Translate>
              We may update or modify this Privacy Policy from time to time. We
              will notify you of any changes by posting the revised policy on
              our website
            </Translate>
            .
          </li>
          <p className="my-3 dark:text-gray-50">
            <Translate>
              By using the &quot;ChatHub&quot; website and providing your
              personal information, you consent to the collection, use, and
              disclosure of your information as described in this Privacy Policy
            </Translate>
            .
          </p>
        </DialogBody>
        <DialogFooter>
          <Button className="bg-indigo-600" onClick={handelPrivacyModal}>
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
      {/* <TermsModal open={showTermsModal} handleOpen={handelTermsModal} /> */}
    </motion.footer>
  );
};

export default Footer;
