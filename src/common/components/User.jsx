import React from 'react';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useFollow from '../hooks/useFollow';
import { UserContext } from '../../Context/UserContext';

function User({ username, id, bio, showBio = false }) {
  const { user } = useContext(UserContext);
  const { follow, isFollowing } = useFollow(id);

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
      <div className="w-12 h-12  bg-black rounded-3xl"></div>
      <div>
        <p className="username flex items-center gap-1 ">
          <Link to={`/profile/${id}`}>
            {username}{' '}
            <span className="text-xs text-gray-500">@{username}</span>
          </Link>
        </p>
        <p className="text-sm">{id}</p>
        {showBio === true && <p>{bio}</p>}
      </div>
    </div>
  );
}

export default User;
