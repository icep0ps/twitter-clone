/* eslint-disable react-hooks/exhaustive-deps */
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import Infomation from './components/Infomation';
import { db } from '../../firebase/firebase-config';
import { auth } from '../../firebase/firebase-config';
import  AppContext  from '../../Context/AppContext';
import TweetCategories from './components/TweetCategories';
import default_pfp from '../../assets/images/defualt-pfp.png';
import FollowButton from '../../common/components/FollowButton';
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import useFetchUserBanner from './../../common/hooks/userdata/useFetchUserBanner';
import useFetchUserProfilePic from '../../common/hooks/userdata/useFetchUserProfilePic';

function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, setUser } = useContext(AppContext);
  const [following, setFollowing] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { bannerURL, getUserBanner } = useFetchUserBanner();
  const [userProfileData, setUserProfileData] = useState('');
  const { profilePicURL, getProfilePic } = useFetchUserProfilePic();

  const getFollowersAndFollowing = () => {
    const userFollowing = collection(db, 'users', `${id}`, 'following');
    const userFollowers = collection(db, 'users', `${id}`, 'followers');

    onSnapshot(userFollowing, (querySnapshot) => {
      const { docs } = querySnapshot;
      setFollowing(docs.length);
    });

    onSnapshot(userFollowers, (querySnapshot) => {
      const { docs } = querySnapshot;
      setFollowers(docs.length);
    });
  };

  useEffect(() => {
    !user &&
      onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });

    async function getUserProfile() {
      const userRef = doc(db, 'users', `${id}`);
      const user = await getDoc(userRef);
      setUserProfileData(user.data());
      getProfilePic(id);
      getUserBanner(id);
      setIsLoading(false);
    }

    getUserProfile();
    getFollowersAndFollowing();

    return () => {
      setFollowing([]);
      setFollowers([]);
    };
  }, [id]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="border-x border-gray-500 border-solid relative ">
      <div
        className=" h-64 relative bg-cover bg-center bg-no-repeat bg-sky-700"
        style={{
          backgroundImage: `url(${bannerURL})`,
        }}
      >
        <div
          className="w-36 h-36 rounded-full absolute top-44 left-5 bg-cover bg-center bg-no-repeat border-white border-4 "
          style={{
            backgroundImage: `url(${profilePicURL ? profilePicURL : default_pfp})`,
          }}
        ></div>
      </div>
      {user.displayName === userProfileData.id ? (
        <button
          className="absolute right-0 border	border-gray-700 text-gray-700 font-semibold  p-3 rounded-full m-3 w-fit text-sm"
          onClick={() => navigate(`/profile/${id}/settings`)}
        >
          Edit Profile
        </button>
      ) : (
        <FollowButton user={id} />
      )}

      <div className="h-14"></div>

      <Infomation
        user={userProfileData}
        following={following}
        followers={followers}
      ></Infomation>
      <TweetCategories id={id} />
      <Outlet />
    </div>
  );
}

export default Profile;
