import { users } from "../db.js";
export async function pagenateTweets(tweets, pageSize, pageNumber) {
    const startIndex = tweets.length - (pageNumber * pageSize);

    const lastTweets = tweets.slice(startIndex, startIndex + pageSize).map(tweetMade => {
        const { username, tweet } = tweetMade;

        const { avatar } = users.find(user => user.username === username)
        return {
            username,
            avatar,
            tweet
        }
    });

    return lastTweets;
}