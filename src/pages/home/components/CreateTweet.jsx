/* eslint-disable react-hooks/exhaustive-deps */
import uniqid from 'uniqid';
import React, { useState, useContext, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { db, storage } from '../../../firebase/firebase-config';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { UserContext } from '../../../Context/UserContext';
import { TWEET } from '../../../common/helpers/types';
import { COMMENT } from '../../../common/helpers/types';
import useFetchUsername from '../../../common/hooks/useFetchUsername';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import useFetchUserProfilePic from './../../../common/hooks/useFetchUserProfilePic';

function CreateTweet(tweet = { type: 'tweet' }) {
  const { user } = useContext(UserContext);
  const { getUsername, username } = useFetchUsername();
  const [tweetInfo, setTweetInfo] = useState();
  const [tweetInput, setTweetInput] = useState();
  const { profilePicURL, getProfilePic } = useFetchUserProfilePic();

  const [imagePreviewURL, setImagePreviewURL] = useState([]);

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

  useEffect(() => {
    getUsername(user.displayName);
    getProfilePic(user.displayName);
  }, []);

  const sendTweet = async () => {
    const TWEET_ID = uniqid();
    switch (tweet.type) {
      case 'tweet':
        const usersTweetsRef = doc(
          db,
          'users',
          `${user.displayName}`,
          'tweets',
          `${TWEET_ID}`
        );
        setImages(TWEET_ID).then(async (responseImages) => {
          await setDoc(usersTweetsRef, {
            id: TWEET_ID,
            type: TWEET,
            author: user.displayName,
            profileURL: user.photoURL,
            username: username,
            tweet: tweetInput,
            likes: [],
            retweets: [],
            images: responseImages,
            date: Timestamp.now(),
          });
        });

        break;
      case 'comment':
        setTweetInfo(tweet);
        const { id, author } = tweetInfo;
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
        setImages(TWEET_ID).then(async (images) => {
          await setDoc(tweetCommentsRef, {
            id: TWEET_ID,
            replyingTo: author,
            type: COMMENT,
            profileURL: user.photoURL,
            username: username,
            author: user.displayName,
            tweet: tweetInput,
            likes: [],
            retweets: [],
            comments: [],
            images: images,
            date: Timestamp.now(this.id),
          });
        });

        break;
      default:
        return;
    }
  };

  return (
    <div className="flex flex-col gap-3 relative px-5 pb-3 ">
      <div className="flex gap-5">
        <div
          className="w-12 h-12 bg-black rounded-3xl bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${profilePicURL})` }}
        ></div>

        {tweet.type === 'comment' && <p>Replying to @{tweetInfo.username}</p>}
        <TextareaAutosize
          type="text"
          placeholder="What's happening?"
          className="resize-none text-xl grow outline-none py-3"
          onChange={(event) => setTweetInput(event.target.value)}
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
          sendTweet();
        }}
      >
        Tweet
      </button>
    </div>
  );
}

export default CreateTweet;
