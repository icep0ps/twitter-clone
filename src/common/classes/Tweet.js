import { getAuth } from 'firebase/auth';
import { db } from '../../firebase/firebase-config';
import { setDoc, getDoc, doc, deleteDoc } from 'firebase/firestore';
class Tweet {
  type = 'tweet';
  constructor(id, tweet, author, date, ref, images = []) {
    this.id = id;
    this.author = { ...author };
    this.tweet = tweet;
    this.images = images;
    this.date = date;
    this.ref = ref;
  }

  async send() {
    const { ...tweet } = this;
    try {
      await setDoc(this.ref, tweet);
    } catch (err) {
      console.log(`ERRO SENDING: ${err} `);
    }
  }

  async like() {
    const auth = getAuth();
    const user = auth.currentUser;

    const tweetLikesRef = doc(db, this.ref.path + `/likes/${user.displayName}`);
    const usersLikesRef = doc(db, 'users', `${user.displayName}`, 'likes', `${this.id}`);

    getDoc(usersLikesRef)
      .then((doc) => {
        if (doc.exists()) {
          deleteDoc(usersLikesRef);
          deleteDoc(tweetLikesRef);
        } else {
          setDoc(usersLikesRef, {
            ref: this.ref,
            type: this.type,
          });

          setDoc(tweetLikesRef, {
            userId: user.displayName,
          });
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  }

  retweet() {}

  delete() {}
}

export default Tweet;
