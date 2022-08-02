import { motion } from "framer-motion";
import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useStateValue } from "../context/stateProvider";
import HomeComponent from "./HomeComponent";
import Rowcontainer from "./Rowcontainer";

const Maincontainer = () => {
  const [{ foodItems }, dispatch] = useStateValue();
  console.log("food stuff should be", foodItems)
  return (
    <div className="w-full h-auto flex-col flex items-center justify-center ">
      <HomeComponent />

      <section className=" w-full my-6">
        <div className="w-full flex items-center justify-between">
          <p className="text-2xl font-semibold capitalize relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-amber-300 transition-all ease-in-out">
            Fresh Fruits
          </p>
          <div className=" hidden md:flex items-center gap-3 ">
            <motion.div
              whileTap={{ scale: 0.5 }}
              className="w-8 h-8 rounded-lg bg-amber-300 items-center justify-center hover:bg-amber-500 cursor-pointer transition-all ease-in-out duration-100 hover:shadow-lg"
            >
              <MdChevronLeft className="text-xl left-10 mt-2 text-white items-center" />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.5 }}
              className="w-8 h-8 rounded-lg bg-amber-300  items-center justify-center hover:bg-amber-500 cursor-pointer transition-all ease-in-out duration-100 hover:shadow-lg"
            >
              <MdChevronRight className="text-xl mt-2 items-center justify-center text-white" />
            </motion.div>
          </div>
        </div>

        <Rowcontainer flag={true} data={foodItems} />
      </section>
    </div>
  );
};

export default Maincontainer;
