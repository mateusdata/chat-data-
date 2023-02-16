import React, { useContext, useState } from "react";
import { useEffect } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { Contexto } from "../../context/Contexto";
import PuffLoader from "react-spinners/PuffLoader";

import { useGoogleLogin } from "@react-oauth/google";

import Axios from "axios";
function LoginForm() {
  const [loginUser, setLoginUser] = useState("");
  const [load, setLoad] = useState(true);

  const { login } = useContext(Contexto);

  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 1300);
  }, []);
  useEffect(() => {
    const recovereUser = localStorage.getItem("usuario");
    if (recovereUser) {
      navigate("/");
    }
    handleSubmit();
    // eslint-disable-next-line
  }, [loginUser]);

  const handleSubmit = () => {
    const { email } = loginUser;
    const { given_name } = loginUser;
    const { picture } = loginUser;

    login(email, given_name, picture);
  };

  const loginGoogle = useGoogleLogin({
    onSuccess: (response) => {
      Axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${response.access_token}`,
        },
      }).then((response) => {
        setLoginUser(response.data);
      });
    },
  });
  if (load) {
    return (
      <div className="load">
        <PuffLoader size={150} color="#0d9ba5" />
      </div>
    );
  }
  return (
    <div className="login-container">
      <div className="login">
        <h1>Inscreva-se no Chatdata</h1>

        <div>
          <button className="google-button" onClick={loginGoogle}>
            <span className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="Google logo"
              />
            </span>
            <span className="button-text">Fazer login com o google</span>
          </button>
        </div>
        <h3 style={{ color: "#0b209b" }}>Chat de conversa divertidas</h3>
      </div>
    </div>
  );
}

export default LoginForm;
