import { createReducer } from '@reduxjs/toolkit'

import { Interface } from './index'
import ACTIONS from './permission.action'

const name_storage = 'permissions'
interface IReducer { [name_storage]: Interface }

const initialState: IReducer = { [name_storage]: [] }

const permissionReducer = createReducer<IReducer>(initialState, (builder) => {
    builder.addCase(ACTIONS.set, (state, action) => {
        state[name_storage] = action.payload
    })

    builder.addCase(ACTIONS.delete_all, (state) => {
        state[name_storage] = []
    })
})

export default permissionReducer
