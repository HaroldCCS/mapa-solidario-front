//@LIBRERIAS
import { ThunkDispatch, UnknownAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import storage from 'redux-persist/lib/storage' // defaults to localStorage


import tokenReducer from './auth/token/token.reducer'
import userReducer from './auth/user/user.reducer'
import permissionReducer from './auth/permissions/permission.reducer'
import rolReducer from './app/rol/rol.reducer'
import allUsersReducer from './app/allUsers/allUsers.reducer';
import eventReducer from './app/event/event.reducer'
import notificationReducer from './app/notification/notification.reducer'
import headquarterReducer from './app/headquarter/headquarter.reducer'
import surveyPropertieReducer from './app/survey-propertie/survey-propertie.reducer'
import surveyUserReducer from './app/survey-user/survey-user.reducer'


const userReducerCombined = combineReducers({
    token: tokenReducer,
    user: userReducer,
    permission: permissionReducer
})


const rootReducer = combineReducers({
    user: userReducerCombined,
    roles: rolReducer,
    all_users: allUsersReducer,
    events: eventReducer,
    notifications: notificationReducer,
    headquarters: headquarterReducer,
    survey_user: surveyUserReducer,
    survey_properties: surveyPropertieReducer
})

const persistedReducer = persistReducer(
    {
        key: 'root',
        storage,
        whitelist: ['user', 'roles', 'all_users']
    },
    rootReducer
)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, any, UnknownAction>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


export const persistor = persistStore(store)

