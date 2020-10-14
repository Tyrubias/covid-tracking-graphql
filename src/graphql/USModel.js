import { sc } from "graphql-compose";
import moment from "moment";

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
        return dataSources.covidAPI.getUSDataDate(args.date).then((data) => ({
            date: moment(data.date, "YYYYMMDD").isValid()
                ? moment(data.date, "YYYYMMDD").toDate()
                : null,
            death: data.death,
            deathIncrease: data.deathIncrease,
            hash: data.hash,
            hospitalizedCumulative: data.hospitalizedCumulative,
            hospitalizedCurrently: data.hospitalizedCurrently,
            hospitalizedIncrease: data.hospitalizedIncrease,
            inIcuCumulative: data.inIcuCumulative,
            inIcuCurrently: data.inIcuCurrently,
            negative: data.negative,
            negativeIncrease: data.negativeIncrease,
            onVentilatorCumulative: data.onVentilatorCumulative,
            onVentilatorCurrently: data.onVentilatorCurrently,
            pending: data.pending,
            positive: data.positive,
            positiveIncrease: data.positiveIncrease,
            recovered: data.recovered,
            states: data.states,
            totalTestResults: data.totalTestResults,
            totalTestResultsIncrease: data.totalTestResultsIncrease,
        }));
    },
})
    .addResolver({
        name: "findMany",
        type: [USDataTC],
        resolve: async ({ context: { dataSources } }) => {
            return dataSources.covidAPI.getHistoricUS().then((allData) =>
                allData.map((data) => ({
                    date: moment(data.date, "YYYYMMDD").isValid()
                        ? moment(data.date, "YYYYMMDD").toDate()
                        : null,
                    death: data.death,
                    deathIncrease: data.deathIncrease,
                    hash: data.hash,
                    hospitalizedCumulative: data.hospitalizedCumulative,
                    hospitalizedCurrently: data.hospitalizedCurrently,
                    hospitalizedIncrease: data.hospitalizedIncrease,
                    inIcuCumulative: data.inIcuCumulative,
                    inIcuCurrently: data.inIcuCurrently,
                    negative: data.negative,
                    negativeIncrease: data.negativeIncrease,
                    onVentilatorCumulative: data.onVentilatorCumulative,
                    onVentilatorCurrently: data.onVentilatorCurrently,
                    pending: data.pending,
                    positive: data.positive,
                    positiveIncrease: data.positiveIncrease,
                    recovered: data.recovered,
                    states: data.states,
                    totalTestResults: data.totalTestResults,
                    totalTestResultsIncrease: data.totalTestResultsIncrease,
                })),
            );
        },
    })
    .addResolver({
        name: "count",
        type: "Int!",
        resolve: async ({ context: { dataSources } }) => {
            return dataSources.covidAPI
                .getHistoricUS()
                .then((allData) => allData.length);
        },
    });

const USQueries = {
    usFindOne: USDataTC.getResolver("findOne"),
    usFindMany: USDataTC.getResolver("findMany"),
    usCount: USDataTC.getResolver("count"),
};

export { USDataTC, USQueries };
