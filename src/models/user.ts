export interface User {
  id: number
  created_at: number
  updated_at: number
  username: string
  nickname: string
  avatar: string
  salt: string
  power: number
  chat_roles: string[]
  chat_models: number[]
  expired_time: number
  status: boolean
  last_login_at: number
  last_login_ip: string
  vip: boolean
}

export interface UserLogin {
  username: string
  password: string
}

export interface UserRegister {
  username: string
  password: string
  nickname: string
}
