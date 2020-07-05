//Reducer connected to UI store state.
import { LOADING_UI, CLEAR_ERRORS, SET_ERRORS, UNLOADING_UI } from "../types";
//It is recommended to set initial state in every reducer.
const initialState = {
  loading: false,
  errors: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    //return the current state and animate the loadingbar.
    case LOADING_UI:
      return { ...state, loading: true };
    //return the current state and stop the loadingbar.
    case UNLOADING_UI:
      return { ...state, loading: false };
    //set the errors as new and stop the loadingbar.
    case SET_ERRORS:
      return { loading: false, errors: action.payload };
    //return the current state and clear only the errors.
    case CLEAR_ERRORS:
      return { ...state, errors: {} };

    default:
      return state;
  }
}
