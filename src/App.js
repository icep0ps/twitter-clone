import './App.css';
import React, { Fragment, useContext, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import useAuth from './common/hooks/useAuth';
import AppContext from './Context/AppContext';

import Home from './pages/home/Home';
import Signup from './pages/sign-up/Signup';
import SignIn from './pages/sign-in/SignIn';
import Profile from './pages/profile/Profile';
import Sidebar from './common/components/Sidebar';
import TweetStatus from './pages/Tweet/TweetStatus';
import Likes from './pages/Tweet/components/tweet/Likes';
import WhoToFollow from './common/components/Who-to-follow';
import ComposeTweet from './common/components/Compose-tweet';
import Retweets from './pages/Tweet/components/tweet/Retweets';
import EditProfile from './pages/profile/components/EditProfile';
import FollowersAndFollowing from './pages/profile/components/followersAndFollowing/FollowersAndFollowing';

function App() {
  const auth = useAuth();
  const { user } = useContext(AppContext);

  useEffect(() => {
    auth();
  }, []);

  return (
    <div className="grid grid-cols-[1.3fr_2fr_1.3fr] self-center w-full h-full ">
      {user !== null && (
        <Fragment>
          <Sidebar />
          <ComposeTweet />
        </Fragment>
      )}

      <Routes>
        <Route path="/" element={user !== null ? <Home /> : <Navigate to="/sign-in" />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route
          path="/sign-in"
          element={user === null ? <SignIn /> : <Navigate to="/" />}
        />
        <Route path="/:author/status/:id" element={<TweetStatus />}>
          <Route path="likes" element={<Likes />} />
          <Route path="retweets" element={<Retweets />} />
        </Route>
        <Route path="/profile/:id" element={<Profile />}>
          <Route path="settings" element={<EditProfile />} />
        </Route>
        <Route
          path="profile/:id/followers"
          element={<FollowersAndFollowing view={'followers'} />}
        />
        <Route
          path="profile/:id/following"
          element={<FollowersAndFollowing view={'following'} />}
        />
      </Routes>
      {user != null && <WhoToFollow />}
    </div>
  );
}

export default App;
