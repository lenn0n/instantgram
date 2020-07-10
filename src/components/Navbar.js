//In every page or component you create, it must be in JSX.
//So we will import React, and Component from REACT.
//Link is used for redirecting page in REACT.
import React, { Component } from "react";
import { Link } from "react-router-dom";
//In order to connect to our global state (store), We must use the CONNECT from REACT-REDUX.
import { connect } from "react-redux";
//Decoding of token
import jwtDecode from "jwt-decode";
//Material-UI Components
//MUI is a front-end solution.
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
//In every component, a class must have a render(){return(...)} tags inside or it wont load.
class Navbar extends Component {
  render() {
    //extract the loading state from UI Props from Redux Store.
    const {
      ui: { loading },
    } = this.props;
    //Simple auth for changing links
    //It is not really secure but for just showing the links only
    //Auth.js is pretty secure though, it will redirect to the link (mandatory)
    let navAuth = false;
    const token = localStorage.FBIdToken;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        navAuth = false;
      } else {
        navAuth = true;
      }
    } else {
      navAuth = false;
    }
    return (
      <AppBar>
        <Toolbar className="toolbarcenter">
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          {navAuth ? (
            <Button color="inherit" component={Link} to="/logout">
              Logout
            </Button>
          ) : (
            <div>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Register
              </Button>
            </div>
          )}
        </Toolbar>
        {
          //Loading bar animation prevents user likely to leave the site (boredom)
          //Check the loading state if true, return empty div tags if not.
        }
        {loading ? <LinearProgress /> : <div></div>}
      </AppBar>
    );
  }
}
//Map the state from REDUX STORE to Navbar Props.
const mapStateToProps = (state) => ({
  ui: state.ui,
});
//Finally connect the app with state mapped to Props.
export default connect(mapStateToProps)(Navbar);
