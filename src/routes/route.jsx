import React, { useContext } from "react";
import {BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Talks from "../pages/talks/talks";
import { AuthProvider, Contexto } from "../test/page test/context/Contexto";
import LoginForm from "../test/page test/login";
import Test from "../test/test";
const Rotas = () => {
    function Private({ children }) {
        const {autenticado, load}  = useContext(Contexto);
    
      if (load) {
        return <div style={{color:"blue"}} className="loading">Carregando...</div>
      }
       if(!autenticado){
        return <Navigate to={"/teste/login" || "/teste"}/>
       }
        return children
      }
  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route exact path="/" element={<Private><Talks/></Private>}/>
        <Route exact path="/teste" element={<Test/>}/>
        <Route exact path="/teste/login" element={<LoginForm/>}/>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Rotas;
