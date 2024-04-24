import { PoolConnection } from "mysql2/promise";
import { IndicatorRepository } from "../repositories/IndicatorRepository";
import { NationalRepository } from "../repositories/NationalRepository";

export class NationalService {
  private readonly nationalRepository: NationalRepository;
  private readonly indicatorRepository!: IndicatorRepository;

  constructor(
    NationalRepository: NationalRepository,
    connection?: PoolConnection
  ) {
    this.nationalRepository = NationalRepository;
    if (connection) {
      this.indicatorRepository = new IndicatorRepository(connection);
    }
  }

  async nationalreturnvisitdata(anc: number) {
    try {
      const fever = await this.nationalRepository.getfeverreturn(anc);
      const headache = await this.nationalRepository.getheadachereturn(anc);
      const cough = await this.nationalRepository.getcoughreturn(anc);
      const palpitations = await this.nationalRepository.getpalpitationsreturn(
        anc
      );
      const severetiredness =
        await this.nationalRepository.getseveretirednessreturn(anc);
      const difficultylyingflat =
        await this.nationalRepository.getdifficultylyingflatreturn(anc);
      const dizziness = await this.nationalRepository.getdizzinessreturn(anc);
      const convulsionsduringpregnancy =
        await this.nationalRepository.getconvulsionsreturn(anc);
      const abdominalpain =
        await this.nationalRepository.getabdominalpainreturn(anc);
      const painwithurination =
        await this.nationalRepository.getpainwithurinationreturn(anc);
      const bloodinurine = await this.nationalRepository.getbloodinurinereturn(
        anc
      );
      const vaginaldischarge =
        await this.nationalRepository.getvaginaldischargereturn(anc);
      const deeppelvicpain =
        await this.nationalRepository.getdeeppelvicpainreturn(anc);
      const syphilis = await this.nationalRepository.getsyphilisreturn(anc);

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
    } catch (error: any) {
      throw new Error(error);
    }
  }
  nationalgeneraldata = async (query: any) => {
    const date = query.date || null;

    try {
      //personalinformation
      const edd = await this.nationalRepository.getedd2();
      const firstbabymovement =
        await this.nationalRepository.getfirstbabymovement();
      const parity = await this.nationalRepository.getparity();
      const babysmovement = await this.nationalRepository.getbabysmovement();
      const graviditygreaterthan8result =
        await this.nationalRepository.graviditygreaterthan8();
      const graviditylessthan8result =
        await this.nationalRepository.graviditylessthan8();
      //obstetric
      const convulsionsduringpregnancy =
        await this.nationalRepository.getconvulsions();
      const caesarean = await this.nationalRepository.getsurgery();
      const tearsthroughsphincter =
        await this.nationalRepository.gettearsthroughsphincter();
      const postpartiumhaemorrghage =
        await this.nationalRepository.getpostpartiumhaemorrghage();
      const stillbirths = await this.nationalRepository.getstillbirths();
      const prematuredeliveries =
        await this.nationalRepository.getprematuredeliveries();
      const lowbirthbabies = await this.nationalRepository.getlowbirthbabies();
      const babieswhodied = await this.nationalRepository.getbabieswhodied();
      const miscarriages = await this.nationalRepository.getmiscarriages();
      const breastfedbefore =
        await this.nationalRepository.getbreastfedbefore();
      const breastfeedingduration =
        await this.nationalRepository.getbreastfeedingduration();
      const breastfeedingproblems =
        await this.nationalRepository.getbreastfeedingproblems();
      //dailyhabitsandlifestyle
      const doyousmoke = await this.nationalRepository.getSmokers();
      const alcohol = await this.nationalRepository.getAlcohol();
      const threatened = await this.nationalRepository.getThreatened();
      const livewith = await this.nationalRepository.whodoyoulivewith();
      //medicalhistory
      const cough = await this.nationalRepository.getcough();
      const palpitations = await this.nationalRepository.getpalpitations();
      const difficultybreathing =
        await this.nationalRepository.getdifficultybreathing();
      const swellingfeet = await this.nationalRepository.getswellingoffeet();
      const chestpain = await this.nationalRepository.getchestpain();
      const epigastricpain = await this.nationalRepository.getepigastricpain();
      const severetiredness =
        await this.nationalRepository.getseveretiredness();
      const severeabdominalpain =
        await this.nationalRepository.getsevereabdominalpain();
      const persistentvomiting =
        await this.nationalRepository.getpersistentvomiting();
      const severediarrhoea =
        await this.nationalRepository.getseverediarrhoea();
      const dizziness = await this.nationalRepository.getdizziness();
      //urinary
      const painwithurination =
        await this.nationalRepository.getpainwithurination();
      const severeflankpain =
        await this.nationalRepository.getsevereflankpain();
      const bloodinurine = await this.nationalRepository.getbloodinurine();
      //gynaecological
      const vaginaldischarge =
        await this.nationalRepository.getvaginaldischarge();
      const deeppelvicpain = await this.nationalRepository.getdeeppelvicpain();
      const syphilis = await this.nationalRepository.getsyphilis();
      const persistentdrycough =
        await this.nationalRepository.getpersistentdrycough();
      const progressiveweightloss =
        await this.nationalRepository.getprogressiveweightloss();
      const nightsweats = await this.nationalRepository.getnightsweats();
      const diagnosedwithtuberculosis =
        await this.nationalRepository.getdiagnosedwithtuberculosis();
      const treatedTBpreviously =
        await this.nationalRepository.gettreatedTBpreviously();
      //pastmedicalhistory
      const heartdisease = await this.nationalRepository.getheartdisease();
      const anaemia = await this.nationalRepository.getanaemia();
      const kidneydisease = await this.nationalRepository.getkidneydisease();
      const sicklecell = await this.nationalRepository.getsicklecell();
      const diabetes = await this.nationalRepository.getdiabetes();
      const goitre = await this.nationalRepository.getgoitre();
      const hivaids = await this.nationalRepository.gethivaids();
      const otherseriouschronicillnesses =
        await this.nationalRepository.getotherseriouschronicillnesses();
      const hadsurgery = await this.nationalRepository.gethadsurgery();
      //drughistory
      const herbalremedies = await this.nationalRepository.getherbalremedies();
      const otcdrugs = await this.nationalRepository.getotcdrugs();
      const vitamins = await this.nationalRepository.getvitamins();
      const dietarysupplements =
        await this.nationalRepository.getdietarysupplements();
      const tetanus = await this.nationalRepository.gettetanus();
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
    } catch (error: any) {
      throw new Error(error);
    }
  };
  nationalIntermediateResult1data = async () => {
    try {
      const resultA = await this.indicatorRepository.IntermediateResult1A();
      const resultB = await this.indicatorRepository.IntermediateResult1B();
      const resultC = await this.indicatorRepository.IntermediateResult1C();
      return { resultA: resultA, resultB: resultB, resultC: resultC };
    } catch (error: any) {
      throw new Error(error);
    }
  };
}
