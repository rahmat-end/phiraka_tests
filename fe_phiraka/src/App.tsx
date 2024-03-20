import React from 'react'
import { Routes, Route, Navigate, Outlet, useNavigate } from "react-router-dom"
import { API, setAuthToken } from './libs/api'
import { useSelector, useDispatch } from "react-redux"
import { RootState } from './store/types/rootState'
import { AUTH_CHECK, AUTH_ERROR } from './store/rootReducer'
import { Text } from "@chakra-ui/react"
import Fibonacci from './pages/Fibonacci'
import Login from './pages/Login'
import Home from './pages/Home'
import AddUser from './pages/AddUser'
import EditUser from './pages/EditUser'

export default function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = useSelector((state: RootState) => state.auth)
  const [isLoading, setIsLoading] = React.useState<boolean>(true)

  async function authCheck() {
    try {
      setAuthToken(localStorage.token)
      const response = await API.get("/auth/check")
      
      dispatch(AUTH_CHECK(response.data))
      setIsLoading(false)
    } catch (error) {
      dispatch(AUTH_ERROR())
      console.log('error' + error);
      
      setIsLoading(false)
      navigate('/auth/login')
    }
  }

  React.useEffect(() => {
    authCheck()
  }, [])

  function IsLogin() {
    if(!auth.username) {
      console.log('ini auth' + auth.username)
      return <Navigate to={'/auth/login'} />
    }

    return <Outlet />
  }

  function IsNotLogin() {
    if(auth.username) {
      console.log('ini auth' + auth.username)
      return <Navigate to={'/'} />
    }

    return <Outlet />
  }

  return (
    <>
      { isLoading ? (
        <Text color={"white"}>Loading now .....</Text>
      ) : (
        <Routes>
          <Route path="/" element={<IsLogin />}>
            <Route path="/" element={<Home />}/>
            <Route path="/fibonacci" element={<Fibonacci />} />
            <Route path="/add_user" element={<AddUser />} />
            <Route path="/edit_user/:id" element={<EditUser />} />
          </Route>

          <Route path="/" element={<IsNotLogin />}>
            <Route path="/auth/login" element={<Login />} />
          </Route>
        </Routes>
      )}
    </>
  )
}
