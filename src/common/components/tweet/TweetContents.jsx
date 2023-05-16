import React, { useId } from 'react';
import { Link } from 'react-router-dom';

export function TweetContents({ tweetData }) {
  const { replyingTo, tweet, images, author, id } = tweetData;
  const uniqid = useId();
  return (
    <Link to={`/${author.id}/status/${id}`}>
      {replyingTo && (
        <p className="text-sm">
          replying to <span className="text-blue-500">@{replyingTo.id}</span>
        </p>
      )}
      <p className="my-1">{tweet}</p>
      <div>
        {images.map((imageURL) => {
          return (
            <img
              alt="tweet"
              src={`${imageURL}`}
              className="rounded-xl	my-4 border-gray-300 border"
              key={uniqid}
            />
          );
        })}
      </div>
    </Link>
  );
}
