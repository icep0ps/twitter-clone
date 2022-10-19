import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import { updateDoc, arrayUnion } from 'firebase/firestore';

const useLike = (tweetRef) => {
  const { user } = useContext(UserContext);
  const like = async () => {
    await updateDoc(tweetRef, {
      likes: arrayUnion({
        id: user.uid,
      }),
    });
  };
  return { like };
};

export default useLike;
