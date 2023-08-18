import ApiService from "@/lib/AxiosService";
import Model from "@/models/Model";
import { TResponse } from "@/types/globalType";

class AuthModel extends Model {
  static path = "auth";

  static login(body: any): Promise<TResponse<any>> {
    return ApiService.post(`${this.path}/login`, body).then(
      (res: any) => res.data
    );
  }

  static register(body: any): Promise<TResponse<any>> {
    return ApiService.post(`${this.path}/register`, body).then(
      (res: any) => res.data
    );
  }

  static me(email: string) {
    return ApiService.get(`${this.path}/me/${email}`).then(
      (res: any) => res.data
    );
  }
}

export default AuthModel;
