/* eslint-disable jsx-a11y/iframe-has-title */
import React from "react";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import moment from "moment";
import "./VideoCard.css";
import Subscriber from '../DetailVideoPage/Sections/Subscriber';
import axios from "axios";
import LikeDislikes from '../DetailVideoPage/Sections/LikeDislikes';
import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";


const VideoCard = ({  video, url, autoplay, thisVideoUser }) => {

   const [mounted, setMounted] = useState(false);
   const [user, setUser] = useState({});
   
    const theme = useTheme();
    const navigate = useNavigate();


    useEffect(() => {
        setMounted(true);
        if(!mounted){
            return;
        }
    }, []);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if(user){
            setUser(user);
        }
    }, []);


   

    if(!video?.guid){
        return null;
    }

  return (
    <>
    <div className="mainCard">
       <iframe
        src={url}
        width="900px"
        height="500px"
        frameBorder="0"
        allowFullScreen={true}
        className="mainVid"
        autoplay={autoplay}
        frameRate={video.framerate}
        muted={autoplay}
      />
       
    
      <div className="videoInformation">
        <Typography
          variant="h6"
          sx={{ width: "300px", mt: "10px", mb: "20px", color: theme.palette.mode === "dark" ? "#FFFFFF" : "#000000" }}
        >
          {video.title}
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "#AAAAAA", mb: "20px" }}>
          {`${video.views} views · ${moment(video?.dateUploaded).fromNow()}`}
        </Typography>
        <div className="channelDetails">
          <div className="channelInformation">
             <img srcSet={user?.url} alt="" />
            <div className="channelName">
              <Typography variant="subtitle1"
              sx={{ fontWeight: "bolder", mb: "5px", color: theme.palette.mode === "dark" ? "#FFFFFF" : "#000000", "&:hover": { cursor: "pointer" } }}
              onClick={() => navigate(`/about/${thisVideoUser?.userId}&2`)}
              >{thisVideoUser?.name}</Typography>
              <Typography variant="subtitle2" sx={{ color: "#AAAAAA" }}>{thisVideoUser?.username}</Typography>
             
            </div>
            
          </div>

          <div className="channelButtons">
            {[<LikeDislikes video videoId={video?.guid} userId={JSON.parse(localStorage.getItem('user')).userId}  />, <Subscriber userTo={thisVideoUser?.userId} userFrom={localStorage.getItem('user').userId} />]}
            </div>
        </div>
      </div>
    </div>
     <div className="channelDescription"> 
     <Typography variant="subtitle2" sx={{ 
       color: theme.palette.mode === "dark" ? "#FFFFFF" : "#000000",
        mb: "20px",
        marginTop: "20px"
       
       }}>
      {thisVideoUser?.description}
        </Typography>
        
        
    </div>
    </>
  );
};

export default VideoCard;
