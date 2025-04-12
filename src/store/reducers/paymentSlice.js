import { createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
    name: "payment",
    initialState: { paymentActive: false },
    reducers: {
        setPaymentActive: (state, action) => {
            state.paymentActive = action.payload;
        },
        toggleEditActive: (state) => {
            state.paymentActive = !state.paymentActive;
        },
    },
});

export const { setPaymentActive, togglePaymentActive } = paymentSlice.actions;
export default paymentSlice.reducer;
