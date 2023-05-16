/* eslint-disable react-hooks/exhaustive-deps */
import { db } from '../../../firebase/firebase-config';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../../Context/UserContext';
import { getDoc, doc, deleteDoc, setDoc } from 'firebase/firestore';

const useFollow = (author) => {
  const refs = (() => {
    const usersRefs = {
      usersFollowers: undefined,
      userFollowingRef: undefined,
    };

    const setUsersFollowers = (ref) => {
      usersRefs.usersFollowers = ref;
    };

    const getRefs = (ref) => usersRefs[ref];

    const setUserFollowingRef = (ref) => {
      usersRefs.userFollowingRef = ref;
    };

    return {
      getRefs,
      setUserFollowingRef,
      setUsersFollowers,
    };
  })();

  const { getRefs, setUserFollowingRef, setUsersFollowers } = refs;

  const { user } = useContext(UserContext);
  const [isFollowing, setIsFollowing] = useState(false);
  const usersProfileDataRef = doc(db, 'users', `${author}`);

  useEffect(() => {
    if (user) {
      setUsersFollowers(
        doc(db, 'users', `${author}`, 'followers', `${user.displayName}`)
      );
      setUserFollowingRef(
        doc(db, 'users', `${user.displayName}`, 'following', `${author}`)
      );

      checkIfUserIsFollowing();
    }
  }, [user]);

  const follow = async () => {
    const UsersFollowers = doc(
      db,
      'users',
      `${author}`,
      'followers',
      `${user.displayName}`
    );
    const UserFollowingRef = doc(
      db,
      'users',
      `${user.displayName}`,
      'following',
      `${author}`
    );
    const usersDataRef = doc(db, 'users', `${user.displayName}`);
    const usersData = await getDoc(usersDataRef);
    const usersProfileData = await getDoc(usersProfileDataRef);
    const following = await getDoc(UserFollowingRef);
    const followers = await getDoc(UsersFollowers);

    if (followers.exists()) {
      await deleteDoc(UserFollowingRef);
    } else {
      await setDoc(UserFollowingRef, usersData.data());
    }

    if (following.exists()) {
      await deleteDoc(UserFollowingRef);
      setIsFollowing(false);
    } else {
      await setDoc(UserFollowingRef, usersProfileData.data());
      setIsFollowing(true);
    }
  };

  async function checkIfUserIsFollowing() {
    const following = await getDoc(getRefs('userFollowingRef'));
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
