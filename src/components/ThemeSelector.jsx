"use client";

import {
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { Laptop, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

const ThemeSelector = () => {
  const { setTheme } = useTheme();

  return (
    <Menu
      animate={{
        mount: { y: 0 },
        unmount: { y: 25 },
      }}
      
    >
      <MenuHandler>
        <IconButton className="rounded-full !outline-none" variant="text">
          <MoonIcon className="hidden h-6 w-6 rotate-90 transition-all outline-none dark:block dark:rotate-0  dark:saturate-100 text-blue-300/70" />
          <SunIcon className="block h-6 w-6 rotate-0 transition-all outline-none text-orange-300 dark:hidden dark:rotate-90 " />
          <span className="sr-only">Toggle theme menu</span>
        </IconButton>
      </MenuHandler>

      <MenuList
        // className={`${showThemeMenu} menuTransition absolute z-10 m-8 flex w-[9rem] select-none flex-col shadow-lg ltr:right-0 rtl:left-0 ltr:md:right-[80%] rtl:md:left-[80%]`}
        dir="ltr"
        className="dark:bg-gray-800 border-0 dark:shadow-none"
        // ref={containerRef}
      >
        <MenuItem
          className="dark:text-stone-400 hover:!text-slate-100 hover:!bg-indigo-500 dark:hover:!bg-gray-600"
          // className="cursor-pointer rounded-t-md px-8 pb-2 pt-4 text-stone-900 bg-stone-200 dark:text-stone-100 transition-all ease-in-out hover:!bg-indigo-600 dark:bg-stone-900 hover:text-stone-300 active:!bg-indigo-3"
          onClick={() => setTheme("dark")}
        >
          <MoonIcon className="mr-2 h-5 w-5" />
          <span>Dark</span>
        </MenuItem>
        <MenuItem
          className="dark:text-stone-400 hover:!text-slate-100 hover:!bg-indigo-500 dark:hover:!bg-gray-600"
          // className="cursor-pointer py-2 pl-8 text-stone-900 bg-stone-200 dark:text-stone-100 transition-all ease-in-out hover:!bg-indigo-600 dark:bg-stone-900 hover:text-stone-300 active:!bg-indigo-500"
          onClick={() => setTheme("light")}
        >
          <SunIcon className="mr-2 h-5 w-5" />
          <span>Light</span>
        </MenuItem>
        <MenuItem
          className="dark:text-stone-400 hover:!text-slate-100 hover:!bg-indigo-500 dark:hover:!bg-gray-600"
          // className="cursor-pointer rounded-b-md pb-4 pl-8 pt-2 text-stone-900 bg-stone-200 dark:text-stone-100 transition-all ease-in-out hover:!bg-indigo-600 dark:bg-stone-900 hover:text-stone-300 active:!bg-indigo-500"
          onClick={() => setTheme("system")}
        >
          <Laptop className="mr-2 h-5 w-5" />
          <span>System</span>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ThemeSelector;
