import React, { Component } from "react";
//Material UI
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
//Redux
import { connect } from "react-redux";
import store from "../redux/stores";
//Actions
import { clearErrors } from "../redux/actions/uiActions";
//for dialog box
//dialog box is based on define state if TRUE or FALSE
//once the state became TRUE, it will trigger open={} props.

class ErrorDialog extends Component {
  handleClose = () => {
    store.dispatch(clearErrors());
  };
  render() {
    const {
      vertical,
      horizontal,
      ui: {
        errors: { E },
      },
    } = this.props;
    return (
      <div>
        <Snackbar
          open={E ? true : false}
          autoHideDuration={6000}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: vertical,
            horizontal: horizontal,
          }}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={this.handleClose}
            severity="error"
          >
            {E}
          </MuiAlert>
        </Snackbar>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  ui: state.ui,
});
export default connect(mapStateToProps)(ErrorDialog);
