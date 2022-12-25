/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useCallback, useState } from 'react';
import { StyledEngineProvider, ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './components/Main/Index';
import PrimarySearchAppBar  from './components/PrimarySearchAppBar/PrimarySearchAppBar';
import axios from 'axios';

import Index from './components/Main/Index';


export default function Home() {
    const [theme, setTheme] = useState('light');
    const [mounted, setMounted] = useState(false);



    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const localTheme = localStorage.getItem('theme');
        if(localTheme){
            setTheme(localTheme);
        }
        else {
            localStorage.setItem('theme', 'light');
        }
    }, []);

    const toggleTheme = () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', nextTheme);
        setTheme(nextTheme);
    };

    const themeConfig = useCallback(
        (theme) => ({
            palette: {
                mode: theme,
            },
        }),
        [],
    );



    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={createTheme(themeConfig(theme))}>
             <CssBaseline />
                <Index toggleTheme={toggleTheme} />
            </ThemeProvider>
          </StyledEngineProvider> 
    );
}


