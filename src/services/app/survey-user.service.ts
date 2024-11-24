import CustomAxios from "utility/customAxios";
import AbstractCrudService from "./abstract-crud.service";
import Swal from "sweetalert2";
import { Interface } from "store/app/survey-user";


export default class SurveyUserService extends AbstractCrudService{

  constructor(user?: any, token?: string) {
    super(user, token, '/survey-user');
  }

  async getMySurveys(): Promise<any> {
    return this.getAllByWhere({ user: this.user_id })
  }


  async saveMany(data: Interface[]): Promise<any> {
    try {
      const response = await CustomAxios({ method: 'POST', url: this.path + "/save-many/" + this.user_id, data: data, headers: { 'Authorization': `Bearer ${this.token}` } })
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
}
