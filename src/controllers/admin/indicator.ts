import { Request, Response } from "express";
import { IndicatorRepository } from "../../repositories/IndicatorRepository";
import db from "../../config/db";
import { IndicatorService } from "../../services/indicator.service";

class IndicatorController {
  intermediateResult1 = async (req: any, res: Response) => {
    const state = req.query.state || "";
    const lga = req.query.lga || "";
    const healthfacility = req.query.healthfacility || "";
    const from = req.query.from || "";
    const to = req.query.to || "";
    const connection = await db.getConnection();
    const indicatorRepo = new IndicatorRepository(connection);
    const indicatorService = new IndicatorService(indicatorRepo);
    try {
      const result = await indicatorService.intermediateResult1(
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
  intermediateResult2 = async (req: Request, res: Response) => {
    try {
    } catch (error) {}
  };
  intermediateResult3 = async (req: Request, res: Response) => {
    try {
    } catch (error) {}
  };
  activity1 = async (req: Request, res: Response) => {
    try {
    } catch (error) {}
  };
  activity2 = async (req: Request, res: Response) => {
    try {
    } catch (error) {}
  };
}

export default new IndicatorController();
