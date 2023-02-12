import React, { useContext, useState } from "react";
import { Contexto } from "./context/Contexto";
import { useEffect } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(Contexto);
  const [erro, setErro] = useState(false);
  const navigate = useNavigate()
 
 useEffect(() => {
   
   const recovereUser = localStorage.getItem("usuario");
   if(recovereUser){
    navigate("/")
   }
   // eslint-disable-next-line
 }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log({name, phone,password});
    login(phone, name, password);
    if (!(phone > 10 && name && password.length >= 6)) {
      setErro(true); 
      return
    }
    setErro(false);
  };

  return (
    <div className="login-container">
      <h1>Inscreva-se no Chatdata</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-input">
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="form-input">
          <input
            type="number"
            placeholder="Telefone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>
        <div className="form-input">
          <input
            type="password"
            placeholder="senha"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <input  type="submit" value="Entrar" />
        { erro &&<span style={{color:"red", fontWeight:"bold"}}>Erro campos invalidos obs:
            <br />
        
        </span>}
      </form>
    </div>
  );
}

export default LoginForm;





