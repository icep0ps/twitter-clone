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

    const setUserFollowingRef = (ref) => {
      usersRefs.userFollowingRef = ref;
    };

    const getRefs = (ref) => usersRefs[ref];

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
    console.log(getRefs('usersFollowers'), getRefs('userFollowingRef'));
    const usersDataRef = doc(db, 'users', `${user.displayName}`);
    const usersData = await getDoc(usersDataRef);
    const usersProfileData = await getDoc(usersProfileDataRef);
    const following = await getDoc(getRefs('userFollowingRef'));
    const followers = await getDoc(getRefs('usersFollowers'));

    if (followers.exists()) {
      await deleteDoc(getRefs('userFollowingRef'));
    } else {
      await setDoc(getRefs('userFollowingRef'), usersData.data());
    }

    if (following.exists()) {
      await deleteDoc(getRefs('userFollowingRef'));
      setIsFollowing(false);
    } else {
      await setDoc(getRefs('userFollowingRef'), usersProfileData.data());
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
