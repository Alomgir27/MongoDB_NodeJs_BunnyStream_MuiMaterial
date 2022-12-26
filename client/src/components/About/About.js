/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useCallback, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Avatar } from '@mui/material';
import { Tab } from "@mui/material";
import { Tabs}  from "@mui/material";
import Playlists from '../PlayList/PlayList';
import MyVideos from './MyVideos';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useParams } from 'react-router-dom';





export default function About(){
    const theme = useTheme();
    const [user, setUser] = useState(null);
    const [value, setValue] = useState("1");
    const [userId, setUserId] = useState(null);
    
    const params = useParams();


    useEffect(() => {
        if(!params.text) return;
        let text = params.text;
        text = text.split("&");
        setUserId(text[0]);
        setValue(text[1]);
    }, [params.text])
        

    useEffect(() => {
       if(!userId) return;
       (async () => {
              const { data } = await axios.post("http://localhost:27017/api/users/getUserById", {
                    userId: userId,
                });
                setUser(data);
         })()
    }, [userId])


   
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const About = useCallback(() => {
        return (
            <Typography variant="div" sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100],
                color: theme.palette.mode === 'dark' ? theme.palette.grey[100] : theme.palette.grey[900],
                padding: '1rem',
                gap: '1rem',
            }}>
                <Typography variant="h7" >
                    About
                </Typography>
                <Typography variant="h7">
                    {user?.name}
                </Typography>
                <Typography variant="h7">
                    {user?.username}
                </Typography>
                
            </Typography>
        )
    }, [user]);

    return (
        <>
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
        </Box>

            <TabContext value={value} onChange={handleChange}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                        <Tab label="About" value="1" />
                        <Tab label="My Videos" value="2" />
                        <Tab label="My Playlists" value="3" />
                    </TabList>
                 </Box>
                <TabPanel value="1">
                    <About />
                </TabPanel>
                <TabPanel value="2">
                    <MyVideos userId={userId} />
                </TabPanel>
                <TabPanel value="3">
                    <Playlists userId={userId}/>
                </TabPanel>
            </TabContext>
        </>

    )
}
           