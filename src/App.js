import React from "react";
import { AnimatePresence } from "framer-motion";
import { Routes, Route } from "react-router-dom";
import { Header, CreateItem, Maincontainer } from "./components";

const App = () => {
  return (
    <AnimatePresence exitBeforeEnter >
      <div className="w-screen h-auto flex flex-col text-red-400">
        <Header />
        <main className="mt-44 p-8 w-full">
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
