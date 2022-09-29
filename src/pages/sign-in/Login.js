import React, { useEffect, useState, useContext } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase-config';
import { UserContext } from '../../Context/UserContext';
import Signup from '../sign-up/Signup';

function Login() {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasAccount, setHasAccount] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
    });
  });

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const LoginUser = async (event) => {
    event.preventDefault();
    await signInWithEmailAndPassword(auth, email, password);
  };

  const loginForm = (
    <React.Fragment>
      <form
        onSubmit={LoginUser}
        className="flex flex-col bg-black text-white p-5 gap-5"
      >
        <h1>Twitter</h1>
        <input
          type="email"
          placeholder="email"
          className=" text-black p-1"
          onChange={handleEmail}
        ></input>
        <input
          type="password"
          placeholder="password"
          className=" text-black p-1 "
          onChange={handlePassword}
        ></input>
        <button type="submit" className="bg-white text-black">
          Login
        </button>
        <button onClick={(e) => setHasAccount(!hasAccount)}>Login</button>
      </form>
    </React.Fragment>
  );

  if (hasAccount) {
    return loginForm;
  } else {
    return <Signup setHasAccount={setHasAccount} hasAccount={hasAccount} />;
  }
}

export default Login;
