import CustomAxios from "utility/customAxios";
import AbstractCrudService from "./abstract-crud.service";


export default class SurveyUserService extends AbstractCrudService{

  constructor(user?: any, token?: string) {
    super(user, token, '/survey-user');
  }

  async getMySurveys(): Promise<any> {

    return this.getAllByWhere({ user: this.user_id })
  }
}
