import React from "react"
import { useNavigate } from "react-router-dom"
import { API } from "@/libs/api"
import { IUserForm } from "@/types/user"

export function useEditUser() {
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
    
      async function handleEdit(id: number) {
        try {
          await API.put(`/updateUser/${id}`, form)
          navigate("/")
        } catch (error) {
          throw error
        }
      }
    
      return {
        form,
        handleChange,
        handleEdit
      }
}