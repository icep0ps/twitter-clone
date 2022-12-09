import uniqid from 'uniqid';
import React, { useState, useContext } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { db } from '../../../firebase/firebase-config';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { UserContext } from '../../../Context/UserContext';
import { TWEET } from '../../../common/helpers/types';
import { COMMENT } from '../../../common/helpers/types';

function CreateTweet(tweet = { type: 'tweet' }) {
  const { user } = useContext(UserContext);
  const [tweetInfo, setTweetInfo] = useState();
  const [tweetInput, setTweetInput] = useState('');

  const handleTweetInput = (event) => {
    setTweetInput(event.target.value);
  };

  const sendTweet = async () => {
    const TWEET_ID = uniqid();
    console.log(tweet.type);
    switch (tweet.type) {
      case 'tweet':
        const usersTweetsRef = doc(
          db,
          'users',
          `${user.displayName}`,
          'tweets',
          `${TWEET_ID}`
        );
        await setDoc(usersTweetsRef, {
          id: TWEET_ID,
          type: TWEET,
          author: user.displayName,
          profileURL: user.photoURL,
          username: user.displayName,
          tweet: tweetInput,
          likes: [],
          retweets: [],
          date: Timestamp.now(),
        });
        break;
      case 'comment':
        setTweetInfo(tweet);
        const { id, author } = tweetInfo;
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
          likes: [],
          retweets: [],
          comments: [],
          date: Timestamp.now(),
        });
        break;
      default:
        return;
    }
  };

  return (
    <div className="flex flex-col gap-3 relative px-5 pb-3 border-b border-gray-200 border-solid">
      <div className="flex gap-5">
        <div className="w-12 h-12  bg-black rounded-3xl"></div>
        {tweet.type === 'comment' && <p>Replying to @{tweetInfo.username}</p>}
        <TextareaAutosize
          type="text"
          placeholder="What's happening?"
          className="resize-none text-xl grow border-b border-grey outline-none py-3"
          onChange={handleTweetInput}
        />
      </div>
      <button
        className="p-2.5 bg-blue-500 text-white rounded-3xl w-20 self-end"
        onClick={sendTweet}
      >
        Tweet
      </button>
    </div>
  );
}

export default CreateTweet;
