import React, { useEffect, useState, useRef } from "react";
import Typography from "@mui/material/Typography";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import PlaylistPlayOutlinedIcon from "@mui/icons-material/PlaylistPlayOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { useMediaQuery } from "react-responsive";
import moment from "moment";
import axios from "axios";
import { useTheme } from "@mui/material";

import "./YouTubeCard.css";

const YouTubeCard = (props) => {
  const { videoObj, isSearch } = props;

  const [video, setVideo] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const divRef = useRef(null);
  const theme = useTheme();
  const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    if(!mounted) {
      return;
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    (async () => {
      await axios.post("http://localhost:27017/api/videos/getVideoByVideoId", {
        videoId: videoObj?.videoId,
        apiKey: videoObj?.apiKey,
        libraryId: videoObj?.libraryId,
      })
      .then((res) => {
        setVideo(res?.data?.video);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
    })();
    setLoading(false);
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

  useEffect(() => {
    setLoading(true);
    axios.post("http://localhost:27017/api/users/getUserById", {
      userId: videoObj?.userId
    })
    .then((res) => {
      setUser(res?.data);
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
    console.log(videoObj);
    setLoading(false);
  }, []);





  const getTimeStamp = () => {
    let lengthInSec = video?.length ? video?.length : 0;
    let hours = Math.floor(lengthInSec / 3600);
    let minutes = Math.floor((lengthInSec - hours * 3600) / 60);
    let seconds = lengthInSec - hours * 3600 - minutes * 60;
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
   if(hours === "00") {
     return `${minutes}:${seconds}`;
   }
    return `${hours}:${minutes}:${seconds}`;
  };
   

  const getViewsLength = () => {
    if (video?.views > 1000000) {
      return `${(video?.views / 1000000).toFixed(1)}M`;
    } else if (video?.views > 1000) {
      return `${(video?.views / 1000).toFixed(1)}K`;
    } else {
      return video?.views;
    }
  };


  const getClickedVid = () => {
    window.scrollTo(0, 0);
  };

  if(loading) {
    return (
      <div className="youtubeCard">
        <div className="thumbnail">
          <div className="timeStamp">
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: "bolder",
                fontSize: "12px",
                color: theme.palette.mode === "dark" ? "#fff" : "#000",
                backgroundColor: theme.palette.mode === "dark" ? "#000" : "#fff",
                padding: "2px 5px",
              }}
            >
              00:00
            </Typography>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="youtubeCard" onClick={getClickedVid} ref={divRef}>
      <div className="thumbnail">
        <div className="timeStamp">
          <Typography
            variant="subtitle2"
            sx={{ 
              fontWeight: "bolder", 
              fontSize: "12px",
              color: theme.palette.mode === "dark" ? "#fff" : "#000",
              padding: "2px 5px",
              fontWeight: "light",
              
            }}
          >
            {getTimeStamp()}
          </Typography>
        </div>

        <img srcSet={ isHovered ?  `https://vz-90b101f9-6fa.b-cdn.net/${video?.guid}/preview.webp` : `https://vz-90b101f9-6fa.b-cdn.net/${video?.guid}/${video?.thumbnailFileName}`} alt="" />
      </div>

      {!isSearch ? (
        <div className="videoDetails">
          <div className="channelPic">
            <img srcSet={user?.url} alt="" />
          </div>
          <div className="channelInfo">
            <Typography
              variant="subtitle2"
              sx={{ mt: "10px", width: "200px", fontWeight: "light", color: theme.palette.mode === "dark" ? "#fff" : "#000", }}
            >
             {video?.title?.length > 27 ? `${video?.title?.substring(0, 27)}...` : video?.title}
            </Typography>

            <Typography
              variant="subtitle2"
              sx={{ 
                mt: "10px", 
                color: theme.palette.mode === "dark" ? "#848584" : "#8c8c8c",
              }}
            >
              {videoObj?.name}
            </Typography>

            <Typography variant="subtitle2" sx={{ 
              mt: "10px",
              width: "200px",
              display: 'flex',
              justifyContent: 'flex-start', 
              alignItems: 'center',
              fontWeight: 'light',
              fontSize: '14px',
              color: theme.palette.mode === "dark" ? "#848584" : "#8c8c8c",
              }}>
              {`${getViewsLength()} views ·  ${moment(video?.dateUploaded).fromNow()}`}
            </Typography>
          </div>
        </div>
      ) : (
        <div className="searchVidDetails">
          <Typography
            variant="h6"
            sx={{
              mt: "10px",
              width: "400px",
              fontWeight: "100",
              fontSize: "16px",
              color: theme.palette.mode === "dark" ? "#fff" : "#000",
            }}
            className="searchVidTitle"
          >
           {video?.title?.length > 27 ? `${video?.title?.substring(0, 27)}...` : video?.title}
          </Typography>
          <Typography variant="subtitle2" sx={{ color: "#848584" }}>
            {`${getViewsLength()} views ·  ${moment(video?.dateUploaded).fromNow()}`}
          </Typography>
          <div className="channelInfo">
            <div className="channelPic">
              <img srcSet={user?.url} alt="" />
            </div>
            <Typography
              variant="subtitle2"
              sx={{ mt: "13px",  fontWeight: "light", fontSize: "14px", color: theme.palette.mode === "dark" ? "#848584" : "#8c8c8c", }}
            >
              {videoObj?.name}
            </Typography>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default YouTubeCard;
