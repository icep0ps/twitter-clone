import React, { useId } from 'react';

export function TweetContents({ tweetData }) {
  const { tweet, images } = tweetData;
  const id = useId();
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
              key={id}
              className="rounded-xl	my-4 border-gray-300 border"
            />
          );
        })}
      </div>
    </>
  );
}
