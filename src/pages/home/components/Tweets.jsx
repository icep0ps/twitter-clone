/* eslint-disable react-hooks/exhaustive-deps */
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState, useContext } from 'react';
import Tweet from '../../../common/components/Tweet';
import { db } from '../../../firebase/firebase-config';
import Comment from '../../../common/components/Comment';
import { UserContext } from '../../../Context/UserContext';
import useFetchTweets from '../../../common/hooks/useFetchTweets';

const Tweets = () => {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const { tweets, comments, retweets, getTweets } = useFetchTweets();
  const getFollowingTweets = async (id) => {
    const userFollowingRef = collection(db, 'users', `${id}`, 'following');
    const usersFollowing = await getDocs(userFollowingRef);
    usersFollowing.forEach(async (person) => {
      const { id } = person;
      await getTweets(id);
    });
    setIsLoading(false);
  };

  useEffect(() => {
    getFollowingTweets(user.displayName).then(() => {});
  }, [user]);

  if (isLoading) {
    return <h1>Loading tweets...</h1>;
  }

  return (
    <div className="flex flex-col gap-3 relative ">
      {comments.map((comment) => {
        return <Comment comment={comment} key={comment.id} />;
      })}

      {[...tweets, ...retweets].map((tweet) => {
        return (
          <div
            className=" flex flex-col border-b border-gray-200 border-solid pb-3 relative"
            key={tweet.id}
          >
            <Tweet
              id={tweet.id}
              key={tweet.id}
              author={tweet.author}
              username={tweet.username}
              likes={tweet.likes}
              retweets={tweet.retweets}
              tweetInfomation={tweet}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Tweets;
