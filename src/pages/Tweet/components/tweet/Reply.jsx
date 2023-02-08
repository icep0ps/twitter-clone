import uniqid from 'uniqid';
import TextareaAutosize from 'react-textarea-autosize';
import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../../../Context/UserContext';
import useSetImages from '../../../../common/hooks/common/useSetImages';
import useCreateAndSendComment from '../../../../common/hooks/comments/useCreateComment';
import useFetchUserProfilePic from '../../../../common/hooks/userdata/useFetchUserProfilePic';

function Reply({ id, username, author, parentTweetRef }) {
  const { user } = useContext(UserContext);
  const [tweetInput, setTweetInput] = useState('');
  const { imagePreviewURL, previewImage, setImages } = useSetImages();
  const { profilePicURL, getProfilePic } = useFetchUserProfilePic();
  const { createAndSendComment } = useCreateAndSendComment(id);

  useEffect(() => {
    getProfilePic(user.displayName);
  }, []);

  return (
    <form
      className="flex flex-col relative px-5 pb "
      onSubmit={(event) => {
        event.preventDefault();
        createAndSendComment(username, tweetInput, setImages, author, parentTweetRef);
      }}
    >
      <div className="flex gap-5 items-start ">
        <div
          className="min-w-[48px] min-h-[48px] bg-black rounded-3xl bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${profilePicURL})` }}
        ></div>
        <div className="w-full">
          <p className="text-sm">
            Replying to <span className="text-blue-500">@{username}</span>
          </p>
          <TextareaAutosize
            cols="35"
            type="text"
            placeholder="Tweet Your Reply?"
            className="resize-none text-xl grow outline-none py-3"
            onChange={(event) => setTweetInput(event.target.value)}
            value={tweetInput}
          />
        </div>
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
        type="submit"
      >
        Tweet
      </button>
    </form>
  );
}

export default Reply;
