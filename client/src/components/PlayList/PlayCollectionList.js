import React , {useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material';
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, IconButton, Button } from '@mui/material';
import { PlayArrow, Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ListIcon from "@mui/icons-material/List";
import YouTubeCard from "../YouTubeCard/YouTubeCard";


import "../SearchPage/SearchPage.css";

    


const PlayListVideoCard = ({videos, playlists}) => {

    const theme = useTheme();
    

    return (
        <div>
          <div className="searchTiles">
            <div className="divider">
              <ListIcon
                sx={{
                  mb: 1,
                  "&:hover": {
                    cursor: "pointer",
                  },
                  color: theme.palette.mode === "dark" ? theme.palette.grey[100] : theme.palette.grey[900],
                }}
              />
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: "bolder",
                  ml: 1,
                  mt: 0.2,
                  "&:hover": {
                    cursor: "pointer",
                  },
                  color: theme.palette.mode === "dark" ? theme.palette.grey[100] : theme.palette.grey[900],
    
                }}
              >
                Videos
              </Typography>
            </div>
            {videos?.map((video, index) => (
              <Link to={`/video/${video?.videoId}`}
                key={index}
                style={{
                    textDecoration: "none",
                    color: theme.palette.mode === "dark" ? theme.palette.grey[100] : theme.palette.grey[900],
                  }}
              >
                <YouTubeCard
                  videoObj={video}
                  isSearch={true}
                />
            </Link>
               
            ))}
          </div>
          
        </div>
    )
}

export default function PlayCollectionList() {
    const [playlists, setPlaylists] = useState([]);
    const [videos, setVideos] = useState([]);
    const theme = useTheme();
    const { collectionId } = useParams();

   

    useEffect(() => {
        (async () => {
            await axios.post(`http://localhost:27017/api/playlists/getPlaylistDetails`, {
                collectionId: collectionId
            })
            .then((res) => {
                let { data } = res.data;
                data.previewVideoIds = data?.previewVideoIds.split(",");
                console.log(data);
                setPlaylists(data);
            })
            .catch((err) => {
                console.log(err);
            })
        })();
    }, [collectionId]);

    useEffect(() => {
        (async () => {
            playlists?.previewVideoIds?.forEach(async (videoId) => {
                await axios.post(`http://localhost:27017/api/videos/VideoByVideoId`, {
                    videoId: videoId
                })
                .then((res) => {
                    let { video } = res?.data;
                    console.log(video);
                    if(video){
                       setVideos((prev) => [...prev, video]);
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
            })
        })();
    }, [playlists]);

    return (
        <div style={{padding: "20px"}}>
            <Grid container spacing={2}>
               <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <PlayListVideoCard videos={videos}  />
                </Grid>
            </Grid>
        </div>
    )
}
