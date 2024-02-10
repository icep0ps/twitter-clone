import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import useCreateUser from '../../common/hooks/user/useCreateUser';
import useFormInput from '../../common/hooks/common/forms/useFormInput';

const Signup = () => {
  const navigate = useNavigate();

  const id = useFormInput('');
  const email = useFormInput('');
  const username = useFormInput('');

  const bio = useFormInput('');
  const location = useFormInput('');
  const password = useFormInput('');

  const { createUser } = useCreateUser();

  const LoginUser = async (event) => {
    event.preventDefault();
    await createUser({ id, email, username, bio, location, password }).catch((error) => {
      throw new Error('Error creating user: ' + error.message);
    });
    return navigate('/');
  };

  return (
    <React.Fragment>
      <form onSubmit={LoginUser} className="flex flex-col bg-black text-white p-5 gap-5">
        <h1>Twitter</h1>
        <input
          type="text"
          placeholder="Username"
          className=" text-black p-1"
          onChange={username.onChange}
        />
        <input
          type="text"
          placeholder="handle"
          className=" text-black p-1"
          onChange={id.onChange}
        />
        <input
          type="text"
          placeholder="Bio"
          className=" text-black p-1"
          onChange={bio.onChange}
        />
        <input
          type="email"
          placeholder="email"
          className=" text-black p-1"
          onChange={email.onChange}
        />
        <input
          type="text"
          placeholder="Location"
          className=" text-black p-1"
          onChange={location.onChange}
        />
        <input
          type="password"
          placeholder="password"
          className=" text-black p-1 "
          onChange={password.onChange}
        />

        <button type="submit" className="bg-white text-black">
          Signup
        </button>
        <Link to="/sign-in">
          <button>sign in</button>
        </Link>
      </form>
    </React.Fragment>
  );
};

export default Signup;
