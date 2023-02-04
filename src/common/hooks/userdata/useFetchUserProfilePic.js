import { useState } from 'react';
import { storage } from '../../../firebase/firebase-config';
import { ref, getDownloadURL, list } from 'firebase/storage';

function useFetchUserProfilePic() {
  const [profilePicURL, setProfilePicURL] = useState(null);

  function getProfilePic(userId) {
    const profilePicRef = ref(storage, `${userId}/profilePic`);
    list(profilePicRef).then((images) => {
      getDownloadURL(images.items[0]).then((url) => {
        setProfilePicURL(url);
      });
    });
  }

  return { profilePicURL, getProfilePic };
}

export default useFetchUserProfilePic;
