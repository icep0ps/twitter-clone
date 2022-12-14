import useLike from '../hooks/useLike';
import { Link } from 'react-router-dom';
import { doc } from 'firebase/firestore';
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
  const { setCurrentTweetBiengViewed, setReplyingTo, user } =
    useContext(UserContext);
  const { id, author, username, likes, retweets, tweetInfomation, tweetor } =
    props;

  const { like } = useLike(tweetRef, tweetInfomation);
  const { follow, isFollowing } = useFollow(author);
  const { retweet } = useRetweet(tweetRef, tweetInfomation);

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

  return (
    <div
      className="tweet flex flex-col gap-3 px-5 relative"
      onClick={() => setCurrentTweetBiengViewed(tweetInfomation)}
    >
      {user.displayName !== author && (
        <button className="right-10 absolute" onClick={(e) => follow()}>
          {isFollowing ? 'following' : 'follow'}
        </button>
      )}

      {tweetInfomation.retweeter && (
        <p>{tweetInfomation.retweeter} Retweeted</p>
      )}

      <div className="flex gap-5 ">
        <div className="flex gap-5 ">
          <div className="image">
            <div className=" min-w-[48px] min-h-[48px]  bg-black rounded-3xl"></div>
            {tweetInfomation.parentDocId !== id && <div className="line"></div>}
          </div>
        </div>
        <div className="w-5/6">
          <div>
            <Link to={`/${author}/status/${tweetInfomation.id}`}>
              <p className="username flex items-center gap-1 font-medium">
                {username}{' '}
                <span className="text-sm text-gray-500 font-thin">
                  @{author}
                </span>
              </p>
              {tweetInfomation.replyingTo && (
                <p className="text-sm">
                  replying to{' '}
                  <span className="text-blue-500">
                    @{tweetInfomation.replyingTo}
                  </span>
                </p>
              )}
              <p>{tweetInfomation.tweet}</p>
            </Link>
            <div className="flex gap-20  py-2">
              <Link to={'/compose/tweet'}>
                <button
                  className=" text-black"
                  onClick={(e) => setReplyingTo(tweetInfomation)}
                >
                  <CommentsIcon />
                </button>
              </Link>
              <button
                className=" text-black flex gap-3"
                onClick={() => retweet()}
              >
                <RetweetIcon />
                {retweets?.length}
              </button>
              <button className=" text-black flex gap-3" onClick={() => like()}>
                <LikeIcon />
                {likes?.length}
              </button>
              <button className=" text-black flex gap-3">
                <ShareIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tweet;
