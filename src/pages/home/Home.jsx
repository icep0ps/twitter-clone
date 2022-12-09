import Tweets from './components/Tweets';
import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import CreateTweet from './components/CreateTweet';
import { UserContext } from '../../Context/UserContext';

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="col-start-2 flex flex-col gap-5 border-x border-gray-200 border-solid">
      <h1 className="font-bold text-xl p-4">Home</h1>
      <CreateTweet type={'tweet'} />
      <Tweets />
      <p>Your are logged with {user.email}</p>

      <Outlet></Outlet>
    </div>
  );
};

export default Home;
