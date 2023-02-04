import { useState } from 'react';
import { db } from '../../../firebase/firebase-config';
import { collection, getDocs } from 'firebase/firestore';

function useFetchUsers() {
  const [users, setUsers] = useState([]);
  const usersRef = collection(db, 'users');

  async function getUsers() {
    const users = await getDocs(usersRef);
    users.forEach((user) => {
      setUsers((prevState) => [...prevState, user.data()]);
    });
  }

  return { getUsers, users };
}

export default useFetchUsers;
