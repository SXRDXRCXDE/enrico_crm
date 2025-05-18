import { createSlice } from '@reduxjs/toolkit';

const createdInventorySlice = createSlice({
    name: 'createdInventory',
    initialState: [],
    reducers: {
        addInventory: (state, action) => {
            state.push(action.payload);
        },
        removeInventory: (state, action) => {
            return state.filter(item => item.id !== action.payload);
        },
        clearInventory: () => {
            return [];
        },
        setInventory: (state, action) => {
            return [...action.payload]; // Replace entire inventory array
        },
    },
});

export const { addInventory, removeInventory, clearInventory, setInventory  } = createdInventorySlice.actions;
export default createdInventorySlice.reducer;
