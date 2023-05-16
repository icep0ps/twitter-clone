import Tweet from './Tweet';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/firebase-config';

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

      const ref = doc(db, parentTweetRef.path + `/comments/${this.id}`);
      const sendTweetToCommentsSection = await setDoc(ref, comment);
    } catch (err) {
      console.log(`ERRO SENDING: ${err} `);
    }
  }

  like() {
    return super.like();
  }
}

export default Comment;
