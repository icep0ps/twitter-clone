import React, { useState, useEffect, useContext } from 'react';
import { auth } from '../../firebase/firebase-config';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { setDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase/firebase-config';
import { UserContext } from '../../Context/UserContext';

const Signup = ({ hasAccount, setHasAccount }) => {
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  });

  const createUserInFirestore = async (USER_ID) => {
    const userRef = doc(db, 'users', `${USER_ID}`);
    const userInformation = await setDoc(userRef, {
      id: USER_ID,
      email: email,
      username: username,
      bio: bio,
      location: location,
      joined: Timestamp.now(),
    });
    await updateProfile(auth.currentUser, {
      displayName: username,
      photoURL: '',
    });
    setUser(userInformation);
  };

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleBio = (event) => {
    setBio(event.target.value);
  };

  const handleLocation = (event) => {
    setLocation(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const LoginUser = async (event) => {
    event.preventDefault();
    const user = await createUserWithEmailAndPassword(auth, email, password);
    await createUserInFirestore(user.user.uid);
  };

  return (
    <React.Fragment>
      <form
        onSubmit={LoginUser}
        className="flex flex-col bg-black text-white p-5 gap-5"
      >
        <h1>Twitter</h1>
        <input
          type="text"
          placeholder="Username"
          className=" text-black p-1"
          onChange={handleUsername}
        ></input>
        <input
          type="text"
          placeholder="Bio"
          className=" text-black p-1"
          onChange={handleBio}
        ></input>
        <input
          type="email"
          placeholder="email"
          className=" text-black p-1"
          onChange={handleEmail}
        ></input>
        <input
          type="text"
          placeholder="Location"
          className=" text-black p-1"
          onChange={handleLocation}
        ></input>
        <input
          type="password"
          placeholder="password"
          className=" text-black p-1 "
          onChange={handlePassword}
        ></input>
        <button type="submit" className="bg-white text-black">
          Signup
        </button>
        <button onClick={(e) => setHasAccount(!hasAccount)}>Login</button>
      </form>
    </React.Fragment>
  );
};

export default Signup;
