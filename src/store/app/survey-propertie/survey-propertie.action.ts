import { createAction } from '@reduxjs/toolkit'
import { Interface } from "./index";

const fn_name = 'survey_propertie'

const add = createAction<Interface>(`${fn_name}/add`)
const set_many = createAction<Interface[]>(`${fn_name}/setMany`)
const delete_all = createAction(`${fn_name}/deleteAll`)
const delete_one = createAction<string>(`${fn_name}/deleteOne`)
const update = createAction<Interface>(`${fn_name}/update`)

export default{
  add,
  delete_all,
  set_many,
  delete_one,
  update
}