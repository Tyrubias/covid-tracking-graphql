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
