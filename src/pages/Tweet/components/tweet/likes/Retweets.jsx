import React, { useContext } from 'react';
import uniqid from 'uniqid';
import User from '../../../../../common/components/User';
import { UserContext } from '../../../../../Context/UserContext';

const Retweets = () => {
  const { currentTweetBiengViewed } = useContext(UserContext);

  return (
    <div className="absolute top-1/4 self-center bg-blue-500 flex flex-col gap-3 p-5">
      {currentTweetBiengViewed.likes.map((user) => (
        <User username={user.id} key={uniqid()} />
      ))}
    </div>
  );
};

export default Retweets;
