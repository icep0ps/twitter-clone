import { Link } from 'react-router-dom';
import LikeIcon from '../assets/svgs/LikeIcon';
import ShareIcon from '../assets/svgs/ShareIcon';
import { db } from '../firebase/firebase-config';
import { UserContext } from '../Context/UserContext';
import RetweetIcon from '../assets/svgs/RetweetIcon';
import CommentsIcon from '../assets/svgs/CommentsIcon';
import React, { useContext, useEffect, useState } from 'react';
import {
  arrayUnion,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  deleteDoc,
} from 'firebase/firestore';

function Tweet(props) {
  const {
    id,
    author,
    username,
    tweet,
    likes,
    retweets,
    tweetInfomation,
    type,
  } = props;

  const { user } = useContext(UserContext);
  const [tweetRef, setTweetRef] = useState('');
  const [isFollowing, setIsFollowing] = useState(true);

  useEffect(() => {
    switch (tweetInfomation.type) {
      case 'tweet':
        setTweetRef(doc(db, 'users', `${author}`, 'tweets', `${id}`));
        break;
      case 'comment':
        setTweetRef(
          doc(
            db,
            'users',
            `${tweetInfomation.replyingTo}`,
            'tweets',
            `${id}`,
            'comments',
            `${tweetInfomation.id}`
          )
        );
        break;
      default:
        return;
    }
  }, [isFollowing]);

  const follow = async () => {
    const userRef = doc(db, 'users', `${user.uid}`, 'following', `${author}`);
    const following = await getDoc(userRef);
    if (following.exists()) {
      await deleteDoc(userRef);
      setIsFollowing(false);
    } else {
      await setDoc(userRef, {});
      setIsFollowing(true);
    }
  };

  const like = async () => {
    await updateDoc(tweetRef, {
      likes: arrayUnion({
        id: user.uid,
      }),
    });
  };

  const retweet = async () => {
    await updateDoc(tweetRef, {
      retweets: arrayUnion({
        id: user.uid,
      }),
    });

    const yourTweetsRef = doc(db, 'users', `${user.uid}`, 'tweets', `${id}`);
    await setDoc(yourTweetsRef, {
      type: type,
      author: tweetInfomation.author,
      retweetedBy: user.uid,
      retweeter: user.displayName,
      id: id,
    });
  };

  return (
    <div className="flex flex-col border-b border-gray-500 border-solid gap-3 px-5 pb-3 relative">
      <button className="right-10 absolute" onClick={follow}>
        {isFollowing ? 'following' : 'follow'}
      </button>
      <Link to={`/status/${id}`}>
        {tweetInfomation.retweetedBy ? (
          <p>{tweetInfomation.retweetedBy} retweeted</p>
        ) : (
          ''
        )}

        <div className="flex gap-5 ">
          <div className="w-12 h-12  bg-black rounded-3xl"></div>
          <div className="w-5/6">
            <p className="username flex items-center gap-1 ">
              {username}{' '}
              <span className="text-xs text-gray-500">@{username}</span>
            </p>
            <p>{tweet}</p>
          </div>
        </div>
      </Link>
      <div className="flex gap-2 justify-evenly">
        <button className=" text-black">
          <CommentsIcon />
        </button>
        <button className=" text-black flex gap-3" onClick={like}>
          <LikeIcon />
          {likes.length}
        </button>
        <button className=" text-black flex gap-3" onClick={retweet}>
          <RetweetIcon />
          {retweets.length}
        </button>
        <button className=" text-black flex gap-3">
          <ShareIcon />
        </button>
      </div>
    </div>
  );
}

export default Tweet;
