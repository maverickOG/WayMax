import React from "react";
import { motion } from "framer-motion";
import { Github } from "lucide-react";
import Sidebar from "./Dashboard/Sidebar";

const ComingSoon = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Coming Soon Page Content */}
      <div className="flex-1 flex items-center justify-center min-h-screen bg-amber-50 text-gray-900 p-6">
        <div className="text-center max-w-2xl">
          <motion.h1
            className="text-5xl font-black"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Something Exciting is Coming Soon!
          </motion.h1>
          <motion.p
            className="mt-4 text-xl text-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            We are working hard to bring you an amazing experience. Stay tuned
            for updates!
          </motion.p>
          <motion.div
            className="mt-6 flex justify-center space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          ></motion.div>
          <motion.div
            className="mt-8 flex justify-center space-x-6 text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <a
              href="https://github.com/maverickOG/WayMax"
              className="hover:text-gray-900"
            >
              <Github className="w-6 h-6" />
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
