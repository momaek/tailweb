import axios from 'axios'
import { notify } from 'notiwind'
import type {
  AxiosResponse,
  AxiosRequestConfig,
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig
} from 'axios'
import { useUserStore } from '@/stores/user'

export interface ResponseModel<T = any> {
  code?: number
  data: T
}

// set code cofig
export enum HttpCodeConfig {
  success = 200,
  notFound = 404,
  noPermission = 403
}

class HttpRequest {
  service: AxiosInstance

  constructor() {
    this.service = axios.create({
      baseURL: '/api',
      timeout: 5 * 1000
    })

    this.service.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const userStore = useUserStore()
        const token = userStore.getToken() // 假设 token 存储在 userStore 中
        if (token) {
          if (!config.headers) {
            config.headers = new axios.AxiosHeaders()
          }
          config.headers.set('Authorization', `${token}`)
        }
        return config
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )

    this.service.interceptors.response.use(
      (response: AxiosResponse<ResponseModel>): AxiosResponse['data'] => {
        const { data } = response
        if (data.code != 0) {
          if (data.code === 401) {
            window.location.href = '/login'
          } else {
            notify({
              group: 'error',
              title: '请求出错',
              text: data.data
            })
          }
        } else {
          return data
        }
      },
      (error: AxiosError<ResponseModel>) => {
        if (error.response?.status === 401) {
          window.location.href = '/login'
          return
        }

        if (error.response?.data) {
          notify({
            group: 'error',
            title: '请求出错',
            text: error.response.data.data
          })
        } else {
          if (error.response?.status === 401) {
            window.location.href = '/'
            return
          }
          notify({
            group: 'error',
            title: '请求出错',
            text: error.response?.statusText
          })
        }
        return Promise.reject(error)
      }
    )
  }

  request<T = any>(config: AxiosRequestConfig): Promise<ResponseModel<T>> {
    /**
     * TODO: execute other methods according to config
     */
    return new Promise((resolve, reject) => {
      try {
        this.service
          .request<ResponseModel<T>>(config)
          .then((res: AxiosResponse['data']) => {
            resolve(res as ResponseModel<T>)
          })
          .catch((err) => {
            // do something
            reject(err)
          })
      } catch (err) {
        return Promise.reject(err)
      }
    })
  }

  get<T = any>(config: AxiosRequestConfig): Promise<ResponseModel<T>> {
    return this.request({ method: 'GET', ...config })
  }
  post<T = any>(config: AxiosRequestConfig): Promise<ResponseModel<T>> {
    return this.request({ method: 'POST', ...config })
  }
  put<T = any>(config: AxiosRequestConfig): Promise<ResponseModel<T>> {
    return this.request({ method: 'PUT', ...config })
  }
  delete<T = any>(config: AxiosRequestConfig): Promise<ResponseModel<T>> {
    return this.request({ method: 'DELETE', ...config })
  }
}

const httpRequest = new HttpRequest()
export default httpRequest
