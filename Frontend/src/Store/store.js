import { configureStore } from "@reduxjs/toolkit";
import { krsApi } from "../Store/APIS/krsApi.js";

export const store = configureStore({
  reducer: {
    [krsApi.reducerPath]: krsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(krsApi.middleware),
});