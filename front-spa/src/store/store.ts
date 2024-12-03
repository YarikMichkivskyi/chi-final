import {configureStore} from '@reduxjs/toolkit';
import userApi from '../api/actions/user.api'
import {reducer as userReducer} from './user/user'

const extraArgument = {
    userApi
};

const store = configureStore({
    reducer: {userData: userReducer},
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: {
                extraArgument,
            },
        })
});

export {store, extraArgument};
