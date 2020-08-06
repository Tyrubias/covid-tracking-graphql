import { RESTDataSource } from "apollo-datasource-rest";
import moment from "moment";
import { COVID_API_URL } from "../config";

class COVIDTrackingAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = COVID_API_URL;
    }

    async getHistoricUS() {
        return this.get("v1/us/daily.json");
    }

    async getCurrentUS() {
        return this.get("v1/us/current.json");
    }

    async getUSDataDate(date) {
        return this.get(`v1/us/${moment(date).format("YYYYMMDD")}.json`);
    }

    async getStatesMetadata() {
        return this.get("v1/states/info.json");
    }

    async getMetadataState(stateAbbrev) {
        return this.get(`v1/states/${stateAbbrev}/info.json`);
    }

    async getHistoricStates() {
        return this.get("v1/states/daily.json");
    }

    async getCurrentStates() {
        return this.get("v1/states/current.json");
    }

    async getCurrentForState(stateAbbrev) {
        return this.get(`v1/states/${stateAbbrev}/current.json`);
    }

    async getHistoricForState(stateAbbrev) {
        return this.get(`v1/states/${stateAbbrev}/daily.json`);
    }

    async getStateOnDate(stateAbbrev, date) {
        return this.get(
            `v1/states/${stateAbbrev}/${moment(date).format("YYYYMMDD")}.json`,
        );
    }

    async getAPIStatus() {
        return this.get(`v1/status.json`);
    }
}

export default COVIDTrackingAPI;
