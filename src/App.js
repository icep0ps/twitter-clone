import './App.css';
import React, { useContext } from 'react';
import Home from './pages/home/Home';
import Sidebar from './common/components/Sidebar';
import Profile from './pages/profile/Profile';
import SignIn from './pages/sign-in/SignIn';
import Signup from './pages/sign-up/Signup';
import { Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebase/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { UserContext } from './Context/UserContext';
import TweetStatus from './pages/Tweet/TweetStatus';
import Likes from './pages/Tweet/components/tweet/likes/Likes';
import Retweets from './pages/Tweet/components/tweet/likes/Retweets';
import ComposeTweet from './common/components/ComposeTweet';
import WhoToFollow from './common/components/WhoToFollow';
import FollowersAndFollowing from './pages/profile/components/followersAndFollowing/FollowersAndFollowing';
import EditProfile from './pages/profile/components/EditProfile';

function App() {
  const { user, setUser } = useContext(UserContext);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return (
    <div className="grid grid-cols-[0.9fr_1.8fr_1.2fr] self-center w-full h-full ">
      {user != null ? <Sidebar /> : ''}

      <Routes>
        <Route
          path="/"
          element={user != null ? <Home /> : <Navigate to="/sign-in" />}
        >
          <Route path="/compose/tweet" element={<ComposeTweet />}></Route>
        </Route>
        <Route path="/sign-up" element={<Signup />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/:author/status/:id" element={<TweetStatus />}>
          <Route path="likes" element={<Likes />}></Route>
          <Route path="retweets" element={<Retweets />}></Route>
        </Route>
        <Route path="/profile/:id" element={<Profile />}>
          <Route path="settings" element={<EditProfile />}></Route>
        </Route>
        <Route
          path="profile/:id/followers"
          element={
            <FollowersAndFollowing view={'followers'}></FollowersAndFollowing>
          }
        ></Route>
        <Route
          path="profile/:id/following"
          element={
            <FollowersAndFollowing view={'following'}></FollowersAndFollowing>
          }
        ></Route>
      </Routes>
      {user != null ? <WhoToFollow /> : ''}
    </div>
  );
}

export default App;
