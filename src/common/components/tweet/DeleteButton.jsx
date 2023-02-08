import React from 'react';
import useDeleteTweet from '../../hooks/tweets/useDeleteTweet';

export function DeleteButton({ tweetRef }) {
  const { deleteTweet } = useDeleteTweet();

  return (
    <button className="right-10 absolute" onClick={(e) => deleteTweet(tweetRef)}>
      delete
    </button>
  );
}
