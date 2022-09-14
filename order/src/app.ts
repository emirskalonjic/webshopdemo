import * as dotenv from 'dotenv';
import express from 'express';
import router from './routes/routes'
import connect from './connect';

async function startServer() {
    const app = express();
    dotenv.config();

    const port = process.env.PORT;

    app.listen(port, () => {
        console.log(`Order service is running on port ${port}.`);
    });
    
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(router);
}
startServer();

const db = process.env.DB_CONNECTION_STRING || "";
connect({db});