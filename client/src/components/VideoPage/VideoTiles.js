import React, { useEffect, useState, useRef } from "react";
import Typography from "@mui/material/Typography";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import PlaylistPlayOutlinedIcon from "@mui/icons-material/PlaylistPlayOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { Link } from "react-router-dom";
import axios from "axios";
import { FormControlLabel, useTheme , Switch , FormLabel, FormGroup, FormControl, FormHelperText } from "@mui/material";
import "./VideoTiles.css";
import moment from "moment";




const VideoCard = (props) => {
  const { video, thisVideoUser} = props;
  const divRef = useRef(null);
  console.log(video, thisVideoUser);

  const [isHovered, setIsHovered] = useState(false);

  const [videoObj, setVideoObj] = useState(null);

  const theme = useTheme();


  useEffect(() => {
    (async () => {
      await axios.post("http://localhost:27017/api/videos/getVideoByVideoId", {
        videoId: video?.videoId,
    })
    .then((res) => {
      setVideoObj(res?.data?.video);
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  })();
  }, []);

  useEffect(() => {
    if(divRef.current) {
      divRef.current.addEventListener("mouseover", () => {
        setIsHovered(true);
      });
      divRef.current.addEventListener("mouseleave", () => {
        setIsHovered(false);
      });
    }
  }, [divRef]);

  return (
    <div
    className="sideContainer"
    onClick={() => {
      window.scrollTo(0, 0);
    }}
    ref={divRef}
  >
    <div className="sideImage" >
      
       <img srcSet={isHovered ? `https://vz-90b101f9-6fa.b-cdn.net/${videoObj?.guid}/preview.webp` : `https://vz-90b101f9-6fa.b-cdn.net/${videoObj?.guid}/${videoObj?.thumbnailFileName}`} alt="" />
    </div>

    <div className="videoInfo">
      <Typography
        variant="subtitle2"
        sx={{ fontWeight: "bolder" }}
        className="vidTitle"
      >
        {video?.title?.length > 27 ? video?.title.substring(0, 27) + "..." : video?.title}
      </Typography>
      <Typography
        variant="subtitle2"
        sx={{ color: "#AAAAAA", mb: "20px" }}
      >
        {thisVideoUser?.name}
      </Typography>
      
      <Typography
        varaiant="subtitle2"
        sx={{ fontSize: "80%", color: "#AAAAAA", mb: "15px" }}
      >
        {`${videoObj?.views} views` + " • " + `${moment(videoObj?.dateUploaded).fromNow()}`}
      </Typography>

      <div className="vidIcons">
        <div className="clockwork">
          <div className="icon">
            <WatchLaterOutlinedIcon />
          </div>
        </div>

        <div className="clockwork">
          <div className="icon">
            <PlaylistPlayOutlinedIcon />
          </div>
        </div>

        <div className="dots">
          <MoreVertOutlinedIcon sx={{ mt: 11, ml: 23 }} />
        </div>
      </div>
    </div>
  </div>
  );
};



const VideoTiles = ({ guid,  videos, loadMore, totalItems, autoplay, setAutoplay, thisVideoUser }) => {

 
  const theme = useTheme();
  const divRef = useRef(null);

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if(divRef.current) {
      divRef.current.addEventListener("mouseover", () => {
        setIsHovered(true);
      });
      divRef.current.addEventListener("mouseleave", () => {
        setIsHovered(false);
      });
    }
  }, [divRef]);



  return (
    <div>
      
     <Typography sx={{ 
          display: "flex",
          flexDirection: "row",
          color: theme.palette.mode === "dark" ? theme.palette.grey[100] : theme.palette.grey[900],
          marginLeft: "2rem",
          fontWeight: "lighter",
          fontSize: "1.2rem",
          
        }}>
        <h2 style={{
          display: "flex",
          flexDirection: "row",
          color: theme.palette.mode === "dark" ? theme.palette.grey[100] : theme.palette.grey[900],
          fontWeight: "lighter",
          fontSize: "1.2rem",
          marginTop: "0.5rem",
        }}>

            Recommended {totalItems - 1 > 0 ? `(${totalItems - 1})` : "" }
        </h2>
        <div style={{
          display: "flex",
          flexDirection: "row",
          color: theme.palette.mode === "dark" ? theme.palette.grey[100] : theme.palette.grey[900],
          fontWeight: "lighter",
          fontSize: "1.2rem",
          marginLeft: "2.5rem",
          marginTop: "0.3rem",
        }}>
          <FormGroup sx={{
            color: theme.palette.mode === "dark" ? theme.palette.grey[100] : theme.palette.grey[900],
          }}>
            <FormControlLabel
              control={<Switch checked={autoplay}  onChange={() =>  {
                  localStorage.setItem("autoplay", autoplay ? "false" : "true");
                  setAutoplay(!autoplay)}
                }
              />}
              label="Autoplay"
             
            />
          </FormGroup>
          </div>
         
              
      </Typography>
          
          
      {videos?.filter((video) => video?.videoId !== guid).map((video) => (
        <Link to={`/video/${video?.videoId}`} 
        style={{ 
          textDecoration: "none",
          color: theme.palette.mode === "dark" ? theme.palette.grey[100] : theme.palette.grey[900],

        }}
          key={video?.videoId}
        >
          <VideoCard video={video} thisVideoUser={thisVideoUser}/>
        </Link>
      ))}
      {videos?.length === totalItems ? null :
      <div onClick={loadMore}
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "start",
          cursor: "pointer",
          color: theme.palette.primary.main,
          fontSize: "12px",
          fontWeight: "lighter",
          marginTop: "20px",
          marginLeft: "25px",
        }}
      >
        Load More
      </div>
      }
    </div>
    
  );
};

export default VideoTiles;
