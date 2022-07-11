import React from "react";
import { herodata } from "../utils/data";
import delivery from "./assets/delivery.webp";
import heroBg from "./assets/heroBg.png";
function HomeComponent() {
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full "
      id="home"
    >
      <div className=" flex-1  py-5 flex-col flex items-start justify-center gap-6">
        <div className="flex items-center gap-2 px-4  py-1 justify-center bg-orange-100 font-bold rounded-full">
          <p className="text-base text-orange-500">wide delivery</p>
          <div className="w-9 h-9 rounded-full overflow-hidden drop-shadow-2xl">
            <img
              src={delivery}
              alt="delivery"
              className="w-8 h-8 object-contain bg-white"
            />
          </div>
        </div>

        <p className="text-[2.9rem] font-bold tracking-wide text-blue-900 lg:text-[4.5rem]">
          The Fastest Delivery in{" "}
          <span className="text-orange-600 text-[3.5rem] lg:text-[5rem]">
            Your City
          </span>
        </p>

        <p className="text-base text-blue-900 text-center md:text-left  md:w-[80%] ">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius libero
          corrupti, id amet vel dolor odio officia quasi dignissimos. Obcaecati
          ipsa itaque facere, quae optio aut ad eius beatae sit.
        </p>
        <button
          type="button"
          className="md:w-auto bg bg-gradient-to-br font-bold from-orange-300 to-orange-500 text-blue-900 w-full px-4 py-2 rounded-xl hover:shadow-lg transition-all ease-in-out duration-100 "
        >
          Order NOw
        </button>
      </div>
      <div className="py-2 flex-1 flex items-center relative">
        <img
          className="ml-auto h-420 w-full lg:w-auto lg:h-685 "
          src={heroBg}
          alt=""
        />
        <div className="lg:px-32 h-full w-full flex-wrap gap-4  absolute top-0 left-0 flex items-center justify-center py-4">
          {herodata &&
            herodata.map((item) => (
              <div
                key={item.id}
                className="lg:w-190 p-4  bg-cartBg backdrop-blur-md rounded-xl flex flex-col items-center justify-center drop-shadow-lg"
              >
                <img
                  src={item.imgsrc}
                  alt="something"
                  className=" w-20 lg:w-40 -mt-10  lg:-mt-20"
                />
                <p className="text-base lg:text-xl font-semibold mt2 lg:mt-6 text-textColor">
                  {item.name}
                </p>
                <p className="text-[12px]  text-gray-400 font-semibold my-1 lg:my-3">
                  {item.desc}
                </p>
                <p className="font-bold ">
                  <span className="text-red-900">$</span>
                  {item.price}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default HomeComponent;
