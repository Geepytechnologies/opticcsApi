import { Request, Response } from "express";
import db from "../config/db";
import { WardRepository } from "../repositories/WardRepsitory";
import { WardService } from "../services/ward.service";
import { wardvalidation } from "../validations/ward";

class WardController {
  create = async (req: Request, res: Response) => {
    const connection = await db.getConnection();
    const wardRepo = new WardRepository(connection);
    const wardservice = new WardService(wardRepo);
    const { error } = wardvalidation.create(req.body);
    if (error) {
      return res.status(400).json({
        statusCode: "400",
        message: error.details[0].message.toUpperCase(),
      });
    }
    try {
      const result = await wardservice.create(req.body);
      res.status(201).json({ statusCode: "201", result: result });
    } catch (error) {
      res
        .status(500)
        .json({ statusCode: "500", message: "Error creating ward" });
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };
  getAllWards = async (req: Request, res: Response) => {
    const connection = await db.getConnection();
    const wardRepo = new WardRepository(connection);
    const wardservice = new WardService(wardRepo);

    try {
      const result = await wardservice.getAllWards();
      res.status(200).json({ statusCode: "200", result: result });
    } catch (error) {
      res
        .status(500)
        .json({ statusCode: "500", message: "Error getting wards" });
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };
  getAllWardsForState = async (req: Request, res: Response) => {
    const connection = await db.getConnection();
    const wardRepo = new WardRepository(connection);
    const wardservice = new WardService(wardRepo);
    const state: any = req.query.state;

    try {
      const result = await wardservice.getAllWardsForState(state);
      res.status(200).json({ statusCode: "200", result: result });
    } catch (error) {
      res
        .status(500)
        .json({ statusCode: "500", message: "Error getting wards for state" });
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };
  getAllWardsForLGA = async (req: Request, res: Response) => {
    const connection = await db.getConnection();
    const wardRepo = new WardRepository(connection);
    const wardservice = new WardService(wardRepo);
    const lga: any = req.query.lga;
    const state: any = req.query.state;

    try {
      const result = await wardservice.getAllWardsForLga(state, lga);
      res.status(200).json({ statusCode: "200", result: result });
    } catch (error) {
      res
        .status(500)
        .json({ statusCode: "500", message: "Error getting wards for lga" });
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };
}

export default new WardController();
