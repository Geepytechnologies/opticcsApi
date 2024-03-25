import { NationalRepository } from "../repositories/NationalRepository";

export class NationalService {
  private readonly nationalRepository: NationalRepository;

  constructor(NationalRepository: NationalRepository) {
    this.nationalRepository = NationalRepository;
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
}
