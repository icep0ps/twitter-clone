import React from 'react';
import Tweet from '../../../../common/components/Tweet';
import Comment from '../../../../common/components/Comment';
import useFetchLikes from '../../../../common/hooks/useFetchLikes';
import { useEffect } from 'react';

const Likes = ({ id }) => {
  const { likedTweets, getLikes } = useFetchLikes();

  async function getLikedTweets() {
    await getLikes(id);
  }

  useEffect(() => {
    getLikedTweets();
  }, [id]);

  return likedTweets.map((tweet) => {
    return (
      <div className=" flex flex-col border-b border-gray-500 border-solid p-3 relative">
        {tweet.type === 'comment' ? (
          <Comment comment={tweet} />
        ) : (
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
        )}
      </div>
    );
  });
};

export default Likes;
