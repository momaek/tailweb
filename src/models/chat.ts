export interface Chat {
  id: number
  created_at: number
  updated_at: number
  user_id: number
  icon: string
  role_id: number
  chat_id: string
  model_id: number
  model: string
  title: string
}

export interface UpdateChatParam {
  chat_id: string
  title: string
}
