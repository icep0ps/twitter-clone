import React from 'react';
import { Link } from 'react-router-dom';
import LikeIcon from '../../../assets/svgs/LikeIcon';
import ShareIcon from '../../../assets/svgs/ShareIcon';
import RetweetIcon from '../../../assets/svgs/RetweetIcon';
import CommentsIcon from '../../../assets/svgs/CommentsIcon';

export function InteractionIcons({ setReplyingTo, tweet, likes, comments, retweets }) {
  return (
    <div className="flex gap-20  py-2 w-3/4 justify-between">
      <Link to={'/compose/tweet'}>
        <button className=" text-black flex gap-3" onClick={() => setReplyingTo(tweet)}>
          <CommentsIcon />
          {comments}
        </button>
      </Link>
      <button className=" text-black flex gap-3" onClick={() => tweet.retweet()}>
        <RetweetIcon />
        {retweets}
      </button>
      <button className=" text-black flex gap-3" onClick={() => tweet.like()}>
        <LikeIcon />
        {likes}
      </button>
      <button className=" text-black flex gap-3">
        <ShareIcon />
      </button>
    </div>
  );
}
