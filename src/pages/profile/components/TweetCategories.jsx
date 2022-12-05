import React, { useEffect, useState } from 'react';
import Tweets from './tabs/Tweets';
import TweetsAndReplies from './tabs/TweetsAndReplies';
import Likes from './tabs/Likes';

function TweetCategories({ id }) {
  const [category, setCategory] = useState('tweets');

  let tabToBeRendered = <Tweets id={id}></Tweets>;
  if (category === 'tweets & replies') {
    tabToBeRendered = <TweetsAndReplies id={id}></TweetsAndReplies>;
  }
  if (category === 'likes') {
    tabToBeRendered = <Likes id={id}></Likes>;
  }

  useEffect(() => {}, [category]);

  return (
    <React.Fragment>
      <div className="grid grid-cols-4 border-gray-500 border-solid border-b justify-evenly text-gray-800">
        <button className="category" onClick={() => setCategory('tweets')}>
          Tweets
        </button>

        <button
          className="category"
          onClick={() => setCategory('tweets & replies')}
        >
          Tweets & Replies
        </button>
        <button className="category">Media</button>

        <button className="category" onClick={() => setCategory('likes')}>
          Likes
        </button>
      </div>
      {tabToBeRendered}
    </React.Fragment>
  );
}

export default TweetCategories;
