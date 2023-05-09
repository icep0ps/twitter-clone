import { collection, getDocs, getDoc } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../../../firebase/firebase-config';
import { COMMENT } from '../../helpers/types';
import useFetchComment from '../comments/useFetchComment';

function useFetchLikes() {
  const [getCommentAndTweet] = useFetchComment();
  const [tweets, setTweets] = useState([]);
  const [comments, setComments] = useState([]);

  async function getLikes(userId) {
    const usersLikesRef = collection(db, 'users', `${userId}`, 'likes');
    const likes = await getDocs(usersLikesRef);

    likes.forEach(async (tweet) => {
      const likedTweet = tweet.data();
      const { type, ref } = likedTweet;
      if (type === COMMENT) {
        const returnedTweet = getCommentAndTweet(ref);
        setComments((prevState) => [...prevState, returnedTweet.data()]);
      } else {
        const returnedTweet = await getDoc(ref);
        setTweets((prevState) => [...prevState, returnedTweet.data()]);
      }
    });
  }
  return { getLikes, tweets, comments };
}

export default useFetchLikes;
