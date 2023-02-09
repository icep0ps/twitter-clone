/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import React, { useEffect } from 'react';
import Tweet from '../../../../common/components/Tweet';
import { COMMENT } from '../../../../common/helpers/types';
import useFetchTweetComments from '../../../../common/hooks/comments/useFetchTweetComments';

function Comments({ location, tweetRef }) {
  const [isLoading, setIsLoading] = useState(true);
  const [comments, getComments] = useFetchTweetComments(setIsLoading);

  useEffect(() => {
    getComments(tweetRef);
  }, [location]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      {comments.map((comment) => {
        const { id, author, ref } = comment;
        return (
          <Tweet
            id={id}
            key={id}
            type={COMMENT}
            author={author}
            tweetData={comment}
            tweetRef={ref}
          />
        );
      })}
    </div>
  );
}

export default Comments;
