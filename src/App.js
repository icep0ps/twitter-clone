import './App.css';
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
import Sidebar from './components/Home/Sidebar';
import Home from './components/Home/Home';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase-config';
import { useContext, useState } from 'react';
import { UserContext } from './Context/UserContext';

function App() {
  const { user, setUser } = useContext(UserContext);
  const [hasAccount, setHasAccount] = useState(false);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return (
    <div className="grid grid-cols-[1fr_2fr_1fr] self-center w-full">
      {user ? <Home /> : <Login />}
    </div>
  );
}

export default App;
