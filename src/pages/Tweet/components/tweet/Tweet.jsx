import Reply from './Reply';
import React, { useContext } from 'react';
import LikeIcon from '../../../../assets/svgs/LikeIcon';
import { db } from '../../../../firebase/firebase-config';
import ShareIcon from '../../../../assets/svgs/ShareIcon';
import { UserContext } from '../../../../Context/UserContext';
import RetweetIcon from '../../../../assets/svgs/RetweetIcon';
import CommentsIcon from '../../../../assets/svgs/CommentsIcon';
import {
  arrayUnion,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { Link, Outlet } from 'react-router-dom';

function Tweet(props) {
  const { id, author, username, tweet, tweetInfomation } = props;

  const { user } = useContext(UserContext);

  const isfollow = async () => {
    const userRef = doc(db, 'users', `${author}`, 'following', `${user.uid}`);
    const following = await getDoc(userRef);

    if (following.exists()) {
      await deleteDoc(userRef);
      return false;
    } else {
      await setDoc(userRef, {});
      return true;
    }
  };

  const like = async () => {
    const tweetRef = doc(db, 'users', `${author}`, 'tweets', `${id}`);
    await updateDoc(tweetRef, {
      likes: arrayUnion({
        id: user.uid,
      }),
    });
  };

  const retweet = async () => {
    const tweetRef = doc(db, 'users', `${author}`, 'tweets', `${id}`);
    await updateDoc(tweetRef, {
      retweets: arrayUnion({
        id: user.uid,
      }),
    });
    const yourTweetsRef = doc(db, 'users', `${user.uid}`, 'tweets', `${id}`);
    await setDoc(yourTweetsRef, tweetInfomation);
  };

  return (
    <>
      <div className="flex flex-col border-b border-gray-500 border-solid gap-3 px-5 pb-3 relative">
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <div className="w-12 h-12  bg-black rounded-3xl"></div>
            <button className="right-10 absolute" onClick={isfollow}>
              {isfollow() ? 'following' : 'unfollow'}
            </button>
            <Link to={`/profile/${author}`}>
              <p className="username flex items-center gap-1 ">
                {username}{' '}
                <span className="text-xs text-gray-500">@{username}</span>
              </p>
            </Link>
          </div>
          <div className="w-5/6">
            <p>{tweet}</p>
          </div>
        </div>

        <div className="flex gap-5 "></div>
        <div className="flex justify-start gap-3 border-y border-y-black py-4">
          <Link to={`/status/${id}/retweets`}>
            <p>{tweetInfomation.retweets.length} Retweets</p>
          </Link>
          <Link to={`/status/${id}/likes`}>
            <p>{tweetInfomation.likes.length} Likes</p>
          </Link>
        </div>
        <div className="flex gap-2 justify-evenly border-b border-b-black py-3">
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
