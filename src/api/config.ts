import type { Config } from '@/models/config'
import request from '@/utils/axios'

export function getConfig(): Promise<Config> {
  return request
    .get<Config>({
      url: '/config/get',
      params: { key: 'system' }
    })
    .then((res) => res.data)
}
