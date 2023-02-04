/* eslint-disable react-hooks/exhaustive-deps */
import uniqid from 'uniqid';
import React, { useState, useContext, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { UserContext } from '../../../Context/UserContext';
import useFetchUsername from '../../../common/hooks/userdata/useFetchUsername';
import useSetImages from '../../../common/hooks/common/useSetImages';
import useFetchUserProfilePic from '../../../common/hooks/userdata/useFetchUserProfilePic';
import useCreateAndSendTweet from '../../../common/hooks/tweets/useCreateTweet';

function CreateTweet() {
  const { user } = useContext(UserContext);
  const { displayName } = user;
  const [tweetInput, setTweetInput] = useState();
  const { getUsername, username } = useFetchUsername();
  const { createAndSendTweet } = useCreateAndSendTweet();
  const { profilePicURL, getProfilePic } = useFetchUserProfilePic();
  const { imagePreviewURL, setImages, previewImage } = useSetImages();

  useEffect(() => {
    getUsername(displayName);
    getProfilePic(displayName);
  }, []);

  return (
    <div className="flex flex-col gap-3 relative px-5 pb-3 ">
      <div className="flex gap-5">
        <div
          className="w-12 h-12 bg-black rounded-3xl bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${profilePicURL})` }}
        ></div>
        {/* {tweet.type === 'comment' && <p>Replying to @{tweetInfo.username}</p>} */}
        <TextareaAutosize
          type="text"
          placeholder="What's happening?"
          className="resize-none text-xl grow outline-none py-3"
          onChange={(event) => setTweetInput(event.target.value)}
          value={tweetInput}
        />
      </div>
      <div className="">
        {imagePreviewURL.map((image) => {
          return <img alt="" key={uniqid()} src={`${image.url}`} />;
        })}
      </div>
      <div>
        <input type={'file'} onChange={(event) => previewImage(event)}></input>
      </div>
      <button
        className="p-2.5 bg-blue-500 text-white rounded-3xl w-20 self-end"
        onClick={() => {
          createAndSendTweet(username, tweetInput, setImages);
        }}
      >
        Tweet
      </button>
    </div>
  );
}

export default CreateTweet;
