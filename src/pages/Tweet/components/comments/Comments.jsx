import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Tweet from '../../../../common/Tweet';
import { db } from '../../../../firebase/firebase-config';

function Comments({ id, author }) {
  const [comments, setComments] = useState([]);

  const getComments = async () => {
    const tweetRef = collection(
      db,
      'users',
      `${author}`,
      'tweets',
      `${id}`,
      'comments'
    );
    onSnapshot(tweetRef, (comments) => {
      const commentsCollection = [];
      comments.forEach((comment) =>
        commentsCollection.push(
          Object.assign({ id: comment.id }, comment.data())
        )
      );
      setComments(commentsCollection);
    });
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <>
      {comments.map((comment) => {
        return (
          <Tweet
            id={id}
            username={comment.username}
            author={comment.author}
            tweet={comment.tweet}
            likes={comment.likes}
            retweets={comment.retweets}
            tweetInfomation={comment}
          />
        );
      })}
    </>
  );
}

export default Comments;
