import React from 'react';
import useFollow from '../hooks/common/useFollow';

const FollowButton = ({ user }) => {
  const { follow, isFollowing } = useFollow(user);

  return (
    <button className="right-10 absolute" onClick={(e) => follow()}>
      {isFollowing ? 'following' : 'follow'}
    </button>
  );
};

export default FollowButton;
