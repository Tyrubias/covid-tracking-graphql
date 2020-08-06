import { sc } from "graphql-compose";
import { USQueries } from "./USModel";

sc.Query.addFields({
    ...USQueries,
});

const Schema = sc.buildSchema();

export default Schema;
