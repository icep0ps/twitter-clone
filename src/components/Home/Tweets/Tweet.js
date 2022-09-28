import React, { useContext } from 'react';
import { arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase-config';
import { UserContext } from '../../../Context/UserContext';

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
    <div className="flex flex-col border-b border-gray-500 border-solid gap-3 p-5 relative">
      <button className="right-10 absolute">follow</button>
      <div className="flex gap-5 ">
        <div className="w-12 h-12 bg-black rounded-3xl"></div>
        <div>
          <p className="username flex items-center gap-1 ">
            {username}{' '}
            <span className="text-xs text-gray-500">@{username}</span>
          </p>
          <p>{tweet}</p>
        </div>
      </div>
      <div className="flex gap-2 justify-evenly">
        <button
          className="bg-blue-500 p-1 rounded-xl text-white"
          onClick={like}
        >
          Likes {likes.length}
        </button>
        <button className="bg-blue-500 p-1 rounded-xl text-white">
          Comment
        </button>
        <button
          className="bg-blue-500 p-1 rounded-xl text-white"
          onClick={retweet}
        >
          Retweet {retweets.length}
        </button>
      </div>
    </div>
  );
}

export default Tweet;
