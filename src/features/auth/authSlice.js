"use Client";

import { createSlice } from "@reduxjs/toolkit";
import { getAuthPersistForUser, getAuthPersistForHr } from "@/persist/authPersist";

const HrData = getAuthPersistForHr();
const UserData = getAuthPersistForUser();

let initialState;

HrData.isLoggedIn ? initialState = HrData : initialState = UserData;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload.user;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.isCompanyHr = action.payload.isCompanyHr;
    }
  }
});

export default authSlice.reducer;
export const { setAuth } = authSlice.actions;