import React from "react";
import { AnimatePresence } from "framer-motion";
import { Routes, Route } from "react-router-dom";
import { Header, CreateItem, Maincontainer } from "./components";

const App = () => {
  return (
    <AnimatePresence exitBeforeEnter >
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
