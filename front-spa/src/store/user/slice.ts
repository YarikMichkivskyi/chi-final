import {createSlice} from '@reduxjs/toolkit';
import {login, register} from './actions';
import {toast} from "react-toastify";
import {setToken} from "../../api/axiosInstance";
import userApi from "../../api/actions/user.api";

interface UserState {
    token: string | null;
    username: string | null;
    id: number | null;
    loading: boolean;
    error: string | null;
}

const loadToken = () => {
    const token = localStorage.getItem('token');
    setToken(String(token));
    return token;
}

const removeToken = () => {
    localStorage.removeItem('token');
    setToken('');
}

const saveToken = (token: string) => {
    setToken(token);
    localStorage.setItem('token', token);
}

const getInitialState = async () => {
    const token = loadToken();
    if (token) {
        try {
            const res = await userApi.getUserByToken();
            return{
                token,
                username: res.data.username,
                id: res.data.id,
                loading: false,
                error: null,
            }
        } catch (error) {
            removeToken()
        }
    }
    return {
        token:null,
        username:null,
        id:null,
        loading: false,
        error: null,
    }
};

const initialState: UserState = await getInitialState();

const {reducer, actions, name} = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.username = null;
            state.id = null;
            removeToken();
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.access_token;
                state.id = action.payload.userId;
                state.username = action.payload.userName;
                saveToken(action.payload.access_token);
                toast.success(`Welcome, ${action.payload.userName}!`);
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message as string;
                toast.error(action.error.message as string);
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state) => {
                state.loading = false;
                toast.success(`Registered successfully!`);
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message as string;
                toast.error(action.error.message as string);
            });
    },
});

export {reducer, actions, name};