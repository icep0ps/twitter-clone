import { useContext, useState } from 'react';
import { db } from '../../firebase/firebase-config';
import { UserContext } from '../../Context/UserContext';
import { getDoc, doc, deleteDoc, setDoc } from 'firebase/firestore';

const useFollow = (author) => {
  //TODO: Check if user is following when the component loads

  const { user } = useContext(UserContext);
  const [isFollowing, setIsFollowing] = useState(false);
  const usersProfileDataRef = doc(db, 'users', `${author}`);

  const usersFollowers = doc(
    db,
    'users',
    `${author}`,
    'followers',
    `${user.uid}`
  );
  const userFollowingRef = doc(
    db,
    'users',
    `${user.uid}`,
    'following',
    `${author}`
  );
  const usersDataRef = doc(db, 'users', `${user.uid}`);

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

  return { follow, isFollowing };
};

export default useFollow;
