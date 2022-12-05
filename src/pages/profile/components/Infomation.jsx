import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Infomation({ user, following, followers }) {
  useEffect(() => {}, [user]);
  return (
    <div className="p-3">
      <div className="absolute top-0 bg-white w-full left-0 p-5">
        <h1>{user.username}</h1>
      </div>
      <h1 className="font-bold text-2xl ">{user.username}</h1>
      <p className="text-gray-500 text-sm">@{user.username}</p>
      <div className=" flex flex-col gap-3 ">
        <p className="mt-3">{user.bio}</p>

        <p className="text-gray-500">
          Joined {user.joined.toDate().toDateString()}
        </p>
        <div className="flex gap-5">
          <Link to={`/profile/${user.id}/following`}>
            <p className="text-gray-500 text-sm">
              <span className="font-bold text-black">{following.length} </span>
              Following
            </p>
          </Link>
          <Link to={`/profile/${user.id}/followers`}>
            <p className="text-gray-500 text-sm">
              <span className="font-bold text-black">{followers.length} </span>
              Followers
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Infomation;
