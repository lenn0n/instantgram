import React from "react";
import jwtDecode from "jwt-decode";
import { Redirect } from "react-router-dom";

export const authModule = (isSecure) => {
  //get the token from local storage
  const token = localStorage.FBIdToken;
  if (isSecure) {
    if (token) {
      //decode it using jwt
      const decodedToken = jwtDecode(token);
      //check if token is expired
      if (decodedToken.exp * 1000 < Date.now()) {
        return <Redirect to="/login" />;
      }
    } else {
      //no token found
      return <Redirect to="/login" />;
    }
  } else if (!isSecure) {
    if (token) {
      //decode it using jwt
      const decodedToken = jwtDecode(token);
      //check if token is valid
      if (decodedToken.exp * 1000 > Date.now()) {
        return <Redirect to="/" />;
      }
    }
  }
};
