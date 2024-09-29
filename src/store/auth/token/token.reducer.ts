import { createReducer } from '@reduxjs/toolkit'

import ACTIONS from './token.action'

const name_storage = 'token'
interface IReducer { [name_storage]: string }

const initialState: IReducer = { [name_storage]: '' }

const tokenReducer = createReducer<IReducer>(initialState, (builder) => {
    builder.addCase(ACTIONS.set, (state, action) => {
        state[name_storage] = action.payload 
    })

    builder.addCase(ACTIONS.drop, (state) => {
        //Se elimina el localStorage luego de cerrar sesión
        localStorage.clear()

        state[name_storage] = ''

    })
})

export default tokenReducer
