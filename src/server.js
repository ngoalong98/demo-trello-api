import express from 'express';
import cors from 'cors';
import { connectDB, getDB } from '*/config/mongodb';
import { env } from '*/config/environtment'; 
import { corsOption } from '*/config/cors'; 
import { apiV1 } from '*/routes/v1';

connectDB()
    .then(() => console.log('Connected successfully to database server!'))
    .then(() => bootServer())
    .catch(error => {
        console.log(error)
        process.exit(1)
    })

const bootServer = () => {
    const app = express();

    app.use(cors(corsOption));

    // enable req.body data
    app.use(express.json());

    // use apis v1
    app.use('/v1', apiV1);

    app.listen(env.APP_PORT, env.APP_HOST, () => {
        console.log(`Hello ngoalong sdsdsds, I'm running at ${env.APP_HOST}:${env.APP_PORT}/`);
    });
}

