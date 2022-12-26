import React, { useEffect, useState , useRef} from "react";
import axios from "axios";
import { useTheme } from "@mui/material";
import { Button } from "@mui/material";
import PlaylistPlayOutlined from "@mui/icons-material/PlaylistPlayOutlined";
import PlaylistAddCheckOutlined from "@mui/icons-material/PlaylistAddCheckOutlined";
import { Tab } from "@mui/material";
import { Tabs}  from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { Paper } from "@mui/material";
import { Divider } from "@mui/material";
import { Avatar } from "@mui/material";
import { TextField } from "@mui/material";
import { IconButton } from "@mui/material";
import { Tooltip } from "@mui/material";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { AddCircleOutline, PlayArrow } from "@mui/icons-material";
import { RemoveCircleOutline } from "@mui/icons-material";
import { CardActions } from "@mui/material";
import { CardContent } from "@mui/material";
import { Card } from "@mui/material";
import { CardHeader } from "@mui/material";
import { CardMedia } from "@mui/material";
import { CardActionArea } from "@mui/material";
import moment from "moment";
import { Modal } from "@mui/material";
import { Backdrop } from "@mui/material";
import { Fade } from "@mui/material";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Input } from "@mui/material";


    
const PlayListCard = ({playlist, handleAddToPlaylist, handlePlaylistClick, handleRemoveFromPlaylist, userId }) => {

    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef(null);


    useEffect(() => {
        if(cardRef.current){
            cardRef.current.addEventListener("mouseover", () => {
                setIsHovered(true);
            });
            cardRef.current.addEventListener("mouseout", () => {
                setIsHovered(false);
            });
        }
    }, [cardRef]);

   



 return (
    <Grid item xs={12} sm={12} md={6} lg={4} xl={3}  ref={cardRef}>
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea onClick={() => handlePlaylistClick(playlist?.guid)}>
            {isHovered && (
            <p style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                width: "100%",
                position: "absolute",
                justifyItems: "center",
                color: "white",
                fontSize: "15px",
                fontWeight: "bold",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                    transition: "all 0.3s ease-in-out",
                    display: "flex",
                },
            }}> <PlayArrow /> Play All</p>
            )}

            <div style={{
                    position: "absolute",
                    right: "0",
                    width: "50%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)", 
                    color: "white", 
                    padding: "10px",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.75)",
                        transition: "all 0.3s ease-in-out",

                    },
                    display: "flex",
                    flexDirection: "column",
                    }}
                >
                    <PlaylistPlayOutlined sx={{fontSize: "30px"}} />
                    <Typography variant="body2" color="text.secondary">
                        {playlist?.videoCount} Videos
                    </Typography>
                </div>
                <CardMedia
                    component="img"
                    height="140"
                    image={isHovered ? `https://vz-90b101f9-6fa.b-cdn.net/${playlist?.video?.guid}/preview.webp` : `https://vz-90b101f9-6fa.b-cdn.net/${playlist?.video?.guid}/${playlist?.video?.thumbnailFileName}`}
                    alt="green iguana"
                    style={{objectFit: "cover"}}
                    sx={{
                        height: "200px",
                        objectFit: "cover",
                        "@media (max-width: 600px)": {
                            height: "100px",
                        },
                        "&:hover": {
                            opacity: 0.75,
                        },
                    
                    }}
                   
                />
        
                <CardContent>
                    <Typography gutterBottom variant="h7" component="div" style={{fontWeight: "lighter"}}>
                        {playlist?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {playlist?.description || "No Description"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {moment(playlist?.createdAt).fromNow()}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={() => handlePlaylistClick(playlist?.guid)}>
                    View
                </Button>
                {userId === JSON.parse(localStorage.getItem("user"))?.userId && (
                    <>
                <Button size="small" color="primary" onClick={() => handleAddToPlaylist(playlist?.guid)}>
                    Add
                </Button>
                <Button size="small" color="primary" onClick={() => handleRemoveFromPlaylist(playlist?.guid)}>
                    Remove
                </Button>
                </>
                )}
            </CardActions>
        </Card>
       </Grid>
      )
}




function Playlists(props){
    const { userId } = props;

    const [playlists, setPlaylists] = useState([]);
    const [mounted, setMounted] = useState(false);
    const [playlistObj, setPlaylistObj] = useState(null);
    const [value, setValue] = useState(0);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formdata, setFormdata] = useState({
        playlistName: "",
        playlistDescription: ""
    });
    const [open, setOpen] = useState(false);
    const [collectionId, setCollectionId] = useState(null);
    const theme = useTheme();
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const navigate = useNavigate();

    useEffect(() => {
        setMounted(true);
        if(!mounted){
            return;
        }
    }, []);

    useEffect(() => {
        if(!mounted){
            return;
        }
        (async () => {
            await axios.post("http://localhost:27017/api/playlists/getPlaylists", {
                userId: userId
            })
            .then((res) => {
                console.log(res.data);
                setPlaylistObj(res.data.playlists);
            })
            .catch((err) => {
                console.log(err);
            })
        })();
    }, [mounted, userId]);

    useEffect(() => {
        if(!mounted){
            return;
        }
        (async () => {
            playlistObj && playlistObj.map((playlist) => {
                axios.post("http://localhost:27017/api/playlists/getPlaylistDetails", {
                    collectionId: playlist.collectionId
                })
                .then(async (res) => {
                    console.log(res.data);
                    let {  data } = res.data;
                    if(data?.previewVideoIds){
                        data.previewVideoIds = data.previewVideoIds.split(",");
                        await axios.post("http://localhost:27017/api/videos/getVideoByVideoId", {
                            videoId: data.previewVideoIds[0]
                        })
                        .then((res) => {
                            console.log(res.data);
                            data.video = res.data.video;
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                    }
                    data.description = playlist?.description;
                    data.createdAt = playlist?.createdAt;
                    setPlaylists((prev) => [...prev, data]);
                })
                .catch((err) => {
                    console.log(err);
                })
            })
        })();
    }, [playlistObj, mounted]);

   



    const handleChangeFormdata = (e) => {
       const { name, value } = e.target;
       console.log(name, value);
         setFormdata({
            ...formdata,
            [name]: value
        });
    };



    const handleChange = (event, newValue) => {
        setValue(newValue);
    };



    const handleAddToPlaylist = (collectionId) => {
       navigate(`/upload/${collectionId}`);
    };

    const handleRemoveFromPlaylist = (collectionId) => {
         setCollectionId(collectionId);
         handleOpen();
    };

    const handleDeletePlaylist = () => {
        (async () => {
            await axios.post("http://localhost:27017/api/playlists/deletePlaylist", {
                collectionId: collectionId
            })
            .then((res) => {
                console.log(res.data);
                handleClose();
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            })
        })();
    };

    const handlePlaylistClick = (collectionId) => {
        navigate(`/playlist/${collectionId}`);

    };

    const handleCreatePlaylist = () => {
        if(formdata.playlistName === ""){
            alert("Playlist name cannot be empty");
            return;
        }
        (async () => {
            await axios.post("http://localhost:27017/api/playlists/createPlaylist", {
                playlistName: formdata.playlistName,
                playlistDescription: formdata.playlistDescription,
                userId : JSON.parse(localStorage.getItem("user"))?.userId
            })
            .then((res) => {
                console.log(res.data);
                setFormdata({
                    playlistName: "",
                    playlistDescription: ""
                });
                setValue(0);
                // alert("Playlist created successfully");
            })
            .catch((err) => {
                console.log(err);
            })
        })();
    };



   
    return (
        <div>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
                sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    paddingTop: "4rem",
                    width: "100%",
                }}

            >
                <Tab label="Playlists" />
                {JSON.parse(localStorage.getItem("user"))?.userId === userId && (
                <Tab label="Create Playlist" />
                )}
            </Tabs>
            <Divider />
            <Box sx={{ p: 3 }}>
                {value === 0 && (
                    <div>
                        <Grid container spacing={2}>
                            {playlists?.map((playlist, index) => (
                              <PlayListCard playlist={playlist} handlePlaylistClick={handlePlaylistClick} handleAddToPlaylist={handleAddToPlaylist} handleRemoveFromPlaylist={handleRemoveFromPlaylist} userId={userId } key={index}/>
                            ))}
                        </Grid>
                    </div>
                )}
             
                                       
                {value === 1 && (
                    <div 
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        margin: 'auto',
                        width: "620px",
                    }}
                    >
                        
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Paper elevation={3} sx={{ p: 2 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Typography variant="h6" sx={{ fontWeight: "bold", color: theme.palette.mode === "dark" ? "white" : "black" }}>
                                                Create Playlist
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <TextField
                                                id="outlined-basic"
                                                label="Playlist Name"
                                                variant="outlined"
                                                fullWidth
                                                sx={{ mb: 2 }}
                                                value={formdata.playlistName}
                                                onChange={handleChangeFormdata}
                                                name="playlistName"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <TextField
                                                id="outlined-basic"
                                                label="Playlist Description"
                                                variant="outlined"
                                                fullWidth
                                                sx={{ mb: 2 }}
                                                value={formdata.playlistDescription}
                                                onChange={handleChangeFormdata}
                                                name="playlistDescription"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                            <Button variant="contained" color="primary"
                                                onClick={handleCreatePlaylist}
                                            >  
                                                Create Playlist
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                )}
            </Box>

             <Modal 
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    border: "2px solid #000",
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2"
                        sx={{ fontWeight: "bold", color: theme.palette.mode === "dark" ? "white" : "black" }}
                    >
                        Are you sure you want to delete this playlist?
                    </Typography>
                    <Typography id="modal-modal-description" 
                        sx={{ color: theme.palette.mode === "dark" ? "white" : "black" }}
                    >
                        This action cannot be undone.
                    </Typography>
                    <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleDeletePlaylist}>
                        Delete
                    </Button>
                </Box> 
            </Modal>
                
        </div>
    );
};

export default Playlists;