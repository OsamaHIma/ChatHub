"use client";
import { ThemeProvider } from "next-themes";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";

import { LanguageProvider } from "translate-easy";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { AnimatePresence } from "framer-motion";
import { UserProvider } from "@/context/UserContext";

import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();
const Providers = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <UserProvider>
            <LanguageProvider>
              <ToastContainer
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                toastClassName="dark:!bg-gray-800 dark:text-indigo-100 !z-[100]"
              />
              <Navbar />
              <AnimatePresence
                mode="wait"
              >
                {children}
              </AnimatePresence>
              <Footer />
            </LanguageProvider>
          </UserProvider>
        </QueryClientProvider>
      </SessionProvider>
    </ThemeProvider>
  );
};
export default Providers;
