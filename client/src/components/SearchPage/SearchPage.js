import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import ListIcon from "@mui/icons-material/List";
import YouTubeCard from "../YouTubeCard/YouTubeCard";
import { Button, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";


import "./SearchPage.css";

const SearchPage = () => {

  const theme = useTheme();

  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  const params = useParams();


  useEffect(() => {
    if(params.searchText === undefined) return;
    if(params.searchText === searchText) return;
    if(searchText !== "") {
      setVideos([]);
      setPage(1);
    }
    localStorage.setItem("lastSearch", params.searchText);
     setSearchText(params.searchText);
  }, [params.searchText, searchText]);


  useEffect(() => {
      setLoading(true);
      if(searchText === "") return;
      (async () => {
        await axios.post('http://localhost:27017/api/videos/getVideosBySearch', {
          page: page,
          search: searchText
        })
          .then((res) => {
            setVideos(prevVideos => [...prevVideos, ...res.data.videos]);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      })();
  }, [page, searchText]);

  return (
  <div>
    <div className="searchPageBox">
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
            FILTERS
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
    {videos.length > 0 &&  videos.length % 100 === 0 && (
    <Button
        sx={{
          mt: 2,
          mb: 2,
          marginLeft: "10rem",
        }}
        onClick={() => setPage(page + 1)}
        disabled={loading}
      >
        {loading ? "Loading..." : "Load More"}
      </Button>
    )}
      </div>
  );

};

export default SearchPage;
