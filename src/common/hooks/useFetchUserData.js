import { useState } from 'react';
import { db } from '../../firebase/firebase-config';
import { doc, getDoc } from 'firebase/firestore';

function useFetchUserData() {
  const [userData, setUserData] = useState();
  const [username, setUsername] = useState();

  async function getUserData(id) {
    const usersRef = doc(db, 'users', `${id}`);
    const user = await getDoc(usersRef);
    setUserData(user.data());
    return user.data();
  }

  return { getUserData, userData };
}

export default useFetchUserData;
