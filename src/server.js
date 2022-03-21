import express from 'express';
import { connectDB } from '*/config/mongodb';
import { env } from '*/config/environtment';

const app = express();

const hostname = env.HOST;
const port = env.PORT;

connectDB().catch(console.log);

app.get('/' , (req, res) => {
    res.end('<h1>Hello World!</h1><hr/>')
});

app.listen(env.PORT, env.HOST, () => {
    console.log(`Hello ngoalong sdsdsds, I'm running at ${env.HOST}:${env.PORT}/`);
});
