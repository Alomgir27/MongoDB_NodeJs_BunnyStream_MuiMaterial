import React from 'react';
import 'antd/dist/antd.css';
import { Avatar, Comment, Tooltip } from 'antd';
import LikeDislikes from './LikeDislikes';
import moment from 'moment';
import { useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const App = ({ comment,  openReply}) => {
  const theme = useTheme();
  const navigate = useNavigate();


  const actions = [
      <LikeDislikes comment commentId={comment._id} userId={JSON.parse(localStorage.getItem('user')).userId} />,
      <span onClick={openReply} key="comment-basic-reply-to" style={{color: theme.palette.mode === "dark" ? theme.palette.grey[100] : theme.palette.grey[900],}}>Reply to</span>,
  ]

 
  return (
    <Comment
      actions={actions}
      author={<a
        style={{
          color: theme.palette.mode === "dark" ? theme.palette.grey[100] : theme.palette.grey[900],
        }}
        onClick={() => navigate(`/about/${comment.writer._id}&1`)}
      >{comment.writer.name}</a>}

      avatar={<Avatar src={comment?.writer?.url} alt={comment?.writer?.name} />}
      content={
        <p style={{
          color: theme.palette.mode === "dark" ? theme.palette.grey[100] : theme.palette.grey[900],
        }}>
         {comment.content}
        </p>
      }
      datetime={
        <Tooltip title={moment(comment.createdAt).format('YYYY-MM-DD HH:mm:ss')}>
          <span style={{
            color: theme.palette.mode === "dark" ? theme.palette.grey[100] : theme.palette.grey[900],
          }}>{moment(comment.createdAt).fromNow()}</span>
        </Tooltip>
      }
    />
  );
};

export default App;