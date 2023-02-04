import uniqid from 'uniqid';
import { Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { ref, uploadBytes } from 'firebase/storage';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase-config';
import { storage } from '../../../firebase/firebase-config';
import useFetchUserData from '../../../common/hooks/userdata/useFetchUserData';
import useFetchUserBanner from '../../../common/hooks/userdata/useFetchUserBanner';
import useFetchUserProfilePic from '../../../common/hooks/userdata/useFetchUserProfilePic';

//TODO : Update users profilePic URL

function EditProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bio, setBio] = useState();
  const { profilePicURL, getProfilePic } = useFetchUserProfilePic();
  const { bannerURL, getUserBanner } = useFetchUserBanner();
  const [username, setUsername] = useState();
  const [location, setLocation] = useState();
  const [inputBanner, setInputBanner] = useState(null);
  const [inputProfilePic, setInputProfilePic] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { getUserData } = useFetchUserData();

  useEffect(() => {
    getProfilePic(id);
    getUserBanner(id);
  }, []);

  function uploadProfilePic() {
    const profilePicRef = ref(
      storage,
      `${id}/profilePic/${inputProfilePic.name + uniqid.process()}`
    );
    uploadBytes(profilePicRef, inputProfilePic).then((res) => {
      alert('Profile pic uploaded');
    });
  }

  function uploadBanner() {
    const newBannerRef = ref(
      storage,
      `${id}/banner/${inputBanner.name + uniqid.process()}`
    );
    uploadBytes(newBannerRef, inputBanner).then(() => {
      alert('upload sucess');
    });
  }

  function handleUsername(event) {
    setUsername(event.target.value);
  }

  function handleBio(event) {
    setBio(event.target.value);
  }

  function handleLocation(event) {
    setLocation(event.target.value);
  }

  async function getData() {
    getUserData(id).then((data) => {
      setUsername(data.username);
      setBio(data.bio);
      setLocation(data.location);
      setIsLoading(false);
    });
  }

  async function updateProfile() {
    const usersProfileRef = doc(db, 'users', `${id}`);
    await updateDoc(usersProfileRef, {
      id: id,
      username: username,
      bio: bio,
      location: location,
    });
    navigate(`/profile/${id}`);
  }

  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return (
      <div className="fixed w-full h-full bg-black bg-opacity-10 right-0 left-0 top-0 flex justify-center items-center z-10	 ">
        <h1>Loading...</h1>;
      </div>
    );
  }
  return (
    <div className="fixed w-full h-full bg-black bg-opacity-10 right-0 left-0 top-0 flex justify-center items-center z-10	 ">
      <div className=" bg-white h-fit p-4 rounded-2xl w-2/6 flex flex-col gap-3 ">
        <div className="flex justify-evenly">
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            close
          </button>
          <h1>Edit Profile</h1>
          <button onClick={() => updateProfile()}>Save</button>
        </div>
        <div
          className="bg-black h-64	relative bg-cover	bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${bannerURL})`,
          }}
        >
          <input
            type={'file'}
            onChange={(event) => setInputBanner(event.target.files[0])}
          ></input>
          <button onClick={() => uploadBanner()} className="bg-white">
            Upload
          </button>
          <div
            className="w-28 h-28 bg-red-600 rounded-full absolute top-52 left-5 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${profilePicURL})`,
            }}
          >
            <input
              type={'file'}
              onChange={(event) => setInputProfilePic(event.target.files[0])}
            ></input>
            <button onClick={() => uploadProfilePic()} className="bg-white">
              Upload
            </button>
          </div>
        </div>
        <form className="flex flex-col mt-16 gap-6">
          <input
            id="name"
            type={'text'}
            placeholder={'name'}
            value={username}
            className="p-3 border border-gray-300 rounded-lg"
            onChange={(e) => handleUsername(e)}
          ></input>
          <textarea
            name=""
            id="bio"
            cols="50"
            rows="5"
            placeholder={'bio'}
            value={bio}
            className="p-3 border border-gray-300 rounded-lg resize-none"
            onChange={(e) => handleBio(e)}
          ></textarea>
          <input
            id="location"
            type={'text'}
            placeholder={'Location'}
            value={location}
            onChange={(e) => handleLocation(e)}
            className="p-3 border border-gray-300 rounded-lg"
          ></input>
        </form>
        <Outlet />
      </div>
    </div>
  );
}
export default EditProfile;
