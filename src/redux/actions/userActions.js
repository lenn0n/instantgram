//This is the ACTION page. We DISPATCH an ACTION here and calls REDUX REDUCER.
//Reducer will then update the state and return it to the STORE.
//To avoid TYPOS, we will user CONSTANT variables located in TYPES.JS
//Every ACTION should fire LOADING state.
import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  UNLOADING_UI,
  USER_TOKEN,
  SET_UNAUTHENTICATED,
  API_ENDPOINT,
} from "../types";
//To get the data from our API ENDPOINTS, we will use AXIOS.
//Since we are using PROXY in package.json, /screams, /users will work
import axios from "axios";
//LoginUser func requires 2 arguments. Input and History (*to get back)
//It should return VALID request data to our API or it will break.
export const loginUser = (userInput, history) => (dispatch) => {
  //Load the loading bar.
  dispatch({ type: LOADING_UI });
  //Fire axios, stop the loading bar and clear errors.
  //Set authorization token to have access in our HEADERS.
  //Set also in local storage. If success, push HISTORY.
  axios
    .post(`${API_ENDPOINT}/login`, userInput)
    .then((res) => {
      dispatch({ type: UNLOADING_UI });
      dispatch({ type: CLEAR_ERRORS });
      setAuthorizationStorage(res.data.Token);
      setAuthorizationHeader(res.data.Token);
      history.push("/");
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
  //Else, dispatch an ERROR type with PAYLOAD data response.
};
//Same goes with signUp action.
export const signupUser = (newUser, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`${API_ENDPOINT}/signup`, newUser)
    .then((res) => {
      dispatch({ type: UNLOADING_UI });
      dispatch({ type: CLEAR_ERRORS });
      setAuthorizationStorage(res.data.Token);
      setAuthorizationHeader(res.data.Token);
      history.push("/");
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};
//Logout action is the same, delete the header, remove in localStorage.
export const logoutUser = () => (dispatch) => {
  //remove the token in storage
  localStorage.removeItem(USER_TOKEN);
  //clear the headers used for (getUserData)
  delete axios.defaults.headers.common["Authorization"];
  //set un-authenticated and reset back to initial state.
  dispatch({ type: SET_UNAUTHENTICATED });
  //if theres an error, clear it for next login.
  dispatch({ type: CLEAR_ERRORS });
};
export const getUserData = () => (dispatch) => {
  //::::::::::::::::TODO: Check if the TOKEN is EXPIRE:::::::::::::::::::::::
  //This endpoint will get the HEADER value, Authorization: Bearer: %%%
  //The user must be logged in.
  axios
    .get(`${API_ENDPOINT}/users/view`)
    .then((res) => {
      dispatch({ type: SET_USER, payload: res.data });
    })
    .catch((err) => console.log(err));
};

const setAuthorizationHeader = (token) => {
  //get the response token from our API
  const FBIdToken = `Bearer ${token}`;
  //put the token in the headers so it can access the getUserData
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};

const setAuthorizationStorage = (token) => {
  const FBIdToken = `Bearer ${token}`;
  //set item to the storage
  localStorage.setItem(USER_TOKEN, FBIdToken);
};
export const userImageUpload = (formData) => (dispatch) => {
  //this section is FBAuth protected
  //you cannot enter here if invalid header token
  //if success, update the view of user-details
  dispatch({ type: LOADING_UI });
  axios
    .post(`${API_ENDPOINT}/users/upload`, formData)
    .then(() => {
      dispatch({ type: UNLOADING_UI });
      dispatch({ type: CLEAR_ERRORS });
      dispatch(getUserData());
    })
    .catch((err) => {
      dispatch({ type: UNLOADING_UI });
      dispatch({ type: SET_ERRORS, payload: err.response.data });
      console.log(err);
    });
};
