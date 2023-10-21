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
      className="relative bg-indigo-100 py-3 dark:bg-gray-800"
    >
      <div className="absolute left-0 top-0 h-44 w-full bg-gradient-to-b from-indigo-200 to-transparent dark:from-gray-900 md:-top-4"></div>
      <div className="mx-auto w-full max-w-screen-xl px-4 pt-6 lg:pt-8">
        <div className="items-center md:flex md:justify-between">
          <div className="z-10 mb-6 md:mb-0">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="logo"
                className="z-10 rounded-full bg-indigo-600 px-3 py-2 dark:bg-transparent"
                width={153}
                height={153}
              />
            </Link>
          </div>
          <div className="z-10 grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-gray-100 dark:text-white">
                <Translate>Hot links</Translate>
              </h2>
              <ul className="font-medium text-gray-700 dark:text-gray-300">
                <li className="mb-4">
                  <Link href="/" className="hover:underline">
                    <Translate>Chat</Translate>
                  </Link>
                </li>
                <li>
                  <Link href="/account" className="hover:underline">
                    <Translate>Account</Translate>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-gray-100 dark:text-white">
                <Translate>Follow us</Translate>
              </h2>
              <ul className="font-medium text-gray-700 dark:text-gray-300">
                <li className="mb-4">
                  <Link
                    href="https://github.com/osamaHIma"
                    className="hover:underline "
                  >
                    Github
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.facebook.com/profile.php?id=100078254302916"
                    className="hover:underline"
                  >
                    Facebook
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-gray-100 dark:text-white">
                <Translate>Legal</Translate>
              </h2>
              <ul className="font-medium text-gray-700 dark:text-gray-300">
                <li
                  className="mb-4 cursor-pointer hover:underline"
                  onClick={handelPrivacyModal}
                >
                  <Translate>Privacy Policy</Translate>
                </li>
                <li
                  onClick={handelPrivacyModal}
                  className="mb-4 cursor-pointer hover:underline"
                >
                  <Translate>Terms &amp; Conditions</Translate>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-200 sm:text-center">
            © 2023{" "}
            <Link href="#" className="hover:underline">
              ChatHub™
            </Link>
            . <Translate>All Rights Reserved</Translate>.
          </span>
          <div className="mt-4 flex gap-3 sm:mt-0 sm:justify-center">
            <Link href="https://www.facebook.com/profile.php?id=100078254302916">
              <Facebook className="text-gray-500 transition-colors duration-500 hover:text-gray-700 dark:hover:text-white" />
              <span className="sr-only">Facebook page</span>
            </Link>
            <Link href="#">
              <Twitter className="text-gray-500 transition-colors duration-500 hover:text-gray-700 dark:hover:text-white" />

              <span className="sr-only">Twitter page</span>
            </Link>
            <Link href="https://github.com/osamaHIma">
              <Github className="text-gray-500 transition-colors duration-500 hover:text-gray-700 dark:hover:text-white" />
              <span className="sr-only">GitHub account</span>
            </Link>
          </div>
        </div>
      </div>
      <Dialog
        open={showPrivacyModal}
        handler={handelPrivacyModal}
        className="max-h-96 list-decimal overflow-y-auto bg-stone-200 dark:bg-gray-800"
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
            <strong className="font-semibold text-indigo-400">
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
            <strong className="font-semibold text-indigo-400">
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
            <strong className="font-semibold text-indigo-400">
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
            <strong className="font-semibold text-indigo-400">
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
            <strong className="font-semibold text-indigo-400">
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
            <strong className="font-semibold text-indigo-400">
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
