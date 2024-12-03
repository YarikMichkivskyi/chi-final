import React from 'react';
import {Routes, Route} from 'react-router-dom';
import LoginPage from "./layouts/Login.page";
import RegisterPage from "./layouts/Register.page";
import NewPost from "./layouts/NewPost.page";
import ProtectedRoute from "./components/ProtectedRoute";
import StripePage from "./layouts/Stripe.page";
import HomePage from "./layouts/Home.page";
import {Box, CssBaseline} from "@mui/material";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RootState } from './common/types/types';
import {useSelector} from "react-redux";

export default function App() {
    const userId = useSelector((state:RootState) => state.userData.id);

    return (
        <>
            <CssBaseline/>
            <Box sx={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Routes>
                    <Route path="/" element={<StripePage/>} />
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/home" element={<ProtectedRoute isAllowed={Boolean(userId)}><HomePage/></ProtectedRoute>}/>
                    <Route path="/new-post" element={<ProtectedRoute isAllowed={Boolean(userId)}><NewPost /></ProtectedRoute>} />
                </Routes>
            </Box>
            <ToastContainer />
        </>
    );
};