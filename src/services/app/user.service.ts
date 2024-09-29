import configService from "services/config.service";
import Swal from "sweetalert2";
import CustomAxios from "utility/customAxios";


export default class UserService {
  private token = '';
  private user_id = '';
  private path = configService.host + "/users";

  constructor(user?: any, token?: string) {
    const data = JSON.parse(localStorage.getItem('persist:root')  || '{}')
    const user_data = JSON.parse(data.user)

    this.token = token || user_data?.token?.token;
    this.user_id = user?._id || user_data?.user?.user?._id;
  }


  async create(data: Partial<any>): Promise<any> {
    try {
      const response = await CustomAxios({ method: 'POST', url: this.path, data, headers: { 'Authorization': `Bearer ${this.token}` } })
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


  async edit(data: Partial<any>): Promise<any> {
    try {
      const response = await CustomAxios({ method: 'PATCH', url: this.path + "/" + data._id, data, headers: { 'Authorization': `Bearer ${this.token}` } })
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


  async getAll(): Promise<any> {
    try {
      const response = await CustomAxios({ method: 'GET', url: this.path, headers: { 'Authorization': `Bearer ${this.token}` } })
      if (!response?.data) throw response

      return response?.data;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Algo ha salido mal',
      });
    }
  }


  async delete(_id: string): Promise<any> {
    try {
      const response = await CustomAxios({ method: 'DELETE', url: this.path + '/' + _id, headers: { 'Authorization': `Bearer ${this.token}` } })
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
