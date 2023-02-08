/* eslint-disable react-hooks/exhaustive-deps */
import { Author } from './tweet/Author';
import useFollow from '../hooks/common/useFollow';
import { DeleteButton } from './tweet/DeleteButton';
import React, { useEffect, useContext } from 'react';
import { TweetContents } from './tweet/TweetContents';
import { ProfilePicture } from './tweet/ProfilePicture';
import { UserContext } from '../../Context/UserContext';
import { InteractionIcons } from './tweet/InteractionIcons';

function Tweet({ id, author, tweetRef, retweeter, tweetData }) {
  const { isFollowing } = useFollow(author.id);
  const { setCurrentTweetBiengViewed, setReplyingTo, user } = useContext(UserContext);

  useEffect(() => {}, [isFollowing]);

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
          <InteractionIcons setReplyingTo={setReplyingTo} tweetData={tweetData} />
        </div>
      </div>
    </div>
  );
}

export default Tweet;
