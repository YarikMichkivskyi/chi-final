import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { userActions } from '../store/actions';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../common/types/types";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const username = useSelector((state:RootState) => state.userData.username);


    const handleLogout = () => {
        dispatch(userActions.logout());
        navigate('/login');
    };

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>Exhibit App</Typography>

                {username!==null ? (
                    <>
                        <Box display="flex" alignItems="center" ml={3}>
                            <Button
                                color="inherit"
                                onClick={() => navigate('/home')}
                                sx={{ mr: 1 }}
                            >
                                Home
                            </Button>
                            <Button
                                color="inherit"
                                onClick={() => navigate('/')}
                                sx={{ mr: 1 }}
                            >
                                Stripe
                            </Button>
                            <Button
                                color="inherit"
                                onClick={() => navigate('/new-post')}
                                sx={{ mr: 1 }}
                            >
                                New Post
                            </Button>
                        </Box>

                        <Box ml="auto" display="flex" alignItems="center">
                            <Typography variant="body1" sx={{ mr: 2 }}>{username}</Typography>
                            <Button color="inherit" onClick={handleLogout}>Logout</Button>
                        </Box>
                    </>
                ) : (
                    <Box ml="auto">
                        <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;