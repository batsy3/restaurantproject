import React, { useState } from "react";
import logo from "./assets/logo.png";
import avatar from "./assets/avatar.png";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { animate, animations, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import { useStateValue } from "../context/stateProvider";
import { actionType } from "../context/reducer";
const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user, }, dispatch] = useStateValue();
  const [menu, setmenu] = useState(false);
  const logout = () => {
    setmenu(false)
    localStorage.clear()
    dispatch({
      type: actionType.SET_USER,
      user: null
    })

  }
  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setmenu(!menu);
    }
  };
  return (
    <header className="fixed z-50 w-screen p-3 px-7 md:p-6 md:px-16">
      {/* desktop */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2 ">
          <img src={logo} alt="logo" className="w-16 object-cover " />
          <p className="text-headingColor text-xl font-extrabold ">City</p>
        </Link>

        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8 "
          >
            <li className="text-base hover:text-blue-600 duration-100 transition-all ease-in-out cursor-pointer">
              Home
            </li>
            <li className="text-base hover:text-blue-600 duration-100 transition-all ease-in-out cursor-pointer ">
              Menu
            </li>
            <li className="text-base hover:text-blue-600 duration-100 transition-all ease-in-out cursor-pointer ">
              Contacts
            </li>
            <li className="text-base hover:text-blue-600 duration-100 transition-all ease-in-out cursor-pointer ">
              services
            </li>
          </motion.ul>
          <div className="relative items-center justify-center  ">
            <MdShoppingBasket className="text-2xl cursor-pointer " />
            <div className=" absolute w-5 h-5 rounded-full bg-red-600 -top-3 -right-3 flex items-center justify-center">
              <p className="text-xl text-white ">4</p>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="relative"
          >
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : avatar}
              alt=""
              className="flex w-7 min-w-[40px] min-h-[40px] shadow-2xl rounded-full"
              onClick={login}
            />
            {menu && (
              <div className="w-44 bg-slate-400  text-white shadow-xl rounded-lg flex flex-col absolute right-2 px-5 py-2  ">
                {user && user.email === "dvdokuku@gmail.com" && (
                  <Link to={"/createItem"}>
                    <p className="px-4 py-1.5 flex items-center gap-2 cursor-pointer hover:bg-slate-400 transition-all duration-100 ease-in-out text-base ">
                      New item <MdAdd />
                    </p>
                  </Link>
                )}
                <p
                  className="px-3 py-1.5 flex items-center gap-2 cursor-pointer hover:bg-slate-400 transition-all duration-100 ease-in-out text-base "
                  onClick={logout}
                >
                  logout
                  <MdLogout />
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      {/* .......................................................................................................................... */}
      {/* mobile */}
      <div className="flex items-center justify-between md:hidden w-full  h-full">
        <div className="relative items-center justify-center  ">
          <MdShoppingBasket className="text-2xl cursor-pointer " />
          <div className=" absolute w-5 h-5 rounded-full bg-red-600 -top-3 -right-3 flex items-center justify-center">
            <p className="text-xl text-white ">4</p>
          </div>
        </div>

        <Link to={"/"} className="flex items-center gap-2 ">
          <img src={logo} alt="logo" className="w-14 object-cover " />
          <p className="text-headingColor text-xl font-extrabold ">City</p>
        </Link>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="relative"
          >
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : avatar}
              alt=""
              className="flex w-7 min-w-[40px] min-h-[40px] shadow-2xl rounded-full"
              onClick={login}
            />
            {menu && (
              <div className="w-40 bg-slate-100  text-black shadow-xl rounded-lg flex flex-col absolute right-2 gap-3   ">
                {user && user.email === "dvdokuku@gmail.com" && (
                  <Link to={"/createItem"}>
                    <p className="px-3 py-1.5 flex items-center gap-3 cursor-pointer hover:bg-slate-400 transition-all duration-100 ease-in-out text-base ">
                      New item <MdAdd />
                    </p>
                  </Link>
                )}
                <ul className="flex flex-col gap-3 ">
                  <li className="text-base px-3 py-1.5  hover:bg-slate-200 transition-all duration-100 ease-in-out ">
                    Home
                  </li>
                  <li className="text-base px-3 py-1.5 hover:bg-slate-200 transition-all duration-100 ease-in-out  ">
                    Menu
                  </li>
                  <li className="text-base px-3 py-1.5 hover:bg-slate-200 transition-all duration-100 ease-in-out  ">
                    Contacts
                  </li>
                  <li className="text-base px-3 py-1.5 hover:bg-slate-200 transition-all duration-100 ease-in-out  ">
                    services
                  </li>
                </ul>

                <p
                  className="px-3 py-1.5 flex items-center justify-center gap-2 cursor-pointer bg-slate-300 hover:bg-slate-400 transition-all duration-100 ease-in-out text-base "
                  onClick={logout}
                >
                  logout
                  <MdLogout />
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      main container
    </header>
  );
};

export default Header;
