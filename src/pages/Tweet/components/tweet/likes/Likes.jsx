import User from './User';
import React, { useContext } from 'react';
import { UserContext } from '../../../../../Context/UserContext';

const Likes = () => {
  const { currentTweet } = useContext(UserContext);

  return (
    <div className="absolute top-1/4 self-center bg-blue-500 flex flex-col gap-3 p-5">
      {currentTweet.likes.map((user) => (
        <User username={user.id} />
      ))}
    </div>
  );
};

export default Likes;
