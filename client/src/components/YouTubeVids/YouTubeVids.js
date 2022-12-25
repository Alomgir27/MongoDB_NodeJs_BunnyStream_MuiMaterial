import * as React from "react";
import { Link } from "react-router-dom";

import YouTubeCard from "../YouTubeCard/YouTubeCard";
import { useTheme } from "@mui/material";


import "./YouTubeVids.css";

const YouTubeVids = ({
  videos,
}) => {
  const theme = useTheme();
  
  return (
    <div className="cardSpacing">
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
          />
        </Link>
      ))}
    </div>
  );
};

export default YouTubeVids;
