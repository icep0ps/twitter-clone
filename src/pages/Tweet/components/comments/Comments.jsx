import Tweet from '../../../../common/components/Tweet';
import { db } from '../../../../firebase/firebase-config';
import { COMMENT } from '../../../../common/helpers/types';
import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

function Comments({ id, author, location }) {
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
  }, [location]);

  return (
    <div>
      {comments.map((comment) => {
        return (
          <Tweet
            id={id}
            key={comment.id}
            type={COMMENT}
            username={comment.username}
            author={comment.author}
            tweet={comment.tweet}
            likes={comment.likes}
            retweets={comment.retweets}
            tweetInfomation={comment}
          />
        );
      })}
    </div>
  );
}

export default Comments;
