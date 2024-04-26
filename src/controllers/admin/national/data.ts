import { PoolConnection } from "mysql2/promise";
import db from "../../../config/db";
import logger from "../../../logger";
import { NationalRepository } from "../../../repositories/NationalRepository";
import { NationalService } from "../../../services/national.service";
import { Request, Response } from "express";
import { PatientService } from "../../../services/patients.service";
import { patientRepository } from "../../../repositories/PatientRepository";

class NationalDataController {
  nationalreturnvisitdata = async (req: Request, res: Response) => {
    const connection = await db.getConnection();
    const nationalRepo = new NationalRepository(connection);
    const nationalservice = new NationalService(nationalRepo);
    const anc: any = req.query.anc;
    try {
      const result = await nationalservice.nationalreturnvisitdata(anc);
      console.log(result);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };

  numberofwomenwith4visits = async (req: any, res: Response) => {
    const state = req.query.state || "";
    const lga = req.query.lga || "";
    const healthfacility = req.query.healthfacility || "";
    const from = req.query.from || "";
    const to = req.query.to || "";
    console.log({
      state: state,
      lga: lga,
      healthfacility: healthfacility,
      from: from,
      to: to,
    });
    const connection = await db.getConnection();
    const patientRepo = new patientRepository(connection);
    const patientservice = new PatientService(patientRepo, connection);
    try {
      const result = await patientservice.numberofwomenwith4visits(
        state,
        lga,
        healthfacility,
        from,
        to
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };

  nationalgeneraldata = async (req: Request, res: Response) => {
    const connection = await db.getConnection();
    const repo = new NationalRepository(connection);
    const service = new NationalService(repo);

    try {
      const result = await service.nationalgeneraldata(req.query);

      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };
  nationalIndicatorOutcomedata = async (req: Request, res: Response) => {
    const connection = await db.getConnection();
    const repo = new NationalRepository(connection);
    const service = new NationalService(repo);

    try {
      const result = await service.nationalgeneraldata(req.query);

      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };
  nationalIntermediateResult1data = async (req: Request, res: Response) => {
    const connection = await db.getConnection();
    const repo = new NationalRepository(connection);
    const service = new NationalService(repo);

    try {
      const result = await service.nationalgeneraldata(req.query);

      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };

  getvisitdates = async (req: Request, res: Response) => {
    let connection;
    const { id } = req.params;
    try {
      connection = await db.getConnection();
      const q = `SELECT firstvisit_date,id
      FROM firstvisit
      WHERE patient_id = ?`;
      const q2 = `SELECT returnvisit_date,id
      FROM returnvisit
      WHERE patient_id = ?
      `;
      const [firstvisit] = await connection.execute(q, [id]);
      const [returnvisit] = await connection.execute(q2, [id]);
      res.status(200).json({ firstvisit, returnvisit });
    } catch (error) {
      res.status(500).json(error);
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };

  nationalscheduledata = async (req: Request, res: Response) => {
    const connection = await db.getConnection();
    try {
      const q = `SELECT * FROM schedule;`;
      const q2 = `SELECT * FROM schedule WHERE missed = ?;`;
      const q3 = `SELECT * FROM schedule WHERE completed = ?;`;
      const q4 = `SELECT * FROM schedule WHERE upcoming = ?;`;
      const q5 = `SELECT * FROM schedule WHERE flagged = ?;`;
      const [number]: any = await connection.execute(q);
      const [missed]: any = await connection.execute(q2, [1]);
      const [completed]: any = await connection.execute(q3, [1]);
      const [upcoming]: any = await connection.execute(q4, [1]);
      const [flagged]: any = await connection.execute(q5, [1]);

      res.status(200).json({
        number: number.length,
        missed: missed.length,
        completed: completed.length,
        upcoming: upcoming.length,
        flagged: flagged.length,
      });
    } catch (error) {
      res.status(500).json(error);
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };

  //testresult
  nationaltestdata = async (req: Request, res: Response) => {
    const gethiv = async () => {
      const connection = await db.getConnection();
      try {
        const q = `SELECT * FROM testresult WHERE hiv = ?
        `;
        const q2 = `SELECT * FROM testresult WHERE hiv = ?
        `;

        const result: any = await connection.execute(q, ["+ve"]);
        const result2: any = await connection.execute(q2, ["-ve"]);
        return {
          positive: result[0].length,
          negative: result2[0].length,
        };
      } catch (error) {
        connection.release();
        logger.error(error);
      } finally {
        if (connection) {
          connection.release();
        }
      }
    };
    const getmalariarapid = async () => {
      const connection = await db.getConnection();
      try {
        const q = `SELECT * FROM testresult WHERE malariarapid = ?
        `;
        const q2 = `SELECT * FROM testresult WHERE malariarapid = ?
        `;

        const result: any = await connection.execute(q, ["+ve"]);
        const result2: any = await connection.execute(q2, ["-ve"]);
        return {
          positive: result[0].length,
          negative: result2[0].length,
        };
      } catch (error) {
      } finally {
        if (connection) {
          connection.release();
        }
      }
    };
    try {
      const hiv = await gethiv();
      const malariarapid = await getmalariarapid();

      res.status(200).json({
        hiv: hiv,
        malariarapid: malariarapid,
      });
    } catch (error) {
      logger.error(error);
      res.status(500).json(error);
    }
  };
}

export default new NationalDataController();
