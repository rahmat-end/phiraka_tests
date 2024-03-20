export type IUser = {
    id?: number
    username?: string
    password?: string
}

export type IUserForm = {
    username: string
    password: string
}

export type IUserSearch = {
    id: number
    username: string
    password: string
    created_at: string
    updated_at: string
}