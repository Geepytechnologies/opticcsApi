"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patientconditions = void 0;
class Patientconditions {
    static datesAreNotEmpty(from, to) {
        if (from !== "" && to !== "") {
            return true;
        }
        else {
            return false;
        }
    }
    static allStates(state, lga, healthfacility) {
        if (state !== "" && lga == "" && healthfacility == "" && state !== "all") {
            return true;
        }
        else {
            return false;
        }
    }
    static allLga(state, lga) {
        if (state !== "" && lga !== "" && lga !== "all") {
            return true;
        }
        else {
            return false;
        }
    }
    static allHealthFacility(state, lga, healthfacility) {
        if (healthfacility !== "" &&
            state !== "" &&
            lga !== "" &&
            healthfacility !== "all") {
            return true;
        }
        else {
            return false;
        }
    }
    static national1(state, lga, healthfacility) {
        if (state == "all" && lga == "" && healthfacility == "") {
            return true;
        }
        else {
            return false;
        }
    }
    static national2(state, lga, healthfacility) {
        if (state == "all" && lga == "all" && healthfacility == "all") {
            return true;
        }
        else {
            return false;
        }
    }
}
exports.Patientconditions = Patientconditions;
