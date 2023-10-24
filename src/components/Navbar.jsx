"use client";
import { motion } from "framer-motion";
import { MenuIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Translate } from "translate-easy";
import LanguageSelector from "./LanguageSelector";
import { navVariants } from "@/utils/motion";
import {
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
  Spinner,
} from "@material-tailwind/react";
import ThemeSelector from "./ThemeSelector";
import { useUser } from "@/context/UserContext";
import { signOut } from "next-auth/react";

const Navbar = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);


  const handleSignOut = async () => {
    setLoading(false);
    signOut();
    setLoading(true);
  };

  return (
    <nav
      className={` w-full text-stone-100 transition-all ease-in`}
    >
      <motion.div
        variants={navVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="h-container paddings innerWidth relative flex flex-nowrap items-center justify-between border-b-[3px] border-stone-300 dark:border-stone-700 md:justify-evenly"
      >

        <div className="flex items-center gap-3">
          <Link href="/">
            <Image
              src="/logo.svg"
              width={300}
              height={300}
              priority
              className="w-24 md:w-[200px]"
              alt="logo"
            />
          </Link>
          <div className="relative overflow-hidden rounded-lg">
            <img src="/palestine.svg" className="shadow bg-indigo-600/40  dark:bg-transparent transition-all ease-in-out duration-500 p-2  w-[3rem]  md:w-[4.7rem] right-5 top-2" />
            <div className="heigh-light" />
          </div>
        </div>
        <section className="flex items-center gap-2 md:gap-4">
          {/* Theme menu */}
          <ThemeSelector />
          <LanguageSelector />
          {/* Menu for large screens */}
          <div className="hidden lg:block">
            <ul className="h-menu flex items-center !gap-8">
              {user ? (
                <>
                  <li>
                    <Link href="/" className={`text-stone-50 `}>
                      <Translate>Chat</Translate>
                    </Link>
                  </li>
                  <li>
                    <Link href="/account" className={`text-stone-50 `}>
                      <Translate>Account</Translate>
                    </Link>
                  </li>
                  <Button
                    onClick={handleSignOut}
                    variant="gradient"
                    color="indigo"
                    className=" translation-all min-w-[5rem] max-w-[7rem]"
                    disabled={loading}
                  >
                    {loading ? (
                      <Spinner scale={1.7} className="mx-auto" />
                    ) : (
                      <Translate>Sign Out</Translate>
                    )}
                  </Button>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/auth/register" className="text-stone-50">
                      <Translate>Register</Translate>
                    </Link>
                  </li>
                  <li>
                    <Link href="/auth/login" className="text-stone-50">
                      <Translate>Login</Translate>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Menu for medium and small screens */}

          <Menu
            animate={{
              mount: { y: 0 },
              unmount: { y: 25 },
            }}
          >
            <MenuHandler>
              <IconButton
                variant="text"
                className="mx-1.5 block rounded-full md:mx-4 lg:hidden"
              >
                <MenuIcon className="transition ease-in-out hover:text-slate-400  ltr:text-stone-300 rtl:text-indigo-500 dark:hover:text-slate-100" />
                <span className="sr-only">
                  <Translate>Toggle menu</Translate>
                </span>
              </IconButton>
            </MenuHandler>

            <MenuList className="w-[13rem] border-0 text-center text-gray-800 dark:bg-gray-800 dark:text-stone-50 lg:hidden">
              {user ? (
                <>
                  <Link href="/">
                    <MenuItem
                      className={`my-3 text-center hover:!border-0 dark:hover:!bg-gray-100`}
                    >
                      <Translate>Chat</Translate>
                    </MenuItem>
                  </Link>
                  <Link href="/account">
                    <MenuItem
                      className={`my-3 text-center hover:!border-0 dark:hover:!bg-gray-100`}
                    >
                      <Translate>Account</Translate>
                    </MenuItem>
                  </Link>
                  <Button
                    onClick={handleSignOut}
                    variant="gradient"
                    color="indigo"
                    className=" translation-all min-w-[5rem] max-w-[7rem]"
                    disabled={loading}
                  >
                    {loading ? (
                      <Spinner scale={1.7} className="mx-auto" />
                    ) : (
                      <Translate>Sign Out</Translate>
                    )}
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth/register">
                    <MenuItem className="my-3 text-center hover:!border-0 dark:hover:!bg-gray-100">
                      <Translate>Register</Translate>
                    </MenuItem>
                  </Link>
                  <Link href="/auth/login">
                    <MenuItem className="my-3 text-center hover:!border-0 dark:hover:!bg-gray-100">
                      <Translate>Login</Translate>
                    </MenuItem>
                  </Link>
                </>
              )}
            </MenuList>
          </Menu>
        </section>
      </motion.div>
    </nav>
  );
};

export default Navbar;
