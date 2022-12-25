import { useState, useEffect, useCallback } from "react";

import PrimarySearchAppBar from "../PrimarySearchAppBar/PrimarySearchAppBar";
import YouTubeVids from "../YouTubeVids/YouTubeVids";
import SearchPage from "../SearchPage/SearchPage";
import VideoPage from "../VideoPage/VideoPage";
import axios from "axios";

import ChipBar from "../ChipBar/ChipBar";




import "../../App.css";
import { Button } from "@mui/material";

export default function MainPage() {
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const [wordFromChipBar, setWordFromChipBar] = useState("");
  const [page, setPage] = useState(1);





   const loadVideos = async () => {
    setLoading(true);
    await axios.post('http://localhost:27017/api/videos/getVideos', {
      page: page
    })
      .then((res) => {
        setVideos(res.data.videos);
      })
      .catch((err) => {
        console.log(err);
      });
      setLoading(false);
  }


  useEffect(() => {
   (async () => {
    setLoading(true);
    await axios.post('http://localhost:27017/api/videos/getVideos', {
      page: page
    })
      .then((res) => {
        setVideos(prevVideos => [...prevVideos, ...res.data.videos]);
        console.log(res.data.videos, "res.data.videos");
      })
      .catch((err) => {
        console.log(err);
      });
    })()
    setLoading(false);
  }, [page]);






  useEffect(() => {
    setLoading(true);
    if(wordFromChipBar){
    (async () => {
      await axios.post('http://localhost:27017/api/videos/getVideosByTagOrSearch', {
        page: page,
        tag: wordFromChipBar,
        search: wordFromChipBar
      })
        .then((res) => {
          setVideos(prevVideos => [...prevVideos, ...res.data.videos]);
        })
        .catch((err) => {
          console.log(err);
        });
    })();
    }
    setLoading(false);
  }, [page, wordFromChipBar]);

 


  const clearData = () => {
    setWordFromChipBar("");
    setVideos([]);
    setPage(1);
  };

 

  const getWordFromChipBar = (newSearchWord) => {
     clearData()
    if (newSearchWord === "") {
      loadVideos();
      return;
    }
    setWordFromChipBar(newSearchWord);
  };
  

  if (loading) return <h1>Loading...</h1>;


  return (
    <>
    <div>
        <ChipBar
          getWordFromChipBar={getWordFromChipBar}
          wordFromChipBar={wordFromChipBar}
        />
      <div className="formatting">

          <YouTubeVids
            videos={videos}
           />
  
      </div>
    </div>
    {videos?.length > 0 && videos?.length % 100 === 0 &&
      <Button onClick={() => {
        setPage(page + 1)
      }}
        sx={{ 
          display: "block",
          marginTop: "20px",
          marginBottom: "20px",
          justifyContent: "start",
          alignItems: "start",
          marginLeft: "6rem",
        }}
        >Load More</Button>
    }
    </>
  );


};

