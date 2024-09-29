import { createAction } from '@reduxjs/toolkit'
import { Interface } from "./index";

const fn_name = 'user'


const set = createAction<Interface>(`${fn_name}/set`)
const delete_all = createAction(`${fn_name}/deleteAll`)

export default{
  set,
  delete_all
}