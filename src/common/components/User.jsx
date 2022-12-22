import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useFollow from '../hooks/useFollow';
import { UserContext } from '../../Context/UserContext';
import useFetchUserProfilePic from '../hooks/useFetchUserProfilePic';
import useFetchUserData from './../hooks/useFetchUserData';

function User({ id, showBio }) {
  const { user } = useContext(UserContext);
  const { follow, isFollowing } = useFollow(id);
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
      {user.displayName !== id && (
        <button
          className="absolute right-0 bg-black text-white py-2 rounded-full m-3 w-24 text-sm "
          onClick={(e) => follow()}
        >
          {isFollowing ? 'following' : 'follow'}
        </button>
      )}
      <div
        className="w-12 h-12  bg-black rounded-3xl bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${profilePicURL})` }}
      ></div>
      <div>
        <p className="username flex items-center gap-1 ">
          <Link to={`/profile/${id}`}>
            {userData.username}{' '}
            <span className="text-xs text-gray-500">@{id}</span>
          </Link>
        </p>
        <p className="text-sm">{id}</p>
        {showBio === true && <p>{userData.bio}</p>}
      </div>
    </div>
  );
}

export default User;
