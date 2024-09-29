import { createAction } from '@reduxjs/toolkit'
import { Interface } from "./index";

const fn_name = 'allUsers'


const add = createAction<Interface>(`${fn_name}/add`)
const update = createAction<Interface>(`${fn_name}/update`)
const set_many = createAction<Interface[]>(`${fn_name}/setMany`)
const delete_all = createAction(`${fn_name}/deleteAll`)

export default{
  update,
  add,
  delete_all,
  set_many
}