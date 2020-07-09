//Reducer connected to USER store state.
import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from "../types";
//It is recommended to set initial state in every reducer.
const credentials = {};

export default function (state = credentials, action) {
  switch (action.type) {
    //return the current state and set the auth TRUE
    case SET_AUTHENTICATED:
      return { ...state, authenticated: true };
    //clear all the state by returning initial state, and set the auth FALSE.
    case SET_UNAUTHENTICATED:
      return { credentials, authenticated: false };
    //set the user state as NEW and set the auth as TRUE.
    //using ... will map all the payload data to the corresponding initial state. (2 or more)
    //for single object, we user, sample_name: action.payload.
    case SET_USER:
      return {
        ...action.payload,
        authenticated: true,
      };

    default:
      return state;
  }
}
