import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CountState {
  count: number
}

const initialState: CountState = {
  count: 0,
};

const countSlice = createSlice({
  name: "count",
  initialState,
  reducers: {
    setProductCount: (
      state,
      action: PayloadAction<{ count: number }>
    ) => {
      state.count = action.payload.count;
      
    }
  },
});

export const {setProductCount} = countSlice.actions
export default countSlice.reducer