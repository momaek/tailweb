import type { File } from '@/models/file'
import request from '@/utils/axios'

export async function uploadFile(form: FormData): Promise<File> {
  return request
    .post<File>({
      url: '/upload',
      data: form,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((res) => res.data)
}
