/* eslint-disable react-hooks/exhaustive-deps */
import { Author } from './tweet/Author';
import useFollow from '../hooks/common/useFollow';
import { DeleteButton } from './tweet/DeleteButton';
import React, { useEffect, useContext } from 'react';
import { TweetContents } from './tweet/TweetContents';
import { ProfilePicture } from './tweet/ProfilePicture';
import { UserContext } from '../../Context/UserContext';
import { InteractionIcons } from './tweet/InteractionIcons';
import useFetchStats from '../hooks/tweets/useFetchStats';

function Tweet({ id, author, tweetRef, retweeter, tweetData }) {
  const { isFollowing } = useFollow(author.id);
  const { likes, comments, retweets, getLikes } = useFetchStats(tweetRef);
  const { setCurrentTweetBiengViewed, setReplyingTo, user } = useContext(UserContext);

  useEffect(() => {
    getLikes(tweetRef);
  }, [isFollowing]);

  return (
    <div
      className="tweet flex flex-col gap-3 px-5 relative"
      onClick={() => setCurrentTweetBiengViewed(tweetData)}
    >
      {user.displayName === retweeter ||
        (user.displayName === author.id && <DeleteButton tweetRef={tweetRef} />)}
      {retweeter && <p>{retweeter} Retweeted</p>}

      <div className="flex gap-5 ">
        <ProfilePicture id={id} parentTweet={tweetData.parentTweet} />
        <div className="w-5/6">
          <Author author={author} tweetId={id} />
          <TweetContents tweetData={tweetData} />
          <InteractionIcons
            setReplyingTo={setReplyingTo}
            tweet={tweetData}
            likes={likes.length}
            comments={comments.length}
            retweets={retweets.length}
          />
        </div>
      </div>
    </div>
  );
}

export default Tweet;
