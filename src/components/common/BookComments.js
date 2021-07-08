import * as React from 'react';
import { useEffect, useState } from "react";
import styled from 'styled-components';
import { Button } from "./Button"
import { Input } from "./Input"
import moment from 'moment';

const CommentListItem = styled.div`
  >strong {
    font-size: 80%;
    color: #666;
  }
  
  border-bottom: 1px solid #ddd;
  padding: .5rem 0;
`;

const CommentForm = styled.form`
  display: flex;
  margin-top: 2rem;
  
  ${Input} {
    margin-top: auto;
    margin-bottom: auto;
    margin-right: .75rem;
  }
  
  ${Button} {
    margin: auto 0;
  }
`;


export const BookComments = ({firebase, bookId}) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const unsubscribe = firebase.subscribeToBookComments({
      bookId,
      onSnapshot: (snapshot) => {
        console.log(snapshot);
        const snapshotComments = [];
        snapshot.forEach(doc => {
          snapshotComments.push({
            id: doc.id,
            ...doc.data()
          })
        })
        setComments(snapshotComments);
      }
    }) // subscribe returns an unsubscribe func

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    }
  }, []) // [] means only run when component mounts, not when it updates

  function handlePostCommentSubmit(e) {
    e.preventDefault();
    firebase.postComment({
      text: commentText,
      bookId
    });
    setCommentText('');
  }


  return (
    <div>
      <CommentForm onSubmit={handlePostCommentSubmit}>
        <Input type="text" value={commentText} onChange={e => {
          e.persist(); // only need this when we're doing something async like setting state, unwraps synthetic event to raw js event
          setCommentText(e.target.value); // this is async, doesnt fire away, so e.persist allows us to tap into raw event that change handler emits
        }}/>
        <Button>Post Comment</Button>
      </CommentForm>
      {comments.map(comment => (
        <CommentListItem key={comment.id}>
          <strong>
            {comment.username} - posted at {moment(comment.dateCreated.toDate()).format('hh:mm on MMM DD, YYYY')}
          </strong>
          <div>
            {comment.text}
          </div>
        </CommentListItem>
      ))}
    </div>
  )
}
