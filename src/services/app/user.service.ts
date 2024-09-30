import configService from "services/config.service";
import Swal from "sweetalert2";
import CustomAxios from "utility/customAxios";
import AbstractCrudService from "./abstract-crud.service";


export default class UserService extends AbstractCrudService {

  constructor(user?: any, token?: string) {
    super(user, token, "/users")
  }



  async userValidation(data: Partial<any>, status: 'pending' | 'approved' | 'rejected', reason: string): Promise<any> {
    try {
      const response = await CustomAxios({ method: 'PATCH', url: this.path + "/user-validartion/" + data._id, data: { status, reason }, headers: { 'Authorization': `Bearer ${this.token}` } })
      if (!response?.data?._id) throw response

      return response?.data;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Algo ha salido mal',
      });
    }
  }
}
