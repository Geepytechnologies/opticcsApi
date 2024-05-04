"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndicatorRepository = void 0;
const indicator_1 = require("../queries/admin/indicator");
// NB: Visit Indicator.txt for definition descriptions
class IndicatorRepository {
    constructor(connection) {
        this.connection = connection;
    }
    // IntermediateResut1
    //:::: 1A ::::::::://
    IntermediateResult1A() {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.IntermediateResult1A();
            const q2 = indicator_1.IndicatorQuery.IntermediateResult1Cdenominator();
            try {
                const [numerator] = yield this.connection.execute(q);
                const [denominator] = yield this.connection.execute(q2);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    IntermediateResult1Awithdate(from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.IntermediateResult1Awithdate();
            const q2 = indicator_1.IndicatorQuery.IntermediateResult1Cdenominatorwithdate();
            try {
                const [numerator] = yield this.connection.execute(q, [from, to]);
                const [denominator] = yield this.connection.execute(q2, [from, to]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    StateIntermediateResult1A(state) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.StateIntermediateResult1A();
            const q2 = indicator_1.IndicatorQuery.StateIntermediateResult1Cdenominator();
            try {
                const [numerator] = yield this.connection.execute(q, [state]);
                const [denominator] = yield this.connection.execute(q2, [state]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    StateIntermediateResult1Awithdate(state, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.StateIntermediateResult1Awithdate();
            const q2 = indicator_1.IndicatorQuery.StateIntermediateResult1Cdenominatorwithdate();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    from,
                    to,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    from,
                    to,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    LgaIntermediateResult1A(state, lga) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.LgaIntermediateResult1A();
            const q2 = indicator_1.IndicatorQuery.LgaIntermediateResult1Cdenominator();
            try {
                const [numerator] = yield this.connection.execute(q, [state, lga]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    lga,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    LgaIntermediateResult1Awithdate(state, lga, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.LgaIntermediateResult1Awithdate();
            const q2 = indicator_1.IndicatorQuery.LgaIntermediateResult1Cdenominatorwithdate();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    lga,
                    from,
                    to,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    lga,
                    from,
                    to,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    HealthfacilityIntermediateResult1A(state, healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.HealthfacilityIntermediateResult1A();
            const q2 = indicator_1.IndicatorQuery.HealthfacilityIntermediateResult1Cdenominator();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    healthfacility,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    healthfacility,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    HealthfacilityIntermediateResult1Awithdate(state, healthfacility, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.HealthfacilityIntermediateResult1Awithdate();
            const q2 = indicator_1.IndicatorQuery.HealthfacilityIntermediateResult1Cdenominatorwithdate();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    healthfacility,
                    from,
                    to,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    healthfacility,
                    from,
                    to,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    //::::: 1B :::::: //
    IntermediateResult1B() {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.IntermediateResult1Cdenominator();
            const q2 = indicator_1.IndicatorQuery.IntermediateResult1B();
            try {
                const [numerator] = yield this.connection.execute(q);
                const [denominator] = yield this.connection.execute(q2);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    IntermediateResult1Bwithdate(from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.IntermediateResult1Cdenominatorwithdate();
            const q2 = indicator_1.IndicatorQuery.IntermediateResult1Bwithdate();
            try {
                const [numerator] = yield this.connection.execute(q, [from, to]);
                const [denominator] = yield this.connection.execute(q2, [from, to]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    StateIntermediateResult1B(state) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.StateIntermediateResult1Cdenominator();
            const q2 = indicator_1.IndicatorQuery.StateIntermediateResult1B();
            try {
                const [numerator] = yield this.connection.execute(q, [state]);
                const [denominator] = yield this.connection.execute(q2, [state]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    StateIntermediateResult1Bwithdate(state, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.StateIntermediateResult1Cdenominatorwithdate();
            const q2 = indicator_1.IndicatorQuery.StateIntermediateResult1Bwithdate();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    from,
                    to,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    from,
                    to,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    LgaIntermediateResult1B(state, lga) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.LgaIntermediateResult1Cdenominator();
            const q2 = indicator_1.IndicatorQuery.LgaIntermediateResult1B();
            try {
                const [numerator] = yield this.connection.execute(q, [state, lga]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    lga,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    LgaIntermediateResult1Bwithdate(state, lga, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.LgaIntermediateResult1Cdenominatorwithdate();
            const q2 = indicator_1.IndicatorQuery.LgaIntermediateResult1Bwithdate();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    lga,
                    from,
                    to,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    lga,
                    from,
                    to,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    HealthfacilityIntermediateResult1B(state, healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.HealthfacilityIntermediateResult1Cdenominator();
            const q2 = indicator_1.IndicatorQuery.HealthfacilityIntermediateResult1B();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    healthfacility,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    healthfacility,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    HealthfacilityIntermediateResult1Bwithdate(state, healthfacility, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.HealthfacilityIntermediateResult1Cdenominatorwithdate();
            const q2 = indicator_1.IndicatorQuery.HealthfacilityIntermediateResult1Bwithdate();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    healthfacility,
                    from,
                    to,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    healthfacility,
                    from,
                    to,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    // ::::: 1C ::::://
    IntermediateResult1C() {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.IntermediateResult1Ddenominator();
            const q2 = indicator_1.IndicatorQuery.IntermediateResult1Cdenominator();
            try {
                const [numerator] = yield this.connection.execute(q);
                const [denominator] = yield this.connection.execute(q2);
                const lessThan20 = numerator
                    .map((obj) => {
                    const egaParts = obj.ega.split(" ");
                    if (egaParts.length >= 2) {
                        return parseInt(egaParts[0]);
                    }
                    return 0;
                })
                    .filter((value) => value < 20);
                return { numerator: lessThan20.length, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    IntermediateResult1Cwithdate(from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.IntermediateResult1Ddenominatorwithdate();
            const q2 = indicator_1.IndicatorQuery.IntermediateResult1Cdenominatorwithdate();
            try {
                const [numerator] = yield this.connection.execute(q, [from, to]);
                const [denominator] = yield this.connection.execute(q2, [from, to]);
                const lessThan20 = numerator
                    .map((obj) => {
                    const egaParts = obj.ega.split(" ");
                    if (egaParts.length >= 2) {
                        return parseInt(egaParts[0]);
                    }
                    return 0;
                })
                    .filter((value) => value < 20);
                return { numerator: lessThan20.length, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    StateIntermediateResult1C(state) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.StateIntermediateResult1Ddenominator();
            const q2 = indicator_1.IndicatorQuery.StateIntermediateResult1Cdenominator();
            try {
                const [numerator] = yield this.connection.execute(q, [state]);
                const [denominator] = yield this.connection.execute(q2, [state]);
                const lessThan20 = numerator
                    .map((obj) => {
                    const egaParts = obj.ega.split(" ");
                    if (egaParts.length >= 2) {
                        return parseInt(egaParts[0]);
                    }
                    return 0;
                })
                    .filter((value) => value < 20);
                return { numerator: lessThan20.length, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    StateIntermediateResult1Cwithdate(state, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.StateIntermediateResult1Ddenominatorwithdate();
            const q2 = indicator_1.IndicatorQuery.StateIntermediateResult1Cdenominatorwithdate();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    from,
                    to,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    from,
                    to,
                ]);
                const lessThan20 = numerator
                    .map((obj) => {
                    const egaParts = obj.ega.split(" ");
                    if (egaParts.length >= 2) {
                        return parseInt(egaParts[0]);
                    }
                    return 0;
                })
                    .filter((value) => value < 20);
                return { numerator: lessThan20.length, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    LgaIntermediateResult1C(state, lga) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.LgaIntermediateResult1Ddenominator();
            const q2 = indicator_1.IndicatorQuery.LgaIntermediateResult1Cdenominator();
            try {
                const [numerator] = yield this.connection.execute(q, [state, lga]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    lga,
                ]);
                const lessThan20 = numerator
                    .map((obj) => {
                    const egaParts = obj.ega.split(" ");
                    if (egaParts.length >= 2) {
                        return parseInt(egaParts[0]);
                    }
                    return 0;
                })
                    .filter((value) => value < 20);
                return { numerator: lessThan20.length, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    LgaIntermediateResult1Cwithdate(state, lga, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.LgaIntermediateResult1Ddenominatorwithdate();
            const q2 = indicator_1.IndicatorQuery.LgaIntermediateResult1Cdenominatorwithdate();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    lga,
                    from,
                    to,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    lga,
                    from,
                    to,
                ]);
                const lessThan20 = numerator
                    .map((obj) => {
                    const egaParts = obj.ega.split(" ");
                    if (egaParts.length >= 2) {
                        return parseInt(egaParts[0]);
                    }
                    return 0;
                })
                    .filter((value) => value < 20);
                return { numerator: lessThan20.length, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    HealthfacilityIntermediateResult1C(state, healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.HealthfacilityIntermediateResult1Ddenominator();
            const q2 = indicator_1.IndicatorQuery.HealthfacilityIntermediateResult1Cdenominator();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    healthfacility,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    healthfacility,
                ]);
                const lessThan20 = numerator
                    .map((obj) => {
                    const egaParts = obj.ega.split(" ");
                    if (egaParts.length >= 2) {
                        return parseInt(egaParts[0]);
                    }
                    return 0;
                })
                    .filter((value) => value < 20);
                return { numerator: lessThan20.length, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    HealthfacilityIntermediateResult1Cwithdate(state, healthfacility, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.HealthfacilityIntermediateResult1Ddenominatorwithdate();
            const q2 = indicator_1.IndicatorQuery.HealthfacilityIntermediateResult1Cdenominatorwithdate();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    healthfacility,
                    from,
                    to,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    healthfacility,
                    from,
                    to,
                ]);
                const lessThan20 = numerator
                    .map((obj) => {
                    const egaParts = obj.ega.split(" ");
                    if (egaParts.length >= 2) {
                        return parseInt(egaParts[0]);
                    }
                    return 0;
                })
                    .filter((value) => value < 20);
                return { numerator: lessThan20.length, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    // ::::: 1D ::::://
    IntermediateResult1D() {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.IntermediateResult1DNumerator();
            const q2 = indicator_1.IndicatorQuery.IntermediateResult1Ddenominator();
            try {
                const [numerator] = yield this.connection.execute(q);
                const [denominator] = yield this.connection.execute(q2);
                const lessThan20 = denominator
                    .map((obj) => {
                    const egaParts = obj.ega.split(" ");
                    if (egaParts.length >= 2) {
                        return parseInt(egaParts[0]);
                    }
                    return 0;
                })
                    .filter((value) => value < 20);
                return { numerator, denominator: lessThan20.length };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    IntermediateResult1Dwithdate(from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.IntermediateResult1DNumeratorwithdate();
            const q2 = indicator_1.IndicatorQuery.IntermediateResult1Ddenominatorwithdate();
            try {
                const [numerator] = yield this.connection.execute(q, [from, to]);
                const [denominator] = yield this.connection.execute(q2, [from, to]);
                const lessThan20 = denominator
                    .map((obj) => {
                    const egaParts = obj.ega.split(" ");
                    if (egaParts.length >= 2) {
                        return parseInt(egaParts[0]);
                    }
                    return 0;
                })
                    .filter((value) => value < 20);
                return { numerator, denominator: lessThan20.length };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    StateIntermediateResult1D(state) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.StateIntermediateResult1DNumerator();
            const q2 = indicator_1.IndicatorQuery.StateIntermediateResult1Ddenominator();
            try {
                const [numerator] = yield this.connection.execute(q, [state]);
                const [denominator] = yield this.connection.execute(q2, [state]);
                const lessThan20 = denominator
                    .map((obj) => {
                    const egaParts = obj.ega.split(" ");
                    if (egaParts.length >= 2) {
                        return parseInt(egaParts[0]);
                    }
                    return 0;
                })
                    .filter((value) => value < 20);
                return { numerator, denominator: lessThan20.length };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    StateIntermediateResult1Dwithdate(state, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.StateIntermediateResult1DNumeratorwithdate();
            const q2 = indicator_1.IndicatorQuery.StateIntermediateResult1Ddenominatorwithdate();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    from,
                    to,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    from,
                    to,
                ]);
                const lessThan20 = denominator
                    .map((obj) => {
                    const egaParts = obj.ega.split(" ");
                    if (egaParts.length >= 2) {
                        return parseInt(egaParts[0]);
                    }
                    return 0;
                })
                    .filter((value) => value < 20);
                return { numerator, denominator: lessThan20.length };
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    LgaIntermediateResult1D(state, lga) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.LgaIntermediateResult1DNumerator();
            const q2 = indicator_1.IndicatorQuery.LgaIntermediateResult1Ddenominator();
            try {
                const [numerator] = yield this.connection.execute(q, [state, lga]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    lga,
                ]);
                const lessThan20 = denominator
                    .map((obj) => {
                    const egaParts = obj.ega.split(" ");
                    if (egaParts.length >= 2) {
                        return parseInt(egaParts[0]);
                    }
                    return 0;
                })
                    .filter((value) => value < 20);
                return { numerator, denominator: lessThan20.length };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    LgaIntermediateResult1Dwithdate(state, lga, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.LgaIntermediateResult1DNumeratorwithdate();
            const q2 = indicator_1.IndicatorQuery.LgaIntermediateResult1Ddenominatorwithdate();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    lga,
                    from,
                    to,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    lga,
                    from,
                    to,
                ]);
                const lessThan20 = denominator
                    .map((obj) => {
                    const egaParts = obj.ega.split(" ");
                    if (egaParts.length >= 2) {
                        return parseInt(egaParts[0]);
                    }
                    return 0;
                })
                    .filter((value) => value < 20);
                return { numerator, denominator: lessThan20.length };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    HealthfacilityIntermediateResult1D(state, healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.HealthfacilityIntermediateResult1DNumerator();
            const q2 = indicator_1.IndicatorQuery.HealthfacilityIntermediateResult1Ddenominator();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    healthfacility,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    healthfacility,
                ]);
                const lessThan20 = denominator
                    .map((obj) => {
                    const egaParts = obj.ega.split(" ");
                    if (egaParts.length >= 2) {
                        return parseInt(egaParts[0]);
                    }
                    return 0;
                })
                    .filter((value) => value < 20);
                return { numerator, denominator: lessThan20.length };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    HealthfacilityIntermediateResult1Dwithdate(state, healthfacility, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.HealthfacilityIntermediateResult1DNumeratorwithdate();
            const q2 = indicator_1.IndicatorQuery.HealthfacilityIntermediateResult1Ddenominatorwithdate();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    healthfacility,
                    from,
                    to,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    healthfacility,
                    from,
                    to,
                ]);
                const lessThan20 = denominator
                    .map((obj) => {
                    const egaParts = obj.ega.split(" ");
                    if (egaParts.length >= 2) {
                        return parseInt(egaParts[0]);
                    }
                    return 0;
                })
                    .filter((value) => value < 20);
                return { numerator, denominator: lessThan20.length };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    // ::::: 1E ::::://
    IntermediateResult1E() {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.IntermediateResult1ENumerator();
            const q2 = indicator_1.IndicatorQuery.IntermediateResult1Cdenominator();
            try {
                const [numerator] = yield this.connection.execute(q);
                const [denominator] = yield this.connection.execute(q2);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    IntermediateResult1Ewithdate(from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.IntermediateResult1ENumeratorwithdate();
            const q2 = indicator_1.IndicatorQuery.IntermediateResult1Cdenominatorwithdate();
            try {
                const [numerator] = yield this.connection.execute(q, [from, to]);
                const [denominator] = yield this.connection.execute(q2, [from, to]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    StateIntermediateResult1E(state) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.StateIntermediateResult1ENumerator();
            const q2 = indicator_1.IndicatorQuery.StateIntermediateResult1Cdenominator();
            try {
                const [numerator] = yield this.connection.execute(q, [state]);
                const [denominator] = yield this.connection.execute(q2, [state]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    StateIntermediateResult1Ewithdate(state, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.StateIntermediateResult1ENumeratorwithdate();
            const q2 = indicator_1.IndicatorQuery.StateIntermediateResult1Cdenominatorwithdate();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    from,
                    to,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    from,
                    to,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    LgaIntermediateResult1E(state, lga) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.LgaIntermediateResult1ENumerator();
            const q2 = indicator_1.IndicatorQuery.LgaIntermediateResult1Cdenominator();
            try {
                const [numerator] = yield this.connection.execute(q, [state, lga]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    lga,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    LgaIntermediateResult1Ewithdate(state, lga, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.LgaIntermediateResult1ENumeratorwithdate();
            const q2 = indicator_1.IndicatorQuery.LgaIntermediateResult1Cdenominatorwithdate();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    lga,
                    from,
                    to,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    lga,
                    from,
                    to,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    HealthfacilityIntermediateResult1E(state, healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.HealthfacilityIntermediateResult1ENumerator();
            const q2 = indicator_1.IndicatorQuery.HealthfacilityIntermediateResult1Cdenominator();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    healthfacility,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    healthfacility,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    HealthfacilityIntermediateResult1Ewithdate(state, healthfacility, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.HealthfacilityIntermediateResult1ENumeratorwithdate();
            const q2 = indicator_1.IndicatorQuery.HealthfacilityIntermediateResult1Cdenominatorwithdate();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    healthfacility,
                    from,
                    to,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    healthfacility,
                    from,
                    to,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    // ::::: 1F ::::://
    IntermediateResult1F() {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.IntermediateResult1FNumerator();
            const q2 = indicator_1.IndicatorQuery.IntermediateResult1Fdenominator();
            try {
                const [numerator] = yield this.connection.execute(q);
                const [denominator] = yield this.connection.execute(q2);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    IntermediateResult1Fwithdate(from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.IntermediateResult1FNumeratorwithdate();
            const q2 = indicator_1.IndicatorQuery.IntermediateResult1Fdenominatorwithdate();
            try {
                const [numerator] = yield this.connection.execute(q, [from, to]);
                const [denominator] = yield this.connection.execute(q2, [from, to]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    StateIntermediateResult1F(state) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.StateIntermediateResult1FNumerator();
            const q2 = indicator_1.IndicatorQuery.StateIntermediateResult1Fdenominator();
            try {
                const [numerator] = yield this.connection.execute(q, [state]);
                const [denominator] = yield this.connection.execute(q2, [state]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    StateIntermediateResult1Fwithdate(state, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.StateIntermediateResult1FNumeratorwithdate();
            const q2 = indicator_1.IndicatorQuery.StateIntermediateResult1Fdenominatorwithdate();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    from,
                    to,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    from,
                    to,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    LgaIntermediateResult1F(state, lga) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.LgaIntermediateResult1FNumerator();
            const q2 = indicator_1.IndicatorQuery.LgaIntermediateResult1Fdenominator();
            try {
                const [numerator] = yield this.connection.execute(q, [state, lga]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    lga,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    LgaIntermediateResult1Fwithdate(state, lga, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.LgaIntermediateResult1FNumeratorwithdate();
            const q2 = indicator_1.IndicatorQuery.LgaIntermediateResult1Fdenominatorwithdate();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    lga,
                    from,
                    to,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    lga,
                    from,
                    to,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    HealthfacilityIntermediateResult1F(state, healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.HealthfacilityIntermediateResult1FNumerator();
            const q2 = indicator_1.IndicatorQuery.HealthfacilityIntermediateResult1Fdenominator();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    healthfacility,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    healthfacility,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    HealthfacilityIntermediateResult1Fwithdate(state, healthfacility, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.HealthfacilityIntermediateResult1FNumeratorwithdate();
            const q2 = indicator_1.IndicatorQuery.HealthfacilityIntermediateResult1Fdenominatorwithdate();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    healthfacility,
                    from,
                    to,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    healthfacility,
                    from,
                    to,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    // ::::: 2A ::::://
    IntermediateResult2A() {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.IntermediateResult2ANumerator();
            const q2 = indicator_1.IntermediateResult2Query.IntermediateResult2Adenominator();
            try {
                const [numerator] = yield this.connection.execute(q);
                const [denominator] = yield this.connection.execute(q2);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    IntermediateResult2Awithdate(from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.IntermediateResult2ANumeratorwithdate();
            const q2 = indicator_1.IntermediateResult2Query.IntermediateResult2Adenominatorwithdate();
            try {
                const [numerator] = yield this.connection.execute(q, [from, to]);
                const [denominator] = yield this.connection.execute(q2, [from, to]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    StateIntermediateResult2A(state) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.StateIntermediateResult2ANumerator();
            const q2 = indicator_1.IntermediateResult2Query.StateIntermediateResult2Adenominator();
            try {
                const [numerator] = yield this.connection.execute(q, [state]);
                const [denominator] = yield this.connection.execute(q2, [state]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    StateIntermediateResult2Awithdate(state, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.StateIntermediateResult2ANumeratorwithdate();
            const q2 = indicator_1.IntermediateResult2Query.StateIntermediateResult2Adenominatorwithdate();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    from,
                    to,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    from,
                    to,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    LgaIntermediateResult2A(state, lga) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.LgaIntermediateResult2A();
            const q2 = indicator_1.IntermediateResult2Query.LgaIntermediateResult2Adenominator();
            try {
                const [numerator] = yield this.connection.execute(q, [state, lga]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    lga,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    LgaIntermediateResult2Awithdate(state, lga, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.LgaIntermediateResult2Awithdate();
            const q2 = indicator_1.IntermediateResult2Query.LgaIntermediateResult2Adenominatorwithdate();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    lga,
                    from,
                    to,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    lga,
                    from,
                    to,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    HealthfacilityIntermediateResult2A(state, healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.HealthfacilityIntermediateResult2A();
            const q2 = indicator_1.IntermediateResult2Query.HealthfacilityIntermediateResult2Adenominator();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    healthfacility,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    healthfacility,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    HealthfacilityIntermediateResult2Awithdate(state, healthfacility, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.HealthfacilityIntermediateResult2Awithdate();
            const q2 = indicator_1.IntermediateResult2Query.HealthfacilityIntermediateResult2Adenominatorwithdate();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    healthfacility,
                    from,
                    to,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    healthfacility,
                    from,
                    to,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    // ::::: 2B ::::://
    IntermediateResult2B() {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.IntermediateResult2BNumerator();
            const q2 = indicator_1.IndicatorQuery.IntermediateResult1Cdenominator();
            try {
                const [numerator] = yield this.connection.execute(q);
                const [denominator] = yield this.connection.execute(q2);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    IntermediateResult2Bwithdate(from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.IntermediateResult2BNumeratorwithdate();
            const q2 = indicator_1.IndicatorQuery.IntermediateResult1Cdenominator();
            try {
                const [numerator] = yield this.connection.execute(q, [from, to]);
                const [denominator] = yield this.connection.execute(q2, [from, to]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    StateIntermediateResult2B(state) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.StateIntermediateResult2BNumerator();
            const q2 = indicator_1.IndicatorQuery.IntermediateResult1Cdenominator();
            try {
                const [numerator] = yield this.connection.execute(q, [state]);
                const [denominator] = yield this.connection.execute(q2, [state]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    StateIntermediateResult2Bwithdate(state, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.StateIntermediateResult2BNumeratorwithdate();
            const q2 = indicator_1.IndicatorQuery.IntermediateResult1Cdenominator();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    from,
                    to,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    from,
                    to,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    LgaIntermediateResult2B(state, lga) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.LgaIntermediateResult2B();
            const q2 = indicator_1.IndicatorQuery.IntermediateResult1Cdenominator();
            try {
                const [numerator] = yield this.connection.execute(q, [state, lga]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    lga,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    LgaIntermediateResult2Bwithdate(state, lga, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.LgaIntermediateResult2Bwithdate();
            const q2 = indicator_1.IndicatorQuery.IntermediateResult1Cdenominator();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    lga,
                    from,
                    to,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    lga,
                    from,
                    to,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    HealthfacilityIntermediateResult2B(state, healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.HealthfacilityIntermediateResult2B();
            const q2 = indicator_1.IndicatorQuery.IntermediateResult1Cdenominator();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    healthfacility,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    healthfacility,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    HealthfacilityIntermediateResult2Bwithdate(state, healthfacility, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.HealthfacilityIntermediateResult2Bwithdate();
            const q2 = indicator_1.IndicatorQuery.IntermediateResult1Cdenominator();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    healthfacility,
                    from,
                    to,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    healthfacility,
                    from,
                    to,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    // ::::: 2C ::::://
    IntermediateResult2C() {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.IntermediateResult2CNumerator();
            const q2 = indicator_1.IntermediateResult2Query.IntermediateResult2BNumerator();
            try {
                const [numerator] = yield this.connection.execute(q);
                const [denominator] = yield this.connection.execute(q2);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    IntermediateResult2Cwithdate(from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.IntermediateResult2CNumeratorwithdate();
            const q2 = indicator_1.IntermediateResult2Query.IntermediateResult2BNumerator();
            try {
                const [numerator] = yield this.connection.execute(q, [from, to]);
                const [denominator] = yield this.connection.execute(q2, [from, to]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    StateIntermediateResult2C(state) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.StateIntermediateResult2CNumerator();
            const q2 = indicator_1.IntermediateResult2Query.IntermediateResult2BNumerator();
            try {
                const [numerator] = yield this.connection.execute(q, [state]);
                const [denominator] = yield this.connection.execute(q2, [state]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    StateIntermediateResult2Cwithdate(state, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.StateIntermediateResult2CNumeratorwithdate();
            const q2 = indicator_1.IntermediateResult2Query.IntermediateResult2BNumerator();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    from,
                    to,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    from,
                    to,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    LgaIntermediateResult2C(state, lga) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.LgaIntermediateResult2C();
            const q2 = indicator_1.IntermediateResult2Query.IntermediateResult2BNumerator();
            try {
                const [numerator] = yield this.connection.execute(q, [state, lga]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    lga,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    LgaIntermediateResult2Cwithdate(state, lga, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.LgaIntermediateResult2Cwithdate();
            const q2 = indicator_1.IntermediateResult2Query.IntermediateResult2BNumerator();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    lga,
                    from,
                    to,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    lga,
                    from,
                    to,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    HealthfacilityIntermediateResult2C(state, healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.HealthfacilityIntermediateResult2C();
            const q2 = indicator_1.IntermediateResult2Query.IntermediateResult2BNumerator();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    healthfacility,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    healthfacility,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    HealthfacilityIntermediateResult2Cwithdate(state, healthfacility, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.HealthfacilityIntermediateResult2Cwithdate();
            const q2 = indicator_1.IntermediateResult2Query.IntermediateResult2BNumerator();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    healthfacility,
                    from,
                    to,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    healthfacility,
                    from,
                    to,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    // ::::: 2D ::::://
    IntermediateResult2D() {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.IntermediateResult2DNumerator();
            const q2 = indicator_1.IndicatorQuery.IntermediateResult1Cdenominator();
            try {
                const [numerator] = yield this.connection.execute(q);
                const [denominator] = yield this.connection.execute(q2);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    IntermediateResult2Dwithdate(from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.IntermediateResult2DNumeratorwithdate();
            const q2 = indicator_1.IndicatorQuery.IntermediateResult1Cdenominator();
            try {
                const [numerator] = yield this.connection.execute(q, [from, to]);
                const [denominator] = yield this.connection.execute(q2, [from, to]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    StateIntermediateResult2D(state) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.StateIntermediateResult2DNumerator();
            const q2 = indicator_1.IndicatorQuery.IntermediateResult1Cdenominator();
            try {
                const [numerator] = yield this.connection.execute(q, [state]);
                const [denominator] = yield this.connection.execute(q2, [state]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    StateIntermediateResult2Dwithdate(state, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.StateIntermediateResult2DNumeratorwithdate();
            const q2 = indicator_1.IndicatorQuery.IntermediateResult1Cdenominator();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    from,
                    to,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    from,
                    to,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    LgaIntermediateResult2D(state, lga) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.LgaIntermediateResult2D();
            const q2 = indicator_1.IndicatorQuery.IntermediateResult1Cdenominator();
            try {
                const [numerator] = yield this.connection.execute(q, [state, lga]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    lga,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    LgaIntermediateResult2Dwithdate(state, lga, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.LgaIntermediateResult2Dwithdate();
            const q2 = indicator_1.IndicatorQuery.IntermediateResult1Cdenominator();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    lga,
                    from,
                    to,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    lga,
                    from,
                    to,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    HealthfacilityIntermediateResult2D(state, healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.HealthfacilityIntermediateResult2D();
            const q2 = indicator_1.IndicatorQuery.IntermediateResult1Cdenominator();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    healthfacility,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    healthfacility,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    HealthfacilityIntermediateResult2Dwithdate(state, healthfacility, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.HealthfacilityIntermediateResult2Dwithdate();
            const q2 = indicator_1.IndicatorQuery.IntermediateResult1Cdenominator();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    healthfacility,
                    from,
                    to,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    healthfacility,
                    from,
                    to,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    // ::::: 2E ::::://
    IntermediateResult2E() {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.IntermediateResult2ENumerator();
            const q2 = indicator_1.IntermediateResult2Query.IntermediateResult2Edenominator();
            try {
                const [numerator] = yield this.connection.execute(q);
                const [denominator] = yield this.connection.execute(q2);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    IntermediateResult2Ewithdate(from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.IntermediateResult2ENumeratorwithdate();
            const q2 = indicator_1.IntermediateResult2Query.IntermediateResult2Edenominatorwithdate();
            try {
                const [numerator] = yield this.connection.execute(q, [from, to]);
                const [denominator] = yield this.connection.execute(q2, [from, to]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    StateIntermediateResult2E(state) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.StateIntermediateResult2ENumerator();
            const q2 = indicator_1.IntermediateResult2Query.StateIntermediateResult2ENumerator();
            try {
                const [numerator] = yield this.connection.execute(q, [state]);
                const [denominator] = yield this.connection.execute(q2, [state]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    StateIntermediateResult2Ewithdate(state, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.StateIntermediateResult2ENumeratorwithdate();
            const q2 = indicator_1.IntermediateResult2Query.StateIntermediateResult2Edenominatorwithdate();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    from,
                    to,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    from,
                    to,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    LgaIntermediateResult2E(state, lga) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.LgaIntermediateResult2E();
            const q2 = indicator_1.IntermediateResult2Query.LgaIntermediateResult2E();
            try {
                const [numerator] = yield this.connection.execute(q, [state, lga]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    lga,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    LgaIntermediateResult2Ewithdate(state, lga, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.LgaIntermediateResult2Ewithdate();
            const q2 = indicator_1.IntermediateResult2Query.LgaIntermediateResult2Edenominatorwithdate();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    lga,
                    from,
                    to,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    lga,
                    from,
                    to,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    HealthfacilityIntermediateResult2E(state, healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.HealthfacilityIntermediateResult2E();
            const q2 = indicator_1.IntermediateResult2Query.HealthfacilityIntermediateResult2Edenominator();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    healthfacility,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    healthfacility,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    HealthfacilityIntermediateResult2Ewithdate(state, healthfacility, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.HealthfacilityIntermediateResult2Ewithdate();
            const q2 = indicator_1.IntermediateResult2Query.HealthfacilityIntermediateResult2Edenominatorwithdate();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    healthfacility,
                    from,
                    to,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    healthfacility,
                    from,
                    to,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    // ::::: 2F ::::://
    IntermediateResult2F() {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.IntermediateResult2FNumerator();
            const q2 = indicator_1.IntermediateResult2Query.IntermediateResult2Fdenominator();
            try {
                const [numerator] = yield this.connection.execute(q);
                const [denominator] = yield this.connection.execute(q2);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    IntermediateResult2Fwithdate(from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.IntermediateResult2FNumeratorwithdate();
            const q2 = indicator_1.IntermediateResult2Query.IntermediateResult2Fdenominatorwithdate();
            try {
                const [numerator] = yield this.connection.execute(q, [from, to]);
                const [denominator] = yield this.connection.execute(q2, [from, to]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    StateIntermediateResult2F(state) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.StateIntermediateResult2FNumerator();
            const q2 = indicator_1.IntermediateResult2Query.StateIntermediateResult2FNumerator();
            try {
                const [numerator] = yield this.connection.execute(q, [state]);
                const [denominator] = yield this.connection.execute(q2, [state]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    StateIntermediateResult2Fwithdate(state, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.StateIntermediateResult2FNumeratorwithdate();
            const q2 = indicator_1.IntermediateResult2Query.StateIntermediateResult2Fdenominatorwithdate();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    from,
                    to,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    from,
                    to,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    LgaIntermediateResult2F(state, lga) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.LgaIntermediateResult2F();
            const q2 = indicator_1.IntermediateResult2Query.LgaIntermediateResult2F();
            try {
                const [numerator] = yield this.connection.execute(q, [state, lga]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    lga,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    LgaIntermediateResult2Fwithdate(state, lga, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.LgaIntermediateResult2Fwithdate();
            const q2 = indicator_1.IntermediateResult2Query.LgaIntermediateResult2Fdenominatorwithdate();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    lga,
                    from,
                    to,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    lga,
                    from,
                    to,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    HealthfacilityIntermediateResult2F(state, healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.HealthfacilityIntermediateResult2F();
            const q2 = indicator_1.IntermediateResult2Query.HealthfacilityIntermediateResult2Fdenominator();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    healthfacility,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    healthfacility,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    HealthfacilityIntermediateResult2Fwithdate(state, healthfacility, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.HealthfacilityIntermediateResult2Fwithdate();
            const q2 = indicator_1.IntermediateResult2Query.HealthfacilityIntermediateResult2Fdenominatorwithdate();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    healthfacility,
                    from,
                    to,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    healthfacility,
                    from,
                    to,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    // ::::: 2G ::::://
    IntermediateResult2G() {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.IntermediateResult2GNumerator();
            const q2 = indicator_1.IntermediateResult2Query.IntermediateResult2Gdenominator();
            try {
                const [numerator] = yield this.connection.execute(q);
                const [denominator] = yield this.connection.execute(q2);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    IntermediateResult2Gwithdate(from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.IntermediateResult2GNumeratorwithdate();
            const q2 = indicator_1.IntermediateResult2Query.IntermediateResult2Gdenominatorwithdate();
            try {
                const [numerator] = yield this.connection.execute(q, [from, to]);
                const [denominator] = yield this.connection.execute(q2, [from, to]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    StateIntermediateResult2G(state) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.StateIntermediateResult2GNumerator();
            const q2 = indicator_1.IntermediateResult2Query.StateIntermediateResult2GNumerator();
            try {
                const [numerator] = yield this.connection.execute(q, [state]);
                const [denominator] = yield this.connection.execute(q2, [state]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    StateIntermediateResult2Gwithdate(state, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.StateIntermediateResult2GNumeratorwithdate();
            const q2 = indicator_1.IntermediateResult2Query.StateIntermediateResult2Gdenominatorwithdate();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    from,
                    to,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    from,
                    to,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    LgaIntermediateResult2G(state, lga) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.LgaIntermediateResult2G();
            const q2 = indicator_1.IntermediateResult2Query.LgaIntermediateResult2G();
            try {
                const [numerator] = yield this.connection.execute(q, [state, lga]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    lga,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    LgaIntermediateResult2Gwithdate(state, lga, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.LgaIntermediateResult2Gwithdate();
            const q2 = indicator_1.IntermediateResult2Query.LgaIntermediateResult2Gdenominatorwithdate();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    lga,
                    from,
                    to,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    lga,
                    from,
                    to,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    HealthfacilityIntermediateResult2G(state, healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.HealthfacilityIntermediateResult2G();
            const q2 = indicator_1.IntermediateResult2Query.HealthfacilityIntermediateResult2Gdenominator();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    healthfacility,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    healthfacility,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
    HealthfacilityIntermediateResult2Gwithdate(state, healthfacility, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IntermediateResult2Query.HealthfacilityIntermediateResult2Gwithdate();
            const q2 = indicator_1.IntermediateResult2Query.HealthfacilityIntermediateResult2Gdenominatorwithdate();
            try {
                const [numerator] = yield this.connection.execute(q, [
                    state,
                    healthfacility,
                    from,
                    to,
                ]);
                const [denominator] = yield this.connection.execute(q2, [
                    state,
                    healthfacility,
                    from,
                    to,
                ]);
                return { numerator, denominator };
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
}
exports.IndicatorRepository = IndicatorRepository;
