//This data actions. A passive action for fetching data only.
//Rarely use of LOADING state here.
import { CLEAR_ERRORS, CLEAR_SUCCESS } from "../types";
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const clearSuccess = () => (dispatch) => {
  dispatch({ type: CLEAR_SUCCESS });
};
