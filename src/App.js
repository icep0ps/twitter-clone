import './App.css';
import React, { useContext } from 'react';
import Home from './pages/home/Home';
import Sidebar from './common/Sidebar';
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

function App() {
  const { user, setUser } = useContext(UserContext);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return (
    <div className="grid grid-cols-[1fr_2fr_1fr] self-center w-full">
      {user != null ? <Sidebar /> : ''}

      <Routes>
        <Route
          path="/"
          element={user != null ? <Home /> : <Navigate to="/sign-in" />}
        ></Route>
        <Route path="/sign-up" element={<Signup />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/status/:id" element={<TweetStatus />}>
          <Route path="likes" element={<Likes />}></Route>
          <Route path="retweets" element={<Retweets />}></Route>
        </Route>
        <Route path="/profile/:id" element={<Profile />}></Route>
      </Routes>
    </div>
  );
}

export default App;
