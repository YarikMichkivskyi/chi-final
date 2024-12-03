import React from 'react';
import { TextField, Button, Typography, Box, Link } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { userActions } from "../store/actions";
import { toast } from 'react-toastify';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../common/types/app/app-dispatch.type";

const RegisterPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const nav = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().min(4, 'Username must be at least 4 characters').required('Username is required'),
            password: Yup.string().min(4, 'Password must be at least 4 characters').required('Password is required'),
        }),
        onSubmit: async (values) => {
            try {
                await dispatch(userActions.register(values)).unwrap();
                toast.success("Registered successfully!");
                nav('/login');
            } catch (err) {}
        },
    });

    return (
        <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto', px: 3, py: 4, borderRadius: 2, boxShadow: 3, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>Register</Typography>
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
                    label="Password"
                    type="password"
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
                <Button type="submit" variant="contained" color="primary" fullWidth>Register</Button>
            </form>
            <Box mt={2}>
                <Link href="/login" variant="body2">Already have an account? Login</Link>
                <br />
                <Link href="/" variant="body2">Back to Homepage</Link>
            </Box>
        </Box>
    );
};

export default RegisterPage;