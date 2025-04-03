import { createSlice } from "@reduxjs/toolkit";

const editSlice = createSlice({
    name: "edit",
    initialState: { editActive: false },
    reducers: {
        setEditActive: (state, action) => {
            state.editActive = action.payload;
        },
        toggleEditActive: (state) => {
            state.editActive = !state.editActive;
        },
    },
});

export const { setEditActive, toggleEditActive } = editSlice.actions;
export default editSlice.reducer;
