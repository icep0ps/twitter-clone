import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../../firebase/firebase-config';
import AppContext from '../../Context/AppContext';

function SignIn() {
  const navigate = useNavigate();
  const { setUser } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const LoginUser = async (event) => {
    try {
      event.preventDefault();
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      return error.message;
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={LoginUser} className="flex flex-col bg-black text-white p-5 gap-5">
        <h1>Twitter</h1>
        <input
          type="email"
          placeholder="email"
          className=" text-black p-1"
          onChange={handleEmail}
        />
        <input
          type="password"
          placeholder="password"
          className=" text-black p-1 "
          onChange={handlePassword}
        />
        <button type="submit" className="bg-white text-black">
          Login
        </button>
        <Link to="/sign-up">
          <button>sign up</button>
        </Link>
      </form>
    </React.Fragment>
  );
}

export default SignIn;
