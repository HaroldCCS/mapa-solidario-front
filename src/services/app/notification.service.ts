import CustomAxios from "utility/customAxios";
import AbstractCrudService from "./abstract-crud.service";


export default class NotificationService extends AbstractCrudService{

  constructor(user?: any, token?: string) {
    super(user, token, '/notification');
  }

  async getMyNotifications(): Promise<any> {

    return this.getAllByWhere({ user: this.user_id })
  }


  async createMany(data: {name: string, description: string, users: string[]}): Promise<any> {
    try {
      const response = await CustomAxios({ method: 'POST', url: this.path + '/create-many', data, headers: { 'Authorization': `Bearer ${this.token}` } })
      if (!response?.data?.success) throw response

      return response?.data;
    } catch (error) {
      this.showError(error)
    }
  }
}
