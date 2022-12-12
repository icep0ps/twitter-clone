import { useState } from 'react';
import useFetchUsername from './useFetchUsername';
import { db } from '../../firebase/firebase-config';
import { collection, getDocs } from 'firebase/firestore';

function useFetchFollowersOrFollowing() {
  const { getUsername } = useFetchUsername();
  const [usersFollowers, setUsersFollowers] = useState([]);
  const [usersFollowing, setUsersFollowing] = useState([]);

  async function getFollowers(id) {
    const usersFollowersRef = collection(db, 'users', `${id}`, 'followers');
    const usersFollowers = await getDocs(usersFollowersRef);
    usersFollowers.forEach(async (follower) => {
      const followerData = follower.data();
      const username = await getUsername(followerData.id);
      followerData.username = username;
      setUsersFollowers((prevState) => [...prevState, followerData]);
    });
    return usersFollowers;
  }

  async function getFollowing(id) {
    const usersFollowingRef = collection(db, 'users', `${id}`, 'following');
    const usersFollowing = await getDocs(usersFollowingRef);
    usersFollowing.forEach(async (following) => {
      const followingData = following.data();
      const username = await getUsername(followingData.id);
      followingData.username = username;
      setUsersFollowing((prevState) => [...prevState, followingData]);
    });
    return usersFollowing;
  }

  return { usersFollowers, usersFollowing, getFollowers, getFollowing };
}

export default useFetchFollowersOrFollowing;
