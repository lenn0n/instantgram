import React, { Component } from "react";
import logoURL from "../images/logo.png";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
//For authenticating of page
import { authModule } from "../utils/auth";
//Redux
import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";
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
class signup extends Component {
  //state = { email: "", password: "", loading: false, errors: {} };
  //good practice to use constructor
  //we need to set state as empty string to use isEmpty functions in CRUD, else it will throw NULL.
  //TODO: EMAIL VALIDATION
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      cpassword: "",
      userhandle: "",
    };
  }
  handleSubmit = (e) => {
    //POST method
    e.preventDefault(); //hides the url bar get method
    const userInput = {
      email: this.state.email,
      password: this.state.password,
      cpassword: this.state.cpassword,
      userHandle: this.state.userhandle,
    };
    //for success data, res.data
    //for error data, err.response.data -- whenever it goes to errror
    this.props.signupUser(userInput, this.props.history);
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
      ui: { errors, loading },
    } = this.props;
    //get the errors array in this.state
    //errors holds an object {} from axios state

    //linear progress is quite fun, try modifying it! :)
    //if loading? show that element
    //disable the components when is loading is true
    return (
      <div className="container">
        {authModule(false)}
        <Navbar />
        <Grid container className={classes.formContainer}>
          <Grid item sm />
          <Grid item sm>
            <br />
            <center>
              <img src={logoURL} height="100%" width="100%" alt="asdsa" />
            </center>
            <br />
            {loading ? <h3>Signing up...</h3> : <h3>Account Registration</h3>}
            <form noValidate onSubmit={this.handleSubmit}>
              {errors.error && <div className="error">{errors.error}</div>}
              <h4>Email Address</h4>
              <TextField
                className={classes.textField}
                label="Enter your email address"
                id="email"
                name="email"
                type="email"
                onChange={this.handleChange}
                error={errors.emailEmpty ? true : false}
                helperText={errors.emailEmpty}
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
                helperText={errors.passwordEmpty}
                error={errors.passwordEmpty ? true : false}
                disabled={loading ? true : false}
                value={this.state.password}
                fullWidth
              ></TextField>
              {errors.passwordLength && (
                <div className="error">{errors.passwordLength}</div>
              )}
              <h4>Confirm Password</h4>
              <TextField
                className={classes.textField}
                label="Re-enter your password"
                id="cpassword"
                name="cpassword"
                type="password"
                onChange={this.handleChange}
                helperText={errors.passwordNotMatch}
                error={errors.passwordNotMatch ? true : false}
                disabled={loading ? true : false}
                value={this.state.cpassword}
                fullWidth
              ></TextField>
              <h4>Username</h4>
              <TextField
                className={classes.textField}
                label="Enter your desired username"
                id="userhandle"
                name="userhandle"
                onChange={this.handleChange}
                helperText={errors.usernameEmpty}
                error={errors.usernameEmpty ? true : false}
                disabled={loading ? true : false}
                value={this.state.userhandle}
                fullWidth
              ></TextField>
              {errors.usernameTaken && (
                <div className="error">{errors.usernameTaken}</div>
              )}
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
              Already have an account? <Link to="/login"> Login Now!</Link>
            </Typography>
          </Grid>
          <Grid item sm />
        </Grid>
      </div>
    );
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  ui: state.ui,
});

export default connect(mapStateToProps, { signupUser })(
  withStyles(style)(signup)
);
