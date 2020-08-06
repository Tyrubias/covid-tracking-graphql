import { sc } from "graphql-compose";

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
    },
});

export default USDataTC;
