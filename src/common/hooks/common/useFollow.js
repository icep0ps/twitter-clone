import { useContext, useState, useEffect } from 'react';
import { db } from '../../../firebase/firebase-config';
import { UserContext } from '../../../Context/UserContext';
import { getDoc, doc, deleteDoc, setDoc } from 'firebase/firestore';

const useFollow = (author) => {
  const { user } = useContext(UserContext);
  const [isFollowing, setIsFollowing] = useState(false);
  const usersProfileDataRef = doc(db, 'users', `${author}`);

  useEffect(() => {
    checkIfUserIfFollowing();
  }, []);

  const usersFollowers = doc(
    db,
    'users',
    `${author}`,
    'followers',
    `${user.displayName}`
  );
  const userFollowingRef = doc(
    db,
    'users',
    `${user.displayName}`,
    'following',
    `${author}`
  );
  const usersDataRef = doc(db, 'users', `${user.displayName}`);

  const follow = async () => {
    const usersData = await getDoc(usersDataRef);
    const usersProfileData = await getDoc(usersProfileDataRef);
    const following = await getDoc(userFollowingRef);
    const followers = await getDoc(usersFollowers);

    if (followers.exists()) {
      await deleteDoc(usersFollowers);
    } else {
      await setDoc(usersFollowers, usersData.data());
    }

    if (following.exists()) {
      await deleteDoc(userFollowingRef);
      setIsFollowing(false);
    } else {
      await setDoc(userFollowingRef, usersProfileData.data());
      setIsFollowing(true);
    }
  };

  async function checkIfUserIfFollowing() {
    const following = await getDoc(userFollowingRef);
    if (following.exists()) {
      setIsFollowing(true);
      return false;
    } else {
      setIsFollowing(false);
      return true;
    }
  }

  return { follow, isFollowing };
};

export default useFollow;
