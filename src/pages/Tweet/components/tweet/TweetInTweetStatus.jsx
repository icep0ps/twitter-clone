import { TweetContents } from './TweetContents';
import { Stats } from './Stats';
/* eslint-disable react-hooks/exhaustive-deps */
import Reply from './Reply';
import { Outlet } from 'react-router-dom';
import { UserContext } from '../../../../Context/UserContext';
import React, { useContext, useEffect } from 'react';
import useFollow from '../../../../common/hooks/common/useFollow';
import { InteractionIcons } from '../../../../common/components/tweet/InteractionIcons';
import { Author } from '../../../../common/components/tweet/Author';
import { ProfilePicture } from '../../../../common/components/tweet/ProfilePicture';

function TweetInTweetStatus({ id, author, tweetData }) {
  const { ref, date } = tweetData;
  const { user } = useContext(UserContext);
  const { displayName } = user;
  const { follow, isFollowing } = useFollow(author);

  useEffect(() => {}, [isFollowing]);

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
        <Stats id={id} author={author} />
        <div className="flex gap-2 justify-evenly border-b border-b-gray-200 py-3">
          <InteractionIcons></InteractionIcons>
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
