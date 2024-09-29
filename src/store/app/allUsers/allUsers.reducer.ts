import { createReducer } from '@reduxjs/toolkit'

import { Interface } from './index'
import ACTIONS from './allUsers.action'

const name_storage = 'all_users'
interface IReducer { [name_storage]: Interface[] }

const initialState: IReducer = { [name_storage]: [] }

const allUsersReducer = createReducer<IReducer>(initialState, (builder) => {
    builder.addCase(ACTIONS.set_many, (state, action) => {
        state[name_storage] = action.payload
    })

    builder.addCase(ACTIONS.add, (state, action) => {
        state[name_storage].push(action.payload)
    })
    builder.addCase(ACTIONS.update, (state, action) => {
        state[name_storage] = state[name_storage].map(item => item._id === action.payload._id ? action.payload : item)
    })

    builder.addCase(ACTIONS.delete_all, (state, action) => {
        state[name_storage] = []
    })
})

export default allUsersReducer
