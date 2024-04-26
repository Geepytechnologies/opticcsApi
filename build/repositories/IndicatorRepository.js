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
            try {
                const [result] = yield this.connection.execute(q);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    IntermediateResult1Awithdate(from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.IntermediateResult1Awithdate();
            try {
                const [result] = yield this.connection.execute(q, [from, to]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    StateIntermediateResult1A(state) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.StateIntermediateResult1A();
            try {
                const [result] = yield this.connection.execute(q, [state]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    StateIntermediateResult1Awithdate(state, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.StateIntermediateResult1Awithdate();
            try {
                const [result] = yield this.connection.execute(q, [state, from, to]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    LgaIntermediateResult1A(state, lga) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.LgaIntermediateResult1A();
            try {
                const [result] = yield this.connection.execute(q, [state, lga]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    LgaIntermediateResult1Awithdate(state, lga, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.LgaIntermediateResult1Awithdate();
            try {
                const [result] = yield this.connection.execute(q, [
                    state,
                    lga,
                    from,
                    to,
                ]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    HealthfacilityIntermediateResult1A(state, healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.HealthfacilityIntermediateResult1A();
            try {
                const [result] = yield this.connection.execute(q, [
                    state,
                    healthfacility,
                ]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    HealthfacilityIntermediateResult1Awithdate(state, healthfacility, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.HealthfacilityIntermediateResult1Awithdate();
            try {
                const [result] = yield this.connection.execute(q, [
                    state,
                    healthfacility,
                    from,
                    to,
                ]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    //::::: 1B :::::: //
    IntermediateResult1B() {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.IntermediateResult1B();
            try {
                const [result] = yield this.connection.execute(q);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    StateIntermediateResult1B(state) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.StateIntermediateResult1B();
            try {
                const [result] = yield this.connection.execute(q, [state]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    LgaIntermediateResult1B(state, lga) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.IntermediateResult1B();
            try {
                const [result] = yield this.connection.execute(q, [state, lga]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    HealthfacilityIntermediateResult1B(state, healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.HealthfacilityIntermediateResult1B();
            try {
                const [result] = yield this.connection.execute(q, [
                    state,
                    healthfacility,
                ]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    // ::::: 1C ::::://
    IntermediateResult1C() {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.IntermediateResult1C();
            try {
                const [result] = yield this.connection.execute(q);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    StateIntermediateResult1C(state) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.StateIntermediateResult1C();
            try {
                const [result] = yield this.connection.execute(q, [state]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    LgaIntermediateResult1C(state, lga) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.IntermediateResult1C();
            try {
                const [result] = yield this.connection.execute(q, [state, lga]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    HealthfacilityIntermediateResult1C(state, healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = indicator_1.IndicatorQuery.HealthfacilityIntermediateResult1C();
            try {
                const [result] = yield this.connection.execute(q, [
                    state,
                    healthfacility,
                ]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.IndicatorRepository = IndicatorRepository;
