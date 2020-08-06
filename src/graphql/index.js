import { sc } from "graphql-compose";
import { USQueries } from "./USModel";
import { StateDataQueries, StateMetadataQueries } from "./StatesModel";

sc.Query.addFields({
    ...USQueries,
    ...StateDataQueries,
    ...StateMetadataQueries,
});

const Schema = sc.buildSchema();

export default Schema;
