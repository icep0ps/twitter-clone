import './App.css';
import { useContext } from 'react';
import Home from './pages/home/Home';
import Login from './pages/sign-in/Login';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase-config';
import { UserContext } from './Context/UserContext';
import { Routes, Route } from 'react-router-dom';
import TweetStatus from './pages/Tweet/TweetStatus';

function App() {
  const { user, setUser } = useContext(UserContext);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  if (user) {
    return (
      <div className="grid grid-cols-[1fr_2fr_1fr] self-center w-full">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/status/:id" element={<TweetStatus />}></Route>
        </Routes>
      </div>
    );
  } else {
    <Login />;
  }
}

export default App;
