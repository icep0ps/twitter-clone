import { useState } from 'react';
import { db } from '../../../firebase/firebase-config';
import { doc, getDoc } from 'firebase/firestore';

function useFetchUserData() {
  const [userData, setUserData] = useState();

  async function getUserData(id) {
    const usersRef = doc(db, 'users', `${id}`);
    const userSnapshot = await getDoc(usersRef);
    const user = userSnapshot.data() ? userSnapshot.data() : null;
    setUserData(user);
    return user;
  }

  return { getUserData, userData };
}

export default useFetchUserData;
