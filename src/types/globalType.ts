import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

export type TUser = {
  id: string
  name: string
  email: string
  role: string
  accessToken: string
  refreshToken: string
}

export type TResponse<T> = {
  status: number,
  data?: T,
  message: string
}

export type TRole = {
  id: string
  name: string
  type: number
}

export type CloudinaryResponse = UploadApiResponse | UploadApiErrorResponse;
