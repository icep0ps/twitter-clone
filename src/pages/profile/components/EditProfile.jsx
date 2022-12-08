import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useFetchUserData from '../../../common/hooks/useFetchUserData';
import { db } from '../../../firebase/firebase-config';
import { updateDoc, doc } from 'firebase/firestore';

function EditProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bio, setBio] = useState();
  const [username, setUsername] = useState();
  const [location, setLocation] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { getUserData, userData } = useFetchUserData();

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
        <div className="bg-black h-64	relative">
          <div className="w-28 h-28 bg-red-600 rounded-full absolute top-52 left-5"></div>
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
