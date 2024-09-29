import { createReducer } from '@reduxjs/toolkit'

import { Interface } from './index'
import ACTIONS from './user.action'

const name_storage = 'user'
interface IReducer { [name_storage]: Interface }

const initialState: IReducer = { [name_storage]: {_id: '', name: '', email: ''} }

const userReducer = createReducer<IReducer>(initialState, (builder) => {
    builder.addCase(ACTIONS.set, (state, action) => {
        state.user = action.payload
    })

    builder.addCase(ACTIONS.delete_all, (state, action) => {
        state[name_storage] = {_id: '', name: '', email: ''}
    })
})

export default userReducer
