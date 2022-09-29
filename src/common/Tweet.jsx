import React, { useContext } from 'react';
import CommentsIcon from '../assets/svgs/CommentsIcon';
import { arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
import LikeIcon from '../assets/svgs/LikeIcon';
import { UserContext } from '../Context/UserContext';
import RetweetIcon from '../assets/svgs/RetweetIcon';
import ShareIcon from '../assets/svgs/ShareIcon';
import { Link } from 'react-router-dom';
function Tweet({
  id,
  author,
  username,
  tweet,
  likes,
  retweets,
  tweetInfomation,
}) {
  const { user } = useContext(UserContext);

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
    <Link to={`/status/${id}`}>
      <div className="flex flex-col border-b border-gray-500 border-solid gap-3 px-5 pb-3 relative">
        <button className="right-10 absolute">follow</button>
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
    </Link>
  );
}

export default Tweet;
