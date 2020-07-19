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

class EditProfile extends Component {
  constructor() {
    super();
    this.state = { open: false };
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      credentials: { bio, website, location },
    } = this.props;
    return (
      <div>
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
              id="bio"
              label="Bio"
              type="text"
              fullWidth
              value={bio}
            />
            <TextField
              margin="dense"
              id="website"
              label="Website"
              type="text"
              fullWidth
              value={website}
            />
            <TextField
              margin="dense"
              id="location"
              label="Location"
              type="text"
              fullWidth
              value={location}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>Cancel</Button>
            <Button onClick={this.handleClose} color="secondary">
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
export default connect(mapStateToProps)(EditProfile);
