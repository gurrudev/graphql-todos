import express from "express";
import { ApolloServer } from "apollo-server-express";
import { CONNECT_DATABASE } from "./config/db";
import { MONGO_URI, PORT } from "./config/env";


const app = express();
const server = new ApolloServer({ });
async function startServer() {
    await server.start();
    CONNECT_DATABASE(MONGO_URI)
    server.applyMiddleware({ app });
    app.listen(PORT, () => {
        console.log(
            `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`,
        );
    });
}
startServer();