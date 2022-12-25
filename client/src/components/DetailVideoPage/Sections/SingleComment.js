import React, { useState } from 'react'
import { Comment, Input } from 'antd';
import { Button } from '@mui/material';
import Axios from 'axios';
import LikeDislikes from './LikeDislikes';
import { useTheme } from '@mui/material';
import { Avatar } from '@mui/material';
import Typography from "@mui/material/Typography";
import CommentExample from './Comment'

const { TextArea } = Input;





function SingleComment(props) {
    const user = JSON.parse(localStorage.getItem('user'))
    const [CommentValue, setCommentValue] = useState("")
    const [OpenReply, setOpenReply] = useState(false)

    const theme = useTheme();

    const handleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    }

    const openReply = () => {
        setOpenReply(!OpenReply)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            writer: user.userId,
            postId: props.postId,
            responseTo: props.comment._id,
            content: CommentValue
        }


        Axios.post('http://localhost:27017/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    setCommentValue("")
                    setOpenReply(!OpenReply)
                    props.refreshFunction(response.data.result)
                } else {
                    alert('Failed to save Comment')
                }
            })
    }

   

    return (
        <div>
            <CommentExample comment={props.comment} openReply={openReply} />
            

            {OpenReply &&
                <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                    <TextArea
                        onChange={handleChange}
                        value={CommentValue}
                        placeholder="Add a public comment..."
                        style={{
                            width: '100%',
                            borderRadius: '5px',
                            border: '1px solid #e6e6e6',
                            padding: '5px',
                            fontSize: '1.2rem',
                            color: theme.palette.text.primary,
                            backgroundColor: theme.palette.background.default,
                            marginBottom: '10px',

                        }}
                    />
                    <br />
                    <Button 
                       variant="contained"
                       color="primary"
                        style={{ width: '20%', height: '52px' , marginLeft: '10px'}}
                     onClick={onSubmit}>Reply</Button>
                </form>
            }

        </div>
    )
}

export default SingleComment
