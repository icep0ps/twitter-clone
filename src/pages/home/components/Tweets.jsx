import Tweet from '../../../common/components/Tweet';
import React, { useEffect, useContext, useState } from 'react';
import { db } from '../../../firebase/firebase-config';
import { UserContext } from '../../../Context/UserContext';
import {
  getDocs,
  onSnapshot,
  collection,
  doc,
  getDoc,
} from 'firebase/firestore';
import useFetchTweets from '../../../common/hooks/useFetchTweets';

const Tweets = () => {
  let originalTweet = undefined;
  const [isLoading, setIsLoading] = useState(true);
  const { user, tweets, setTweets } = useContext(UserContext);

  const getTweets = async (user_id) => {
    const usersTweetsRef = collection(db, 'users', `${user_id}`, 'tweets');
    onSnapshot(usersTweetsRef, (doc) => {
      doc.forEach(async (tweet) => {
        setTweets((prevState) => prevState.concat(tweet.data()));
      });
    });
  };

  const getRetweets = async (user_id) => {
    const usersRetweetsRef = collection(db, 'users', `${user_id}`, 'retweets');
    onSnapshot(usersRetweetsRef, (docs) => {
      docs.forEach(async (tweet) => {
        const { author, id, retweeter } = tweet.data();
        const usersTweetsRef = doc(db, 'users', `${author}`, 'tweets', `${id}`);
        const data = await getDoc(usersTweetsRef);
        const retweet = Object.assign({ retweeter: retweeter }, data.data());
        setTweets((prevState) => prevState.concat(retweet));
      });
    });
  };

  const getComments = async (user_id) => {
    const tweetRef = collection(db, 'users', `${user_id}`, 'replies');
    onSnapshot(tweetRef, (replies) => {
      replies.forEach(async (reply) => {
        const { id, author, orignalPost } = reply.data();
        const commentRef = doc(
          db,
          'users',
          `${author}`,
          'tweets',
          `${orignalPost}`,
          'comments',
          `${id}`
        );
        await getMainTweet(author);
        const comment = await getDoc(commentRef);
        setTweets((prev) => [
          ...prev,
          {
            type: 'comment',
            tweet: originalTweet,
            comment: comment.data(),
          },
        ]);
      });
    });
  };

  const getMainTweet = async (user_id) => {
    const usersTweetsRef = collection(db, 'users', `${user_id}`, 'tweets');
    onSnapshot(usersTweetsRef, (tweets) => {
      tweets.forEach(async (tweet) => {
        const tweetInformation = tweet.data();
        originalTweet = tweetInformation;
      });
    });
  };

  const getFollowingTweets = async (id) => {
    const userFollowingRef = collection(db, 'users', `${id}`, 'following');
    const following = await getDocs(userFollowingRef);
    following.forEach(async (person) => {
      await getTweets(person.id);
      await getRetweets(person.id);
      await getComments(person.id);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getFollowingTweets(user.uid);
    return () => {
      setTweets([]);
    };
  }, [user]);

  if (isLoading) {
    return <h1>Loading tweets...</h1>;
  } else {
    return (
      <div className="flex flex-col gap-3 relative ">
        {tweets.map((tweet) => {
          if (tweet.type === 'comment') {
            return (
              <div className=" flex flex-col border-b border-gray-500 border-solid pb-3 relative">
                <Tweet
                  id={tweet.tweet.id}
                  key={tweet.tweet.id}
                  type="comment"
                  author={tweet.tweet.author}
                  username={tweet.tweet.username}
                  tweet={tweet.tweet.tweet.tweet}
                  likes={tweet.tweet.likes}
                  retweets={tweet.tweet.retweets}
                  tweetInfomation={tweet.tweet}
                />
                <Tweet
                  id={tweet.comment.id}
                  key={tweet.comment.id}
                  author={tweet.comment.author}
                  username={tweet.comment.username}
                  tweet={tweet.comment.tweet.tweet}
                  likes={tweet.comment.likes}
                  retweets={tweet.comment.retweets}
                  tweetInfomation={tweet.comment}
                />
              </div>
            );
          } else {
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
          }
        })}
      </div>
    );
  }
};

export default Tweets;
