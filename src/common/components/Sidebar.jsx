import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { auth } from '../../firebase/firebase-config';
import AppContext from '../../Context/AppContext';

function Sidebar({ children }) {
  const { user, setComposeComponentIsToggled } = useContext(AppContext);

  const navigate = useNavigate();

  const userSignOut = () => {
    signOut(auth);
    navigate('/sign-in');
  };

  return (
    <div className="col-start-1 justify-self-end gap-5 pr-9 w-3/4">
      <ul className="text-2xl mb-3 flex flex-col gap-3 font-thin">
        <Link to={'/'}>
          <li>Home</li>
        </Link>
        <Link to={`/profile/${user.displayName}`}>
          <li>Profile</li>
        </Link>
        <li>
          <button onClick={userSignOut}>Logout</button>
        </li>
        <button
          className="p-3 bg-blue-500 text-white rounded-full w-11/12 self-start text-lg font-semibold cursor-pointer"
          onClick={() => setComposeComponentIsToggled((state) => !state)}
        >
          Tweet
        </button>
      </ul>
    </div>
  );
}

export default Sidebar;
