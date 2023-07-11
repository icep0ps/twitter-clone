import { useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import AppContext from '../../Context/AppContext';
import { auth } from '../../firebase/firebase-config';
import useFetchUserData from './userdata/useFetchUserData';

const useAuth = () => {
  let user = null;
  const { getUserData } = useFetchUserData();
  const { setUser } = useContext(AppContext);

  const autheticate = () => {
    onAuthStateChanged(auth, async (currentUser) => {
      const data = await getUserData(currentUser.displayName);
      user = Object.assign(data, currentUser);
      console.log(user);
      setUser(user);
    });
  };

  return autheticate;
};

export default useAuth;
