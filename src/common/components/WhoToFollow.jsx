import React from 'react';
import { useEffect } from 'react';
import useFetchUsers from '../hooks/useFetchUsers';
import User from './../components/User';

function WhoToFollow() {
  const { getUsers, users } = useFetchUsers();

  async function getAllUsersData() {
    await getUsers();
  }

  useEffect(() => {
    getAllUsersData();
  }, []);

  return (
    <div className="bg-gray-100 h-fit  rounded-xl m-7">
      <h1>Who to follow</h1>
      <div className="flex flex-col  ">
        {users.map((user) => (
          <User
            username={user.username}
            bio={user.bio}
            id={user.id}
            key={user.id}
          ></User>
        ))}
      </div>
    </div>
  );
}
export default WhoToFollow;
