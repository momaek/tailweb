import request from '@/utils/axios'
import type { Chat } from '@/models/chat'

export async function getChatList(page?: number, limit?: number): Promise<Chat[]> {
  return request
    .get<Chat[]>({
      url: '/chat/list',
      params: { page: page, page_size: limit }
    })
    .then((res) => res.data)
}
