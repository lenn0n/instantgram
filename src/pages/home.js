//In every page or component you create, it must be in JSX.
//So we will import React, and Component from REACT.
//In order to connect to our global state (store), We must use the CONNECT from REACT-REDUX.
import React, { Component } from "react";
import { connect } from "react-redux";
//Authentication
import { authModule } from "../utils/auth";
//Material UI Grid Component lets us divide the page for better experience.
//withStyle is for custom layout.
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
//Here are some needed components in HOME.JS
//It is better to separate this for cleaner code and avoid repeating of code.
//Hold CTRL+[Left Click] to learn more about it.
import Navbar from "../components/Navbar";
import Shouts from "../components/Shouts";
import Profile from "../components/Profile";
import Placeholder from "../utils/Placeholder";
//Actions likely to DISPATCH to STORE.
//Some axios thing happens here, we process user requests here.
import { getUserData, logoutUser } from "../redux/actions/userActions";
import { getAllScreams } from "../redux/actions/dataActions";
//Dialog
import SuccessDialog from "../dialogs/SuccessDialog";
//MUI Global Theming
//This theme tags is connected to APPSTYLES.JS via MUI Theme Provider @ App.js
//We are now allowed to use className={classes.~~~~}
const style = (theme) => ({ ...theme.loginRegister, ...theme.marginLeftRight });

class home extends Component {
  //componentDidMount() performs right after the components are fully loaded.
  //“State” is an object that represents the parts of the app that can change.
  componentDidMount() {
    //Get the shouts and userdata from these FUNCTIONS in DATA ACTIONS.
    //It would return a state from Redux Store and pass it here as PROPS.
    //These functions was mapped below.
    this.props.getAllScreams();
    this.props.getUserData();
  }
  render() {
    //Classes used for styling the component.
    const { classes } = this.props;
    //We have already mapped the data from redux store to this.props below.
    //In our case, we declare a variable that is also a component.
    //Every changes happening in THIS.PROPS.DATA.SCREAMS
    //..it reflects the declared variable to the returned varibles {loadScreamF...}
    //if this.props.data.screams is TRUE, then ... ELSE throw a PLACEHOLDER.
    //load only the scream if authenticated
    let loadScreamFromProps = this.props.data.screams ? (
      //React needs unique key in every iteration, EG.: key={scream.ID}
      //Note: When you have an array of data [] from store, you need to map it.
      this.props.data.screams.map((scream) => (
        <Shouts shout={scream} key={scream.screamID} />
      ))
    ) : (
      <div className={classes.placeHolder}>
        <Placeholder />
      </div>
    );
    //Same with screams, but this component calls once and re-render the data itself.
    //If loadProfileDataFromStore is NOT NULL, put PROFILE COMPONENT, else throw PLACEHOLDER.
    let loadProfileDataFromStore = this.props.user.authenticated ? (
      <Profile />
    ) : (
      <div className={classes.placeHolder}>
        <Placeholder />
      </div>
    );

    return (
      <div>
        {authModule(true)}
        <SuccessDialog vertical="bottom" horizontal="center" />
        <Navbar />
        <div className="container">
          <Grid container>
            <Grid item sm={8} xs={12}>
              {loadScreamFromProps}
            </Grid>
            <Grid item sm={4} xs={12}>
              {loadProfileDataFromStore}
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

//Map the redux global state to this props.
//We can now access these states thru THIS.PROPS.DATA,USER...etc
const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
});

//Map the ACTIONS to PROPS and CONNECT to REDUX.
//If the functions (actions) didnt mentioned here, it wont allow to use DISPATCH.
const mapActionToProps = {
  getUserData,
  getAllScreams,
  logoutUser,
};
export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(style)(home));
