import React, { Component } from "react";
//Material UI
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
//Redux
import { connect } from "react-redux";
import store from "../redux/stores";
//Actions
import { clearSuccess } from "../redux/actions/uiActions";
//for dialog box
//dialog box is based on define state if TRUE or FALSE
//once the state became TRUE, it will trigger open={} props.

class SuccessDialog extends Component {
  handleClose = () => {
    store.dispatch(clearSuccess());
  };
  render() {
    const {
      vertical,
      horizontal,
      ui: {
        success: { S },
      },
    } = this.props;
    return (
      <div>
        <Snackbar
          open={S ? true : false}
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
            severity="success"
          >
            {S}
          </MuiAlert>
        </Snackbar>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  ui: state.ui,
});
export default connect(mapStateToProps)(SuccessDialog);
