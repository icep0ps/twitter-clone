import { useState } from 'react';

import { setDoc, doc, Timestamp } from 'firebase/firestore';
import { db, auth } from '../../../firebase/firebase-config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const useCreateUser = async () => {
  const [user, setUser] = useState(null);

  const createUser = async (userdata) => {
    const { id, email, username, bio, location, password } = userdata;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const userRef = doc(db, 'users', `${id.value}`);
      const user = await setDoc(userRef, {
        id: id.value,
        email: email.value,
        username: username.value,
        bio: bio.value,
        location: location.value,
        joined: Timestamp.now(),
      });

      await updateProfile(auth.currentUser, {
        displayName: id.value,
        photoURL: '',
      });

      setUser(user);
    } catch (error) {
      throw new Error('Error creating user in database : ' + error.message);
    }
  };

  return { createUser, user };
};

export default useCreateUser;
