import React from 'react';
import { uniqid } from 'uniqid';

export function TweetContents({ tweetData }) {
  const { tweet, images } = tweetData;
  return (
    <>
      <div className="w-5/6">
        <p className="text-xl ">{tweet}</p>
      </div>
      <div>
        {images.map((imageURL) => {
          return (
            <img
              alt=""
              src={`${imageURL}`}
              key={uniqid()}
              className="rounded-xl	my-4 border-gray-300 border"
            />
          );
        })}
      </div>
    </>
  );
}
