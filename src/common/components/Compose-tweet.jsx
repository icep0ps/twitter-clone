import React, { Fragment, useContext } from 'react';

import Tweet from './Tweet';
import AppContext from '../../Context/AppContext';
import Reply from '../../pages/Tweet/components/tweet/Reply';
import CreateTweet from '../../pages/home/components/Create-tweet';

function ComposeTweet() {
  const {
    replyingTo,
    setReplyingTo,
    setComposeComponentIsToggled,
    composeComponentIsToggled,
  } = useContext(AppContext);

  return (
    <div
      className={
        ' w-full h-full bg-black right-0 left-0 flex justify-center pt-28 z-10' +
        `${composeComponentIsToggled ? ' bg-opacity-40 fixed' : ' bg-opacity-0 hidden'}`
      }
    >
      <div
        className=" h-fit w-4/12 rounded-xl py-4 bg-white"
        hidden={!composeComponentIsToggled}
      >
        <span
          onClick={() => {
            setReplyingTo(null);
            setComposeComponentIsToggled((state) => !state);
          }}
          className="p-4"
        >
          Close
        </span>
        {replyingTo ? (
          <Fragment>
            <Tweet tweetData={replyingTo} tweetRef={replyingTo.ref} />
            <Reply
              id={replyingTo.id}
              author={replyingTo.author}
              username={replyingTo.username}
              parentTweetRef={replyingTo.ref}
            />
          </Fragment>
        ) : (
          <CreateTweet />
        )}
      </div>
    </div>
  );
}

export default ComposeTweet;
