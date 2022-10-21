import { useParams, useLocation } from 'react-router-dom';
import Tweet from './components/tweet/Tweet';
import { UserContext } from '../../Context/UserContext';
import React, { useContext, useEffect, useState } from 'react';
import Comments from './components/comments/Comments';
import { COMMENT } from '../../common/helpers/types';
import useFetchTweet from '../../common/hooks/useFetchTweet';
import useFetchComment from '../../common/hooks/useFetchComment';
import Comment from '../../common/components/Comment';

function TweetStatus({ currentTweetBiengViewed }) {
  let location = useLocation();
  const { author, id } = useParams();
  const { user } = useContext(UserContext);
  const { tweet, getTweet } = useFetchTweet();
  const [comment, getComment] = useFetchComment();
  const [isLoading, setIsLoading] = useState(true);

  const fetchComments = async () => {
    const {
      type,
      author: currentAuthor,
      id: currentID,
    } = currentTweetBiengViewed;
    type === COMMENT && (await getComment(currentAuthor, currentID));
    console.log('loaction changed');
    await getTweet(author, id).then(() => setIsLoading(false));
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
        {currentTweetBiengViewed.type === COMMENT ? (
          <Comment tweet={comment}></Comment>
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
        ></Comments>
        <p>Your are logged with {user.email}</p>
        <button className="bg-black text-white">Logout</button>
      </div>
    );
  }
}

export default TweetStatus;
