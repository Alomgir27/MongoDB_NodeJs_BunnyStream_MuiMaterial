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
import YouTubeVids from "../YouTubeVids/YouTubeVids";

import "../../App.css";


export default function MyVideos(props){
    const { userId } = props;
    
    const [videos, setVideos] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        if(!userId) return;
        (async () => {
            setLoading(true);
            const { data } = await axios.post("http://localhost:27017/api/videos/getVideosByUserId", {
                userId: userId,
                page: page,
            });
            setVideos(prev => [...prev, ...data.videos]);
            setLoading(false);
        })()
    }, [userId, page])

  

    if(!userId) return null;

    if(loading) return (
        <div>
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
                Loading...
            </Typography>
        </div>
    )
    


    return (
        <>
        <div>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: theme.palette.mode === 'dark' ? theme.palette.grey[100] : theme.palette.grey[900],
            margin: 'auto',
        }}>
            <Typography variant="h7"
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: theme.palette.mode === 'dark' ? theme.palette.grey[100] : theme.palette.grey[900],
                    fontWeight: 'light',
                    gap: '1rem',
                    padding: '1rem',
                    
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
    
         <div className="formatting">
           <YouTubeVids videos={videos} />
        </div>
     
        {videos.length > 0 && videos.length % 100 === 0 && <ButtonBase sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            margin: 'auto',
        }}
        onClick={() => setPage(prev => prev + 1)}
        >
            <Typography variant="h7">
                Load More
            </Typography>
        </ButtonBase>
        }
    </>
    )
}
           