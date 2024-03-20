import React from "react"
import { useNavigate } from "react-router-dom"
import { API } from "@/libs/api"
import { IUserForm } from "@/types/user"

export function useAddUser() {
    const navigate = useNavigate()

    const [form, setForm] = React.useState<IUserForm>({
        username: "",
        password: ""
      })
    
      function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm({
          ...form,
          [e.target.name]: e.target.value
        })
      }
    
      async function handleAdd() {
        try {
          await API.post('/add', form)
          navigate("/")
        } catch (error) {
          throw error
        }
      }
    
      return {
        form,
        handleChange,
        handleAdd
      }
}