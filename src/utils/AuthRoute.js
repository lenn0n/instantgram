import React from "react";
import { Route, Redirect } from "react-router-dom";
//TODO: Deep learning the LOGIC
const AuthRoute = ({
  component: Component,
  allow,
  fail,
  authenticated,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      authenticated === allow ? (
        <Redirect to={fail} />
      ) : (
        <Component {...props} />
      )
    }
  />
);

export default AuthRoute;
