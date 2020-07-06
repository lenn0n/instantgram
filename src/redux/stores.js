import { createStore, combineReducers } from "redux";
//above is the needed libs to import

//seperated reducers (logic code)
import userReducer from "./reducers/userReducer";
import dataReducer from "./reducers/dataReducer";
import uiReducer from "./reducers/uiReducer";

//createStore has initial state arg
const initialState = {};
//put the thunk in array
//combining reducers
const reducers = combineReducers({
  user: userReducer,
  data: dataReducer,
  ui: uiReducer,
});

//initialization of store redux takes 3 args. (REDUCERS,INITIAL_STATE,DEV_TOOLS_EXTENTION)
const store = createStore(reducers, initialState);

export default store;
