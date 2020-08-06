import { sc } from "graphql-compose";
import UrlTC from "./CommonTypes";

const StateMetadataTC = sc.createObjectTC({
    name: "StateMetadata",
    description: "The metadata (such as reporting website) for a state",
    fields: {
        covid19Site: UrlTC.getTypeNonNull().getType(),
        covid19SiteOld: UrlTC.getTypeNonNull().getType(),
        covid19SiteSecondary: UrlTC.getTypeNonNull().getType(),
        covid19SiteTertiary: UrlTC.getTypeNonNull().getType(),
        fips: "String!",
        name: "String!",
        notes: "String!",
        state: "String!",
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
        lastUpdateEt: "Date!",
        negative: "Int",
        negativeTestsViral: "Int",
        onVentilatorCumulative: "Int",
        onVentilatorCurrently: "Int",
        pending: "Int",
        positiveCasesViral: "Int",
        positiveIncrease: "Int",
        positiveTestsViral: "Int",
        recovered: "Int",
        state: "String!",
        totalTestResults: "Int",
        totalTestResultsIncrease: "Int",
        totalTestViral: "Int",
    },
});

export { StateDataTC, StateMetadataTC };
