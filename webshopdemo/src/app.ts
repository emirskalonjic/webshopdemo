import * as dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { router } from './routes/routes';
import { graphqlHTTP } from 'express-graphql';
import schemaProduct from './graphql/schema';
import root from './graphql/resolvers';

async function startServer() {
    const app = express();
    dotenv.config();

    const port = process.env.PORT;

    app.listen(port, () => {
        console.log(`Webshop Demo application is running on port ${port}.`);
    });

    app.use(express.json());
    app.use(express.urlencoded());
    app.use(router);

    app.use(
        "/graphql",
        graphqlHTTP({
            schema: schemaProduct,
            rootValue: root,
            graphiql: true
        })
    )
}

startServer();