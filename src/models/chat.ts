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

export interface Model {
  id: number
  created_at: number
  updated_at: number
  platform: string
  name: string
  value: string
  enabled: boolean
  sort_num: number
  power: number
  open: boolean
  max_tokens: number
  max_context: number
  temperature: number
  key_id: number
  key_name: string
}

export interface Role {
  id: number
  created_at: number
  updated_at: number
  key: string
  name: string
  context: any
  hello_msg: string
  icon: string
  enable: boolean
  sort: number
  model_id: number
  model_name: string
  description?: string
}

export interface ChatHistory {
  chat_id: string
  content: string
  created_at: number
  icon: string
  model: string
  role_id: number
  tokens: number
  type: string
  updated_at: number
  use_context: true
  user_id: number
  isLoading?: boolean
}
