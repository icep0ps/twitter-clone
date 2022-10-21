import useLike from '../hooks/useLike';
import { Link } from 'react-router-dom';
import { doc } from 'firebase/firestore';
import ComposeTweet from './ComposeTweet';
import useFollow from '../hooks/useFollow';
import useRetweet from '../hooks/useRetweet';
import LikeIcon from '../../assets/svgs/LikeIcon';
import ShareIcon from '../../assets/svgs/ShareIcon';
import { db } from '../../firebase/firebase-config';
import { UserContext } from '../../Context/UserContext';
import RetweetIcon from '../../assets/svgs/RetweetIcon';
import CommentsIcon from '../../assets/svgs/CommentsIcon';
import React, { useEffect, useState, useContext } from 'react';

function Tweet(props) {
  const [tweetRef, setTweetRef] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const { setCurrentTweetBiengViewed } = useContext(UserContext);
  const { id, author, username, likes, retweets, tweetInfomation } = props;

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
  }, []);

  const { like } = useLike(tweetRef);
  const { follow, isFollowing } = useFollow(author);
  const { retweet } = useRetweet(tweetRef, tweetInfomation);

  return (
    <div
      className="tweet flex flex-col gap-3 px-5 relative"
      onClick={() => setCurrentTweetBiengViewed(tweetInfomation)}
    >
      {isReplying ? <ComposeTweet tweet={tweetInfomation} /> : ''}
      <button className="right-10 absolute" onClick={follow}>
        {isFollowing ? 'following' : 'follow'}
      </button>

      {tweetInfomation.retweeter ? (
        <p>{tweetInfomation.retweeter} retweeted</p>
      ) : (
        ''
      )}
      {tweetInfomation.replyingTo ? (
        <p>replying to @{tweetInfomation.replyingTo} </p>
      ) : (
        ''
      )}
      <div className="flex gap-5 ">
        <div className="flex gap-5 ">
          <div className="image">
            <div className=" min-w-[48px] min-h-[48px]  bg-black rounded-3xl"></div>
            <div className="line"></div>
          </div>
        </div>

        <div className="w-5/6">
          <Link to={`/${author}/status/${id}`}>
            <p className="username flex items-center gap-1 ">
              {username}{' '}
              <span className="text-xs text-gray-500">@{username}</span>
            </p>
            <p>{tweetInfomation.tweet}</p>
          </Link>
          {!isReplying ? (
            <div className="flex gap-2 justify-between">
              <button
                className=" text-black"
                onClick={() => setIsReplying(!isReplying)}
              >
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
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
}

export default Tweet;
