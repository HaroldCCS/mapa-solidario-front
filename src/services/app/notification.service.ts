import AbstractCrudService from "./abstract-crud.service";


export default class NotificationService extends AbstractCrudService{

  constructor(user?: any, token?: string) {
    super(user, token, '/notification');
  }

  async getMyNotifications(): Promise<any> {

    return this.getAllByWhere({ user: this.user_id })
  }

}
