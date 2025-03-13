import express from "express";
import { ApolloServer } from "apollo-server-express";
import { CONNECT_DATABASE } from "./config/db/index.js";
import { MONGO_URI, PORT } from "./config/env/index.js";
import { typeDefs } from "./schemas/typedefs.schema.js";
import { resolvers } from "./schemas/resolvers.schema.js";

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });
async function startServer() {
    await server.start();
    server.applyMiddleware({ app });
    CONNECT_DATABASE(MONGO_URI);
    app.listen(PORT, () => {
        console.log(
            `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`,
        );
    });
}
startServer();