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
exports.NationalService = void 0;
class NationalService {
    constructor(NationalRepository) {
        this.nationalRepository = NationalRepository;
    }
    nationalreturnvisitdata(anc) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fever = yield this.nationalRepository.getfeverreturn(anc);
                const headache = yield this.nationalRepository.getheadachereturn(anc);
                const cough = yield this.nationalRepository.getcoughreturn(anc);
                const palpitations = yield this.nationalRepository.getpalpitationsreturn(anc);
                const severetiredness = yield this.nationalRepository.getseveretirednessreturn(anc);
                const difficultylyingflat = yield this.nationalRepository.getdifficultylyingflatreturn(anc);
                const dizziness = yield this.nationalRepository.getdizzinessreturn(anc);
                const convulsionsduringpregnancy = yield this.nationalRepository.getconvulsionsreturn(anc);
                const abdominalpain = yield this.nationalRepository.getabdominalpainreturn(anc);
                const painwithurination = yield this.nationalRepository.getpainwithurinationreturn(anc);
                const bloodinurine = yield this.nationalRepository.getbloodinurinereturn(anc);
                const vaginaldischarge = yield this.nationalRepository.getvaginaldischargereturn(anc);
                const deeppelvicpain = yield this.nationalRepository.getdeeppelvicpainreturn(anc);
                const syphilis = yield this.nationalRepository.getsyphilisreturn(anc);
                return {
                    fever,
                    headache,
                    cough,
                    palpitations,
                    severetiredness,
                    difficultylyingflat,
                    dizziness,
                    convulsionsduringpregnancy,
                    abdominalpain,
                    painwithurination,
                    bloodinurine,
                    vaginaldischarge,
                    deeppelvicpain,
                    syphilis,
                };
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.NationalService = NationalService;
