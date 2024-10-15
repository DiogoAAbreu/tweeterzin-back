import { tweets } from "../db.js";
import { insertAvatar, pagenateTweets } from "../utils/utils.js";


export async function postTweet(req, res) {
    const { tweet } = req.body;
    const { user } = req.headers;

    if (!user || !tweet) {
        return res.status(400).send({ error: 'Todos os campos são obrigatórios!' })
    }

    try {
        tweets.push({
            username: user,
            tweet
        })

        return res.status(201).send('OK')
    } catch (err) {
        return res.status(500).send({ error: 'Impossivel Tweetar' })
    }
}

export async function getTweets(req, res) {
    const { page } = req.query;

    try {
        if (page) {
            const pageNumber = Number(page);
            if (isNaN(pageNumber) || pageNumber < 1) {
                res.status(400).send({ error: 'Informe uma página válida!' })
            }

            const pageTweets = await pagenateTweets(tweets, 10, pageNumber);

            return res.status(200).send(pageTweets)
        }

        const lastTweets = await pagenateTweets(tweets, 10, 1);

        res.status(200).send(lastTweets)
    } catch (err) {
        return res.status(500).send({ error: 'Impossível mostrar Tweets.' })
    }
}

export async function getTweetsByUser(req, res) {
    const { username } = req.params;

    try {
        const userTweets = tweets.filter(tweet => tweet.username === username).map(tweet => insertAvatar(tweet));

        return res.status(200).send(userTweets);
    } catch (error) {
        return res.status(500).send({ error: 'Impossível exibir tweets.' });
    }
}