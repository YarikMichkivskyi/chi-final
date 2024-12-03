import React, {useEffect} from 'react';
import { TextField, Button, Typography, Box, Link } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { userActions } from "../store/actions";
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from '../common/types/types';

const LoginPage = () => {
    const nav = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { error, token } = useSelector((state:RootState) => ({
        error: state.userData.error,
        token: state.userData.token
    }));

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username is required'),
            password: Yup.string().required('Password is required'),
        }),
        onSubmit: (values) => {
            dispatch(userActions.login(values));
        },
    });

    useEffect(() => {
        if (token) {
            nav('/home');
        }
    }, [token, nav]);

    return (
        <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto', px: 3, py: 4, borderRadius: 2, boxShadow: 3, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>Login</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    label="Username"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    type="password"
                    label="Password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    fullWidth
                    margin="normal"
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
            </form>
            <Box mt={2}>
                <Link href="/register" variant="body2">Don't have an account? Register</Link>
                <br />
                <Link href="/" variant="body2">Back to Homepage</Link>
            </Box>
        </Box>
    );
};

export default LoginPage;