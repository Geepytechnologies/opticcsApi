import { PoolConnection } from "mysql2/promise";
import logger from "../logger";

export class NationalRepository {
  private connection: PoolConnection;

  constructor(connection: PoolConnection) {
    this.connection = connection;
  }

  async getNationalAdminByUserID(userID: string) {
    const q = `SELECT * FROM nationaladmin WHERE userid = ?`;
    try {
      const result = await this.connection.execute(q, [userID]);
      return result;
    } catch (error: any) {
      logger.error(error);
    } finally {
      if (this.connection) {
        this.connection.release();
      }
    }
  }
  async createRefresh(refreshToken: string, userID: string) {
    const q = `UPDATE nationaladmin SET refreshtoken = ? WHERE userid = ?`;
    try {
      console.log("im using %d for refresh", this.connection.threadId);

      await this.connection.execute(q, [refreshToken, userID]);
    } catch (error: any) {
      logger.error(error);
    } finally {
      console.log("i released %d in refresh", this.connection.threadId);

      if (this.connection) {
        this.connection.release();
      }
    }
  }

  getfeverreturn = async (anc: number) => {
    const query = anc || 2;
    try {
      const q = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.fever = ? AND rv.anc = ?
      `;
      const q2 = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.fever = ? AND rv.anc = ?
      `;

      const result: any = await this.connection.execute(q, ["Yes", query]);
      const result2: any = await this.connection.execute(q2, ["No", query]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  };
  getheadachereturn = async (anc: number) => {
    const query = anc || 2;
    try {
      const q = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.headache = ? AND rv.anc = ?
      `;
      const q2 = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.headache = ? AND rv.anc = ?
      `;

      const result: any = await this.connection.execute(q, ["Yes", query]);
      const result2: any = await this.connection.execute(q2, ["No", query]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  };
  getcoughreturn = async (anc: number) => {
    const query = anc || 2;
    try {
      const q = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.cough = ? AND rv.anc = ?
      `;
      const q2 = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.cough = ? AND rv.anc = ?
      `;

      const result: any = await this.connection.execute(q, ["Yes", query]);
      const result2: any = await this.connection.execute(q2, ["No", query]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  };
  getpalpitationsreturn = async (anc: number) => {
    const query = anc || 2;
    try {
      const q = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.palpitation = ? AND rv.anc = ?
      `;
      const q2 = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.palpitation = ? AND rv.anc = ?
      `;

      const result: any = await this.connection.execute(q, ["Yes", query]);
      const result2: any = await this.connection.execute(q2, ["No", query]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  };
  getseveretirednessreturn = async (anc: number) => {
    const query = anc || 2;
    try {
      const q = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.severetirednesss = ? AND rv.anc = ?
      `;
      const q2 = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.severetirednesss = ? AND rv.anc = ?
      `;

      const result: any = await this.connection.execute(q, ["Yes", query]);
      const result2: any = await this.connection.execute(q2, ["No", query]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  };
  getdifficultylyingflatreturn = async (anc: number) => {
    const query = anc || 2;
    try {
      const q = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.difficultylyingflat = ? AND rv.anc = ?
      `;
      const q2 = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.difficultylyingflat = ? AND rv.anc = ?
      `;

      const result: any = await this.connection.execute(q, ["Yes", query]);
      const result2: any = await this.connection.execute(q2, ["No", query]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  };
  getdizzinessreturn = async (anc: number) => {
    const query = anc || 2;
    try {
      const q = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.dizziness = ? AND rv.anc = ?
      `;
      const q2 = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.dizziness = ? AND rv.anc = ?
      `;

      const result: any = await this.connection.execute(q, ["Yes", query]);
      const result2: any = await this.connection.execute(q2, ["No", query]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  };
  getconvulsionsreturn = async (anc: number) => {
    const query = anc || 2;
    try {
      const q = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.convulsions = ? AND rv.anc = ?
      `;
      const q2 = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.convulsions = ? AND rv.anc = ?
      `;

      const result: any = await this.connection.execute(q, ["Yes", query]);
      const result2: any = await this.connection.execute(q2, ["No", query]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  };
  getabdominalpainreturn = async (anc: number) => {
    const query = anc || 2;
    try {
      const q = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.severeabdominalpain = ? AND rv.anc = ?
      `;
      const q2 = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.severeabdominalpain = ? AND rv.anc = ?
      `;

      const result: any = await this.connection.execute(q, ["Yes", query]);
      const result2: any = await this.connection.execute(q2, ["No", query]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  };
  getpainwithurinationreturn = async (anc: number) => {
    const query = anc || 2;
    try {
      const q = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.urinarypain = ? AND rv.anc = ?
      `;
      const q2 = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.urinarypain = ? AND rv.anc = ?
      `;

      const result: any = await this.connection.execute(q, ["Yes", query]);
      const result2: any = await this.connection.execute(q2, ["No", query]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  };
  async getbloodinurinereturn(anc: number) {
    const query = anc || 2;
    try {
      const q = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.bloodinurine = ? AND rv.anc = ?
      `;
      const q2 = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.bloodinurine = ? AND rv.anc = ?
      `;

      const result: any = await this.connection.execute(q, ["Yes", query]);
      const result2: any = await this.connection.execute(q2, ["No", query]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async getvaginaldischargereturn(anc: number) {
    const query = anc || 2;
    try {
      const q = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.vaginaldischarge = ? AND rv.anc = ?
      `;
      const q2 = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.vaginaldischarge = ? AND rv.anc = ?
      `;

      const result: any = await this.connection.execute(q, ["Yes", query]);
      const result2: any = await this.connection.execute(q2, ["No", query]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async getdeeppelvicpainreturn(anc: number) {
    const query = anc || 2;

    try {
      const q = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.painduringsex = ? AND rv.anc = ?
      `;
      const q2 = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.painduringsex = ? AND rv.anc = ?
      `;

      const result: any = await this.connection.execute(q, ["Yes", query]);
      const result2: any = await this.connection.execute(q2, ["No", query]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async getsyphilisreturn(anc: number) {
    const query = anc || 2;
    try {
      const q = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.syphillis = ? AND rv.anc = ?
      `;
      const q2 = `SELECT
      pi.*,
      p.*
      FROM
      returnvisit rv
      JOIN
          patients p ON rv.patient_id = p.id
      JOIN
          personalinformation pi ON p.personalinformation_id = pi.id
      WHERE
        rv.syphillis = ? AND rv.anc = ?
      `;

      const result: any = await this.connection.execute(q, ["Yes", query]);
      const result2: any = await this.connection.execute(q2, ["No", query]);
      return {
        yes: result[0].length,
        no: result2[0].length,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
