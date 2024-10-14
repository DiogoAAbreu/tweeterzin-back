import { tweets, users } from "../db.js";
import { pagenateTweets } from "../utils/utils.js";


export async function postTweet(req, res) {
    const { username, tweet } = req.body;

    if (!username || !tweet) {
        return res.status(400).send({ error: 'Todos os campos são obrigatórios!' })
    }
    //126244187650208

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
    const { page } = req.query;
    const pageNumber = Number(page);
    try {
        if (page) {
            console.log('oi')
            if (isNaN(pageNumber) || pageNumber < 1) {
                res.status(400).send({ error: 'Informe uma página válida!' })
            }

            const pageTweets = await pagenateTweets(tweets, 10, pageNumber);

            return res.status(200).send(pageTweets)
        }

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