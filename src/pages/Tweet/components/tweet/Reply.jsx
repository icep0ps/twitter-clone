import uniqid from 'uniqid';
import React, { useState, useContext } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { db } from '../../../../firebase/firebase-config';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { UserContext } from '../../../../Context/UserContext';
import { COMMENT } from '../../../../common/helpers/types';

function Reply({ username, author, id }) {
  const { user } = useContext(UserContext);
  const [tweetInput, setTweetInput] = useState('');

  const handleTweetInput = (event) => {
    setTweetInput(event.target.value);
  };

  const tweet = async () => {
    const TWEET_ID = uniqid();
    const replyRef = doc(
      db,
      'users',
      `${user.displayName}`,
      'tweets',
      `${TWEET_ID}`
    );
    const tweetCommentsRef = doc(
      db,
      'users',
      `${author}`,
      'tweets',
      `${id}`,
      'comments',
      `${TWEET_ID}`
    );

    await setDoc(replyRef, {
      type: COMMENT,
      author: author,
      id: TWEET_ID,
      orignalPost: id,
    });

    await setDoc(tweetCommentsRef, {
      id: TWEET_ID,
      replyingTo: author,
      type: COMMENT,
      profileURL: user.photoURL,
      username: user.displayName,
      author: user.displayName,
      tweet: tweetInput,
      parentDocId: id,
      likes: [],
      retweets: [],
      date: Timestamp.now(),
    });
  };

  return (
    <div className="flex flex-col relative px-5 pb ">
      <div className="flex gap-5 items-start ">
        <div className="min-w-[48px] min-h-[48px]  bg-black rounded-3xl"></div>
        <div className="w-full">
          <p className="text-sm">
            Replying to <span className="text-blue-500">@{username}</span>
          </p>
          <TextareaAutosize
            cols="35"
            type="text"
            placeholder="Tweet Your Reply?"
            className="resize-none text-xl grow outline-none py-3"
            onChange={() => handleTweetInput()}
          />
        </div>
      </div>
      <button
        className="p-2.5 bg-blue-500 text-white rounded-3xl w-20 self-end"
        onClick={() => tweet()}
      >
        Tweet
      </button>
    </div>
  );
}

export default Reply;
