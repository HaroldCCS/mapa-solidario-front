import CustomAxios from "utility/customAxios";
import AbstractCrudService from "./abstract-crud.service";
import Swal from "sweetalert2";


export default class HeadquarterService extends AbstractCrudService{

  constructor(user?: any, token?: string) {
    super(user, token, '/headquarter');
  }


  async create(data: Partial<any>): Promise<any> {
    try {
      data['user'] = this.user_id;
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
}
