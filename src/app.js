import express from 'express';
import cors from 'cors';

import { signUp } from './controllers/users.js';
import { getTweets, postTweet } from './controllers/tweets.js';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/sign-up', signUp);
app.post('/tweets', postTweet)
app.get('/tweets', getTweets)

app.listen(5000, () => {
    console.log('Rodando na porta 5000');
})