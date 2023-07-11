import React from 'react';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import FollowButton from './FollowButton';
import AppContext from '../../Context/AppContext';
import useFetchUserData from '../hooks/userdata/useFetchUserData';
import useFetchUserProfilePic from '../hooks/userdata/useFetchUserProfilePic';

function User({ id, showBio }) {
  const { user } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const { profilePicURL, getProfilePic } = useFetchUserProfilePic();
  const { userData, getUserData } = useFetchUserData();

  useEffect(() => {
    getProfilePic(id);
    getUserData(id).then(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="flex gap-3 relative p-3">
      {user.displayName !== id && <FollowButton user={id} />}
      <div
        className="w-12 h-12  bg-black rounded-3xl bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${profilePicURL})` }}
      ></div>
      <div>
        <p className="username flex items-center gap-1 ">
          <Link to={`/profile/${id}`}>
            {userData.username} <span className="text-xs text-gray-500">@{id}</span>
          </Link>
        </p>
        <p className="text-sm">{id}</p>
        {showBio === true && <p>{userData.bio}</p>}
      </div>
    </div>
  );
}

export default User;
