import { combineReducers } from "@reduxjs/toolkit"
import { authSlice } from "./slices"

export const { AUTH_LOGIN, AUTH_CHECK, AUTH_ERROR, AUTH_LOGOUT } = authSlice.actions

export const authReducer = authSlice.reducer

const rootReducer = combineReducers({
  auth: authReducer
})

export default rootReducer
