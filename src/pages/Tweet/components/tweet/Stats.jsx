import React from 'react';
import { Link } from 'react-router-dom';

export function Stats({ id, author, likes, retweets }) {
  return (
    <div className="flex justify-start gap-3 border-y border-y-gray-200 py-4">
      <Link to={`/${author.id}/status/${id}/retweets`}>
        <p>
          <span className="font-bold"> {retweets} </span> Retweets
        </p>
      </Link>
      <Link to={`/${author.id}/status/${id}/likes`}>
        <p>
          <span className="font-bold"> {likes} </span>
          Likes
        </p>
      </Link>
    </div>
  );
}
