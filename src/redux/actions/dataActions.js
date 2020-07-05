//This data actions. A passive action for fetching data only.
//Rarely use of LOADING state here.
import { SET_SCREAMS } from "../types";
import axios from "axios";
export const getAllScreams = () => (dispatch) => {
  axios
    .get("https://asia-east2-fir-crud-8d71b.cloudfunctions.net/api/screams")
    .then((res) => {
      dispatch({ type: SET_SCREAMS, payload: res.data });
    })
    .catch((err) => console.log(err.response));
};
