import React, { useEffect, useState, useContext } from 'react';
import Tweet from '../../../common/components/Tweet';
import { db } from '../../../firebase/firebase-config';
import Comment from '../../../common/components/Comment';
import { collection, getDocs } from 'firebase/firestore';
import { UserContext } from '../../../Context/UserContext';
import useFetchFollowingTweets from '../../../common/hooks/useFetchFollowingTweets';

const Tweets = () => {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [tweets, getTweets, getRetweets, getComments] =
    useFetchFollowingTweets();

  const getFollowingTweets = async (id) => {
    const userFollowingRef = collection(db, 'users', `${id}`, 'following');
    const usersFollowing = await getDocs(userFollowingRef);
    usersFollowing.forEach(async (person) => {
      const { id } = person;
      await getTweets(id);
      await getRetweets(id);
      await getComments(id);
      console.log(
        'it wont load tweet status because you havent set the tweets in the userContext'
      );
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getFollowingTweets(user.uid);
  }, [user]);

  if (isLoading) {
    return <h1>Loading tweets...</h1>;
  }
  return (
    <div className="flex flex-col gap-3 relative ">
      {tweets.map((tweet) => {
        if (tweet.type === 'comment') {
          return <Comment tweet={tweet} />;
        }
        return (
          <div className=" flex flex-col border-b border-gray-500 border-solid pb-3 relative">
            <Tweet
              id={tweet.id}
              key={tweet.id}
              author={tweet.author}
              username={tweet.username}
              tweet={tweet.tweet.tweet}
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
