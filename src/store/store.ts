// import { applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
// import { logger } from "redux-logger";



import {
    useDispatch,
    useSelector,
    type TypedUseSelectorHook,
} from "react-redux";
import baseApi from "../api-service/api";

const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
    
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export const useAppDispatch = () => useDispatch<AddDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;