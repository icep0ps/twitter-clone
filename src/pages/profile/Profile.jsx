import React, { useEffect, useState } from 'react';
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firebase-config';
import { useParams } from 'react-router-dom';
import Infomation from './components/Infomation';

function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState('');
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);

  const getUserProfile = async () => {
    const userRef = doc(db, 'users', `${id}`);
    const user = await getDoc(userRef);
    setUser(user.data());
  };

  const getFollowersAndFollowing = () => {
    const userFollowing = collection(db, 'users', `${id}`, 'following');
    const userFollowers = collection(db, 'users', `${id}`, 'followers');

    onSnapshot(userFollowing, (querySnapshot) => {
      querySnapshot.forEach((user) => {
        setFollowing((prevState) => [...prevState, user]);
      });
    });

    onSnapshot(userFollowers, (querySnapshot) => {
      querySnapshot.forEach((follower) => {
        setFollowers((prevState) => [...prevState, follower]);
      });
    });
  };

  useEffect(() => {
    getUserProfile();
    getFollowersAndFollowing();
    return () => {
      setFollowing([]);
      setFollowers([]);
    };
  }, [id]);

  return (
    <div>
      <Infomation
        details={user}
        following={following}
        followers={followers}
      ></Infomation>
    </div>
  );
}

export default Profile;
