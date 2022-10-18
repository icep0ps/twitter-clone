import React from 'react';

function Infomation({ user, following, followers }) {
  return (
    <div>
      <h1>{user.username}</h1>
      <p>@{user.username}</p>
      <p>{user.bio}</p>
      <p>Joined date:</p>
      <div className="flex gap-5">
        <p>Followers {followers.length} </p>
        <p>Following {following.length}</p>
      </div>
    </div>
  );
}

export default Infomation;
