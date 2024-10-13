import express from 'express';
import cors from 'cors';

import { singUp } from './controllers/users.js';
import { getTweets, postTweet } from './controllers/tweets.js';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/sing-up', singUp);
app.post('/tweets', postTweet)
app.get('/tweets', getTweets)

app.listen(5000, () => {
    console.log('Rodando na porta 5000');
})