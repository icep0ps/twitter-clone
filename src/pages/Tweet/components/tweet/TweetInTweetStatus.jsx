import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';

import Reply from './Reply';
import { Stats } from './Stats';
import { TweetContents } from './TweetContents';
import AppContext from '../../../../Context/AppContext';
import { Author } from '../../../../common/components/tweet/Author';
import FollowButton from '../../../../common/components/FollowButton';
import useFetchStats from '../../../../common/hooks/tweets/useFetchStats';
import { ProfilePicture } from '../../../../common/components/tweet/ProfilePicture';
import { InteractionIcons } from '../../../../common/components/tweet/InteractionIcons';

function TweetInTweetStatus(props) {
  const { tweetData, tweetRef } = props;
  const { ref, date, id, author } = tweetData;

  const { user, setReplyingTo } = useContext(AppContext);
  const { likes, retweets } = useFetchStats(tweetRef);
  const { displayName } = user;

  return (
    <>
      <div className="flex flex-col border-b border-gray-200 border-solid gap-3 px-5 pb-3 relative">
        <div className="flex flex-col gap-3 ">
          <div className="flex gap-3">
            <ProfilePicture />
            {displayName !== author.id && <FollowButton user={author} />}
            <Author author={author} inStatus />
          </div>
          <TweetContents tweetData={tweetData} />
        </div>
        <p className="text-gray-400 text-sm">{date.toDate().toDateString()}</p>
        <div className="flex gap-5"></div>
        <Stats id={id} author={author} likes={likes.length} retweets={retweets.length} />
        <div className="flex gap-2 justify-evenly border-b border-b-gray-200 py-3">
          <InteractionIcons setReplyingTo={setReplyingTo} tweet={tweetData} />
        </div>
        <Reply id={id} author={author} username={displayName} parentTweetRef={ref} />
      </div>
      <Outlet />
    </>
  );
}

export default TweetInTweetStatus;
