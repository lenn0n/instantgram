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
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
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
      console.log("s");
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
        credentials: { userHandle, imageURL, bio, location },
      },
      ui: { errors },
    } = this.props;

    return (
      <Card className={classes.card}>
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
        {errors ? (
          <div className={classes.uploadFailed}>{errors.FileFormat}</div>
        ) : (
          <div></div>
        )}
        <CardContent>
          <Typography
            variant="h5"
            color="primary"
            component={Link}
            to={`/users/${userHandle}`}
          >
            @{userHandle}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {bio}
          </Typography>
          <Typography variant="body1" color="textPrimary">
            {location}
          </Typography>
          <input
            type="file"
            onChange={this.onImageSubmit}
            id="imageInput"
            hidden="hidden"
          />
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
