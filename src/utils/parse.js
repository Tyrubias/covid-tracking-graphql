import moment from "moment";

const rawStateDataToGraphQL = data => ({
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
});

const rawStateMetadataToGraphQL = data => ({
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
    totalTestResultsField: data.totalTestResultsField,
    twitter: data.twitter,
});

const rawUSDataToGraphQL = data => ({
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
});

export { rawStateDataToGraphQL, rawStateMetadataToGraphQL, rawUSDataToGraphQL };
