import { setDoc } from 'firebase/firestore';

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

  like() {}

  retweet() {}

  delete() {}
}

export default Tweet;
