//This data actions. A passive action for fetching data only.
//Rarely use of LOADING state here.
import { SET_SCREAMS, API_ENDPOINT } from "../types";
import axios from "axios";
export const getAllScreams = () => (dispatch) => {
  axios
    .get(`${API_ENDPOINT}/screams`)
    .then((res) => {
      dispatch({ type: SET_SCREAMS, payload: res.data });
    })
    .catch((err) => console.log(err.response));
};
