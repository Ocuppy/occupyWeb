import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const initialState = {
  token: "",
  // userType: "",
  is_active: false,
};

const authSlice = createSlice({
  initialState,
  name: "auth slice",
  reducers: {
    setCredentials: (state, action) => {
      const { token } = action.payload;
      state.token = token;
      // state.userType = userType;
      sessionStorage.setItem("token", token);
      // sessionStorage.setItem("userType", userType);
    },

    getCredentials: (state) => {
      const token = sessionStorage.getItem("token");
      // const user = sessionStorage.getItem("userType");

      if (token) {
        state.token = token;
        // state.userType = user;
      }
    },

    logOut: (state) => {
      sessionStorage.clear();
      state.token = "";
      // state.userType = "";
      location.reload();
    },
  },
});

export const { setCredentials, getCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectAuthToken = (state: RootState) => state.auth;
