import {createAsyncThunk} from '@reduxjs/toolkit';
import {AsyncThunkConfig, LoginResponse, RegisterResponse, LoginInput, RegisterInput} from '../../common/types/types';

const login = createAsyncThunk<LoginResponse, LoginInput, AsyncThunkConfig>(
    'user/login',
    async (credentials, {extra}) => {
        const {userApi} = extra;
        const response = await userApi.loginUser(credentials);
        const data = await response.data;

        if (response.status>299) {
            throw new Error(data.message);
        }

        const resp: LoginResponse = data;
        return resp;
    }
);

const register = createAsyncThunk<RegisterResponse, RegisterInput, AsyncThunkConfig>(
    'user/register',
    async (credentials, {extra}) => {
        const {userApi} = extra;
        const response = await userApi.registerUser(credentials);
        const data = await response.data;

        if (response.status>299) {
            throw new Error(response.data.message);
        }

        const resp: RegisterResponse = data;
        return resp;
    }
);

export {login, register}