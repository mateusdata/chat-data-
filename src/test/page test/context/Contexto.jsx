import {createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Contexto = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [load, setLoad] =  useState(true);
  const [telefone, setTelefone] =  useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const recovereUser = localStorage.getItem("usuario");
    if(recovereUser){
      setUser(JSON.parse(recovereUser))
    }
    setLoad(false);
  },[])

  const login = (tel, nome, password) => {
    //console.log("Login", { telefone: tel, senha: senha });
    
    const logarUser =  {
        id:"123",
        tel,
        nome
    }
    localStorage.setItem("usuario", JSON.stringify(logarUser))


   if(tel.length >= 10 && nome && password.length > 6){
    setUser(nome);
    setTelefone(tel)
    navigate("/")
    alert("Parabens! agora voce entrara no Chatdata")
   }
 
  };
  const logout = () => {
    console.log("Sair da conta");
    setUser(null)
    localStorage.removeItem("usuario")
    navigate("/login")

  };

  return (
    <Contexto.Provider value={{ autenticado: !!user, user,setUser, login, logout, load, telefone }}>
        {children}
    </Contexto.Provider>
  );
};
