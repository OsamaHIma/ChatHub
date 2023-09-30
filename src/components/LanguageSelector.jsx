"use client";

import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Button,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "lucide-react";
import { Translate, useLanguage } from "translate-easy";

const LanguageSelector = () => {
  const { selectedLanguage, handleChangeLanguage, languages } = useLanguage();

  const handleLanguageClick = (languageCode) => {
    handleChangeLanguage(languageCode);
  };

  return (
    <Menu className={`relative inline-block`}>
      <MenuHandler>
        <Button
          className={`rounded-full flex items-center gap-3 text-slate-50 bg-indigo-500 px-3 py-2`}
          type="button"
        >
          <span className="ltr:mr-2 rtl:ml-2">
            <Translate translations={{ ar: "العربية" }}>
              {selectedLanguage.name}
            </Translate>
          </span>

          <div>
            <ChevronDownIcon className="w-5 h-5" />
          </div>
        </Button>
      </MenuHandler>
      <MenuList dir="ltr" className="overflow-y-auto max-h-80 bg-stone-200 dark:bg-slate-800 border-0">
        {languages.length &&
          languages.map((language, index) => (
            <MenuItem
              key={index}
              className={`block w-full cursor-pointer z-50 px-4 py-2 my-1 text-left text-stone-800 dark:text-stone-100 transition-all dark:hover:!bg-indigo-500/60 ${
                selectedLanguage.code === language.code
                  ? "border border-dashed border-gray-100 dark:border-gray-300 rounded-md bg-indigo-500 text-slate-50"
                  : ""
              }`}
              onClick={() => {
                handleLanguageClick(language.code);
              }}
            >
              {language.name}
            </MenuItem>
          ))}
      </MenuList>
    </Menu>
  );
};

export default LanguageSelector;
