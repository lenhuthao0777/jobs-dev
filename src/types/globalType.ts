export type TUser = {
  id: string;
  name: string;
  email: string;
  role: number;
  accessToken: string;
  refreshToken: string;
  avatar: Avatar
};


export type TResponse<T> = {
  status: number;
  data?: T;
  message: string;
};

export type TRole = {
  id: string;
  name: string;
  type: number;
};

export interface TProfile {
  id?: string
  name?: string
  avatar?: Avatar
  backgroundImage?: BackgroundImage
  summary?: string
  contact?: string
  content?: string
  createdAt?: string
  updatedAt?: string
  userId?: string
}

export interface Avatar {
  url?: string
  etag?: string
  tags?: any[]
  type?: string
  bytes?: number
  width?: number
  folder?: string
  format?: string
  height?: number
  version?: number
  asset_id?: string
  public_id?: string
  signature?: string
  created_at?: string
  secure_url?: string
  version_id?: string
  access_mode?: string
  placeholder?: boolean
  resource_type?: string
  original_filename?: string
  original_extension?: string
}

export interface BackgroundImage {
  url?: string
  etag?: string
  tags?: any[]
  type?: string
  bytes?: number
  width?: number
  folder?: string
  format?: string
  height?: number
  version?: number
  asset_id?: string
  public_id?: string
  signature?: string
  created_at?: string
  secure_url?: string
  version_id?: string
  access_mode?: string
  placeholder?: boolean
  resource_type?: string
  original_filename?: string
  original_extension?: string
}

