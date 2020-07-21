//The main logic of this EditProfile Page is:
//We need to fetch the user handle, bio, website, location from store
//Once the dialog view triggered, we will populate the data from store
//to the value={} fields of TextField(MUI). Using:
//Onchange event of every TextField and set it to the STATE.
//Everytime there is a changes in field, it will update the state.
import React, { Component } from "react";
//Redux
import { connect } from "react-redux";
//MUI components
import Link2 from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
//Actions
import { updateUserProfile } from "../redux/actions/userActions";
//Dialog
import SuccessDialog from "../dialogs/SuccessDialog";
class EditProfile extends Component {
  //initialize the state to be used in our endpoint
  constructor() {
    super();
    this.state = { bio: "", website: "", location: "", open: false };
  }
  componentDidMount() {
    //once the component loaded, re-state from props to state.
    //once the state was changed, it will also change in TextView.
    const {
      credentials: { bio, website, location },
    } = this.props;
    this.setState({ bio: bio, website: website, location: location });
  }
  render() {
    //open the dialog box
    this.handleClickOpen = () => {
      this.setState({ open: true });
    };
    //close the dialog box
    this.handleClose = () => {
      this.setState({ open: false });
    };
    //set to state every changes of the user
    this.handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value });
    };
    //update button action
    this.handleSubmit = () => {
      //get the user handle from credential props
      const {
        credentials: { userHandle },
      } = this.props;
      this.setState({ open: false });
      const userData = {
        bio: this.state.bio,
        website: this.state.website,
        location: this.state.location,
        handle: userHandle,
      };
      this.props.updateUserProfile(userData);
    };
    return (
      <div>
        <SuccessDialog vertical="bottom" horizontal="center" />
        <Typography variant="p" color="primary">
          <Link2 href="#" onClick={this.handleClickOpen}>
            Edit Profile Info
          </Link2>
        </Typography>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          maxWidth="sm"
        >
          <DialogTitle id="form-dialog-title">Edit Profile Info</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Note: Please don't include your password in your public info.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              name="bio"
              label="Bio"
              type="text"
              fullWidth
              value={this.state.bio}
              onChange={this.handleChange}
            />
            <TextField
              margin="dense"
              name="website"
              label="Website"
              type="text"
              fullWidth
              value={this.state.website}
              onChange={this.handleChange}
            />
            <TextField
              margin="dense"
              name="location"
              label="Location"
              type="text"
              fullWidth
              value={this.state.location}
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>Cancel</Button>
            <Button onClick={this.handleSubmit} color="secondary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});

export default connect(mapStateToProps, { updateUserProfile })(EditProfile);
