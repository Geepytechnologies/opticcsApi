import { Request, Response } from "express";
import db from "../../config/db";
import logger from "../../logger";
import { PatientService } from "../../services/patients.service";
import { patientRepository } from "../../repositories/PatientRepository";
import { DeliveryreportRepository } from "../../repositories/DeliveryreportRepository";
import { DeliveryreportService } from "../../services/deliveryreport.service";
import { TestresultRepository } from "../../repositories/TestresultRepository";
import { TestresultService } from "../../services/testresult.service";
import { ANCCompletionError } from "../../utils/error";

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
  };
}

class PatientController {
  createpatient = async (req: Request, res: Response) => {
    const connection = await db.getConnection();
    const patientRepo = new patientRepository(connection);
    const patientservice = new PatientService(patientRepo, connection);
    try {
      await connection.beginTransaction();
      const patientID = await patientservice.createPatientFirstvisit(req.body);
      console.log(patientID, "patient creation");
      await connection.commit();

      const newpatientrecord: any =
        await patientservice.getnewlycreatedpatientrecord(patientID);
      const result = newpatientrecord[0];
      console.log(result[0] + " " + "newpatientrecord[0]");

      logger.info("Patient created successfully");
      res.status(201).json({
        statusCode: "201",
        message: "successful",
        result,
      });
    } catch (error: any) {
      console.log("error from creating patient", error);
      if (error instanceof ANCCompletionError) {
        res.status(500).json({
          statusCode: "403",
          error: error.message,
        });
        logger.error("ANC Completion Error:", error.message);
      }
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
    const patientservice = new PatientService(patientRepo, connection);
    try {
      const result = await patientservice.createPatientReturnvisit(
        req.body,
        healthpersonnel_id
      );
      const returnvisitid = result[0];
      res.status(201).json({
        statusCode: "201",
        message: "created successfully",
        result: {
          returnvisitid,
        },
      });
    } catch (err: any) {
      res.status(500).json({
        statusCode: "500",
        message: err.message || "Failed to create return visit for patient",
        error: err.message,
      });
      console.error(err);
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };
  deleteAPatient = async (req: any, res: Response) => {
    const { id } = req.params;
    const connection = await db.getConnection();
    const patientRepo = new patientRepository(connection);
    const patientservice = new PatientService(patientRepo, connection);
    try {
      const result = await patientservice.deleteAPatient(id);
      res.status(200).json(result[0]);
    } catch (error) {
      logger.error(error);
      res.status(500).json(error);
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };
  getAllPatientsAndHealthworker = async (req: any, res: Response) => {
    const page = req.query.page || 1;
    const pageSize = 20;
    const offset = (page - 1) * pageSize;
    const connection = await db.getConnection();
    const patientRepo = new patientRepository(connection);
    const patientservice = new PatientService(patientRepo, connection);
    try {
      const result = await patientservice.getAllPatientsAndHealthworker(
        req.query,
        pageSize,
        offset
      );

      res.status(200).json({
        statusCode: "200",
        result: result.result,
        count: result.count,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };
  createdeliveryreport = async (req: Request, res: Response) => {
    const connection = await db.getConnection();
    const deliveryReportRepo = new DeliveryreportRepository(connection);
    const deliveryReportservice = new DeliveryreportService(deliveryReportRepo);

    try {
      const result = await deliveryReportservice.createdeliveryreport(req.body);
      res.status(200).json({ statusCode: "200", result: result });
    } catch (error) {
      res.status(500).json({ statusCode: "500", message: error });
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };

  getAllDeliveryreports = async (req: Request, res: Response) => {
    const connection = await db.getConnection();
    const deliveryReportRepo = new DeliveryreportRepository(connection);
    const deliveryReportservice = new DeliveryreportService(deliveryReportRepo);
    try {
      const result = await deliveryReportservice.getAllDeliveryreports();
      res.status(200).json({ statusCode: "200", result: result });
    } catch (error) {
      res.status(500).json({ statusCode: "500", message: error });
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };
  getAllDeliveryreportsByAWorker = async (req: any, res: Response) => {
    const connection = await db.getConnection();
    const deliveryReportRepo = new DeliveryreportRepository(connection);
    const deliveryReportservice = new DeliveryreportService(deliveryReportRepo);
    const { id } = req.user;
    try {
      const result = deliveryReportservice.getAllDeliveryreportsByAWorker(id);
      res.status(200).json({ statusCode: "200", result: result });
    } catch (error) {
      res.status(500).json({ statusCode: "500", message: error });
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };
  getAPatientsDeliveryreport = async (req: Request, res: Response) => {
    const connection = await db.getConnection();
    const deliveryReportRepo = new DeliveryreportRepository(connection);
    const deliveryReportservice = new DeliveryreportService(deliveryReportRepo);
    const patient_id: any = req.query.patient_id;
    try {
      const result = await deliveryReportservice.getAPatientsDeliveryreport(
        patient_id
      );
      res.status(200).json({ statusCode: "200", result: result });
    } catch (error) {
      res.status(500).json({ statusCode: "500", message: error });
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };
  createTest = async (req: Request, res: Response) => {
    const connection = await db.getConnection();
    const testResultRepo = new TestresultRepository(connection);
    const testResultservice = new TestresultService(testResultRepo);
    try {
      const result = await testResultservice.createTest(req.body);
      res.status(200).json({ statusCode: "200", result: result });
    } catch (error) {
      res.status(500).json({ statusCode: "500", message: error });
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };
}

export default new PatientController();
