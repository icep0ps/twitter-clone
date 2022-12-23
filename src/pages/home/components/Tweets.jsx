import React, { useEffect, useState, useContext } from 'react';
import Tweet from '../../../common/components/Tweet';
import { db } from '../../../firebase/firebase-config';
import Comment from '../../../common/components/Comment';
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { UserContext } from '../../../Context/UserContext';
import useFetchTweets from './../../../common/hooks/useFetchTweets';
import useFetchComment from '../../../common/hooks/useFetchComment';
import useFetchRetweet from '../../../common/hooks/useFetchRetweet';
import useFetchUsername from '../../../common/hooks/useFetchUsername';

//TODO :Try querying the data by type

const Tweets = () => {
  const { user } = useContext(UserContext);
  const [comment, getComment] = useFetchComment();
  const { getRetweet } = useFetchRetweet();
  const { getUsername } = useFetchUsername();
  const [isLoading, setIsLoading] = useState(true);
  const [tweets, setTweets] = useState([]);
  const [comments, setComments] = useState([]);
  const [retweets, setRetweets] = useState([]);

  const getFollowingTweets = async (id) => {
    const userFollowingRef = collection(db, 'users', `${id}`, 'following');
    const usersFollowing = await getDocs(userFollowingRef);
    usersFollowing.forEach(async (person) => {
      const { id } = person;
      const usersTweetsRef = query(
        collection(db, 'users', `${id}`, 'tweets'),
        where('type', '==', 'tweet')
      );

      onSnapshot(usersTweetsRef, (doc) => {
        const tweetsCollection = [];
        doc.forEach(async (tweet) => {
          const tweetData = tweet.data();
          tweetsCollection.push(tweetData);
        });
        setTweets(tweetsCollection);
      });
      const usersCommentsRef = query(
        collection(db, 'users', `${id}`, 'tweets'),
        where('type', '==', 'comment')
      );

      const comments = await getDocs(usersCommentsRef);
      const commentsCollection = [];
      comments.forEach(async (doc) => {
        const comment = await getComment(id, doc.data().id);
        commentsCollection.push(comment);
      });
      setComments(commentsCollection);

      const usersRetweetsRef = query(
        collection(db, 'users', `${id}`, 'tweets'),
        where('type', '==', 'retweet')
      );

      const retweets = await getDocs(usersRetweetsRef);
      const retweetsCollection = [];
      retweets.forEach(async (doc) => {
        const retweet = await getRetweet(id, doc.data().id);
        retweetsCollection.push(retweet);
      });
      setRetweets(retweetsCollection);
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
        return <Comment comment={comment} key={comment.comment.id} />;
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
