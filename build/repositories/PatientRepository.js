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
exports.patientRepository = void 0;
const patient_1 = require("../queries/user/patient");
class patientRepository {
    constructor(connection) {
        this.connection = connection;
    }
    checkifpatientwithphonenumberexists(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = patient_1.Patientqueries.getPatientByPhone();
            try {
                const result = yield this.connection.execute(q, [phone]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    createPersonalrecord(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = patient_1.Patientqueries.patientpersonalrecord();
            const values = [
                data.hospitalnumber,
                data.firstname,
                data.middlename,
                data.surname,
                data.phone,
                data.address,
                data.state,
                data.dateofbirth,
                data.lga,
                data.healthfacility,
                data.gravidity,
                data.parity,
                data.alive,
                data.lmpknown,
                data.lmp,
                data.edd,
                data.ega,
                data.laborstarted,
                data.firstbabymovement,
                data.doyoufeelthebabysmovement,
                data.doyouknowdateoffirstbabymovement,
            ];
            try {
                const result = yield this.connection.execute(q, values);
                return result;
            }
            catch (err) {
                throw new Error(err + ": " + "createPersonalrecord");
            }
        });
    }
    createpatient(data, personalinformation_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = patient_1.Patientqueries.createpatient();
            const values = [
                data.healthpersonnel_id,
                data.firstvisit_date,
                personalinformation_id,
            ];
            try {
                const result = yield this.connection.execute(q, values);
                return result;
            }
            catch (err) {
                throw new Error(err + ":" + "createpatient");
            }
        });
    }
    createfirstvisit(data, patient_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = patient_1.Patientqueries.firstvisitdata();
            const values = [patient_id, data.firstvisit_date];
            try {
                const result = yield this.connection.execute(q, values);
                return result;
            }
            catch (err) {
                throw new Error(err + ":" + "createfirstvisit");
            }
        });
    }
    createdailyhabit(data, firstvisit_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = patient_1.Patientqueries.dailyhabit();
            const values = [
                firstvisit_id,
                data.doyousmoke,
                data.doyoudrinkalcohol,
                data.othersubstances,
                data.doyounone,
                data.whodoyoulivewith,
                data.specifywhodoyoulivewith,
                data.stoppedfromleavingthehouse,
                data.threatenedyourlife,
                data.abusedphysically,
                data.didanyoneevernone,
            ];
            try {
                const result = yield this.connection.execute(q, values);
                return result;
            }
            catch (err) {
                throw new Error(err + ": " + "createdailyhabit");
            }
        });
    }
    createobstetric(data, firstvisit_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = patient_1.Patientqueries.obstetrichistory();
            const values = [
                firstvisit_id,
                data.convulsionsduringpregnancy,
                data.caesarean,
                data.tearsthroughsphincter,
                data.postpartiumhaemorrghage,
                data.stillbirths,
                data.prematuredeliveries,
                data.lowbirthbabies,
                data.babieswhodied,
                data.miscarriages,
                data.otherinputobstetrichistory,
                data.yearofpregnancy,
                data.carriedtoterm,
                data.modeofdelivery,
                data.weightofbaby,
                data.sexofbaby,
                data.babycriedafterbirth,
                data.complicationsafterdelivery,
                data.specifycomplicationsafterdelivery,
                data.breastfedexclusively,
            ];
            try {
                const result = yield this.connection.execute(q, values);
                return result;
            }
            catch (err) {
                throw new Error(err + " :" + "createobstetric");
            }
        });
    }
    createmedicalhistory(data, firstVisit_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = patient_1.Patientqueries.medicalhistory();
            const values = [
                firstVisit_id,
                data.fever,
                data.chills,
                data.headaches,
                data.dizziness,
                data.convulsions,
                data.weakness,
                data.blurryvision,
                data.cough,
                data.difficultybreathing,
                data.severechestpain,
                data.severeepigastricpain,
                data.pepticulcerpatient,
                data.severetiredness,
                data.severeabdominalpain,
                data.persistentvomiting,
                data.severediarrhoea,
                data.painwithurination,
                data.severeflankpain,
                data.bloodinurine,
                data.increasedurination,
                data.noticedantsaroundplaceurinated,
                data.increasedthirst,
                data.vaginaldischarge,
                data.deeppelvicpain,
                data.syphilis,
                data.syphilistreatment,
                data.feveryes,
                data.chillsyes,
                data.headachesyes,
                data.dizzinessyes,
                data.convulsionsyes,
                data.weaknessyes,
                data.blurryvisionyes,
                data.coughyes,
                data.persistentdrycough,
                data.persistentdrycoughyes,
                data.progressiveweightloss,
                data.progressiveweightlossyes,
                data.nightsweats,
                data.nightsweatsyes,
                data.diagnosedwithtuberculosis,
                data.diagnosedwithtuberculosisyes,
                data.treatedTBpreviously,
                data.treatedTBpreviouslyyes,
                data.difficultybreathingyes,
                data.severechestpainyes,
                data.severeepigastricpainyes,
                data.palpitations,
                data.palpitationyes,
                data.swellingfeet,
                data.swellingfeetyes,
                data.difficultytosleep,
                data.difficultytosleepyes,
                data.pepticulcerpatientyes,
                data.severetirednessyes,
                data.severeabdominalpainyes,
                data.persistentvomitingyes,
                data.severediarrhoeayes,
                data.painwithurinationyes,
                data.severeflankpainyes,
                data.bloodinurineyes,
                data.increasedurinationyes,
                data.increasedthirstyes,
                data.vaginaldischargeyes,
                data.deeppelvicpainyes,
                data.syphilisyes,
                //new
                data.wakinguptopassurine,
            ];
            try {
                const result = yield this.connection.execute(q, values);
                return result;
            }
            catch (err) {
                throw new Error(err + ": " + "createmedicalhistory");
            }
        });
    }
    createpastmedicalhistory(data, firstvisit_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = patient_1.Patientqueries.pastmedicalhistory();
            const values = [
                firstvisit_id,
                data.hypertension,
                data.heartdisease,
                data.anaemia,
                data.kidneydisease,
                data.sicklecell,
                data.diabetes,
                data.goitre,
                data.hivaids,
                data.hivaidstreatment,
                data.covid19,
                data.otherseriouschronicillnesses,
                data.specifyseriouschronicillnesses,
                data.hadsurgery,
                data.specifyhadsurgery,
                data.hypertensionyes,
                data.heartdiseaseyes,
                data.anaemiayes,
                data.kidneydiseaseyes,
                data.sicklecellyes,
                data.diabetesyes,
                data.goitreyes,
                data.hivaidsyes,
                data.covid19yes,
            ];
            try {
                const result = yield this.connection.execute(q, values);
                return result;
            }
            catch (err) {
                throw new Error(err + ": " + "createpastmedicalhistory");
            }
        });
    }
    createfamilyhistory(data, firstvisit_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = patient_1.Patientqueries.familyhistory();
            const values = [
                firstvisit_id,
                data.patienthaschildren,
                data.haveyoubreastfedbefore,
                data.breastfeedingduration,
                data.breastfeedingproblems,
                data.breastfeedingproblemsmoredetails,
                data.babylessthanayear,
                data.stillbreastfeeding,
                data.camewithachildunder5years,
                data.hasunvaccinatedchildren,
                data.familyepilepsy,
                data.familyepilepsyyes,
                data.familyhypertension,
                data.familyhypertensionyes,
                data.familyasthma,
                data.familyasthmayes,
                data.familydiabetes,
                data.familydiabetesyes,
                data.familysicklecell,
                data.familysicklecellyes,
            ];
            try {
                const result = yield this.connection.execute(q, values);
                return result;
            }
            catch (err) {
                throw new Error(err + ": " + "createfamilyhistory");
            }
        });
    }
    createdrughistory(data, firstvisit_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = patient_1.Patientqueries.drughistory();
            const values = [
                firstvisit_id,
                data.historyofallergy,
                data.allergies,
                data.herbalremedies,
                data.vitamins,
                data.otcdrugs,
                data.dietarysupplements,
                data.typeofdietarysupplement,
                data.otherdrugs,
                data.tetanus,
                data.tetanusdoses,
                data.lasttetanusdose,
                data.covidvaccination,
            ];
            try {
                const result = yield this.connection.execute(q, values);
                return result;
            }
            catch (err) {
                throw new Error(err + ": " + "createdrughistory");
            }
        });
    }
    createphysicalexamination(data, firstvisit_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = patient_1.Patientqueries.physicalexamination();
            const values = [
                firstvisit_id,
                data.conjunctiva,
                data.sclera,
                data.bloodpressure,
                data.respiratoryrate,
                data.temperature,
                data.pulserate,
                data.abdomenScars,
                data.fromcaesareansection,
                data.fundalheight,
                data.measurefundalheightweek,
                data.measurefundalheightcentimeter,
                data.presentation,
                data.descent,
                data.positionoffoetus,
                data.breastexamination,
                data.abnormalbreastexamination,
                data.genitalexamination,
                data.swelling,
                data.discharge,
                data.tenderness,
                data.ulcers,
                data.fistulas,
                data.irregularities,
                data.swellingyes,
                data.dischargeyes,
                data.tendernessyes,
                data.ulcersyes,
                data.fistulasyes,
                data.irregularitiesyes,
                data.heartrate,
                data.bmi,
                data.observation,
                data.percussion,
                data.palpationchest,
                data.auscultationchest,
            ];
            try {
                const result = yield this.connection.execute(q, values);
                return result;
            }
            catch (err) {
                throw new Error(err + ": " + "createphysicalexamination");
            }
        });
    }
    getnewlycreatedpatientrecord(patient_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = patient_1.Patientqueries.getnewlycreatedpatientrecord();
            try {
                const result = yield this.connection.execute(q, [patient_id]);
                return result;
            }
            catch (err) {
                throw new Error(err + ": " + "getnewlycreatedpatientrecord");
            }
        });
    }
    checkIfPatientRecordExistsInReturnvisit(patient_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const q = `SELECT * FROM returnvisit WHERE patient_id = ?`;
                const [result] = yield this.connection.execute(q, [patient_id]);
                if (Array.isArray(result)) {
                    const lastrecord = result[result.length - 1];
                    const { anc } = lastrecord;
                    return { value: true, lastanc: anc };
                }
                else {
                    return { value: false, lastanc: null };
                }
            }
            catch (error) {
                return { value: false, lastanc: null };
            }
        });
    }
    createReturnVisit(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const values = [
                data.patient_id,
                data.returnvisit_date,
                data.state,
                data.lga,
                data.healthfacility,
                data.fever,
                data.headache,
                data.dizziness,
                data.convulsions,
                data.weakness,
                data.blurryvision,
                data.cough,
                data.difficultybreathing,
                data.palpitation,
                data.swellingoffeet,
                data.severechestpain,
                data.severeepigastricpain,
                data.pepticulcerpatient,
                data.severetirednesss,
                data.difficultylyingflat,
                data.severeabdominalpain,
                data.vomiting,
                data.diarrhoea,
                data.urinarypain,
                data.severeflankpain,
                data.bloodinurine,
                data.increasedurination,
                data.antsaroundurine,
                data.increasedthirst,
                data.vaginaldischarge,
                data.painduringsex,
                data.syphillis,
                data.receivedcaresincelastvisit,
                data.whoprovidedthecare,
                data.whatcarewasprovided,
                data.outcomeofthecare,
                data.takingprescribeddrugs,
                data.problemtakingdrugs,
                data.followadvice,
                data.reactionorsideeffects,
                data.anythingrelatedtopregnancy,
                data.pink,
                data.palepink,
                data.whiteincolour,
                data.white,
                data.tinge,
                data.deepyellow,
                data.dirtywhite,
                data.bloodpressure,
                data.respiratoryrate,
                data.temperature,
                data.pulserate,
                data.abdomenScars,
                data.palpateAndEstimatefundusdocumentation,
                data.distancebtwtopdffundus,
                data.cmfromtopfundusdocumentation,
                data.cmfromuppersymphysis,
                data.presentation,
                data.descent,
                data.positionoffoetus,
                data.persisitentdrycough,
                data.unexplainedweightloss,
                data.nightsweats,
                data.diagnosedwithtuberculosis,
                data.treatedfortuberculosis,
                data.heartrate,
                data.complaint,
                data.stategenobser,
                data.generalwellchoice,
                data.syphillistreatment,
                data.pregnancydiscuss,
                data.wakeuptourinate,
                data.problemmedication,
                data.bmi,
                data.sclera,
                data.conjuctiva,
                data.chill,
                data.bloodpressdia,
                data.bloodpresssis,
                data.chestpaindiscuss,
                data.epigastricpaindiscuss,
                data.severetireddisuss,
                data.severediarrhoeadiscuss,
                data.swellingfeetdiscuss,
                data.sputrumcolor,
                data.sputrum,
                data.lmp,
                data.lmpdate,
                data.edd,
                data.ega,
                data.laborstarted,
                data.selectedbabymovement,
                data.selectedfirstbabymovement,
                data.selectedfirstbabymovementdate,
                data.observelookpatient,
                data.documentpercussion,
                data.palpatediscuss,
                data.auscultationdiscuss,
                data.breast,
                data.breastdiscuss,
                data.severabdodisuss,
                //new
                data.missedAncVisit,
                data.contactedByPHC,
                data.whoContacted,
                data.urinaryGen,
                data.comeWithUnderFiveChildren,
                data.testedFverMalaria,
                data.getAppropriateTreatMalariaFever,
                data.recieveImmunizationAge,
                data.screenedMalnutrition,
                data.underFiveCovidVaccinated,
            ];
            const q = patient_1.Patientqueries.returnvisitinitial();
            try {
                const result = yield this.connection.execute(q, values);
                return result;
            }
            catch (err) {
                throw new Error(err + ": " + "createReturnVisit");
            }
        });
    }
    createReturnVisitWithANC(data, lastanc) {
        return __awaiter(this, void 0, void 0, function* () {
            const newANC = lastanc + 1;
            const values = [
                data.patient_id,
                data.returnvisit_date,
                data.state,
                data.lga,
                data.healthfacility,
                data.fever,
                data.headache,
                data.dizziness,
                data.convulsions,
                data.weakness,
                data.blurryvision,
                data.cough,
                data.difficultybreathing,
                data.palpitation,
                data.swellingoffeet,
                data.severechestpain,
                data.severeepigastricpain,
                data.pepticulcerpatient,
                data.severetirednesss,
                data.difficultylyingflat,
                data.severeabdominalpain,
                data.vomiting,
                data.diarrhoea,
                data.urinarypain,
                data.severeflankpain,
                data.bloodinurine,
                data.increasedurination,
                data.antsaroundurine,
                data.increasedthirst,
                data.vaginaldischarge,
                data.painduringsex,
                data.syphillis,
                data.receivedcaresincelastvisit,
                data.whoprovidedthecare,
                data.whatcarewasprovided,
                data.outcomeofthecare,
                data.takingprescribeddrugs,
                data.problemtakingdrugs,
                data.followadvice,
                data.reactionorsideeffects,
                data.anythingrelatedtopregnancy,
                data.pink,
                data.palepink,
                data.whiteincolour,
                data.white,
                data.tinge,
                data.deepyellow,
                data.dirtywhite,
                data.bloodpressure,
                data.respiratoryrate,
                data.temperature,
                data.pulserate,
                data.abdomenScars,
                data.palpateAndEstimatefundusdocumentation,
                data.distancebtwtopdffundus,
                data.cmfromtopfundusdocumentation,
                data.cmfromuppersymphysis,
                data.presentation,
                data.descent,
                data.positionoffoetus,
                data.persisitentdrycough,
                data.unexplainedweightloss,
                data.nightsweats,
                data.diagnosedwithtuberculosis,
                data.treatedfortuberculosis,
                data.heartrate,
                data.complaint,
                data.stategenobser,
                data.generalwellchoice,
                data.syphillistreatment,
                data.pregnancydiscuss,
                data.wakeuptourinate,
                data.problemmedication,
                data.bmi,
                data.sclera,
                data.conjuctiva,
                data.chill,
                data.bloodpressdia,
                data.bloodpresssis,
                data.chestpaindiscuss,
                data.epigastricpaindiscuss,
                data.severetireddisuss,
                data.severediarrhoeadiscuss,
                data.swellingfeetdiscuss,
                data.sputrumcolor,
                data.sputrum,
                data.lmp,
                data.lmpdate,
                data.edd,
                data.ega,
                data.laborstarted,
                data.selectedbabymovement,
                data.selectedfirstbabymovement,
                data.selectedfirstbabymovementdate,
                data.observelookpatient,
                data.documentpercussion,
                data.palpatediscuss,
                data.auscultationdiscuss,
                data.breast,
                data.breastdiscuss,
                data.severabdodisuss,
                //new
                data.missedAncVisit,
                data.contactedByPHC,
                data.whoContacted,
                data.urinaryGen,
                data.comeWithUnderFiveChildren,
                data.testedFverMalaria,
                data.getAppropriateTreatMalariaFever,
                data.recieveImmunizationAge,
                data.screenedMalnutrition,
                data.underFiveCovidVaccinated,
                newANC,
            ];
            const q = patient_1.Patientqueries.returnvisitancupdated();
            try {
                const result = yield this.connection.execute(q, values);
                return result;
            }
            catch (err) {
                throw new Error(err + ": " + "createReturnVisitWithANC");
            }
        });
    }
    deleteAPatient(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = patient_1.Patientqueries.deleteAPatient();
            try {
                const result = yield this.connection.execute(q, [id]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getFirstvisit(patient_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = patient_1.Patientqueries.getfirstvisit();
            try {
                const result = yield this.connection.execute(q, [patient_id]);
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    getPatientsWithHealthworker(pageSize, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = patient_1.Patientqueries.getPatientsWithHealthworker(pageSize, offset);
            try {
                const [result] = yield this.connection.execute(q);
                return result;
            }
            catch (err) {
                console.error("getPatientsWithHealthworker", +" " + err);
                throw new Error(err);
            }
        });
    }
    getPatientsWithHealthworkerwithdate(pageSize, offset, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = patient_1.Patientqueries.getPatientsWithHealthworkerwithdate(pageSize, offset);
            try {
                const [result] = yield this.connection.execute(q, [from, to]);
                return result;
            }
            catch (err) {
                console.error("getPatientsWithHealthworkerwithdate", +" " + err);
                throw new Error(err);
            }
        });
    }
    getPatientsWithHealthworkerFilteredByState(pageSize, offset, state) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = patient_1.Patientqueries.getPatientsWithHealthworkerFilteredByState(pageSize, offset);
            try {
                const [result] = yield this.connection.execute(q, [state]);
                return result;
            }
            catch (err) {
                console.error("getPatientsWithHealthworkerFilteredByState", +" " + err);
                throw new Error(err);
            }
        });
    }
    getPatientsWithHealthworkerFilteredByStateCount(state) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = patient_1.Patientqueries.getPatientsWithHealthworkerFilteredByStateCount();
            try {
                const [result] = yield this.connection.execute(q, [state]);
                return result;
            }
            catch (err) {
                console.error("getPatientsWithHealthworkerFilteredByStateCount", +" " + err);
                throw new Error(err);
            }
        });
    }
    getPatientsWithHealthworkerFilteredByStatewithdate(pageSize, offset, state, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = patient_1.Patientqueries.getPatientsWithHealthworkerFilteredByStatewithdate(pageSize, offset);
            try {
                const [result] = yield this.connection.execute(q, [state, from, to]);
                return result;
            }
            catch (err) {
                console.error("getPatientsWithHealthworkerFilteredByStatewithdate", +" " + err);
                throw new Error(err);
            }
        });
    }
    getPatientsWithHealthworkerFilteredByStateCountwithdate(state, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = patient_1.Patientqueries.getPatientsWithHealthworkerFilteredByStateCountwithdate();
            try {
                const [result] = yield this.connection.execute(q, [state, from, to]);
                return result;
            }
            catch (err) {
                console.error("getPatientsWithHealthworkerFilteredByStateCountwithdate", +" " + err);
                throw new Error(err);
            }
        });
    }
    getPatientsWithHealthworkerFilteredByLga(pageSize, offset, state, lga) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = patient_1.Patientqueries.getPatientsWithHealthworkerFilteredByLga(pageSize, offset);
            try {
                const [result] = yield this.connection.execute(q, [state, lga]);
                return result;
            }
            catch (err) {
                console.error("getPatientsWithHealthworkerFilteredByLga", +" " + err);
                throw new Error(err);
            }
        });
    }
    getPatientsWithHealthworkerFilteredByLgaCount(state, lga) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = patient_1.Patientqueries.getPatientsWithHealthWorkerFilteredByLgaCount();
            try {
                const [result] = yield this.connection.execute(q, [state, lga]);
                return result;
            }
            catch (err) {
                console.error("getPatientsWithHealthWorkerFilteredByLgaCount", +" " + err);
                throw new Error(err);
            }
        });
    }
    getPatientsWithHealthworkerFilteredByLgawithdate(pageSize, offset, state, lga, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = patient_1.Patientqueries.getPatientsWithHealthworkerFilteredByLgawithdate(pageSize, offset);
            try {
                const [result] = yield this.connection.execute(q, [state, lga, from, to]);
                return result;
            }
            catch (err) {
                console.error("getPatientsWithHealthworkerFilteredByLgawithdate", +" " + err);
                throw new Error(err);
            }
        });
    }
    getPatientsWithHealthworkerFilteredByLgaCountwithdate(state, lga, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = patient_1.Patientqueries.getPatientsWithHealthWorkerFilteredByLgaCountwithdate();
            try {
                const [result] = yield this.connection.execute(q, [state, lga, from, to]);
                return result;
            }
            catch (err) {
                console.error("getPatientsWithHealthWorkerFilteredByLgaCountwithdate", +" " + err);
                throw new Error(err);
            }
        });
    }
    getPatientsWithHealthworkerFilteredByHealthfacility(pageSize, offset, state, lga, healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = patient_1.Patientqueries.getPatientsWithHealthworkerFilteredByHealthfacility(pageSize, offset);
            try {
                const [result] = yield this.connection.execute(q, [
                    state,
                    lga,
                    healthfacility,
                ]);
                return result;
            }
            catch (err) {
                console.error("getPatientsWithHealthworkerFilteredByHealthfacility", +" " + err);
                throw new Error(err);
            }
        });
    }
    getPatientsWithHealthworkerFilteredByHealthfacilityCount(state, lga, healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = patient_1.Patientqueries.getPatientsWithHealthworkerFilteredByHealthfacilityCount();
            try {
                const [result] = yield this.connection.execute(q, [
                    state,
                    lga,
                    healthfacility,
                ]);
                return result;
            }
            catch (err) {
                console.error("getPatientsWithHealthworkerFilteredByHealthfacilityCount", +" " + err);
                throw new Error(err);
            }
        });
    }
    getPatientsWithHealthworkerFilteredByHealthfacilitywithdate(pageSize, offset, state, lga, healthfacility, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = patient_1.Patientqueries.getPatientsWithHealthworkerFilteredByHealthfacilitywithdate(pageSize, offset);
            try {
                const [result] = yield this.connection.execute(q, [
                    state,
                    lga,
                    healthfacility,
                    from,
                    to,
                ]);
                return result;
            }
            catch (err) {
                console.error("getPatientsWithHealthworkerFilteredByHealthfacilitywithdate", +" " + err);
                throw new Error(err);
            }
        });
    }
    getPatientsWithHealthworkerFilteredByHealthfacilityCountwithdate(state, lga, healthfacility, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = patient_1.Patientqueries.getPatientsWithHealthworkerFilteredByHealthfacilityCountwithdate();
            try {
                const [result] = yield this.connection.execute(q, [
                    state,
                    lga,
                    healthfacility,
                    from,
                    to,
                ]);
                return result;
            }
            catch (err) {
                console.error("getPatientsWithHealthworkerFilteredByHealthfacilityCountwithdate", +" " + err);
                throw new Error(err);
            }
        });
    }
    getPatientCount() {
        return __awaiter(this, void 0, void 0, function* () {
            const q = patient_1.Patientqueries.getPatientCount();
            try {
                const [result] = yield this.connection.execute(q);
                return result[0].patient_count;
            }
            catch (err) {
                console.error("getPatientCount", +" " + err);
                throw new Error(err);
            }
        });
    }
    getPatientCountwithdate(from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = patient_1.Patientqueries.getPatientCountwithdate();
            try {
                const [result] = yield this.connection.execute(q, [from, to]);
                return result[0].patient_count;
            }
            catch (err) {
                console.error("getPatientCountwithdate", +" " + err);
                throw new Error(err);
            }
        });
    }
    numberofwomenwith4visits() {
        return __awaiter(this, void 0, void 0, function* () {
            const q = patient_1.Patientqueries.numberofwomenwith4visits();
            try {
                const [result] = yield this.connection.execute(q);
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    numberofwomenwith4visitswithdate(from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = patient_1.Patientqueries.numberofwomenwith4visitswithdate();
            try {
                const [result] = yield this.connection.execute(q, [from, to]);
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    numberofwomenwith4visitsforstate(state) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = patient_1.Patientqueries.numberofwomenwith4visitsforstate();
            try {
                const [result] = yield this.connection.execute(q, [state]);
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    numberofwomenwith4visitsforstatewithdate(state, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = patient_1.Patientqueries.numberofwomenwith4visitsforstatewithdate();
            try {
                const [result] = yield this.connection.execute(q, [state, from, to]);
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    numberofwomenwith4visitsforlga(state, lga) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = patient_1.Patientqueries.numberofwomenwith4visitsforlga();
            try {
                const [result] = yield this.connection.execute(q, [state, lga]);
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    numberofwomenwith4visitsforlgawithdate(state, lga, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = patient_1.Patientqueries.numberofwomenwith4visitsforlgawithdate();
            try {
                const [result] = yield this.connection.execute(q, [
                    state,
                    lga,
                    from,
                    to,
                ]);
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    numberofwomenwith4visitsforhealthfacility(state, healthfacility) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = patient_1.Patientqueries.numberofwomenwith4visitsforstate();
            try {
                const [result] = yield this.connection.execute(q, [
                    state,
                    healthfacility,
                ]);
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    numberofwomenwith4visitsforhealthfacilitywithdate(state, healthfacility, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = patient_1.Patientqueries.numberofwomenwith4visitsforhealthfacilitywithdate();
            try {
                const [result] = yield this.connection.execute(q, [
                    state,
                    healthfacility,
                    from,
                    to,
                ]);
                return result;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.patientRepository = patientRepository;
