import { configureStore } from "@reduxjs/toolkit";
import epiReducer from "./slices/epiSlice";
import formReducer from "./slices/formSlice";
import funcionarioReducer from "./slices/funcionarioSlice";
import stepReducer from "./slices/stepSlice";
export const store = configureStore({
  reducer: {
    epi: epiReducer,
    form: formReducer,
    funcionario: funcionarioReducer,
    step: stepReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
