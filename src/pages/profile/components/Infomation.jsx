import React from 'react';

function Infomation({ details, following, followers }) {
  return (
    <div>
      <h1>{details.username}</h1>
      <p>@{details.username}</p>
      <p>{details.bio}</p>
      <p>Joined date:</p>
      <div className="flex gap-5">
        <p>Followers {followers.length} </p>
        <p>Following {following.length}</p>
      </div>
    </div>
  );
}

export default Infomation;
