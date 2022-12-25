import {  useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Box, Grid } from '@mui/material';
import { useTheme } from '@mui/material';
import { ArrowBack } from "@mui/icons-material";
import { Link } from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
 
const Signup = () => {
 const navigate = useNavigate();
 const location = useLocation();
 const theme = useTheme();
 const [image, setImage] = useState(null);
 const [open, setOpen] = useState(false);
 
 const [form, setForm] = useState({
   name: "",
   username: "",
   email: "",
   password: ""
 });
 
 // As explained in the Login page.
 const onFormInputChange = (event) => {
   const { name, value } = event.target;
   setForm({ ...form, [name]: value });
 };
 
 
 const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

 

 const onSubmit = async () => {
    handleOpen();
   const { name, username, email, password } = form;
    try {
        await axios.post("http://localhost:27017/api/users/signup", {
            name,
            username,
            email,
            password
        })
        .then(async (res) => {
            console.log(res);

            let user = res.data;

            const formdata = new FormData();
            formdata.append("file", image);
            formdata.append("userId", user.userId);
            console.log(formdata.get("file"));

            await axios.post("http://localhost:27017/api/images/upload", formdata)
            .then(async (res) => {
                 console.log(res);
                 await axios.post("http://localhost:27017/api/images/getImageByUserId", {
                        userId: user.userId
                        })
                        .then((res) => {
                            console.log(res);
                           axios.post("http://localhost:27017/api/users/update", {
                                userId: user.userId,
                                url : res.data[0].url
                            })
                            .then((res) => {
                                console.log(res);
                                localStorage.setItem("user", JSON.stringify(res.data));
                                navigate("/", { replace: true });
                                window.location.reload();
                            })
                            .catch((err) => {
                                console.log(err);
                                alert("Signup Failed");
                                localStorage.removeItem("user");
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                            alert("Signup Failed");
                            localStorage.removeItem("user");
                        });
              })
        })
        .catch((err) => {
            console.log(err);
            alert("Signup Failed");
            localStorage.removeItem("user");
        });
    } catch (error) {
        console.log(error);
        alert("Signup Failed");
        localStorage.removeItem("user");
    }
    handleClose();

 };
 
 return (
    <>
       <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            }}
        >
    
    <form onSubmit={onSubmit}
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

        <Typography variant="h7" sx={{ textAlign: "center" }}>
            <b>SignUp to continue</b>
        </Typography>
        
                <TextField
                    name="name"
                    label="Name"
                    type="text"
                    placeholder="Name"
                    variant="outlined"
                    value={form.name}
                    onChange={onFormInputChange}
                    required
                />
                <TextField
                    label="Username"
                    type="text"
                    variant="outlined"
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={onFormInputChange}
                    required
                />
                <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={onFormInputChange}
                    style={{ marginBottom: "1rem" }}
                    required
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={onFormInputChange}
                    style={{ marginBottom: "1rem" }}
                    required
                />
                {/* profile image */}
                <Typography
                    display="inline"
                    fontSize="sm"
                    sx={{ alignSelf: 'center' }}
                >
                    Choose a profile image
                </Typography>
                <input
                    type="file"
                    name="image"
                    onChange={(e) => setImage(e.target.files[0])}
                    style={{ marginBottom: "1rem" }}
                />
            <Button
            sx={{ marginTop: 2 }}
            variant="contained"
            color="primary"
                
            onClick={onSubmit}>
                    Signup
            </Button>
            <Typography
                display="inline"
                fontSize="sm"
                sx={{ alignSelf: 'center' }}
            >
                Already have an account?
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
                    <Link href="/signin" underline="none"> Signin</Link>
            </Typography>
          </Typography>
        </form>
    </Box>
    </>
    );
}
 
export default Signup;