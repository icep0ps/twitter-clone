import uniqid from 'uniqid';
import { useState, useContext } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import AppContext from '../../../Context/AppContext';
import { storage } from '../../../firebase/firebase-config';

const useSetImages = () => {
  const { user } = useContext(AppContext);
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

  return { imagePreviewURL, setImages, previewImage, setImagePreviewURL };
};

export default useSetImages;
