/* eslint-disable react-hooks/exhaustive-deps */
import Reply from './Reply';
import { Link, Outlet } from 'react-router-dom';
import LikeIcon from '../../../../assets/svgs/LikeIcon';
import ShareIcon from '../../../../assets/svgs/ShareIcon';
import useLike from '../../../../common/hooks/common/useLike';
import { UserContext } from '../../../../Context/UserContext';
import RetweetIcon from '../../../../assets/svgs/RetweetIcon';
import React, { useContext, useEffect, useState } from 'react';
import CommentsIcon from '../../../../assets/svgs/CommentsIcon';
import useFollow from '../../../../common/hooks/common/useFollow';
import useRetweet from '../../../../common/hooks/retweets/useRetweet';

function Tweet(props) {
  const { user } = useContext(UserContext);
  const { id, author, username, tweet, tweetInfomation, ref } = props;
  const [tweetRef, setTweetRef] = useState('');
  const { follow, isFollowing } = useFollow(author);
  const { like } = useLike(tweetRef, tweetInfomation);
  const { retweet } = useRetweet(tweetRef, tweetInfomation);

  useEffect(() => {}, [isFollowing]);

  return (
    <>
      <div className="flex flex-col border-b border-gray-200 border-solid gap-3 px-5 pb-3 relative">
        <div className="flex flex-col gap-3 ">
          <div className="flex gap-3">
            <div
              className="w-12 h-12 bg-black rounded-3xl bg-cover bg-center bg-no-repeat"
              // style={{ backgroundImage: `url(${profilePicURL})` }}
            ></div>
            {user.displayName !== author && (
              <button className="right-10 absolute" onClick={(e) => follow()}>
                {isFollowing ? 'following' : 'follow'}
              </button>
            )}
            <Link to={`/profile/${author}`}>
              <p className="username flex items-center gap-1 font-medium">
                {username}{' '}
              </p>
              <p className=" text-sm text-gray-500">@{author}</p>
              {tweetInfomation.replyingTo && (
                <p className="text-sm">
                  replying to{' '}
                  <span className="text-blue-500">
                    @{tweetInfomation.replyingTo}
                  </span>
                </p>
              )}
            </Link>
          </div>
          <div className="w-5/6">
            <p className="text-xl ">{tweet.tweet}</p>
          </div>
          <div>
            {/* {tweetInfomation.images.map((imageURL) => {
              return (
                <img
                  alt=""
                  src={`${imageURL}`}
                  key={uniqid()}
                  className="rounded-xl	my-4 border-gray-300 border"
                />
              );
            })} */}
          </div>
        </div>
        <p className="text-gray-400 text-sm">
          {/* {tweetInfomation.date.toDate().toDateString()} */}
        </p>
        <div className="flex gap-5"></div>
        <div className="flex justify-start gap-3 border-y border-y-gray-200 py-4">
          <Link to={`/${author}/status/${id}/retweets`}>
            <p>
              <span className="font-bold">
                {tweetInfomation.retweets?.length}{' '}
              </span>{' '}
              Retweets
            </p>
          </Link>
          <Link to={`/${author}/status/${id}/likes`}>
            <p>
              <span className="font-bold">
                {tweetInfomation.likes?.length}{' '}
              </span>
              Likes
            </p>
          </Link>
        </div>
        <div className="flex gap-2 justify-evenly border-b border-b-gray-200 py-3">
          <button className=" text-black">
            <CommentsIcon />
          </button>
          <button className=" text-black flex gap-3" onClick={like}>
            <LikeIcon />
          </button>
          <button className=" text-black flex gap-3" onClick={retweet}>
            <RetweetIcon />
          </button>
          <button className=" text-black flex gap-3">
            <ShareIcon />
          </button>
        </div>
        <Reply
          id={id}
          author={author}
          username={username}
          parentTweetRef={tweetInfomation.ref}
        ></Reply>
      </div>
      <Outlet />
    </>
  );
}

export default Tweet;
