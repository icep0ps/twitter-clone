import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { UserContext } from '../Context/UserContext';

function Sidebar() {
  const { user } = useContext(UserContext);

  return (
    <div className="col-start-1 gap-5">
      <ul className="text-2xl mb-3">
        <Link to={'/'}>
          <li>Home</li>
        </Link>
        <Link to={`/profile/${user.uid}`}>
          <li>Profile</li>
        </Link>
      </ul>
    </div>
  );
}

export default Sidebar;
