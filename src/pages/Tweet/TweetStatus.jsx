import { useParams } from 'react-router-dom';
import Tweet from './components/tweet/Tweet';
import { UserContext } from '../../Context/UserContext';
import React, { useContext, useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firebase-config';
import Comments from './components/comments/Comments';

function TweetStatus() {
  const { id } = useParams();
  const [tweet, setTweet] = useState({});
  const [renderComponent, setRenderComponent] = useState(false);
  const { tweets, user, setCurrentTweet } = useContext(UserContext);

  const searchForTweet = async () => {
    tweets.forEach(async (tweet) => {
      if (tweet.id === id) {
        setTweet(tweet);
        setCurrentTweet(tweet);
      }
      const tweetRef = doc(
        db,
        'users',
        `${tweet.author}`,
        'tweets',
        `${tweet.id}`
      );
      onSnapshot(tweetRef, (tweet) => {
        setTweet(tweet.data());
      });
    });
  };

  const isTweetInfoReady = () => {
    // eslint-disable-next-line no-unused-expressions
    tweet.likes ? setRenderComponent(true) : false;
  };

  useEffect(() => {
    searchForTweet();
    isTweetInfoReady();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tweet, renderComponent]);

  if (renderComponent) {
    return (
      <div className="col-start-2 flex flex-col gap-5 border-x border-gray-500 border-solid">
        <h1 className="bg-black text-white text-xl p-4">Tweet</h1>
        <Tweet
          id={id}
          username={tweet.username}
          author={tweet.author}
          tweet={tweet.tweet}
          likes={tweet.likes}
          retweets={tweet.retweets}
          tweetInfomation={tweet}
          type={tweet.type}
        ></Tweet>
        <Comments author={tweet.author} id={id}></Comments>
        <p>Your are logged with {user.email}</p>
        <button className="bg-black text-white">Logout</button>
      </div>
    );
  }
}

export default TweetStatus;