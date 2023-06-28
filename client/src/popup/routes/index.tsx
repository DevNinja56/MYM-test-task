import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "@pages/Home/index";
import { URL } from "@constants/index";
import { Toaster } from "react-hot-toast";

const MainRouter = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path={URL.HOME} element={<Home />} />
      </Routes>
    </>
  );
};

export default MainRouter;
