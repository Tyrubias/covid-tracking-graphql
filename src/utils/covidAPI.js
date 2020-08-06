import { RESTDataSource } from "apollo-datasource-rest";
import moment from "moment";
import { COVID_API_URL } from "../config";

class COVIDTrackingAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = COVID_API_URL;
    }

    async getHistoricUS() {
        return this.get("/v1/us/daily.json").then((data) => data.json());
    }

    async getCurrentUS() {
        return this.get("/v1/us/current.json").then((data) => data.json());
    }

    async getUSDataDate(date) {
        return this.get(
            `/v1/us/${moment(date).format("YYYYMMDD")}.json`,
        ).then((data) => data.json());
    }

    async getStatesMetadata() {
        return this.get("/v1/states/info.json").then((data) => data.json());
    }

    async getMetadataState(stateAbbrev) {
        return this.get(`/v1/states/${stateAbbrev}/info.json`).then((data) =>
            data.json(),
        );
    }

    async getHistoricStates() {
        return this.get("/v1/states/daily.json").then((data) => data.json());
    }

    async getCurrentStates() {
        return this.get("/v1/states/current.json").then((data) => data.json());
    }

    async getCurrentForState(stateAbbrev) {
        return this.get(`/v1/states/${stateAbbrev}/current.json`).then((data) =>
            data.json(),
        );
    }

    async getHistoricForState(stateAbbrev) {
        return this.get(`/v1/states/${stateAbbrev}/daily.json`).then((data) =>
            data.json(),
        );
    }

    async getStateOnDate(stateAbbrev, date) {
        return this.get(
            `/v1/states/${stateAbbrev}/${moment(date).format("YYYYMMDD")}.json`,
        ).then((data) => data.json());
    }

    async getAPIStatus() {
        return this.get(`/v1/status.json`).then((data) => data.json());
    }
}

export default COVIDTrackingAPI;
