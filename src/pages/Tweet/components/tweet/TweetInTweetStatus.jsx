/* eslint-disable react-hooks/exhaustive-deps */
import Reply from './Reply';
import { Stats } from './Stats';
import { Outlet } from 'react-router-dom';
import { TweetContents } from './TweetContents';
import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../../../Context/UserContext';
import useFollow from '../../../../common/hooks/common/useFollow';
import { Author } from '../../../../common/components/tweet/Author';
import { InteractionIcons } from '../../../../common/components/tweet/InteractionIcons';
import { ProfilePicture } from '../../../../common/components/tweet/ProfilePicture';
import useFetchStats from '../../../../common/hooks/tweets/useFetchStats';

function TweetInTweetStatus({ id, author, tweetData }) {
  const { likes, retweets, getLikes } = useFetchStats();
  const { ref, date } = tweetData;
  const { user, setReplyingTo } = useContext(UserContext);
  const { displayName } = user;
  const { follow, isFollowing } = useFollow(author);

  useEffect(() => {
    getLikes(ref);
  }, [isFollowing]);

  return (
    <>
      <div className="flex flex-col border-b border-gray-200 border-solid gap-3 px-5 pb-3 relative">
        <div className="flex flex-col gap-3 ">
          <div className="flex gap-3">
            <ProfilePicture></ProfilePicture>
            {displayName !== author.id && (
              <button className="right-10 absolute" onClick={(e) => follow()}>
                {isFollowing ? 'following' : 'follow'}
              </button>
            )}
            <Author author={author} inStatus></Author>
          </div>
          <TweetContents tweetData={tweetData} />
        </div>
        <p className="text-gray-400 text-sm">{date.toDate().toDateString()}</p>
        <div className="flex gap-5"></div>
        <Stats id={id} author={author} likes={likes.length} retweets={retweets.length} />
        <div className="flex gap-2 justify-evenly border-b border-b-gray-200 py-3">
          <InteractionIcons
            setReplyingTo={setReplyingTo}
            tweet={tweetData}
          ></InteractionIcons>
        </div>
        <Reply
          id={id}
          author={author}
          username={displayName}
          parentTweetRef={ref}
        ></Reply>
      </div>
      <Outlet />
    </>
  );
}

export default TweetInTweetStatus;
