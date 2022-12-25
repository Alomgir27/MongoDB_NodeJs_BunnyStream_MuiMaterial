import React,{ useState, useEffect } from "react";

import VideoCard from "./VideoCard";
import VideoTiles from "./VideoTiles";
import axios from "axios";
import { useParams } from "react-router-dom";

import Comments from '../DetailVideoPage/Sections/Comments';




import "./VideoPage.css";


export default function VideoPage(props) {
  const [video, setVideo] = useState({});
  const [mounted, setMounted] = useState(false);
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [autoplay, setAutoplay] = useState(false);
  const [CommentLists, setCommentLists] = useState([])
  const [thisVideoUser, setThisVideoUser] = useState({})
  const [loading, setLoading] = useState(false);


 



  const params = useParams();



  useEffect(() => {
    setMounted(true);
    if(!mounted){
      return;
    }
  }, []);

  useEffect(() => {
    if(localStorage.getItem("autoplay") === "true"){
      setAutoplay(true);
    }else{
      setAutoplay(false);
    }
  }, []);

  

  

 
  useEffect(() => {
    setLoading(true);
    const getVideo = async () => {
      const { data } = await axios.post('http://localhost:27017/api/videos/getVideoByVideoId', {
        videoId: params?.videoId
      });
      setVideo(data.video);
      console.log(data.video, "data.video");
      setLoading(false);
    };
    if(params?.videoId){
      getVideo();

    }
  }, [params?.videoId]);

  useEffect(() => {
    if(!video?.title){
      return;
    }

    (async () => {
      setLoading(true);
      await axios.post("http://localhost:27017/api/videos/getRelatedVideos", {
        title: video.title,
        page: page,
        itemsPerPage: 10,
      }).then((res) => {
        setVideos(res?.data?.videos);
        console.log(res.data.videos)
        setLoading(false);
      });
    })();
  }, [video]);

  const loadMore = () => {
    (async () => {
      setLoading(true);
      await axios.post("http://localhost:27017/api/videos/getRelatedVideos", {
        title: video.title,
        page: page + 1,
        itemsPerPage: 10,
      }).then((res) => {
        setVideos((prev) => [...prev, ...res.data.videos]);
        console.log(res.data.videos)
        setPage(page + 1);
        setLoading(false);
      });
    })();
    setPage(page + 1);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await axios.post("http://localhost:27017/api/videos/getUserByVideoId", {
        videoId: params?.videoId,
      }).then((res) => {
        setThisVideoUser(res.data.user);
        console.log(res.data.user, "res.data.user");
        setLoading(false);
      });
    })();
  }, [params?.videoId]);

  

  

  
  useEffect(() => {
    setLoading(true);
    let videoVariable = {
        videoId: params?.videoId
    }
    axios.post('http://localhost:27017/api/comment/getComments', videoVariable)
        .then(response => {
            if (response.data.success) {
                console.log('response.data.comments',response.data.comments)
                setCommentLists(response.data.comments)
            }
        })
        setLoading(false);
   }, [params.videoId])

const updateComment = (newComment) => {
    setCommentLists(CommentLists.concat(newComment))
}

  if(loading){
    return <div>Loading...</div>;
  }
 

  return (
    <div className="videoPageContainer">
      <div className="mainVideo">
        <VideoCard
          video={video}
          url={`https://iframe.mediadelivery.net/embed/${video?.videoLibraryId}/${video?.guid}?autoplay=${autoplay}&muted=${autoplay}`}
          autoplay={autoplay}
          thisVideoUser={thisVideoUser}
        />
        <Comments CommentLists={CommentLists} postId={video?.guid} refreshFunction={updateComment} />
      </div>
      <div className="sideVideos">
        <VideoTiles 
         videos={videos}
         loadMore={loadMore}
         totalItems={videos?.length}
         guid={video.guid}
         autoplay={autoplay}
         setAutoplay={setAutoplay}
         thisVideoUser={thisVideoUser}
        />
      </div>
    </div>
  );
};


