import { configureStore } from "@reduxjs/toolkit";
import paymentReducer from "./reducers/paymentSlice";
import loadingReducer from "./reducers/loadingSlice";

const store = configureStore({
    reducer: {
        payment: paymentReducer,
        loading: loadingReducer,
    },
});

export default store;
