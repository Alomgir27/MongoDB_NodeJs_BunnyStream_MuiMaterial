import React, { useState } from 'react'
import { Input } from 'antd';
import axios from 'axios';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';
import { Button } from '@mui/material';
import { useTheme } from '@mui/material';
const { TextArea } = Input;

function Comments(props) {
    const user = JSON.parse(localStorage.getItem('user'))
    const [Comment, setComment] = useState("")

    const theme = useTheme();

    const handleChange = (e) => {
        setComment(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            content: Comment,
            writer: user?.userId,
            postId: props.postId
        }

        axios.post('http://localhost:27017/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    setComment("")
                    props.refreshFunction(response.data.result)
                } else {
                    alert('Failed to save Comment')
                }
            })
    }

    return (
        <div>
            <br />
                 <p> comments</p>
            <hr />
           

            {props.CommentLists && props.CommentLists.map((comment, index) => (
                (!comment.responseTo &&
                    <React.Fragment key={index}>
                        <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                        <ReplyComment CommentLists={props.CommentLists} postId={props.postId} parentCommentId={comment._id} refreshFunction={props.refreshFunction} />
                    </React.Fragment>
                )
            ))}



            {/* Root Comment Form */}
            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <TextArea
                    onChange={handleChange}
                    value={Comment}
                    placeholder="Add a comment..."
                    style={{
                        width: '100%',
                        borderRadius: '5px',
                        border: '1px solid #e6e6e6',
                        padding: '5px',
                        fontSize: '1.2rem',
                        color: theme.palette.text.primary,
                        backgroundColor: theme.palette.background.default,
                    }}
                />
                <br />
                <Button 
                variant="contained"
                color="primary"
                style={{  marginLeft: '10px' }}
                onClick={onSubmit}>Submit</Button>
            </form>

        </div>
    )
}

export default Comments
