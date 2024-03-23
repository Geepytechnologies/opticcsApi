import { Request, Response } from "express";
import db from "../../config/db";
import logger from "../../logger";
import { PatientService } from "../../services/patients.service";
import { patientRepository } from "../../repositories/PatientRepository";

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
  };
}

class PatientController {
  createpatient = async (req: Request, res: Response) => {
    const connection = await db.getConnection();
    const patientRepo = new patientRepository(connection);
    const patientservice = new PatientService(patientRepo);
    try {
      await connection.beginTransaction();
      const patientID = await patientservice.createPatientFirstvisit(req.body);
      await connection.commit();
      const newpatientrecord =
        await patientservice.getnewlycreatedpatientrecord(patientID);
      const result = newpatientrecord[0];
      logger.info("Patient created successfully");
      res.status(201).json({
        statusCode: "201",
        message: "successful",
        result,
      });
    } catch (error: any) {
      console.log("error from creating patient", error);
      const errorResponse = {
        statusCode: error.statusCode || 500,
        error: { ...error },
      };
      if (connection) {
        try {
          await connection.rollback();
          logger.warn("creating patient connection rolled back");
        } catch (rollbackError) {
          console.error("Rollback error:", rollbackError);
        }
      }
      res.status(500).json({
        statusCode: error.statusCode || 500,
        error: error.message,
      });
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };
  createPatientEveryVisit = async (req: any, res: Response) => {
    const connection = await db.getConnection();
    const healthpersonnel_id = req.user.id;
    const patientRepo = new patientRepository(connection);
    const patientservice = new PatientService(patientRepo);
    try {
      const result = await patientservice.createPatientReturnvisit(req.body);
      const returnvisitid = result[0];
      res.status(201).json({
        statusCode: "201",
        message: "created successfully",
        result: {
          returnvisitid,
        },
      });
    } catch (err) {
      res.status(500).json({
        statusCode: "500",
        message: "Failed to create return visit for patient",
        error: err,
      });
      console.error(err);
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };
}

export default new PatientController();
