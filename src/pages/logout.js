import React, { Component } from "react";
import { logoutUser } from "../redux/actions/userActions";
import store from "../redux/stores";
class logout extends Component {
  render() {
    store.dispatch(logoutUser());
    //TODO: redirect to logout page
    this.props.history.push("/login");
    return <div></div>;
  }
}

export default logout;
