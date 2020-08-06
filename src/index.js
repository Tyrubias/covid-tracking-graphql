import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import http from "http";
import log from "loglevel";

const app = express().use(
    cors({
        origin: ["http://localhost:3000/"],
        credentials: true,
    }),
);

const server = new ApolloServer({
    introspection: true,
});

server.applyMiddleware({ app });

const httpServer = http.createServer(app);

server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: 3001 }, () => {
    log.info("Server running.");
    log.info(
        `🚀 Server ready at http://localhost:${3001}${server.graphqlPath}`,
    );
    log.info(
        `🚀 Subscriptions ready at http://localhost:${3001}${
            server.subscriptionsPath
        }`,
    );
});
