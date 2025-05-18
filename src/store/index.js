import { configureStore } from "@reduxjs/toolkit";
import paymentReducer from "./reducers/paymentSlice";
import loadingReducer from "./reducers/loadingSlice";
import createdInventorySlice from './reducers/createdInventorySlice';

const store = configureStore({
    reducer: {
        payment: paymentReducer,
        loading: loadingReducer,
        createdInventory: createdInventorySlice,
    },
});

export default store;
