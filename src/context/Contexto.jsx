import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Contexto = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [load, setLoad] = useState(true);
  const [emailAddress, setEmailAddress] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const recovereUser = localStorage.getItem("usuario");
    if (recovereUser) {
      setUser(JSON.parse(recovereUser));
    }
    setLoad(false);
  }, []);

  const login = (email, nome, picture) => {
    let arrayColor = [
      "#d31b1b",
      "#b615d6",
      "#d37e0e",
      "#9af20c",
      "#3d84ff",
      "#610d72",
      "#dd08b6",
      "#0a9127",
      "#6f3792",
      "#ccb80a",
      "#0670a1",
    
    ]
    
    let numberRandomic = Math.floor(Math.random() * (arrayColor.length -1));
   
    let colorUser = arrayColor[numberRandomic];
    const logarUser = {
      email,
      nome,
      picture,
      colorUser
    };
    if (email && nome && picture) {
      localStorage.setItem("usuario", JSON.stringify(logarUser));
    }

    ;
    if (email && nome && picture) {
      setUser(nome);
      setEmailAddress(email);
      navigate("/");
      alert(`Parabens! ${nome} agora voce entrará no Chatdata`);
    }
  };
  const logout = () => {
   
    setUser(null);
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  return (
    <Contexto.Provider
      value={{
        autenticado: !!user,
        user,
        setUser,
        login,
        logout,
        load,
        emailAddress,
      }}
    >
      {children}
    </Contexto.Provider>
  );
};
