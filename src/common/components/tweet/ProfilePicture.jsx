import React from 'react';
export function ProfilePicture({ id, parentTweet }) {
  return (
    <div className="flex gap-5 ">
      <div className="image">
        <div
          className="min-w-[48px] min-h-[48px] bg-black rounded-3xl bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url()` }}
        ></div>
        {parentTweet !== id && <div className="line"></div>}
      </div>
    </div>
  );
}
