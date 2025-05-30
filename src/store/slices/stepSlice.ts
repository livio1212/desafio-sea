import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StepState {
  isCompleted: boolean;
}

const initialState: StepState = {
  isCompleted: false,
};

const stepSlice = createSlice({
  name: "step",
  initialState,
  reducers: {
    toggleStepCompletion(state, action: PayloadAction<boolean>) {
      state.isCompleted = action.payload;
    },
  },
});

export const { toggleStepCompletion } = stepSlice.actions;
export default stepSlice.reducer;
