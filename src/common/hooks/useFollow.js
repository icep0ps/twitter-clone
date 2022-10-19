import { useContext, useState } from 'react';
import { db } from '../../firebase/firebase-config';
import { UserContext } from '../../Context/UserContext';
import { getDoc, doc, deleteDoc, setDoc } from 'firebase/firestore';

const useFollow = (author) => {
  const [isFollowing, setIsFollowing] = useState(true);

  const { user } = useContext(UserContext);
  const follow = async () => {
    const userRef = doc(db, 'users', `${user.uid}`, 'following', `${author}`);
    const following = await getDoc(userRef);
    if (following.exists()) {
      await deleteDoc(userRef);
      setIsFollowing(false);
    } else {
      await setDoc(userRef, {});
      setIsFollowing(true);
    }
  };
  return { follow, isFollowing };
};

export default useFollow;
