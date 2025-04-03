import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
    name: "loading",
    initialState: { setLoading: false },
    reducers: {
        setLoading: (state, action) => {
            state.setLoading = action.payload;
        },
        toggleLoading: (state) => {
            state.loading = true;
            state.loading = false;
        }
    },
});

export const { setLoading, toggleLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
