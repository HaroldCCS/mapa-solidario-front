import { createReducer } from '@reduxjs/toolkit'

import { Interface } from './index'
import ACTIONS from './rol.action'

const name_storage = 'roles'
interface IReducer { [name_storage]: Interface[] }

const initialState: IReducer = { [name_storage]: [] }

const rolReducer = createReducer<IReducer>(initialState, (builder) => {
    builder.addCase(ACTIONS.set_many, (state, action) => {
        state[name_storage] = action.payload
    })

    builder.addCase(ACTIONS.set, (state, action) => {
        state[name_storage].push(action.payload)
    })

    builder.addCase(ACTIONS.delete_all, (state, action) => {
        state[name_storage] = []
    })
})

export default rolReducer
