import { Link } from 'react-router-dom';
import LikeIcon from '../../assets/svgs/LikeIcon';
import ShareIcon from '../../assets/svgs/ShareIcon';
import RetweetIcon from '../../assets/svgs/RetweetIcon';
import CommentsIcon from '../../assets/svgs/CommentsIcon';
import React from 'react';

function Comment({
  id,
  follow,
  isFollowing,
  tweetInfomation,
  username,
  tweet,
  likes,
  retweets,
  retweet,
  like,
}) {
  return (
    <div className="flex flex-col border-b border-gray-500 border-solid gap-3 px-5 pb-3 relative">
      <button className="right-10 absolute" onClick={follow}>
        {isFollowing ? 'following' : 'follow'}
      </button>
      <Link to={`/status/${id}`}>
        {tweetInfomation.retweetedBy ? (
          <p>{tweetInfomation.retweetedBy} retweeted</p>
        ) : (
          ''
        )}
        {tweetInfomation.replyingTo ? (
          <p>replying to @{tweetInfomation.replyingTo} </p>
        ) : (
          ''
        )}
        <div className="flex gap-5 ">
          <div className="w-12 h-12  bg-black rounded-3xl"></div>
          <div className="w-5/6">
            <p className="username flex items-center gap-1 ">
              {username}{' '}
              <span className="text-xs text-gray-500">@{username}</span>
            </p>
            <p>{tweet}</p>
          </div>
        </div>
      </Link>
      <div className="flex gap-2 justify-evenly">
        <button className=" text-black">
          <CommentsIcon />
        </button>
        <button className=" text-black flex gap-3" onClick={like}>
          <LikeIcon />
          {likes.length}
        </button>
        <button className=" text-black flex gap-3" onClick={retweet}>
          <RetweetIcon />
          {retweets.length}
        </button>
        <button className=" text-black flex gap-3">
          <ShareIcon />
        </button>
      </div>
    </div>
  );
}

export default Comment;
