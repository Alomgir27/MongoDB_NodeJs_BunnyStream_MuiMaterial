import { useCallback, useEffect, useState } from "react";
import FileUploader from "./FileUploader";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import axios from "axios";
import Modal from '@mui/material/Modal';

import { TextField } from "@mui/material";
import { Link } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Chip } from "@mui/material";
import { MuiChipsInput } from 'mui-chips-input'
import { TextareaAutosize } from "@mui/material";
import SelectInput from "./SelectInput";
import { useParams } from "react-router-dom";

 

export default function App() {

  const [user, setUser] = useState(null);
  const [state, setState] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const params = useParams();

  const [open2, setOpen2] = useState(false);

  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const [chips, setChips] = useState([]);
  const [collectionId, setCollectionId] = useState("");


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);


  const handleChange = (newChips) => {
    setChips(newChips)
  }

  const [formdata, setFormdata] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (!params.id) return;
    setCollectionId(params.id);
  }, [params.id]);



 


  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

    const uploadVideoFile = async () => {
        if(!state) return;
        handleClose2();
        handleOpen();

        const { title, description } = formdata;


     

        const formData = new FormData();
        formData.append("file", state[0]);
        
        formData.append("title", title);
        formData.append("description", description);
        formData.append("writer", user?.userId);
        formData.append("tags", chips);
        formData.append("collectionId", collectionId);


        try {
            await axios.post("http://localhost:27017/api/videos/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                console.log(res);
                handleClose();
                setState(null);
                setFormdata({
                    title: "",
                    description: "",
                });
                setChips([]);
                console.log(res.data);
                navigate(`/about/${user?.userId}&1`);
            })
            .catch((err) => {
                console.log(err);
                handleClose();
                window.location.reload();
            });
        } catch (error) {
            console.log(error);
            handleClose();
            window.location.reload();
        }
    };

  return (
    <div>
       
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "100vh"
        }}
      >
        <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',

         }}>
          <Typography 
            sx={{
                color: theme.palette.mode === 'dark' ? theme.palette.grey[100] : theme.palette.grey[900],
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                fontWeight: 'semibold',
                fontSize: '1.5rem',
                width: '100%',
                }}
            variant="h4">Upload Media Files</Typography>

          <FileUploader  
            onUpload={(files) => {
                setState(files);
                console.log(files[0].name.split(".")[0]);
                setFormdata({
                    title: files[0].name.split(".")[0],
                    description: "",
                });
            }}
            onConfirm={handleOpen2}
            allowedExtensions={{
                "video/*": [".mp4", ".mov", ".avi", ".wmv", ".flv", ".mkv", ".webm"],
            }}
          />
        </Box>
      </Box>

          
            <Modal
              open={open2}
              onClose={handleClose2}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              {/* create form for take input title , describtion about video  */}
              <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 600,
                bgcolor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100],
                boxShadow: 24,
                p: 4,
                borderRadius: '1rem',
                color: theme.palette.mode === 'dark' ? theme.palette.grey[100] : theme.palette.grey[900],
              }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  video details
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <form onSubmit={uploadVideoFile}>
                    <TextField
                      id="outlined-basic"
                      label="Title"
                      variant="outlined"
                      sx={{ width: "100%", mt: 2 }}
                      onChange={(e) => {
                        setFormdata({ ...formdata, title: e.target.value });
                      }}
                      value={formdata.title}
                      required
                    />
                    <TextField
                      id="outlined-basic"
                      label="Description"
                      variant="outlined"
                      sx={{ width: "100%", mt: 2 }}
                      onChange={(e) => {
                        setFormdata({ ...formdata, description: e.target.value });
                      }}
                      value={formdata.description}
                      required
                    />
                    
                    <MuiChipsInput
                      label="Tags"
                      value={chips}
                      onChange={handleChange}
                      sx={{ width: "100%", mt: 2 }}
                    />
                  
                    <Typography sx={{ 
                      mt: 2,
                      display: 'flex',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      flexDirection: 'row',

                      }}>
                        <Button
                          onClick={handleClose2}
                          variant="contained"
                          sx={{ mt: 2, mr: 2 }}
                          color="error"
                        >
                          Close
                        </Button>
                        <Button
                          variant="contained"
                          sx={{ mt: 2 }}
                          color="success"
                          type="submit"
                        >
                          Upload
                        </Button>
                    </Typography>

                  </form>
                </Typography>
              </Box>
            </Modal>
    </div>
  );
}
