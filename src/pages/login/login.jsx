import React, { useContext, useState } from "react";
import { useEffect } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { Contexto } from "../../context/Contexto";
import PuffLoader from "react-spinners/PuffLoader";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { useGoogleLogin } from "@react-oauth/google";

import Axios from "axios";
import Header from "../../components/header/header";
function LoginForm() {
  const [loginUser, setLoginUser] = useState("");
  const [load, setLoad] = useState(true);
  const [facebook, setFacebook] = useState();

  const { login } = useContext(Contexto);
  useEffect(() => {
    if (facebook) {
      const { url } = facebook.picture.data;

      console.log("Facebook data updated:", facebook);
      console.log(url);
    }
    handleSubmit();
    // eslint-disable-next-line
  }, [facebook]);

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
    if (loginUser) {
      login(loginUser.email, loginUser.given_name, loginUser.picture);
      return;
    } else if (facebook) {
      login(facebook.email, facebook.name, facebook.picture.data.url);

      return;
    }
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
    <>
    <Header>
      <h1 style={{color:"black"}}> Chatdata Mensegger</h1>
    </Header>
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
            </button>{" "}
            <br />
            <FacebookLogin
              children="Login com o facenook"
              onClick={handleSubmit}
              style={{
                backgroundColor: "#4267b2",
                boxShadow: "rgba(0, 0, 0, 0.3) 0px 1px 1px 1px",
                fontSize: "16px",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                bordeRadius: "2px",
                height: "48px",
                width: "250px",
                padding: "0px 16px",
                color: "white",
                fontFamily: "Roboto, sans-serif",
                fontWeight: 500,
                cursor: "pointer",
              }}
              appId="1575153226338645"
              onProfileSuccess={(response) => {
                console.log("Get Profile Success!", response);
                setFacebook(response);
              }}
            >
              {" "}
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/600px-Facebook_f_logo_%282019%29.svg.png"
                alt="Google logo"
              />
              <p>Login com o facenook</p>
            </FacebookLogin>
          </div>

          <h3 className="h3" style={{ color: "#0b209b" }}>
            ChatData Messenger
          </h3>
        </div>

        {/**<figure>
        <img src={facebook.picture.data.url} alt="" />
        <p>{facebook ? facebook.name:false}</p>
        <p>{facebook ? facebook.email:false}</p>
        <p>{facebook ? facebook.name:false}</p>
      </figure> */}
      </div>
    </>
  );
}

export default LoginForm;
