/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';

import { Author } from './tweet/Author';
import AppContext from '../../Context/AppContext';
import { DeleteButton } from './tweet/DeleteButton';
import { TweetContents } from './tweet/TweetContents';
import { ProfilePicture } from './tweet/ProfilePicture';
import useFetchStats from '../hooks/tweets/useFetchStats';
import { InteractionIcons } from './tweet/InteractionIcons';

function Tweet(props) {
  const { tweetData, tweetRef } = props;
  const { id, author, retweeter } = tweetData;
  const { likes, comments, retweets } = useFetchStats(tweetRef);
  const { user } = useContext(AppContext);

  return (
    <div className="tweet flex flex-col gap-3 px-5 relative">
      {user.displayName === retweeter ||
        (user.displayName === author.id && <DeleteButton tweetRef={tweetRef} />)}
      {retweeter && <p>{retweeter} Retweeted</p>}

      <div className="flex gap-5 ">
        <ProfilePicture id={id} parentTweet={tweetData?.parentTweet} />
        <div className="w-5/6">
          <Author author={author} tweetId={id} />
          <TweetContents tweetData={tweetData} />
          <InteractionIcons
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
