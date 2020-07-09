import React from "react";
import jwtDecode from "jwt-decode";
import { Redirect } from "react-router-dom";
export const authModule = (isSecure) => {
  if (isSecure) {
    const token = localStorage.FBIdToken;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        return <Redirect to="/login" />;
      }
    } else {
      return <Redirect to="/login" />;
    }
  } else if (!isSecure) {
    const token = localStorage.FBIdToken;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 > Date.now()) {
        return <Redirect to="/" />;
      }
    }
  }
};
