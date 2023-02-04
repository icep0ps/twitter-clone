import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase-config';
import { useState } from 'react';

function useFetchUsername() {
  const [username, setUsername] = useState();

  const getUsername = async (id) => {
    const userProfileDetailsRef = doc(db, 'users', `${id}`);
    const userData = await getDoc(userProfileDetailsRef);
    setUsername(userData.data().username);
    return userData.data().username;
  };

  return { getUsername, username };
}
export default useFetchUsername;
