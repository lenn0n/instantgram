//So we will import React, and Component from REACT.
//Link is used for redirecting page in REACT.
import React, { Component } from "react";
import { Link } from "react-router-dom";
//In order to connect to our global state (store), We must use the CONNECT from REACT-REDUX.
import { connect } from "react-redux";
//Actions
import { userImageUpload } from "../redux/actions/userActions";
//Material-UI Components
//MUI is a front-end solution.
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Link2 from "@material-ui/core/Link";
//MUI Icons
import EditIcon from "@material-ui/icons/Edit";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import LinkIcon from "@material-ui/icons/Language";
//Components
import EditProfile from "./EditProfile";
import ErrorDialog from "../dialogs/ErrorDialog";
import SuccessDialog from "../dialogs/SuccessDialog";
//Using withstyles, we can add some styles for the page.
//this theme is connected to appstyles.js via MUI theme @ App.js
//we are now allowed to use className={classes.~~~~}
const style = (theme) => ({ ...theme.profile });
//In every component, a class must have a render(){return(...)} tags inside or it wont load.
class Profile extends Component {
  //Event trigger when the uploader was clicked.
  onImageSubmit = (event) => {
    try {
      const image = event.target.files[0];
      const formData = new FormData();
      formData.append("image", image, image.name);
      //for uploading of picture, we will use form data. See RESTFUL API
      this.props.userImageUpload(formData);
    } catch (error) {
      console.log("User cancelled selecting of photo.");
    }
  };
  //The uploader is hidden, once this icon clicked, execute this
  clickUploader = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  render() {
    //classes can access theme class.
    //extract the user state from REDUX STORE to this props.
    const {
      classes,
      user: {
        credentials: { userHandle, imageURL, bio, location, website },
      },
    } = this.props;

    return (
      <Card className={classes.card}>
        <ErrorDialog vertical="bottom" horizontal="center" />
        <SuccessDialog vertical="bottom" horizontal="center" />
        <CardMedia
          image={imageURL}
          title="Profile Picture"
          className={classes.image}
        />
        <div className={classes.editPictureBody}>
          <Tooltip title="Select and upload new profile picture!">
            <IconButton
              className={classes.editIconButton}
              onClick={this.clickUploader}
            >
              <EditIcon color="primary"></EditIcon>
            </IconButton>
          </Tooltip>
        </div>
        <CardContent>
          <Typography
            variant="h5"
            color="primary"
            component={Link}
            to={`/users/${userHandle}`}
          >
            <AccountCircleIcon className={classes.minusBottom} /> {userHandle}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            <SpeakerNotesIcon className={classes.minusBottom} />
            {bio}
          </Typography>
          <Typography variant="body2" color="Link">
            <Link2 href={website}>
              <LinkIcon className={classes.minusBottom} />
              {website}
            </Link2>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <LocationCityIcon className={classes.minusBottom} />
            {location}
          </Typography>
          <br />
          <EditProfile />
          <input type="file" onChange={this.onImageSubmit} id="imageInput" />
        </CardContent>
      </Card>
    );
  }
}
//Map the user state from store to this.props.
const mapStateToProps = (state) => ({
  user: state.user,
  ui: state.ui,
});
const mapActionToProps = {
  userImageUpload,
};
//Finally connect with redux using higher order functions.
export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(style)(Profile));
