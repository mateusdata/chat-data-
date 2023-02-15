import React, { useState } from "react";
import jwt_decode from "jwt-decode";

import { GoogleLogin } from "@react-oauth/google";

const Text = () => {
    const [data, setData]= useState()
  return (
    <div>
      <h1>Login com google</h1>
      <h3>entra com google</h3>
      <GoogleLogin
        onSuccess={ async (credentialResponse) => {
          console.log(credentialResponse.credential);
          
          var decoded = await jwt_decode(credentialResponse.credential)
          if(decoded){
            setData(decoded)
          }
         
          console.log(data);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
      ;
    </div>
  );
};

export default Text;
