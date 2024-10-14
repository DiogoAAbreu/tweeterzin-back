import express from 'express';
import cors from 'cors';

import { signUp } from './controllers/users.js';
import { getTweets, getTweetsByUser, postTweet } from './controllers/tweets.js';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/sign-up', signUp);
app.post('/tweets', postTweet)
app.get('/tweets', getTweets)
app.get('/tweets/:username', getTweetsByUser)

app.listen(5000, () => {
    console.log('Rodando na porta 5000');
})