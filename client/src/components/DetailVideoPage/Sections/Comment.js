import React from 'react';
import 'antd/dist/antd.css';
import { Avatar, Comment, Tooltip } from 'antd';
import LikeDislikes from './LikeDislikes';
import moment from 'moment';
import { useTheme } from '@mui/material';

const App = ({ comment,  openReply}) => {
  const theme = useTheme();

  const actions = [
      <LikeDislikes comment commentId={comment._id} />,
      <span onClick={openReply} key="comment-basic-reply-to" style={{color: theme.palette.mode === "dark" ? theme.palette.grey[100] : theme.palette.grey[900],}}>Reply to</span>,
  ]

 
  return (
    <Comment
      actions={actions}
      author={<a
        style={{
          color: theme.palette.mode === "dark" ? theme.palette.grey[100] : theme.palette.grey[900],
        }}
      >{comment.writer.name}</a>}

      avatar={<Avatar src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg" alt="Han Solo" />}
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