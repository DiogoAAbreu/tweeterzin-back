import { tweets, users } from "../db.js";


export async function postTweet(req, res) {
    const { username, tweet } = req.body;

    if (!username || !tweet) {
        return res.status(400).send({ error: 'Todos os campos são obrigatórios!' })
    }

    try {
        tweets.push({
            username,
            tweet
        })

        return res.status(201).send('OK')
    } catch (err) {
        return res.status(500).send({ error: 'Impossivel Tweetar' })
    }
}

export async function getTweets(req, res) {
    try {
        const lastTweets = tweets.slice(-10).map(tweetMade => {
            const { username, tweet } = tweetMade;

            const { avatar } = users.find(user => user.username === username)

            return {
                username,
                avatar,
                tweet
            }
        });

        res.status(200).send(lastTweets)
    } catch (err) {
        return res.status(500).send({ error: 'Impossível mostrar Tweets.' })
    }
}

export async function getTweetsByUser(req, res) {
    const { username } = req.params;

    try {
        const userTweets = tweets.filter(tweet => tweet.username === username);

        return res.status(200).send(userTweets);
    } catch (error) {
        return res.status(500).send({ error: 'Impossível exibir tweets.' });
    }
}