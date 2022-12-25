import React, { useEffect, useState } from 'react'
import Axios from 'axios';

import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import { Tooltip } from '@mui/material';

import { useTheme } from '@mui/material';
import { Chip } from '@mui/material';


function LikeDislikes(props) {

    const [Likes, setLikes] = useState(0)
    const [Dislikes, setDislikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [DislikeAction, setDislikeAction] = useState(null)
    const [user, setUser] = useState({});
    const [variable, setVariable] = useState({});
    let theme = useTheme();


   useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
      setUser(user);
    }
  }, []);
  




   

    useEffect(() => {
        if (props.video) {
            setVariable({ videoId: props.videoId, userId: user.userId })
        } else {
            setVariable({ commentId: props.commentId, userId: user.userId })
            
        }
    }, [props.videoId, user.userId, props.commentId, props.video])

    


    useEffect(() => {

        Axios.post('http://localhost:27017/api/like/getLikes', variable)
            .then(response => {
                console.log('getLikes',response.data)

                if (response.data.success) {
                    //How many likes does this video or comment have 
                    setLikes(response.data.likes.length)

                    //if I already click this like button or not 
                    response.data.likes.map(like => {
                        if (like.userId === props.userId) {
                            setLikeAction('liked')
                        }
                    })
                } else {
                    alert('Failed to get likes')
                }
            })

        Axios.post('http://localhost:27017/api/like/getDislikes', variable)
            .then(response => {
                console.log('getDislike',response.data)
                if (response.data.success) {
                    //How many likes does this video or comment have 
                    setDislikes(response.data.dislikes.length)

                    //if I already click this like button or not 
                    response.data.dislikes.map(dislike => {
                        if (dislike.userId === props.userId) {
                            setDislikeAction('disliked')
                        }
                    })
                } else {
                    alert('Failed to get dislikes')
                }
            })

    }, [])


    const onLike = () => {

        if (LikeAction === null) {

            Axios.post('http://localhost:27017/api/like/upLike', variable)
                .then(response => {
                    if (response.data.success) {

                        setLikes(Likes + 1)
                        setLikeAction('liked')

                        //If dislike button is already clicked

                        if (DislikeAction !== null) {
                            setDislikeAction(null)
                            setDislikes(Dislikes - 1)
                        }


                    } else {
                        alert('Failed to increase the like')
                    }
                })


        } else {

            Axios.post('http://localhost:27017/api/like/unLike', variable)
                .then(response => {
                    if (response.data.success) {

                        setLikes(Likes - 1)
                        setLikeAction(null)

                    } else {
                        alert('Failed to decrease the like')
                    }
                })

        }

    }


    const onDisLike = () => {

        if (DislikeAction !== null) {

            Axios.post('http://localhost:27017/api/like/unDisLike', variable)
                .then(response => {
                    if (response.data.success) {

                        setDislikes(Dislikes - 1)
                        setDislikeAction(null)

                    } else {
                        alert('Failed to decrease dislike')
                    }
                })

        } else {

            Axios.post('http://localhost:27017/api/like/upDisLike', variable)
                .then(response => {
                    if (response.data.success) {

                        setDislikes(Dislikes + 1)
                        setDislikeAction('disliked')

                        //If dislike button is already clicked
                        if(LikeAction !== null ) {
                            setLikeAction(null)
                            setLikes(Likes - 1)
                        }

                    } else {
                        alert('Failed to increase dislike')
                    }
                })


        }


    }

    return (
        <React.Fragment>
            <div style={{ 
                display: 'inline-flex',
                justifyContent: 'space-between', 
                padding: '0 10px',
                alignItems: 'center',
                width: '100px',
                height: '30px',
                fontSize: '12px',
                color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                cursor: 'pointer',
                margin: '10px 2px',
                
                transition: 'all .2s ease-in-out',
                '&:hover': {
                    backgroundColor: theme.palette.mode === 'dark' ? '#000' : '#f2f2f2',
                },
                '&:active': {
                    backgroundColor: theme.palette.mode === 'dark' ? '#000' : '#e6e6e6',
                },
                '&:focus': {
                    backgroundColor: theme.palette.mode === 'dark' ? '#000' : '#e6e6e6',
                },
                '&:hover $icon': {
                    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                },
                marginRight: '27px'
                
            }}
            >
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Chip icon={LikeAction === 'liked' ? <ThumbUpAltIcon /> : <ThumbUpAltOutlinedIcon />} label={Likes} size="large" style={{ backgroundColor: theme.palette.mode === 'dark' ? '#000' : '#f2f2f2', color: theme.palette.mode === 'dark' ? '#fff' : '#000', marginLeft: '5px' }} onClick={onLike} />

                </Tooltip>
            </span>
            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    <Chip icon={DislikeAction === 'disliked' ? <ThumbDownAltIcon /> : <ThumbDownAltOutlinedIcon />} label={Dislikes} size="large" style={{ backgroundColor: theme.palette.mode === 'dark' ? '#000' : '#f2f2f2', color: theme.palette.mode === 'dark' ? '#fff' : '#000', marginLeft: '5px' }} onClick={onDisLike} />
                </Tooltip>
                
            </span>
          </div>
        </React.Fragment>
    )
}

export default LikeDislikes
