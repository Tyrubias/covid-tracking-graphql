import { sc } from "graphql-compose";
import moment from "moment";
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
            .then((data) => ({
                covid19Site: data.covid19Site,
                covid19SiteOld: data.covid19SiteOld,
                covid19SiteSecondary: data.covid19SiteSecondary,
                covid19SiteTertiary: data.covid19SiteTertiary,
                covid19SiteQuaternary: data.covid19SiteQuaternary,
                covid19SiteQuinary: data.covid19SiteQuinary,
                fips: data.fips,
                name: data.fips,
                notes: data.notes,
                state: data.state,
                twitter: data.twitter,
            }));
    },
})
    .addResolver({
        name: "findMany",
        type: [StateMetadataTC],
        resolve: async ({ context: { dataSources } }) => {
            return dataSources.covidAPI.getStatesMetadata().then((allData) =>
                allData.map((data) => ({
                    covid19Site: data.covid19Site,
                    covid19SiteOld: data.covid19SiteOld,
                    covid19SiteSecondary: data.covid19SiteSecondary,
                    covid19SiteTertiary: data.covid19SiteTertiary,
                    fips: data.fips,
                    name: data.fips,
                    notes: data.notes,
                    state: data.state,
                    totalTestResultsField: data.totalTestResultsField,
                    twitter: data.twitter,
                })),
            );
        },
    })
    .addResolver({
        name: "count",
        type: "Int!",
        resolve: async ({ context: { dataSources } }) => {
            return dataSources.covidAPI
                .getStatesMetadata()
                .then((allData) => allData.length);
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
            .then((data) => ({
                dataQualityGrade: data.dataQualityGrade,
                date: moment(data.date, "YYYYMMDD").isValid()
                    ? moment(data.date, "YYYYMMDD").toDate()
                    : null,
                death: data.death,
                deathConfirmed: data.deathConfirmed,
                deathIncrease: data.deathIncrease,
                deathProbable: data.deathProbable,
                fips: data.fips,
                hospitalizedCumulative: data.hospitalizedCumulative,
                hospitalizedCurrently: data.hospitalizedCurrently,
                hospitalizedIncrease: data.hospitalizedIncrease,
                inIcuCumulative: data.inIcuCumulative,
                inIcuCurrently: data.inIcuCurrently,
                lastUpdateEt: moment(data.lastUpdateEt, [
                    "M/D/YYYY HH:mm",
                    "MM/DD/YYYY HH:mm",
                ]).isValid()
                    ? moment(data.lastUpdateEt, [
                          "M/D/YYYY HH:mm",
                          "MM/DD/YYYY HH:mm",
                      ]).toDate()
                    : null,
                negative: data.negative,
                negativeTestsAntibody: data.negativeTestsAntibody,
                negativeTestsPeopleAntibody: data.negativeTestsPeopleAntibody,
                negativeTestsViral: data.negativeTestsViral,
                onVentilatorCumulative: data.onVentilatorCumulative,
                onVentilatorCurrently: data.onVentilatorCurrently,
                pending: data.pending,
                positiveCasesViral: data.positiveCasesViral,
                positiveIncrease: data.positiveIncrease,
                positiveTestsAntibody: data.positiveTestsAntibody,
                positiveTestsAntigen: data.positiveTestsAntigen,
                positiveTestsPeopleAntibody: data.positiveTestsPeopleAntibody,
                positiveTestsPeopleAntigen: data.positiveTestsPeopleAntigen,
                positiveTestsViral: data.positiveTestsViral,
                probableCases: data.probableCases,
                recovered: data.recovered,
                state: data.state,
                totalTestEncountersViral: data.totalTestEncountersViral,
                totalTestResults: data.totalTestResults,
                totalTestResultsIncrease: data.totalTestResultsIncrease,
                totalTestsAntibody: data.totalTestsAntibody,
                totalTestsAntigen: data.totalTestsAntigen,
                totalTestsPeopleAntibody: data.totalTestsPeopleAntibody,
                totalTestsPeopleAntigen: data.totalTestsPeopleAntigen,
                totalTestsPeopleViral: data.totalTestsPeopleViral,
                totalTestViral: data.totalTestViral,
            }));
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
                .then((allData) =>
                    allData.map((data) => ({
                        dataQualityGrade: data.dataQualityGrade,
                        date: moment(data.date, "YYYYMMDD").isValid()
                            ? moment(data.date, "YYYYMMDD").toDate()
                            : null,
                        death: data.death,
                        deathConfirmed: data.deathConfirmed,
                        deathIncrease: data.deathIncrease,
                        deathProbable: data.deathProbable,
                        fips: data.fips,
                        hospitalizedCumulative: data.hospitalizedCumulative,
                        hospitalizedCurrently: data.hospitalizedCurrently,
                        hospitalizedIncrease: data.hospitalizedIncrease,
                        inIcuCumulative: data.inIcuCumulative,
                        inIcuCurrently: data.inIcuCurrently,
                        lastUpdateEt: moment(data.lastUpdateEt, [
                            "M/D/YYYY HH:mm",
                            "MM/DD/YYYY HH:mm",
                        ]).isValid()
                            ? moment(data.lastUpdateEt, [
                                  "M/D/YYYY HH:mm",
                                  "MM/DD/YYYY HH:mm",
                              ]).toDate()
                            : null,
                        negative: data.negative,
                        negativeTestsAntibody: data.negativeTestsAntibody,
                        negativeTestsPeopleAntibody:
                            data.negativeTestsPeopleAntibody,
                        negativeTestsViral: data.negativeTestsViral,
                        onVentilatorCumulative: data.onVentilatorCumulative,
                        onVentilatorCurrently: data.onVentilatorCurrently,
                        pending: data.pending,
                        positiveCasesViral: data.positiveCasesViral,
                        positiveIncrease: data.positiveIncrease,
                        positiveTestsAntibody: data.positiveTestsAntibody,
                        positiveTestsAntigen: data.positiveTestsAntigen,
                        positiveTestsPeopleAntibody:
                            data.positiveTestsPeopleAntibody,
                        positiveTestsPeopleAntigen:
                            data.positiveTestsPeopleAntigen,
                        positiveTestsViral: data.positiveTestsViral,
                        probableCases: data.probableCases,
                        recovered: data.recovered,
                        state: data.state,
                        totalTestEncountersViral: data.totalTestEncountersViral,
                        totalTestResults: data.totalTestResults,
                        totalTestResultsIncrease: data.totalTestResultsIncrease,
                        totalTestsAntibody: data.totalTestsAntibody,
                        totalTestsAntigen: data.totalTestsAntigen,
                        totalTestsPeopleAntibody: data.totalTestsPeopleAntibody,
                        totalTestsPeopleAntigen: data.totalTestsPeopleAntigen,
                        totalTestsPeopleViral: data.totalTestsPeopleViral,
                        totalTestViral: data.totalTestViral,
                    })),
                );
        },
    })
    .addResolver({
        name: "count",
        type: "Int!",
        resolve: async ({ args, context: { dataSources } }) => {
            return dataSources.covidAPI
                .getHistoricForState(args.stateAbbrev)
                .then((allData) => allData.length);
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
    stateCount: StateDataTC.getResolver("count"),
};

export { StateDataTC, StateMetadataTC, StateMetadataQueries, StateDataQueries };
