import { useParams, useLocation } from 'react-router-dom';
import Tweet from './components/tweet/Tweet';
import { UserContext } from '../../Context/UserContext';
import React, { useContext, useEffect, useState } from 'react';
import Comments from './components/comments/Comments';
import useFetchTweet from '../../common/hooks/useFetchTweet';
import Comment from '../../common/components/Comment';
import Reply from './components/tweet/Reply';

function TweetStatus() {
  let location = useLocation();
  const { author, id } = useParams();
  const { user } = useContext(UserContext);
  const { tweet, getTweet } = useFetchTweet();
  const [isLoading, setIsLoading] = useState(true);

  const fetchComments = async () => {
    await getTweet(author, id);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, [location]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className="col-start-2 flex flex-col gap-5 border-x border-gray-500 border-solid">
        <h1 className="bg-black text-white text-xl p-4">Tweet</h1>
        {tweet.type === 'comment' ? (
          <>
            <Comment comment={tweet}></Comment>
            <Reply
              id={tweet.tweet.id}
              username={tweet.tweet.username}
              author={tweet.tweet.author}
            ></Reply>
          </>
        ) : (
          <Tweet
            id={id}
            key={id}
            username={tweet.username}
            author={tweet.author}
            tweet={tweet.tweet}
            likes={tweet.likes}
            retweets={tweet.retweets}
            tweetInfomation={tweet}
            type={tweet.type}
          ></Tweet>
        )}
        <Comments
          id={id}
          key={'comments'}
          author={tweet.author}
          tweetInfomation={tweet}
          location={location}
        ></Comments>
        <p>Your are logged with {user.email}</p>
        <button className="bg-black text-white">Logout</button>
      </div>
    );
  }
}

export default TweetStatus;
