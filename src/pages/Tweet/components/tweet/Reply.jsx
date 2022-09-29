import uniqid from 'uniqid';
import React, { useState, useContext } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { db } from '../../../../firebase/firebase-config';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { UserContext } from '../../../../Context/UserContext';

function Reply({ username }) {
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
      username: user.displayName,
      author: user.uid,
      tweet: tweetInput,
      likes: [],
      retweets: [],
      comments: [],
      date: Timestamp.now(),
    });
  };

  return (
    <div className="flex flex-col relative px-5 pb ">
      <div className="flex gap-5 items-center">
        <div className="w-12 h-12  bg-black rounded-3xl"></div>
        <div>
          <p>Replying to @{username}</p>
          <TextareaAutosize
            type="text"
            placeholder="Tweet Your Reply?"
            className="resize-none text-xl grow outline-none py-3"
            onChange={handleTweetInput}
          />
        </div>
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

export default Reply;
