import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import log from "loglevel";

import "./config";
import COVIDTrackingAPI from "./utils/covidAPI";
import Schema from "./graphql";

const app = express().use(
    cors({
        origin: "*",
        credentials: true,
    }),
);

const server = new ApolloServer({
    schema: Schema,
    dataSources: () => {
        return {
            covidAPI: new COVIDTrackingAPI(),
        };
    },
    tracing: process.env.NODE_ENV === "development",
});

server.applyMiddleware({ app });

app.listen({ port: 3001 }, () => {
    log.info(
        `🚀 Server ready at http://localhost:${3001}${server.graphqlPath}`,
    );
});
