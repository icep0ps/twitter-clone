import { useState } from 'react';
import { db } from '../../firebase/firebase-config';
import { collection, getDocs } from 'firebase/firestore';

function useFetchFollowersOrFollowing() {
  const [usersFollowers, setUsersFollowers] = useState([]);
  const [usersFollowing, setUsersFollowing] = useState([]);

  async function getFollowers(id) {
    const usersFollowersRef = collection(db, 'users', `${id}`, 'followers');
    const usersFollowers = await getDocs(usersFollowersRef);
    usersFollowers.forEach((follower) => {
      setUsersFollowers((prevState) => [...prevState, follower.data()]);
    });
    return usersFollowers;
  }

  async function getFollowing(id) {
    const usersFollowingRef = collection(db, 'users', `${id}`, 'following');
    const usersFollowing = await getDocs(usersFollowingRef);
    usersFollowing.forEach((following) => {
      setUsersFollowing((prevState) => [...prevState, following.data()]);
    });
    return usersFollowing;
  }

  return { usersFollowers, usersFollowing, getFollowers, getFollowing };
}

export default useFetchFollowersOrFollowing;
