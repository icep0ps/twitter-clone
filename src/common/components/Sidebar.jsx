import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/firebase-config';
import { UserContext } from '../../Context/UserContext';

function Sidebar() {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const userSignOut = () => {
    signOut(auth);
    navigate('/sign-in');
  };

  return (
    <div className="col-start-1 gap-5 pr-9 w-3/4">
      <ul className="text-2xl mb-3 flex flex-col gap-3">
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
          className="p-2.5 bg-blue-500 text-white rounded-3xl w-full self-end text-lg font-semibold"
          onClick={() => navigate('/compose/tweet')}
        >
          Tweet
        </button>
      </ul>
    </div>
  );
}

export default Sidebar;
