import request from '@/utils/axios'
import type { Chat, ChatHistory, Model, Role } from '@/models/chat'

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
      url: '/role/list',
      params: { all: true }
    })
    .then((res) => res.data)
}

export async function getModelList(): Promise<Model[]> {
  return request
    .get<Model[]>({
      url: '/model/list',
      params: { all: true }
    })
    .then((res) => res.data)
}

export async function getChatHistories(chatId: string): Promise<ChatHistory[]> {
  return request
    .get<ChatHistory[]>({
      url: '/chat/history',
      params: { chat_id: chatId }
    })
    .then((res) => res.data)
}

export async function stopChatSession(sessionID: string) {
  return request
    .get({
      url: '/chat/stop',
      params: { session_id: sessionID }
    })
    .then((res) => res.data)
}

export async function removeChat(chatId: string) {
  return request.get({
    url: '/chat/remove',
    params: { chat_id: chatId }
  })
}

export async function clearChat(chatId: string) {
  return request.get({
    url: '/chat/clear',
    params: { chat_id: chatId }
  })
}

export async function updateChat(chatId: string, title: string) {
  return request.post({
    url: '/chat/update',
    data: { chat_id: chatId, title: title }
  })
}
