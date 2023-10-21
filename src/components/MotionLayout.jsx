"use client";
import { motion } from "framer-motion";

const MotionLayout = ({ children }) => (
  <>
    {/* <children /> */}

    <motion.div
      className="slide-in fixed left-0 top-0 h-screen w-full !origin-bottom bg-indigo-100/60 backdrop-blur-xl dark:bg-gray-800 "
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 0 }}
      exit={{ scaleY: 1 }}
      transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
    />
    {children}
    <motion.div
      className="slide-out fixed left-0 top-0 h-screen w-full origin-top bg-indigo-100/60 backdrop-blur-xl dark:bg-gray-800"
      initial={{ scaleY: 1 }}
      animate={{ scaleY: 0 }}
      exit={{ scaleY: 0 }}
      transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
    />
  </>
);
export default MotionLayout;
