import { collection, getDocs } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../../../firebase/firebase-config';
import useFetchTweet from '../tweets/useFetchTweet';
import useDeleteTweet from '../tweets/useDeleteTweet';

function useFetchLikes() {
  const { getTweet } = useFetchTweet();
  const { deleteTweet } = useDeleteTweet();
  const [likedTweets, setLikedTweets] = useState([]);

  async function getLikes(userId) {
    const usersLikesRef = collection(db, 'users', `${userId}`, 'likes');
    const likes = await getDocs(usersLikesRef);
    likes.forEach(async (tweet) => {
      const likedTweet = tweet.data();
      const returnedTweet = await getTweet(likedTweet.author, likedTweet.id);
      if (returnedTweet === null) {
        deleteTweet(tweet.ref);
      }
      setLikedTweets((prevState) => [...prevState, returnedTweet]);
    });
  }
  return { getLikes, likedTweets };
}

export default useFetchLikes;
