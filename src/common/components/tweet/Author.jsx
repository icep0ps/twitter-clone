import React from 'react';
import { Link } from 'react-router-dom';

export function Author({ author, inStatus }) {
  const { id, username } = author;
  return (
    <Link to={`/profile/${id}`}>
      <p className="username flex items-center gap-1 font-medium">
        {username}
        {inStatus ? (
          <>
            <br></br>
            <span className="text-sm text-gray-500 font-thin">@{id}</span>
          </>
        ) : (
          <span className="text-sm text-gray-500 font-thin">@{id}</span>
        )}
      </p>
    </Link>
  );
}
