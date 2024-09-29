import { createAction } from '@reduxjs/toolkit'
const fn_name = 'token'


const set = createAction<string>(`${fn_name}/set`)
const drop = createAction(`${fn_name}/drop`)


export default{
  set,
  drop
}