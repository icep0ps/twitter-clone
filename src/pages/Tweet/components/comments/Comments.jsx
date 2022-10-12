import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Tweet from '../../../../common/components/Tweet';
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
          <Link to={`/status/${comment.id}`}>
            <Tweet
              id={id}
              key={id}
              type="comment"
              username={comment.username}
              author={comment.author}
              tweet={comment.tweet}
              likes={comment.likes}
              retweets={comment.retweets}
              tweetInfomation={comment}
            />
          </Link>
        );
      })}
    </>
  );
}

export default Comments;
