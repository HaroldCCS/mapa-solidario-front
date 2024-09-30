import AbstractCrudService from "./abstract-crud.service";


export default class EventService extends AbstractCrudService{

  constructor(user?: any, token?: string) {
    super(user, token, '/event');
  }

}
