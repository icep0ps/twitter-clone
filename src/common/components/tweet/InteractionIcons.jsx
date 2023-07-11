import React, { useContext } from 'react';
import AppContext from '../../../Context/AppContext';

import LikeIcon from '../../../assets/svgs/LikeIcon';
import ShareIcon from '../../../assets/svgs/ShareIcon';
import RetweetIcon from '../../../assets/svgs/RetweetIcon';
import CommentsIcon from '../../../assets/svgs/CommentsIcon';

export function InteractionIcons(props) {
  const { tweet, likes, comments, retweets } = props;
  const { setReplyingTo, setComposeComponentIsToggled } = useContext(AppContext);

  return (
    <div className="flex gap-20  py-2 w-3/4 justify-between">
      <button
        className=" text-black flex gap-3"
        onClick={() => {
          setReplyingTo(tweet);
          setComposeComponentIsToggled((state) => !state);
        }}
      >
        <CommentsIcon />
        {comments}
      </button>
      <button className=" text-black flex gap-3" onClick={() => tweet.retweet()}>
        <RetweetIcon />
        {retweets}
      </button>
      <button className=" text-black flex gap-3" onClick={() => tweet.like()}>
        <LikeIcon />
        {likes}
      </button>
      <button className=" text-black flex gap-3">
        <ShareIcon />
      </button>
    </div>
  );
}
