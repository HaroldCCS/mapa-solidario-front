import CustomAxios from "utility/customAxios";
import AbstractCrudService from "./abstract-crud.service";


export default class SurveyPropertieService extends AbstractCrudService{

  constructor(user?: any, token?: string) {
    super(user, token, '/survey-propertie');
  }

}
