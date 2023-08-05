import { TResponse } from '@/types/globalType'
import ApiService from '@/lib/AxiosService'

class Model {
  static path = ''

  static list(params?: any): Promise<TResponse<any>> {
    return ApiService.get(this.path, { params }).then(
      (res: any) => res?.data
    )
  }

  static getByAnything(param: string, queries?: any): Promise<TResponse<any>> {
    return ApiService.get(`${this.path}/${param}`, {
      params: queries,
    }).then((res: any) => res?.data)
  }

  static create(body: any): Promise<TResponse<any>> {
    return ApiService.post(this.path, body).then((res: any) => res?.data)
  }

  static update(id: string, body: any): Promise<any> {
    return ApiService.put(`${this.path}/${id}`, body).then(
      (res) => res?.data
    )
  }

  static delete(id: string): Promise<any> {
    return ApiService.delete(`${this.path}/${id}`)
  }
}

export default Model
