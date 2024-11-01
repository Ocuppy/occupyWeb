import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const initialState = {
  token: "",
  userType: "",
  userID: "",
  profileID: "",
  // is_active: false,
};

const authSlice = createSlice({
  initialState,
  name: "auth slice",
  reducers: {
    setCredentials: (state, action) => {
      const { token, userType, userID, profileID } = action.payload;
      state.token = token;
      state.userID = userID;
      state.profileID = profileID;
      state.userType = userType;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("userType", userType);
      sessionStorage.setItem("userID", userID);
      sessionStorage.setItem("profileID", profileID);
    },

    getCredentials: (state) => {
      const keys: Array<keyof typeof state> = [
        "token",
        "userType",
        "userID",
        "profileID",
      ];

      keys.forEach((key) => {
        const value = sessionStorage.getItem(key);
        if (!state[key] && value) {
          state[key] = value;
        }
      });
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
