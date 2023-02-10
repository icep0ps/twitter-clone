import Comment from './Comment';

class Retweet extends Comment {
  constructor(
    id,
    tweet,
    author,
    date,
    ref,
    images,
    parentTweet,
    replyingTo,
    retweetedBy
  ) {
    super(id, tweet, author, date, ref, images, parentTweet, replyingTo);
    this.retweetedBy = retweetedBy;
  }
}

export default Retweet;
