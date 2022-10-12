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

const Tweets = () => {
  let originalTweet = undefined;
  const [isLoading, setIsLoading] = useState(true);
  const { user, tweets, setTweets } = useContext(UserContext);

  const getTweets = async (user_id) => {
    const usersTweetsRef = collection(db, 'users', `${user_id}`, 'tweets');
    onSnapshot(usersTweetsRef, (doc) => {
      const tweetsCollection = [];
      doc.forEach(async (tweet) => {
        const tweetInformation = tweet.data();
        const { type, retweeter } = tweetInformation;
        switch (type) {
          case 'retweet':
            getRetweets(tweetInformation, retweeter);
            break;
          case 'tweet':
            console.log(tweetInformation);
            tweetsCollection.push(tweetInformation);
            break;
          default:
            return;
        }
        setTweets(tweetsCollection);
      });
    });
  };

  const getRetweets = async (tweet, retweeter) => {
    const tweetRef = doc(
      db,
      'users',
      `${tweet.author}`,
      'tweets',
      `${tweet.id}`
    );
    onSnapshot(tweetRef, (doc) => {
      const tweet = doc.data();
      const { id } = tweet;
      const retweet = Object.assign({ retweetedBy: retweeter }, tweet);
      setTweets((prev) => {
        if (prev) {
          const updated = prev.filter((tweet) => tweet.id !== id);
          return updated.concat(retweet);
        } else {
          return tweets.concat(retweet);
        }
      });
    });
  };

  const getComments = async (author) => {
    const tweetRef = collection(db, 'users', `${author}`, 'replies');
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
    onSnapshot(usersTweetsRef, (doc) => {
      doc.forEach(async (tweet) => {
        const tweetInformation = tweet.data();
        const { type, retweeter } = tweetInformation;
        switch (type) {
          case 'retweet':
            getRetweets(tweetInformation, retweeter);
            break;
          case 'tweet':
            originalTweet = tweetInformation;
            break;
          default:
            return;
        }
      });
    });
  };

  const getFollowingTweets = async () => {
    const userFollowingRef = collection(
      db,
      'users',
      `${user.uid}`,
      'following'
    );
    const following = await getDocs(userFollowingRef);
    following.forEach(async (person) => {
      await getTweets(person.id);
      await getComments(person.id);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getFollowingTweets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (isLoading) {
    return <h1>Loading tweets...</h1>;
  } else {
    return (
      <div className="flex flex-col gap-3 relative ">
        {tweets.map((tweet) => {
          if (tweet.type === 'comment') {
            return (
              <>
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
              </>
            );
          } else {
            return (
              <Tweet
                id={tweet.id}
                key={tweet.id}
                author={tweet.author}
                username={tweet.username}
                tweet={tweet.tweet.tweet}
                likes={tweet.likes}
                retweets={tweet.retweets}
                tweetInfomation={tweet.tweet}
              />
            );
          }
        })}
      </div>
    );
  }
};

export default Tweets;
