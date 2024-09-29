import { createAction } from '@reduxjs/toolkit'
import { Interface } from "./index";

const fn_name = 'rol'


const set = createAction<Interface>(`${fn_name}/set`)
const set_many = createAction<Interface[]>(`${fn_name}/setMany`)
const delete_all = createAction(`${fn_name}/deleteAll`)

export default{
  set,
  delete_all,
  set_many
}