import { signOut } from 'firebase/auth';
import Tweets from './components/Tweets';
import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CreateTweet from './components/CreateTweet';
import { auth } from '../../firebase/firebase-config';
import { UserContext } from '../../Context/UserContext';

const Home = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const userSignOut = () => {
    signOut(auth);
    navigate('/sign-in');
  };
  return (
    <div className="col-start-2 flex flex-col gap-5 border-x border-gray-500 border-solid">
      <h1 className="bg-black text-white text-xl p-4">Home</h1>
      <CreateTweet type={'tweet'} />
      <Tweets />
      <p>Your are logged with {user.email}</p>
      <button className="bg-black text-white" onClick={userSignOut}>
        Logout
      </button>
      <Outlet></Outlet>
    </div>
  );
};

export default Home;
