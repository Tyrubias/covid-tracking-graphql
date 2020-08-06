import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import log from "loglevel";

import "./config";
import COVIDTrackingAPI from "./utils/covidAPI";

const app = express().use(
    cors({
        origin: "*",
        credentials: true,
    }),
);

const server = new ApolloServer({
    dataSources: () => {
        return {
            covidAPI: new COVIDTrackingAPI(),
        };
    },
    introspection: true,
});

server.applyMiddleware({ app });

app.listen({ port: 3001 }, () => {
    log.info(
        `🚀 Server ready at http://localhost:${3001}${server.graphqlPath}`,
    );
});
