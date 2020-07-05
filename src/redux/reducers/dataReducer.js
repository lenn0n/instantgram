//Reducer connected to DATA store state.
import { SET_SCREAMS } from "../types";
//It is recommended to initiate the default value of the state.
const initialState = {
  screams: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    //set the scream state as NEW.
    case SET_SCREAMS:
      return { screams: action.payload };
    default:
      return state;
  }
}
