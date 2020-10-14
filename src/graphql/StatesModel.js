import { sc } from "graphql-compose";
import {
    rawStateDataToGraphQL,
    rawStateMetadataToGraphQL,
} from "../utils/parse";
import UrlTC from "./CommonTypes";

const StateMetadataTC = sc.createObjectTC({
    name: "StateMetadata",
    description: "The metadata (such as reporting website) for a state",
    fields: {
        covid19Site: UrlTC.getTypeNonNull().getType(),
        covid19SiteOld: UrlTC.getTypeNonNull().getType(),
        covid19SiteSecondary: UrlTC.getTypeNonNull().getType(),
        covid19SiteTertiary: UrlTC.getTypeNonNull().getType(),
        covid19SiteQuaternary: UrlTC.getTypeNonNull().getType(),
        covid19SiteQuinary: UrlTC.getTypeNonNull().getType(),
        covidTrackingProjectPreferredTotalTestField: "String!",
        covidTrackingProjectPreferredTotalTestUnits: "String!",
        fips: "String!",
        name: "String!",
        notes: "String!",
        state: "String!",
        totalTestResultsField: "String!",
        twitter: "String!",
    },
});

const StateDataTC = sc.createObjectTC({
    name: "StateData",
    description: "The format of the data for each state",
    fields: {
        dataQualityGrade: "String!",
        date: "Date!",
        death: "Int",
        deathConfirmed: "Int",
        deathIncrease: "Int",
        deathProbable: "Int",
        fips: "String!",
        hospitalizedCumulative: "Int",
        hospitalizedCurrently: "Int",
        hospitalizedIncrease: "Int",
        inIcuCumulative: "Int",
        inIcuCurrently: "Int",
        lastUpdateEt: "Date",
        negative: "Int",
        negativeTestsAntibody: "Int",
        negativeTestsPeopleAntibody: "Int",
        negativeTestsViral: "Int",
        onVentilatorCumulative: "Int",
        onVentilatorCurrently: "Int",
        pending: "Int",
        positiveCasesViral: "Int",
        positiveIncrease: "Int",
        positiveTestsAntibody: "Int",
        positiveTestsAntigen: "Int",
        positiveTestsPeopleAntibody: "Int",
        positiveTestsPeopleAntigen: "Int",
        positiveTestsViral: "Int",
        probableCases: "Int",
        recovered: "Int",
        state: "String!",
        totalTestEncountersViral: "Int",
        totalTestResults: "Int",
        totalTestResultsIncrease: "Int",
        totalTestsAntibody: "Int",
        totalTestsAntigen: "Int",
        totalTestsPeopleAntibody: "Int",
        totalTestsPeopleAntigen: "Int",
        totalTestsPeopleViral: "Int",
        totalTestViral: "Int",
    },
});

StateMetadataTC.addResolver({
    name: "findOne",
    type: StateMetadataTC,
    args: {
        stateAbbrev: "String!",
    },
    resolve: async ({ args, context: { dataSources } }) => {
        return dataSources.covidAPI
            .getMetadataState(args.stateAbbrev)
            .then(rawStateMetadataToGraphQL);
    },
})
    .addResolver({
        name: "findMany",
        type: [StateMetadataTC],
        resolve: async ({ context: { dataSources } }) => {
            return dataSources.covidAPI
                .getStatesMetadata()
                .then(allData => allData.map(rawStateMetadataToGraphQL));
        },
    })
    .addResolver({
        name: "count",
        type: "Int!",
        resolve: async ({ context: { dataSources } }) => {
            return dataSources.covidAPI
                .getStatesMetadata()
                .then(allData => allData.length);
        },
    });

StateDataTC.addResolver({
    name: "findOne",
    type: StateDataTC,
    args: {
        stateAbbrev: "String!",
        date: "Date!",
    },
    resolve: async ({ args, context: { dataSources } }) => {
        return dataSources.covidAPI
            .getStateOnDate(args.stateAbbrev, args.date)
            .then(rawStateDataToGraphQL);
    },
})
    .addResolver({
        name: "findMany",
        type: [StateDataTC],
        args: {
            stateAbbrev: "String!",
        },
        resolve: async ({ args, context: { dataSources } }) => {
            return dataSources.covidAPI
                .getHistoricForState(args.stateAbbrev)
                .then(allData => allData.map(rawStateDataToGraphQL));
        },
    })
    .addResolver({
        name: "statesCurrent",
        type: [StateDataTC],
        resolve: async ({ context: { dataSources } }) => {
            return dataSources.covidAPI
                .getCurrentStates()
                .then(allData => allData.map(rawStateDataToGraphQL));
        },
    })
    .addResolver({
        name: "stateCurrent",
        type: StateDataTC,
        args: {
            stateAbbrev: "String!",
        },
        resolve: async ({ args, context: { dataSources } }) => {
            return dataSources.covidAPI
                .getCurrentForState(args.stateAbbrev)
                .then(rawStateDataToGraphQL);
        },
    })
    .addResolver({
        name: "count",
        type: "Int!",
        resolve: async ({ args, context: { dataSources } }) => {
            return dataSources.covidAPI
                .getHistoricForState(args.stateAbbrev)
                .then(allData => allData.length);
        },
    });

const StateMetadataQueries = {
    metaOne: StateMetadataTC.getResolver("findOne"),
    metaMany: StateMetadataTC.getResolver("findMany"),
    metaCount: StateMetadataTC.getResolver("count"),
};

const StateDataQueries = {
    stateOne: StateDataTC.getResolver("findOne"),
    stateMany: StateDataTC.getResolver("findMany"),
    statesCurrent: StateDataTC.getResolver("statesCurrent"),
    stateCurrent: StateDataTC.getResolver("stateCurrent"),
    stateCount: StateDataTC.getResolver("count"),
};

export { StateDataTC, StateMetadataTC, StateMetadataQueries, StateDataQueries };
