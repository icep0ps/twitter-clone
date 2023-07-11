import { useState } from 'react';
import { storage } from '../../../firebase/firebase-config';
import { ref, getDownloadURL, list } from 'firebase/storage';

function useFetchUserProfilePic() {
  const [profilePicURL, setProfilePicURL] = useState(null);

  function getProfilePic(userId) {
    const profilePicRef = ref(storage, `${userId}/profilePic`);

    list(profilePicRef).then((images) => {
      const image = images.items[0];
      if (image) {
        getDownloadURL(image).then((url) => {
          setProfilePicURL(url);
        });
      }
      return setProfilePicURL(null);
    });
  }

  return { profilePicURL, getProfilePic };
}

export default useFetchUserProfilePic;
