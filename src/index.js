import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppProvider } from './Context/AppContext';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { loader } from './pages/home/Home';

import Home from './pages/home/Home';
import Signup from './pages/sign-up/Signup';
import SignIn from './pages/sign-in/SignIn';
import Profile from './pages/profile/Profile';
import TweetStatus from './pages/Tweet/TweetStatus';
import Likes from './pages/Tweet/components/tweet/Likes';
import Retweets from './pages/Tweet/components/tweet/Retweets';
import EditProfile from './pages/profile/components/EditProfile';
import FollowersAndFollowing from './pages/profile/components/followersAndFollowing/FollowersAndFollowing';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    loader: loader,
  },
  {
    path: '/auth/',
    children: [
      {
        path: 'sign-up',
        element: <Signup />,
      },
      {
        path: 'sign-in',
        element: <SignIn />,
      },
    ],
  },
  {
    path: '/:author/status/:id',
    element: <TweetStatus />,
    children: [
      {
        path: 'likes',
        element: <Likes />,
      },
      {
        path: 'retweets',
        element: <Retweets />,
      },
    ],
  },
  {
    path: '/profile/:id',
    element: <Profile />,
    children: [
      {
        path: 'settings',
        element: <EditProfile />,
      },
      {
        path: 'followers',
        element: <FollowersAndFollowing view={'followers'} />,
      },
      {
        path: 'following',
        element: <FollowersAndFollowing view={'following'} />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppProvider>
    <RouterProvider router={router} />
  </AppProvider>
);
