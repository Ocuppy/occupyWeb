import { configureStore } from "@reduxjs/toolkit";

import { baseApiSlice } from "./services/baseApiSlice";
import authSlice from "./services/authSlice/authSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    [baseApiSlice.reducerPath]: baseApiSlice.reducer,
  },
  middleware: (getDefaultmiddleWare) =>
    getDefaultmiddleWare().concat(baseApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
