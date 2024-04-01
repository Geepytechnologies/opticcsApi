export class Patientconditions {
  static datesAreNotEmpty(from: string, to: string): boolean {
    if (from !== "" && to !== "") {
      return true;
    } else {
      return false;
    }
  }
  static allStates(state: string, lga: string, healthfacility: string) {
    if (state !== "" && lga == "" && healthfacility == "" && state !== "all") {
      return true;
    } else {
      return false;
    }
  }
  static allLga(state: string, lga: string) {
    if (state !== "" && lga !== "" && lga !== "all") {
      return true;
    } else {
      return false;
    }
  }
  static allHealthFacility(state: string, lga: string, healthfacility: string) {
    if (
      healthfacility !== "" &&
      state !== "" &&
      lga !== "" &&
      healthfacility !== "all"
    ) {
      return true;
    } else {
      return false;
    }
  }
  static national1(
    state: string,
    lga: string,
    healthfacility: string
  ): boolean {
    if (state == "all" && lga == "" && healthfacility == "") {
      return true;
    } else {
      return false;
    }
  }
  static national2(
    state: string,
    lga: string,
    healthfacility: string
  ): boolean {
    if (state == "all" && lga == "all" && healthfacility == "all") {
      return true;
    } else {
      return false;
    }
  }
}
