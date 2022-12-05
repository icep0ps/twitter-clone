import { collection, getDocs } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../../firebase/firebase-config';
import useFetchTweet from './useFetchTweet';

function useFetchLikes() {
  const { getTweet } = useFetchTweet();
  const [likedTweets, setLikedTweets] = useState([]);

  async function getLikes(userId) {
    console.log('checking');
    const usersLikesRef = collection(db, 'users', `${userId}`, 'likes');
    const likes = await getDocs(usersLikesRef);
    likes.forEach(async (tweet) => {
      const likedTweet = tweet.data();
      const returnedTweet = await getTweet(likedTweet.author, likedTweet.id);
      console.log(returnedTweet);
      setLikedTweets((prevState) => [...prevState, returnedTweet]);
    });
  }
  return { getLikes, likedTweets };
}

export default useFetchLikes;
