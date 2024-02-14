import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import useCreateUser from '../../common/hooks/user/useCreateUser';
import useFormInput from '../../common/hooks/common/forms/useFormInput';

const Signup = () => {
  const navigate = useNavigate();
  const { createUser } = useCreateUser();

  const formInputs = {
    id: useFormInput(''),
    email: useFormInput(''),
    username: useFormInput(''),
    bio: useFormInput(''),
    location: useFormInput(''),
    password: useFormInput(''),
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      await createUser(formInputs).catch((error) => {
        throw new Error('Error creating user: ' + error.message);
      });
      navigate('/');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <React.Fragment>
      <form
        onSubmit={handleSignUp}
        className="flex flex-col bg-black text-white p-5 gap-5"
      >
        <h1>Twitter</h1>
        <FormInput
          type="text"
          placeholder="Username"
          value={formInputs.username.value}
          onChange={formInputs.username.onChange}
        />
        <FormInput
          type="text"
          placeholder="Handle"
          value={formInputs.id.value}
          onChange={formInputs.id.onChange}
        />
        <FormInput
          type="text"
          placeholder="Bio"
          value={formInputs.bio.value}
          onChange={formInputs.bio.onChange}
        />
        <FormInput
          type="email"
          placeholder="Email"
          value={formInputs.email.value}
          onChange={formInputs.email.onChange}
        />
        <FormInput
          type="text"
          placeholder="Location"
          value={formInputs.location.value}
          onChange={formInputs.location.onChange}
        />
        <FormInput
          type="password"
          placeholder="Password"
          value={formInputs.password.value}
          onChange={formInputs.password.onChange}
        />

        <button type="submit" className="bg-white text-black">
          Signup
        </button>
        <Link to="/sign-in">
          <button>Sign In</button>
        </Link>
      </form>
    </React.Fragment>
  );
};

const FormInput = ({ type, placeholder, value, onChange }) => (
  <input
    type={type}
    placeholder={placeholder}
    className="text-black p-1"
    value={value}
    onChange={onChange}
  />
);

export default Signup;
