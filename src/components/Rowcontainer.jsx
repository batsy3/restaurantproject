import React from "react";
import { motion } from "framer-motion";
import { MdAddShoppingCart } from "react-icons/md";
const Rowcontainer = ({ flag }) => {
  return (
    <div
      className={`w-full my-12 bg-pink-100 ${
        flag ? `overflow-x-scroll` : `overflow-hidden`
      }`}
    >
      <motion.div
        whileHover={{scale:1.2}}
        className="w-300 md:min-w-310 rounded-lg p-4 bg-pink-400  hover:drop-shadow-2xl h-auto my-12 backdrop:blur-md">
        <div className="w-full flex items-center justify-between">
          <motion.img
            whileHover={{ scale: 0.75 }}
            src="https://www.seekpng.com/png/full/22-229712_ice-cream-ice-cream-png-file.png"
            alt="foos item"
            className="w-40 -mt-8 "
          />
          <motion.div
            whileTap={{ scale: 0.75 }}
            className="w-8 h-8
           rounded-full bg-pink-300 items-center
            justify-center flex cursor-pointer hover:shadow-lg "
          >
            <MdAddShoppingCart className="text-white" />
          </motion.div>
        </div>
        <div className="w-full flex items-end flex-col justify-end ">
          <p className="text-textColor font font-semibold text-base md:text-lg">
            chocolate and vanilla
          </p>
          <p className="mt-1 text-sm text-gray-500 ">49 calories</p>
          <div className="flex items-center gap-8">
            <p className=" text-lg text-blue-900 font-semibold">
              {" "}
              <span className=" text-sm text-pink-900 ">$</span>5.9
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Rowcontainer;
