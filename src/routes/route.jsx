import React from "react";
import {BrowserRouter, Route, Routes } from "react-router-dom";
import Talks from "../pages/talks/talks";
import Test from "../test/test";
const Rotas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Talks/>}/>
        <Route exact path="/teste" element={<Test/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Rotas;
