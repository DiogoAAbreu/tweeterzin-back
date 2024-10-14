export async function pagenateTweets(tweets, pageSize, pageNumber) {
    const startIndex = tweets.length - (pageNumber * pageSize);

    return tweets.slice(startIndex, startIndex + pageSize);
}