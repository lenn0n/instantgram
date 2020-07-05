//In every page or component you create, it must be in JSX.
//So we will import React, and Component from REACT.
//Link is used for redirecting page in REACT.
import React, { Component } from "react";
import { Link } from "react-router-dom";
//DAYJS in an open-source library that converts the time, see my fb post for links
import dayjs from "dayjs";
import relativetime from "dayjs/plugin/relativeTime";
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
//for some reasons, if we dont give the image classes a height and width, it wont show.
const styles = (theme) => ({ ...theme.shouts });
//In every component, a class must have a render(){return(...)} tags inside or it wont load.
export class Shouts extends Component {
  render() {
    //relative-time for dayjs is all we need.
    dayjs.extend(relativetime);
    //extract the data from shout props to this props. (Shout shout="THIS_DATA")
    const {
      shout: { body, userHandle, userImgPic, createdAt },
      classes,
    } = this.props;
    //now return the shout with data collected from shout props
    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImgPic}
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
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography
            variant="body1"
            className={classes.content}
            color="textPrimary"
          >
            {body}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}
//We dont have to map the global state (redux store) here
//Since we used this component individually.
//There is mapping happening outside of this component and calls more than once.
export default withStyles(styles)(Shouts);
