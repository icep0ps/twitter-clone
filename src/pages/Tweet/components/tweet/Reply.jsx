import uniqid from 'uniqid';
import React, { useState, useContext, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { db, storage } from '../../../../firebase/firebase-config';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { UserContext } from '../../../../Context/UserContext';
import { COMMENT } from '../../../../common/helpers/types';
import useFetchUserProfilePic from '../../../../common/hooks/useFetchUserProfilePic';
import { uploadBytes, getDownloadURL, ref } from 'firebase/storage';

function Reply({ username, author, id }) {
  const { user } = useContext(UserContext);
  const [tweetInput, setTweetInput] = useState('');
  const [imagePreviewURL, setImagePreviewURL] = useState([]);
  const { profilePicURL, getProfilePic } = useFetchUserProfilePic();

  useEffect(() => {
    getProfilePic(user.displayName);
  }, []);

  function setImages(tweetId) {
    const imagesURL = [];
    const images = new Promise((resolve, reject) => {
      if (imagePreviewURL.length === 0) {
        return resolve(imagesURL);
      }

      imagePreviewURL.forEach(async (image, index, array) => {
        const imageUrl = await uploadImage(tweetId, image.image);
        imagesURL.push(imageUrl);
        if (index === array.length - 1) {
          resolve(imagesURL);
        }
      });
    });

    return images;
  }

  async function uploadImage(tweetId, image) {
    const imageRef = ref(
      storage,
      `${user.displayName}/tweets/${tweetId}/images/${image.name + uniqid()}`
    );

    await uploadBytes(imageRef, image);
    const url = await getDownloadURL(imageRef);
    return url;
  }

  function previewImage(event) {
    const image = event.target.files[0];
    setImagePreviewURL((prevState) => [
      ...prevState,
      { image: image, url: URL.createObjectURL(image) },
    ]);
  }
  const tweet = async (event) => {
    event.preventDefault();
    const TWEET_ID = uniqid();
    const replyRef = doc(
      db,
      'users',
      `${user.displayName}`,
      'tweets',
      `${TWEET_ID}`
    );
    const tweetCommentsRef = doc(
      db,
      'users',
      `${author}`,
      'tweets',
      `${id}`,
      'comments',
      `${TWEET_ID}`
    );

    await setDoc(replyRef, {
      type: COMMENT,
      author: author,
      id: TWEET_ID,
      orignalPost: id,
    });

    setImages(TWEET_ID).then(async (responseImages) => {
      await setDoc(tweetCommentsRef, {
        id: TWEET_ID,
        replyingTo: author,
        type: COMMENT,
        profileURL: user.photoURL,
        username: user.displayName,
        author: user.displayName,
        tweet: tweetInput,
        parentDocId: id,
        likes: [],
        retweets: [],
        images: responseImages,
        date: Timestamp.now(),
      });
    });
    setTweetInput('');
    setImagePreviewURL([]);
  };

  return (
    <form
      className="flex flex-col relative px-5 pb "
      onSubmit={(event) => tweet(event)}
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
