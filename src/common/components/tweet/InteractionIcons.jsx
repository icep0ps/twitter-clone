import React from 'react';
import { Link } from 'react-router-dom';
import CommentsIcon from '../../../assets/svgs/CommentsIcon';
import RetweetIcon from '../../../assets/svgs/RetweetIcon';
import LikeIcon from '../../../assets/svgs/LikeIcon';
import ShareIcon from '../../../assets/svgs/ShareIcon';

export function InteractionIcons({ setReplyingTo, tweetData }) {
  return (
    <div className="flex gap-20  py-2">
      <Link to={'/compose/tweet'}>
        <button className=" text-black" onClick={() => setReplyingTo(tweetData)}>
          <CommentsIcon />
        </button>
      </Link>
      <button className=" text-black flex gap-3">
        <RetweetIcon />
      </button>
      <button className=" text-black flex gap-3">
        <LikeIcon />
      </button>
      <button className=" text-black flex gap-3">
        <ShareIcon />
      </button>
    </div>
  );
}
