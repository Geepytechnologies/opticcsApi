import { PoolConnection } from "mysql2/promise";
import { Patientqueries } from "../queries/user/patient";
import {
  firstvisitDTO,
  returnvisitDTO,
  returnvisitwithancDTO,
} from "../entities/patient";

export class patientRepository {
  private connection: PoolConnection;

  constructor(connection: PoolConnection) {
    this.connection = connection;
  }
  async checkifpatientwithphonenumberexists(phone: string) {
    const q = Patientqueries.getPatientByPhone();
    try {
      const result = await this.connection.execute(q, [phone]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async createPersonalrecord(data: firstvisitDTO) {
    const q = Patientqueries.patientpersonalrecord();
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
      const result = await this.connection.execute(q, values);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async createpatient(data: firstvisitDTO, personalinformation_id: string) {
    const q = Patientqueries.createpatient();
    const values = [
      data.healthpersonnel_id,
      data.firstvisit_date,
      personalinformation_id,
    ];
    try {
      const result = await this.connection.execute(q, values);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async createfirstvisit(data: firstvisitDTO, patient_id: string) {
    const q = Patientqueries.firstvisitdata();
    const values = [patient_id, data.firstvisit_date];

    try {
      const result = await this.connection.execute(q, values);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async createdailyhabit(data: firstvisitDTO, firstvisit_id: string) {
    const q = Patientqueries.dailyhabit();
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
      const result = await this.connection.execute(q, values);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async createobstetric(data: firstvisitDTO, firstvisit_id: string) {
    const q = Patientqueries.obstetrichistory();
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
      const result = await this.connection.execute(q, values);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async createmedicalhistory(data: firstvisitDTO, firstVisit_id: string) {
    const q = Patientqueries.medicalhistory();
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
      const result = await this.connection.execute(q, values);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async createpastmedicalhistory(data: firstvisitDTO, firstvisit_id: string) {
    const q = Patientqueries.pastmedicalhistory();
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
      const result = await this.connection.execute(q, values);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async createfamilyhistory(data: firstvisitDTO, firstvisit_id: string) {
    const q = Patientqueries.familyhistory();
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
      const result = await this.connection.execute(q, values);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async createdrughistory(data: firstvisitDTO, firstvisit_id: string) {
    const q = Patientqueries.drughistory();
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
      const result = await this.connection.execute(q, values);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async createphysicalexamination(data: firstvisitDTO, firstvisit_id: string) {
    const q = Patientqueries.physicalexamination();
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
      const result = await this.connection.execute(q, values);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async getnewlycreatedpatientrecord(patient_id: string) {
    const q = Patientqueries.getnewlycreatedpatientrecord();
    try {
      const result = await this.connection.execute(q, [patient_id]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async checkIfPatientRecordExistsInReturnvisit(patient_id: string) {
    try {
      const q = `SELECT * FROM returnvisit WHERE patient_id = ?`;
      const [result] = await this.connection.execute(q, [patient_id]);
      if (Array.isArray(result)) {
        const lastrecord = result[result.length - 1];
        const { anc }: any = lastrecord;
        return { value: true, lastanc: anc };
      } else {
        return { value: false, lastanc: null };
      }
    } catch (error) {
      return { value: false, lastanc: null };
    }
  }
  async createReturnVisit(data: returnvisitDTO) {
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
    const q = Patientqueries.returnvisitinitial();
    try {
      const result = await this.connection.execute(q, values);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async createReturnVisitWithANC(data: returnvisitDTO, lastanc: number) {
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
    const q = Patientqueries.returnvisitancupdated();
    try {
      const result = await this.connection.execute(q, values);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
