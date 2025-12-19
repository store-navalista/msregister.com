import { combineReducers } from "redux";
import { RootSlice } from "./rootReducer";

export const reducer = combineReducers({
    root: RootSlice,
});
