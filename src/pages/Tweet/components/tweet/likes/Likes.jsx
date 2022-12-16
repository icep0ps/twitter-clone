import React, { useContext } from 'react';
import User from '../../../../../common/components/User';
import { UserContext } from '../../../../../Context/UserContext';
import uniqid from 'uniqid';

const Likes = () => {
  const { currentTweetBiengViewed } = useContext(UserContext);

  return (
    <div className="absolute top-1/4 self-center bg-blue-500 flex flex-col gap-3 p-5">
      {currentTweetBiengViewed.likes.map((user) => (
        <User username={user.id} key={uniqid()} />
      ))}
    </div>
  );
};

export default Likes;
