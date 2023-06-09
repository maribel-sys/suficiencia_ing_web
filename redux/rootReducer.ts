import {combineReducers} from "redux";
import authReducer from "./slice/authSlice";
import postReducer from "./slice/postSlice";

export default  combineReducers({
    auth: authReducer,
    post: postReducer
});