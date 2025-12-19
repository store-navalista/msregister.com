import { createSlice } from "@reduxjs/toolkit";

interface ContentState {
    isAction: boolean;
}

const initialState: ContentState = { isAction: true };

export const RootSlice = createSlice({
    name: "root",
    initialState,
    reducers: {},
});

export const RootActions = RootSlice.actions;
export default RootSlice.reducer;
