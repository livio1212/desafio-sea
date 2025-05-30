import { createSlice } from "@reduxjs/toolkit";

interface EPIState {
  usaEPI: boolean;
}

const initialState: EPIState = {
  usaEPI: false,
};

const epiSlice = createSlice({
  name: "epi",
  initialState,
  reducers: {
    toggleUsaEPI(state) {
      state.usaEPI = !state.usaEPI;
    },
  },
});

export const { toggleUsaEPI } = epiSlice.actions;
export default epiSlice.reducer;
