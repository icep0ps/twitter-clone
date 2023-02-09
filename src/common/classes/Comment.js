import Tweet from './Tweet';
import { setDoc } from 'firebase/firestore';

class Comment extends Tweet {
  type = 'comment';
  constructor(id, tweet, author, date, ref, images, parentTweet, replyingTo) {
    super(id, tweet, author, date, ref, images);
    this.replyingTo = replyingTo;
    this.parentTweet = parentTweet;
  }

  async send(replyRef, parentTweetRef) {
    const { ...comment } = this;
    try {
      const setCommentsRefInUsersComments = await setDoc(replyRef, {
        commentRef: this.ref,
        parentTweetRef: parentTweetRef,
      });

      const sendTweetToCommentsSection = await setDoc(this.ref, comment);
    } catch (err) {
      console.log(`ERRO SENDING: ${err} `);
    }
  }

  like() {
    return super.like();
  }
}

export default Comment;
