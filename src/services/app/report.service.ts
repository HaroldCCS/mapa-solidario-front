import configService from "services/config.service";
import Swal from "sweetalert2";
import CustomAxios from "utility/customAxios";
import AbstractCrudService from "./abstract-crud.service";


export default class ReportService extends AbstractCrudService {

  constructor(user?: any, token?: string) {
    super(user, token, "/report")
  }



  async generateReportEntities(): Promise<any> {
    try {
      const response = await CustomAxios({ method: 'GET', url: this.path + "/entities", headers: { 'Authorization': `Bearer ${this.token}` } })
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


  async generateReportSurveys(): Promise<any> {
    try {
      const response = await CustomAxios({ method: 'GET', url: this.path + "/surveys", headers: { 'Authorization': `Bearer ${this.token}` } })
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
