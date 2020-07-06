import React, { Component } from "react";
import logoURL from "../images/logo.png";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//Redux thing
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";
//Material Custom Style
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Navbar from "../components/Navbar";

const style = (theme) => ({ ...theme.loginRegister });

//You cannot put classes outside of the class component
//Simply because render() holds the component itself
//So declare classes inside render()
class login extends Component {
  //state = { email: "", password: "", loading: false, errors: {} };
  //good practice to use constructor
  constructor() {
    super();
    this.state = { email: "", password: "" };
  }
  handleSubmit = (e) => {
    //POST method
    e.preventDefault(); //hides the url bar get method
    const userInput = {
      email: this.state.email,
      password: this.state.password,
    };
    //userActions.js
    this.props.loginUser(userInput, this.props.history);
  };

  //setting the new state onHandleChange
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  //the main hierarchy tips is
  //class == initiatiation and functions creations (didMount)
  //render == coding zone, logic usually happens here
  //return == putting all together! (If condition usually)
  render() {
    const {
      classes,
      ui: { loading, errors },
    } = this.props;
    //get the errors array in this.state
    //errors holds an object {} from axios state

    //linear progress is quite fun, try modifying it! :)
    //if loading? show that element
    //disable the components when is loading is true
    return (
      <div className="container">
        <Navbar />
        <Grid container className={classes.formContainer}>
          <Grid item sm />
          <Grid item sm>
            <br />
            <center>
              <img src={logoURL} height="100%" width="100%" alt="asdsa" />
            </center>
            <br />
            {loading ? <h3>Logging in...</h3> : <h3>Login Account</h3>}
            <form noValidate onSubmit={this.handleSubmit}>
              {errors.Login && <div className="error">{errors.Login}</div>}
              <h4>Email Address</h4>
              <TextField
                className={classes.textField}
                label="Enter your email address"
                id="email"
                name="email"
                type="email"
                onChange={this.handleChange}
                error={errors.email ? true : false}
                helperText={errors.email}
                disabled={loading ? true : false}
                value={this.state.email}
                fullWidth
              />
              <h4>Password</h4>
              <TextField
                className={classes.textField}
                label="Enter your password"
                id="password"
                name="password"
                type="password"
                onChange={this.handleChange}
                helperText={errors.password}
                error={errors.password ? true : false}
                disabled={loading ? true : false}
                value={this.state.password}
                fullWidth
              ></TextField>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading ? true : false}
              >
                Submit
              </Button>
            </form>
            <br />
            <br />
            <Typography>
              Dont have an account? <Link to="/signup"> Sign Up Now!</Link>
            </Typography>
          </Grid>
          <Grid item sm />
        </Grid>
      </div>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user,
  ui: state.ui,
});

const mapActionToProps = {
  loginUser,
};
export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(style)(login));