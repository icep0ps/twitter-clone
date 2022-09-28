import React, { useState, useContext } from 'react';
import { db } from '../../firebase/firebase-config';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { UserContext } from '../../Context/UserContext';
import uniqid from 'uniqid';

function Tweet() {
  const { user } = useContext(UserContext);
  const [tweetInput, setTweetInput] = useState('');

  const handleTweetInput = (event) => {
    setTweetInput(event.target.value);
  };

  const tweet = async () => {
    const TWEET_ID = uniqid();
    const tweetsRef = doc(db, 'users', `${user.uid}`, 'tweets', `${TWEET_ID}`);
    await setDoc(tweetsRef, {
      profileURL: user.photoURL,
      author: user.uid,
      tweet: tweetInput,
      likes: [],
      retweets: [],
      comments: [],
      date: Timestamp.now(),
    });
  };

  return (
    <div className="flex flex-col gap-3 relative  p-5 border-b border-gray-500 border-solid">
      <div className="flex gap-5">
        <div className="w-12 h-12 bg-black rounded-3xl"></div>
        <textarea
          type="text"
          placeholder="What's happening?"
          className="resize-none text-xl grow border-b border-grey outline-none"
          onChange={handleTweetInput}
        ></textarea>
      </div>
      <button
        className="p-2.5 bg-blue-500 text-white rounded-3xl w-20 self-end"
        onClick={tweet}
      >
        Tweet
      </button>
    </div>
  );
}

export default Tweet;
