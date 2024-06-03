import request from '@/utils/axios'
import type { Chat, Role } from '@/models/chat'

export async function getChatList(page?: number, limit?: number): Promise<Chat[]> {
  return request
    .get<Chat[]>({
      url: '/chat/list',
      params: { page: page, page_size: limit }
    })
    .then((res) => res.data)
}

export async function getRoleList(): Promise<Role[]> {
  return request
    .get<Role[]>({
      url: '/role/list'
    })
    .then((res) => res.data)
}
