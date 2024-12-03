import {axiosInstance} from '../axiosInstance';

const loginUser = async (credentials: { username: string; password: string }) => {
    return axiosInstance.post('/api/auth/login', credentials);
};

const registerUser = async (userData: { username: string; password: string }) => {
    return axiosInstance.post('/users/register', userData);
};

const getUserByToken = async () => {
    return  axiosInstance.get('/users/my-profile');
};

export default {loginUser, registerUser, getUserByToken}