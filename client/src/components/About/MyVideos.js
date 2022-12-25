/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useCallback, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, ButtonBase, Typography } from '@mui/material';
import { useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { ArrowBack, FileUpload } from '@mui/icons-material';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Avatar } from '@mui/material';




export default function MyVideos(){
    const theme = useTheme();
    const [user, setUser] = useState(null);

    const [videos, setVideos] = useState(null);
    

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        setUser(user);
    }, [])

    const navigate = useNavigate();

    


    return (
        <div>
        <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            width: '100vw', 
            backgroundColor: theme.palette.background.default }}>
           <img src={require('../../assets/wallpaper.jpg')} 
            style={{
                width: '100%', 
                height: '20rem',
                objectFit: 'cover',
            }} 
           />
            <Typography variant="div" sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'start',
                justifyContent: 'start',
                width: '100%',
                backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100],
                color: theme.palette.mode === 'dark' ? theme.palette.grey[100] : theme.palette.grey[900],
                padding: '1rem',
                gap: '1rem',
                top: '20rem',
                left: '0',
            }}>
                <Avatar sx={{ width: '5rem', height: '5rem' }} alt={user?.name} src={user?.url} />
                <Typography variant="div" sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                    justifyContent: 'start',
                    width: '100%',
                    height: '100%',
                    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100],
                    color: theme.palette.mode === 'dark' ? theme.palette.grey[100] : theme.palette.grey[900],
                    padding: '1rem',
                    gap: '1rem',
                }}>
                    <Typography variant="h7" >
                        {user?.name}
                    </Typography>
                    <Typography variant="h7">
                        {user?.username}
                    </Typography>
                </Typography>
                
            </Typography>

        {/* Create contain where have three button about, me media and collection and under have route  go there*/}
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'start',
            width: '100%',
            height: '100%',
            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100],
            padding: '1rem',
            gap: '1rem',
            color: theme.palette.mode === 'dark' ? theme.palette.grey[100] : theme.palette.grey[900],
            
        }}>
        
            <Link to="/about" style={{ textDecoration: 'none' }}>
                About
            </Link>
            <Link to="/about/myMedia" style={{ textDecoration: 'none' }}>
                My Media
            </Link>
            <Link to="/about/myCollections" style={{ textDecoration: 'none' }}>
                My Collections
            </Link>
        </Box>
        </Box>

        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100],
            padding: '1rem',
            gap: '1rem',
            color: theme.palette.mode === 'dark' ? theme.palette.grey[100] : theme.palette.grey[900],
        }}>
            <Typography variant="h7"
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100],
                    color: theme.palette.mode === 'dark' ? theme.palette.grey[100] : theme.palette.grey[900],
                    padding: '1rem',
                    gap: '1rem',
                    fontWeight: 'light',
                }}

            >
                Start uploading your videos to get more views and likes
            </Typography>
           
            <ButtonBase sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '12rem',
                backgroundColor: 'green',
                padding: '1rem',
                gap: '1rem',
                color: theme.palette.mode === 'dark' ? theme.palette.grey[100] : theme.palette.grey[900],
            }}
            onClick={() => navigate('/upload')}
            >
                <FileUpload />
                <Typography variant="h7">
                    Upload Media
                </Typography>
            </ButtonBase>
        </div>
            
     
          
    </div>
    )
}
           