import request from '@/utils/axios'
import type { UserLogin, UserRegister, User } from '@/models/user'

export async function login(data: UserLogin): Promise<string> {
  return request
    .post<string>({
      url: '/user/login',
      data
    })
    .then((res) => res.data)
}

export function register(data: UserRegister): Promise<User> {
  return request
    .post<User>({
      url: '/user/register',
      data
    })
    .then((res) => res.data)
}

export function logout() {
  return request.get({
    url: '/user/logout'
  })
}

export function getUserInfo(): Promise<User> {
  return request
    .get<User>({
      url: '/user/session'
    })
    .then((res) => res.data)
}
