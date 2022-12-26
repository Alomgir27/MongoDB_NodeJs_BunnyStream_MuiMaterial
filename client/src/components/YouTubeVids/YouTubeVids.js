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
          <YouTubeCard
            videoObj={video}
          />
      ))}
    </div>
  );
};

export default YouTubeVids;
