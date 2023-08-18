export type TUser = {
  id: string;
  name: string;
  email: string;
  role: number;
  access_token: string;
  // refresh_token: string;
  image: IAvatar;
};

export type TResponse<T> = {
  status: number;
  data?: T;
  message: string;
};

export type TOptions = {
  label: string;
  value: string;
};

export interface TProfile {
  id?: string;
  firstName: string;
  lastName: string;
  headLine: any;
  education: any;
  region: any;
  city: any;
  summary: any;
  industry: string;
  avatar: any;
  backgroundImage: any;
  contact: any;
  content: any;
  companySize?: string;
  createdAt?: string;
  updatedAt?: string;
  userId?: string;
}

export interface IAvatar {
  url?: string;
  etag?: string;
  tags?: any[];
  type?: string;
  bytes?: number;
  width?: number;
  folder?: string;
  format?: string;
  height?: number;
  version?: number;
  asset_id?: string;
  public_id?: string;
  signature?: string;
  created_at?: string;
  secure_url?: string;
  version_id?: string;
  access_mode?: string;
  placeholder?: boolean;
  resource_type?: string;
  original_filename?: string;
  original_extension?: string;
}

export interface BackgroundImage {
  url?: string;
  etag?: string;
  tags?: any[];
  type?: string;
  bytes?: number;
  width?: number;
  folder?: string;
  format?: string;
  height?: number;
  version?: number;
  asset_id?: string;
  public_id?: string;
  signature?: string;
  created_at?: string;
  secure_url?: string;
  version_id?: string;
  access_mode?: string;
  placeholder?: boolean;
  resource_type?: string;
  original_filename?: string;
  original_extension?: string;
}

export type TRole = {
  id?: string;
  name: string;
  type: number;
  createdAt?: string;
  updatedAt?: string;
};
