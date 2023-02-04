import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../../../firebase/firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import User from '../../../../common/components/User';
import useFetchFollowersOrFollowing from './../../../../common/hooks/userdata/useFetchFollowers';

function FollowersAndFollowing({ view = 'followers' }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usersData, setUsersData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { getFollowers, getFollowing, usersFollowers, usersFollowing } =
    useFetchFollowersOrFollowing();

  async function getUserData() {
    const usersDataRef = doc(db, 'users', `${id}`);
    const usersData = await getDoc(usersDataRef);
    setUsersData(usersData.data());
  }

  async function getUsersFollowingAndFollowers() {
    await Promise.all([getFollowers(id), getFollowing(id)]);
  }

  useEffect(() => {
    Promise.all([getUserData(), getUsersFollowingAndFollowers()]).then(() => {
      setIsLoading(false);
    });
  }, [id]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="border-x border-gray-500 border-solid relative flex flex-col">
      <div className=" bg-white w-full left-0 p-5">
        <h1 className="font-bold text-lg">{usersData.username}</h1>
        <p className="text-sm">@{usersData.id}</p>
      </div>
      <div className="grid grid-cols-2 border-b border-gray-500">
        <button
          className="p-5"
          onClick={() => navigate(`/profile/${id}/followers`)}
        >
          Followers
        </button>
        <button
          className="p-5"
          onClick={() => navigate(`/profile/${id}/following`)}
        >
          Following
        </button>
      </div>
      {view === 'followers' &&
        usersFollowers.map((user) => {
          return (
            <User
              username={user.username}
              id={user.id}
              showBio={true}
              bio={user.bio}
              key={user.id}
            ></User>
          );
        })}

      {view === 'following' &&
        usersFollowing.map((user) => {
          return (
            <User
              username={user.username}
              id={user.id}
              showBio={true}
              bio={user.bio}
              key={user.id}
            ></User>
          );
        })}
    </div>
  );
}
export default FollowersAndFollowing;
