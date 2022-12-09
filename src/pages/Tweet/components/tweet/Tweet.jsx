import Reply from './Reply';
import React, { useContext } from 'react';
import LikeIcon from '../../../../assets/svgs/LikeIcon';
import { db } from '../../../../firebase/firebase-config';
import ShareIcon from '../../../../assets/svgs/ShareIcon';
import { UserContext } from '../../../../Context/UserContext';
import RetweetIcon from '../../../../assets/svgs/RetweetIcon';
import CommentsIcon from '../../../../assets/svgs/CommentsIcon';
import { arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';
import useFollow from '../../../../common/hooks/useFollow';
import { Link, Outlet } from 'react-router-dom';

function Tweet(props) {
  const { user } = useContext(UserContext);
  const { id, author, username, tweet, tweetInfomation } = props;
  const { follow, isFollowing } = useFollow(author);

  const like = async () => {
    const tweetRef = doc(db, 'users', `${author}`, 'tweets', `${id}`);
    await updateDoc(tweetRef, {
      likes: arrayUnion({
        id: user.displayName,
      }),
    });
  };

  const retweet = async () => {
    const tweetRef = doc(db, 'users', `${author}`, 'tweets', `${id}`);
    await updateDoc(tweetRef, {
      retweets: arrayUnion({
        id: user.displayName,
      }),
    });
    const yourTweetsRef = doc(
      db,
      'users',
      `${user.displayName}`,
      'retweets',
      `${id}`
    );
    await setDoc(yourTweetsRef, tweetInfomation);
  };

  return (
    <>
      <div className="flex flex-col border-b border-gray-200 border-solid gap-3 px-3 pb-3 relative">
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <div className="w-12 h-12  bg-black rounded-3xl"></div>
            {user.displayName !== author && (
              <button className="right-10 absolute" onClick={(e) => follow()}>
                {isFollowing ? 'following' : 'follow'}
              </button>
            )}
            <Link to={`/profile/${author}`}>
              <p className="username flex items-center gap-1 font-semibold">
                {username}{' '}
              </p>
              <p className=" text-sm text-gray-500">@{username}</p>
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
            <p className="text-xl">{tweet}</p>
          </div>
        </div>
        <p className="text-gray-400 text-sm">
          {tweetInfomation.date.toDate().toDateString()}
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
        <Reply username={username} author={author} id={id}></Reply>
      </div>
      <Outlet />
    </>
  );
}

export default Tweet;
