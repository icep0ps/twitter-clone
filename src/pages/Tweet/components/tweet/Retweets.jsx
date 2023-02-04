/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import uniqid from 'uniqid';
import User from '../../../../common/components/User';
import useFetchTweet from '../../../../common/hooks/tweets/useFetchTweet';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Retweets = () => {
  const navigate = useNavigate();
  const { author, id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const { tweet, getTweet } = useFetchTweet();

  useEffect(() => {
    getTweet(author, id).then((res) => {
      console.log(res);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return '';
  return (
    <div className="fixed w-full h-full bg-black bg-opacity-40	right-0 left-0 flex justify-center pt-28 z-10 top-0">
      <div className="absolute top-1/4 self-center bg-white flex flex-col gap-3 p-5 w-5/12 rounded-xl">
        <h1 className="font-xl font-bold">
          <span onClick={() => navigate(-1)}>close</span> Retweeted by
        </h1>
        {tweet.type === 'comment'
          ? tweet.comment.retweets.map((user) => (
              <User
                username={user.username}
                key={uniqid()}
                showBio={true}
                id={user.id}
                bio={user.bio}
                user={user}
              />
            ))
          : tweet.retweets.map((user) => (
              <User
                username={user.username}
                key={uniqid()}
                showBio={true}
                id={user.id}
                bio={user.bio}
                user={user}
              />
            ))}
      </div>
    </div>
  );
};

export default Retweets;
