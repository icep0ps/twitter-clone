import React, { useEffect, useState } from 'react';
import TweetsCategory from './tabs/Tweets';
import TweetsAndReplies from './tabs/TweetsAndReplies';

function TweetCategories({ id }) {
  const [category, setCategory] = useState('tweets');

  let tabToBeRendered = <TweetsCategory id={id}></TweetsCategory>;
  if (category === 'tweets & replies') {
    tabToBeRendered = <TweetsAndReplies id={id}></TweetsAndReplies>;
  }

  useEffect(() => {}, [category]);

  return (
    <React.Fragment>
      <div className="flex border-gray-500 border-solid border-b">
        <button className="category" onClick={() => setCategory('tweets')}>
          Tweets
        </button>
        <button
          className="category"
          onClick={() => setCategory('tweets & replies')}
        >
          Tweets & Replies
        </button>
        <button className="category">Likes</button>
      </div>
      {tabToBeRendered}
    </React.Fragment>
  );
}

export default TweetCategories;
