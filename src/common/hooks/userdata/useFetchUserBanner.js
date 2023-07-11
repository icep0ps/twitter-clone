import { useState } from 'react';
import { storage } from '../../../firebase/firebase-config';
import { getDownloadURL, ref, list } from 'firebase/storage';

function useFetchUserBanner() {
  const [bannerURL, setBannerURL] = useState(null);

  function getUserBanner(userId) {
    const bannerRef = ref(storage, `${userId}/banner`);

    list(bannerRef).then((images) => {
      const image = images.items[0];
      if (image) {
        getDownloadURL(image).then((url) => {
          console.log(url);
          setBannerURL(url);
        });
      }
      setBannerURL(null);
    });
  }

  return { bannerURL, getUserBanner };
}
export default useFetchUserBanner;
