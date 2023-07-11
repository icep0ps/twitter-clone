/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import Tweet from '../../../../common/components/Tweet';
import { COMMENT } from '../../../../common/helpers/types';
import useFetchTweetComments from '../../../../common/hooks/comments/useFetchTweetComments';

function Comments({ tweetRef }) {
  const [isLoading, setIsLoading] = useState(true);
  const [comments, getComments] = useFetchTweetComments(setIsLoading);

  useEffect(() => {
    getComments(tweetRef).then(() => setIsLoading(false));
  }, [tweetRef]);

  if (isLoading) return <h1>Loading...</h1>;

  if (comments.length < 1) return <h1>No comments yet</h1>;

  return (
    <div>
      {comments.map((comment) => {
        const { id, author, ref } = comment;
        return (
          <Tweet
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
