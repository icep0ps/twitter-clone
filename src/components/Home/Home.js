import React, { useContext } from 'react';
import Tweet from './Tweet';
import Tweets from './Tweets/Tweets';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase-config';
import { UserContext } from '../../Context/UserContext';

const Home = () => {
  const { user } = useContext(UserContext);

  const userSignOut = () => {
    signOut(auth);
  };
  return (
    <div className="col-start-2 flex flex-col gap-5 border-x border-gray-500 border-solid">
      <h1 className="bg-black text-white text-xl p-4">Home</h1>
      <Tweet />
      <Tweets />
      <p>Your are logged with {user.email}</p>
      <button className="bg-black text-white" onClick={userSignOut}>
        Logout
      </button>
    </div>
  );
};

export default Home;
