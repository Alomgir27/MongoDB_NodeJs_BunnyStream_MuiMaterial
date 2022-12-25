import  React,  { useEffect, useState } from 'react';
import {  useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTheme } from '@mui/material';
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Link } from "@mui/material";
import { Box, Grid } from '@mui/material';
import { ArrowBack } from "@mui/icons-material";



  

export default function Login() {


    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();

    const [form, setForm] = useState({
    email: "",
    password: ""
    });
    

    const onFormInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
    };
    
    
    
    const onSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = form;
        try {
            await axios.post("http://localhost:27017/api/users/signin", {
                    email,
                    password
            })
            .then((res) => {
                console.log(res);
                localStorage.setItem("user", JSON.stringify(res.data));
                navigate("/");
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
                localStorage.removeItem("user");
                alert("Login Failed");
            });
        } catch (error) {
            console.log(error);
            localStorage.removeItem("user");
        }

    };
  return (
    <>
      <Link href="/" underline="none"
          sx={{
              position: "absolute",
              top: "1rem",
              left: "1rem",
              color: theme.palette.mode === 'dark' ? theme.palette.grey[100] : theme.palette.grey[900],
              }}
          >
          <ArrowBack />
      </Link>

        <Box container spacing={2} 
        sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            }}
        >
        <from onSubmit={onSubmit}
        style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "100%",
            maxWidth: "400px",
            margin: "auto",
            padding: "1rem",
            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100],
            borderRadius: "0.5rem",
            boxShadow: "0 0 0.5rem 0.1rem rgba(0,0,0,0.1)",
            }}
        >
          <div>
            <Typography level="h4" component="h1">
              <b>Signin to your account</b>
            </Typography>
          </div>
          <TextField
            name="email"
            type="email"
            placeholder="email"
            label="Email"
            value={form.email}
            onInput={onFormInputChange}
          />
          <TextField
            name="password"
            type="password"
            placeholder="password"
            label="Password"
            value={form.password}
            onInput={onFormInputChange}
          />
          <Button 
           onClick={onSubmit}
            variant="contained"
            color="primary"
          >Log in</Button>

          <Typography
           fontSize="sm"
              sx={{ alignSelf: 'center' }}
            >
                <Link href="/forgot-password">Forgot password?</Link>
            </Typography>



          <Typography
            display="inline"
            fontSize="sm"
            sx={{ alignSelf: 'center' }}
          >
            Don&apos;t have an account?
            <Typography
                sx={{ 
                    color: theme.palette.mode === 'dark' ? theme.palette.grey[100] : theme.palette.grey[900],
                    textDecoration: 'none',
                    '&:hover': {
                        textDecoration: 'underline',
                        cursor: 'pointer',
                    },

                }}
                fontSize="sm"
                fontWeight="bold"
                display="inline"
            >
                <Link href="/signup">Sign up</Link>
            </Typography>
          </Typography>

        </from>
        </Box>
     </>
  );
}
