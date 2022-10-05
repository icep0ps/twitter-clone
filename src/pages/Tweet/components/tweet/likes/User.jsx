import React from 'react';

function User({ username, bio }) {
  console.log(username);
  return (
    <div className="flex gap-3">
      <div className="w-12 h-12  bg-black rounded-3xl"></div>
      <div>
        <p className="username flex items-center gap-1 ">
          {username} <span className="text-xs text-gray-500">@{username}</span>
        </p>
        <p>this is bio</p>
      </div>
    </div>
  );
}

export default User;
