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
const IndicatorRepository_1 = require("../repositories/IndicatorRepository");
class NationalService {
    constructor(NationalRepository, connection) {
        this.nationalgeneraldata = (query) => __awaiter(this, void 0, void 0, function* () {
            const date = query.date || null;
            try {
                //personalinformation
                const edd = yield this.nationalRepository.getedd2();
                const firstbabymovement = yield this.nationalRepository.getfirstbabymovement();
                const parity = yield this.nationalRepository.getparity();
                const babysmovement = yield this.nationalRepository.getbabysmovement();
                const graviditygreaterthan8result = yield this.nationalRepository.graviditygreaterthan8();
                const graviditylessthan8result = yield this.nationalRepository.graviditylessthan8();
                //obstetric
                const convulsionsduringpregnancy = yield this.nationalRepository.getconvulsions();
                const caesarean = yield this.nationalRepository.getsurgery();
                const tearsthroughsphincter = yield this.nationalRepository.gettearsthroughsphincter();
                const postpartiumhaemorrghage = yield this.nationalRepository.getpostpartiumhaemorrghage();
                const stillbirths = yield this.nationalRepository.getstillbirths();
                const prematuredeliveries = yield this.nationalRepository.getprematuredeliveries();
                const lowbirthbabies = yield this.nationalRepository.getlowbirthbabies();
                const babieswhodied = yield this.nationalRepository.getbabieswhodied();
                const miscarriages = yield this.nationalRepository.getmiscarriages();
                const breastfedbefore = yield this.nationalRepository.getbreastfedbefore();
                const breastfeedingduration = yield this.nationalRepository.getbreastfeedingduration();
                const breastfeedingproblems = yield this.nationalRepository.getbreastfeedingproblems();
                //dailyhabitsandlifestyle
                const doyousmoke = yield this.nationalRepository.getSmokers();
                const alcohol = yield this.nationalRepository.getAlcohol();
                const threatened = yield this.nationalRepository.getThreatened();
                const livewith = yield this.nationalRepository.whodoyoulivewith();
                //medicalhistory
                const cough = yield this.nationalRepository.getcough();
                const palpitations = yield this.nationalRepository.getpalpitations();
                const difficultybreathing = yield this.nationalRepository.getdifficultybreathing();
                const swellingfeet = yield this.nationalRepository.getswellingoffeet();
                const chestpain = yield this.nationalRepository.getchestpain();
                const epigastricpain = yield this.nationalRepository.getepigastricpain();
                const severetiredness = yield this.nationalRepository.getseveretiredness();
                const severeabdominalpain = yield this.nationalRepository.getsevereabdominalpain();
                const persistentvomiting = yield this.nationalRepository.getpersistentvomiting();
                const severediarrhoea = yield this.nationalRepository.getseverediarrhoea();
                const dizziness = yield this.nationalRepository.getdizziness();
                //urinary
                const painwithurination = yield this.nationalRepository.getpainwithurination();
                const severeflankpain = yield this.nationalRepository.getsevereflankpain();
                const bloodinurine = yield this.nationalRepository.getbloodinurine();
                //gynaecological
                const vaginaldischarge = yield this.nationalRepository.getvaginaldischarge();
                const deeppelvicpain = yield this.nationalRepository.getdeeppelvicpain();
                const syphilis = yield this.nationalRepository.getsyphilis();
                const persistentdrycough = yield this.nationalRepository.getpersistentdrycough();
                const progressiveweightloss = yield this.nationalRepository.getprogressiveweightloss();
                const nightsweats = yield this.nationalRepository.getnightsweats();
                const diagnosedwithtuberculosis = yield this.nationalRepository.getdiagnosedwithtuberculosis();
                const treatedTBpreviously = yield this.nationalRepository.gettreatedTBpreviously();
                //pastmedicalhistory
                const heartdisease = yield this.nationalRepository.getheartdisease();
                const anaemia = yield this.nationalRepository.getanaemia();
                const kidneydisease = yield this.nationalRepository.getkidneydisease();
                const sicklecell = yield this.nationalRepository.getsicklecell();
                const diabetes = yield this.nationalRepository.getdiabetes();
                const goitre = yield this.nationalRepository.getgoitre();
                const hivaids = yield this.nationalRepository.gethivaids();
                const otherseriouschronicillnesses = yield this.nationalRepository.getotherseriouschronicillnesses();
                const hadsurgery = yield this.nationalRepository.gethadsurgery();
                //drughistory
                const herbalremedies = yield this.nationalRepository.getherbalremedies();
                const otcdrugs = yield this.nationalRepository.getotcdrugs();
                const vitamins = yield this.nationalRepository.getvitamins();
                const dietarysupplements = yield this.nationalRepository.getdietarysupplements();
                const tetanus = yield this.nationalRepository.gettetanus();
                return {
                    edd,
                    convulsionsduringpregnancy,
                    caesarean,
                    tearsthroughsphincter,
                    postpartiumhaemorrghage,
                    firstbabymovement,
                    parity,
                    babysmovement,
                    graviditygreaterthan8result,
                    graviditylessthan8result,
                    stillbirths,
                    prematuredeliveries,
                    lowbirthbabies,
                    babieswhodied,
                    miscarriages,
                    breastfedbefore,
                    breastfeedingduration,
                    breastfeedingproblems,
                    doyousmoke,
                    alcohol,
                    threatened,
                    livewith,
                    cough,
                    palpitations,
                    difficultybreathing,
                    swellingfeet,
                    chestpain,
                    epigastricpain,
                    severetiredness,
                    severeabdominalpain,
                    persistentvomiting,
                    severediarrhoea,
                    dizziness,
                    painwithurination,
                    severeflankpain,
                    bloodinurine,
                    vaginaldischarge,
                    deeppelvicpain,
                    syphilis,
                    persistentdrycough,
                    progressiveweightloss,
                    nightsweats,
                    diagnosedwithtuberculosis,
                    treatedTBpreviously,
                    heartdisease,
                    anaemia,
                    kidneydisease,
                    sicklecell,
                    diabetes,
                    goitre,
                    hivaids,
                    otherseriouschronicillnesses,
                    hadsurgery,
                    herbalremedies,
                    otcdrugs,
                    vitamins,
                    dietarysupplements,
                    tetanus,
                };
            }
            catch (error) {
                throw new Error(error);
            }
        });
        this.nationalIntermediateResult1data = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const resultA = yield this.indicatorRepository.IntermediateResult1A();
                const resultB = yield this.indicatorRepository.IntermediateResult1B();
                const resultC = yield this.indicatorRepository.IntermediateResult1C();
                return { resultA: resultA, resultB: resultB, resultC: resultC };
            }
            catch (error) {
                throw new Error(error);
            }
        });
        this.nationalRepository = NationalRepository;
        if (connection) {
            this.indicatorRepository = new IndicatorRepository_1.IndicatorRepository(connection);
        }
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
