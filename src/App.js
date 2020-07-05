import React from "react";
//React Components to navigate pages
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//For decoding the FBIDToken (Token)
import jwtDecode from "jwt-decode";
//Redux, Provider and Store Initialization
import { Provider } from "react-redux";
import store from "./redux/stores";
//Material UI Framework
import { MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themestyle from "./utils/appstyles";
import "./App.css";
//Placeholder
import "./utils/ph.css";
//Component pages to be used in switch routes
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import logout from "./pages/logout";
import { logoutUser } from "./redux/actions/userActions";
//For altering the headers
import axios from "axios";
//THIS COMPONENT WILL RUN ONLY ONCE UNLESS IT IS RELOADED.
//get the token from localstorage
const token = localStorage.FBIdToken;
//check if theres a token
if (token) {
  //if we have the token, decode it!
  const decodedToken = jwtDecode(token);
  //get the expiration time = exp.
  if (decodedToken.exp * 1000 < Date.now()) {
    //the token must be expired or modified, nonetheless, logout the user
    store.dispatch(logoutUser());
  } else {
    //token was valid verified
    //we are setting the HEADERS everytime we reload SPO page.
    axios.defaults.headers.common["Authorization"] = token;
  }
} else {
  //no token found, clear everything and goto login
  store.dispatch(logoutUser());
}
//setting the theme using appStyles.js
const theme = createMuiTheme(themestyle);
//This component contains the main routing logic of the Frontend.
//For navigation, we use can AppBar/Navbar
//Listener of the url <Switch>, redirect to the site

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={home} />
            <Route exact path="/login" component={login} />
            <Route exact path="/signup" component={signup} />
            <Route exact path="/logout" component={logout} />
          </Switch>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
