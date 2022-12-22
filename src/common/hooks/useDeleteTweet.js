import { deleteDoc } from 'firebase/firestore';

function useDeleteTweet() {
  async function deleteTweet(tweetRef) {
    console.log(tweetRef);
    await deleteDoc(tweetRef);
  }
  return { deleteTweet };
}

export default useDeleteTweet;
