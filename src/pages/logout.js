import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/userActions";

class logout extends Component {
  render() {
    this.props.logoutUser();
    //TODO: redirect to logout page
    this.props.history.push("/login");
    return <div></div>;
  }
}

const mapActionToProps = {
  logoutUser,
};
export default connect(null, mapActionToProps)(logout);
