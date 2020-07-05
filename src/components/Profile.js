//So we will import React, and Component from REACT.
//Link is used for redirecting page in REACT.
import React, { Component } from "react";
import { Link } from "react-router-dom";
//In order to connect to our global state (store), We must use the CONNECT from REACT-REDUX.
import { connect } from "react-redux";
//Material-UI Components
//MUI is a front-end solution.
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
//Using withstyles, we can add some styles for the page.
//this theme is connected to appstyles.js via MUI theme @ App.js
//we are now allowed to use className={classes.~~~~}
const style = (theme) => ({ ...theme.profile });
//In every component, a class must have a render(){return(...)} tags inside or it wont load.
class Profile extends Component {
  render() {
    //classes can access theme class.
    //extract the user state from REDUX STORE to this props.
    const {
      classes,
      user: {
        credentials: { userHandle, imageURL, bio, location },
      },
    } = this.props;

    return (
      <Card>
        <CardMedia
          image={imageURL}
          title="Profile Picture"
          className={classes.image}
        />
        <CardContent>
          <Typography
            variant="h5"
            color="primary"
            component={Link}
            to={`/users/${userHandle}`}
          >
            {userHandle}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {bio}
          </Typography>
          <Typography variant="body1" color="textPrimary">
            {location}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}
//Map the user state from store to this.props.
const mapStateToProps = (state) => ({
  user: state.user,
});
//Finally connect with redux using higher order functions.
export default connect(mapStateToProps)(withStyles(style)(Profile));
