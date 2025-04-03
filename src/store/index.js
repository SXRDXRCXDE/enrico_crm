import { configureStore } from "@reduxjs/toolkit";
import editReducer from "./reducers/editSlice";
import loadingReducer from "./reducers/loadingSlice";

const store = configureStore({
    reducer: {
        edit: editReducer,
        loading: loadingReducer,
    },
});

export default store;
