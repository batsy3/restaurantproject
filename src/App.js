import React, { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Routes, Route } from "react-router-dom";
import { Header, CreateItem, Maincontainer } from "./components";
import { useStateValue } from "./context/stateProvider";
import { getitem } from "./utils/fireBaseFunction";
import { actionType } from "./context/reducer";
const App = () => {
  const [{foodItems}, dispatch] = useStateValue();
  const fetchdata = async () => {
    await getitem().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data
      })
    });
  };
  useEffect(() => {
    fetchdata();
  }, []); 
  return (
    <AnimatePresence exitBefor eEnter>
      <div className="w-screen h-auto flex flex-col text-blue-900">
        <Header />
        <main className="mt-20 md:mt-24 px-4 md:px-16 py-1 w-full">
          <Routes>
            <Route path="/" element={<Maincontainer />} />
            <Route path="/createItem" element={<CreateItem />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
};
export default App;
