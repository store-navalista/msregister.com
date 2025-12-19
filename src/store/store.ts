import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { api } from "./reducers/apiReducer";
import rootReducer from "./reducers/rootReducer";

const store = configureStore({
    reducer: {
        ...rootReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefault) => getDefault({ serializableCheck: false }).concat(api.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
