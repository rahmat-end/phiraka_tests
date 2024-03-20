import { setAuthToken } from "@/libs/api"
import { IUser } from "@/types/user"
import { createSlice } from "@reduxjs/toolkit"

const initialAuthState: IUser = {
    id: 0,
    username: "",
    password: ""
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
      AUTH_LOGIN: (_, action) => {
        const payload = action.payload
        console.log("ini payload ", payload.session)
  
        setAuthToken(payload.token)
        localStorage.setItem("token", payload.token)
        localStorage.setItem('user', JSON.stringify(payload.session))
  
        const user: IUser = {
          id: payload.session.id,
          username: payload.session.username,
          password: payload.session.password
        }
  
        return user
      },
      AUTH_CHECK: (_, action) => {
        const payload = action.payload
        console.log("ini payload ", payload)
  
        const user: IUser = {
          id: payload.data.id,
          username: payload.data.username,
          password: payload.data.password
        }
  
        return user
      },
      AUTH_ERROR: () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
      },
      AUTH_LOGOUT: () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
      }
    }
})