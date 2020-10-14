import { sc } from "graphql-compose";
import moment from "moment";
import { rawUSDataToGraphQL } from "../utils/parse";

const USDataTC = sc.createObjectTC({
    name: "USData",
    description: "The format of the U.S. daily COVID-19 case reports",
    fields: {
        date: "Date!",
        death: "Int",
        deathIncrease: "Int",
        hash: "String!",
        hospitalizedCumulative: "Int",
        hospitalizedCurrently: "Int",
        hospitalizedIncrease: "Int",
        inIcuCumulative: "Int",
        inIcuCurrently: "Int",
        negative: "Int",
        negativeIncrease: "Int",
        onVentilatorCumulative: "Int",
        onVentilatorCurrently: "Int",
        pending: "Int",
        positive: "Int",
        positiveIncrease: "Int",
        recovered: "Int",
        states: "Int!",
        totalTestResults: "Int",
        totalTestResultsIncrease: "Int",
    },
});

USDataTC.addResolver({
    name: "findOne",
    type: USDataTC,
    args: {
        date: "Date!",
    },
    resolve: async ({ args, context: { dataSources } }) => {
        return dataSources.covidAPI
            .getUSDataDate(args.date)
            .then(rawUSDataToGraphQL);
    },
})
    .addResolver({
        name: "findMany",
        type: [USDataTC],
        resolve: async ({ context: { dataSources } }) => {
            return dataSources.covidAPI
                .getHistoricUS()
                .then(allData => allData.map(rawUSDataToGraphQL));
        },
    })
    .addResolver({
        name: "usCurrent",
        type: USDataTC,
        resolve: async ({ context: { dataSources } }) => {
            return dataSources.covidAPI.getCurrentUS().then(rawUSDataToGraphQL);
        },
    })
    .addResolver({
        name: "count",
        type: "Int!",
        resolve: async ({ context: { dataSources } }) => {
            return dataSources.covidAPI
                .getHistoricUS()
                .then(allData => allData.length);
        },
    });

const USQueries = {
    usFindOne: USDataTC.getResolver("findOne"),
    usFindMany: USDataTC.getResolver("findMany"),
    usCurrent: USDataTC.getResolver("usCurrent"),
    usCount: USDataTC.getResolver("count"),
};

export { USDataTC, USQueries };
