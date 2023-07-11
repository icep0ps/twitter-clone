import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';

import Tweets from './components/Tweets';
import AppContext from '../../Context/AppContext';
import CreateTweet from './components/Create-tweet';

const Home = () => {
  const { user } = useContext(AppContext);

  return (
    <div className="col-start-2 flex flex-col gap-5 border-x border-gray-200 border-solid">
      <h1 className="font-bold text-xl p-4">Home</h1>
      <div className="border-b border-gray-200 border-solid">
        <CreateTweet type={'tweet'} />
      </div>

      <Tweets />
      <p>Your are logged with {user.email}</p>

      <Outlet />
    </div>
  );
};

export default Home;
