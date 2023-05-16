/* eslint-disable react-hooks/exhaustive-deps */
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Infomation from './components/Infomation';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase-config';
import useFollow from '../../common/hooks/common/useFollow';
import { UserContext } from '../../Context/UserContext';
import TweetCategories from './components/TweetCategories';
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import useFetchUserProfilePic from '../../common/hooks/userdata/useFetchUserProfilePic';
import useFetchUserBanner from './../../common/hooks/userdata/useFetchUserBanner';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebase-config';

function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { follow, isFollowing } = useFollow(id);
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
      console.log(user.data());
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
        className=" h-64 relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bannerURL})`,
        }}
      >
        <div
          className="w-36 h-36 rounded-full absolute top-44 left-5 bg-cover bg-center bg-no-repeat border-white border-4"
          style={{
            backgroundImage: `url(${profilePicURL})`,
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
        <button
          className="absolute right-0 bg-black text-white p-3 rounded-full m-3 w-24 text-sm "
          onClick={() => follow()}
        >
          {isFollowing ? 'Following' : 'follow'}
        </button>
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
