/* eslint-disable react-hooks/exhaustive-deps */
import uniqid from 'uniqid';
import useLike from '../hooks/useLike';
import { Link } from 'react-router-dom';
import useFollow from '../hooks/useFollow';
import useRetweet from '../hooks/useRetweet';
import LikeIcon from '../../assets/svgs/LikeIcon';
import ShareIcon from '../../assets/svgs/ShareIcon';
import { UserContext } from '../../Context/UserContext';
import RetweetIcon from '../../assets/svgs/RetweetIcon';
import CommentsIcon from '../../assets/svgs/CommentsIcon';
import React, { useEffect, useContext } from 'react';

import useDeleteTweet from '../hooks/useDeleteTweet';

function Tweet(props) {
  const { setCurrentTweetBiengViewed, setReplyingTo, user } =
    useContext(UserContext);
  const { id, author, username, likes, retweets, tweetInfomation } = props;
  const { deleteTweet } = useDeleteTweet();
  const { isFollowing } = useFollow(author);
  const { like } = useLike(tweetInfomation.ref, tweetInfomation);
  const { retweet } = useRetweet(tweetInfomation.ref, tweetInfomation);

  useEffect(() => {}, [isFollowing]);

  return (
    <div
      className="tweet flex flex-col gap-3 px-5 relative"
      onClick={() => setCurrentTweetBiengViewed(tweetInfomation)}
    >
      {user.displayName === tweetInfomation?.retweeter ? (
        <button
          className="right-10 absolute"
          onClick={(e) => deleteTweet(tweetInfomation.ref)}
        >
          delete
        </button>
      ) : (
        user.displayName === author && (
          <button
            className="right-10 absolute"
            onClick={(e) => deleteTweet(tweetInfomation.ref)}
          >
            delete
          </button>
        )
      )}

      {tweetInfomation.retweeter && (
        <p>{tweetInfomation.retweeter} Retweeted</p>
      )}

      <div className="flex gap-5 ">
        <div className="flex gap-5 ">
          <div className="image">
            <div className="min-w-[48px] min-h-[48px] bg-black rounded-3xl bg-cover bg-center bg-no-repeat"></div>
            {tweetInfomation.parentDocId !== id && <div className="line"></div>}
          </div>
        </div>
        <div>
          <div className="w-5/6">
            <Link to={`/${author}/status/${tweetInfomation.id}`}>
              <p className="username flex items-center gap-1 font-medium">
                {username}{' '}
                <span className="text-sm text-gray-500 font-thin">
                  @{author}
                </span>
              </p>
              {tweetInfomation.replyingTo && (
                <p className="text-sm">
                  replying to{' '}
                  <span className="text-blue-500">
                    @{tweetInfomation.replyingTo}
                  </span>
                </p>
              )}
              <p className="my-1">{tweetInfomation.tweet}</p>
              <div>
                {/* {tweetInfomation.images.map((imageURL) => {
                  return (
                    <img
                      alt=""
                      src={`${imageURL}`}
                      className="rounded-xl	my-4 border-gray-300 border"
                      key={uniqid()}
                    />
                  );
                })} */}
              </div>
            </Link>
            <div className="flex gap-20  py-2">
              <Link to={'/compose/tweet'}>
                <button
                  className=" text-black"
                  onClick={(e) => setReplyingTo(tweetInfomation)}
                >
                  <CommentsIcon />
                </button>
              </Link>
              <button
                className=" text-black flex gap-3"
                onClick={() => retweet()}
              >
                <RetweetIcon />
                {retweets?.length}
              </button>
              <button className=" text-black flex gap-3" onClick={() => like()}>
                <LikeIcon />
                {likes?.length}
              </button>
              <button className=" text-black flex gap-3">
                <ShareIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tweet;
