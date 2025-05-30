import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  showForm: boolean;
}

const initialState: FormState = {
  showForm: false,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    toggleFormVisibility(state) {
      state.showForm = !state.showForm;
    },
    setFormVisibility(state, action: PayloadAction<boolean>) {
      state.showForm = action.payload;
    },
  },
});

export const { toggleFormVisibility, setFormVisibility } = formSlice.actions;
export default formSlice.reducer;
