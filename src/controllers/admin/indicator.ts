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
      const intermediateResult1A = await indicatorService.intermediateResult1A(
        state,
        lga,
        healthfacility,
        from,
        to
      );
      const intermediateResult1B = await indicatorService.intermediateResult1B(
        state,
        lga,
        healthfacility,
        from,
        to
      );
      const intermediateResult1C = await indicatorService.intermediateResult1C(
        state,
        lga,
        healthfacility,
        from,
        to
      );
      const intermediateResult1D = await indicatorService.intermediateResult1D(
        state,
        lga,
        healthfacility,
        from,
        to
      );
      const intermediateResult1E = await indicatorService.intermediateResult1E(
        state,
        lga,
        healthfacility,
        from,
        to
      );
      const intermediateResult1F = await indicatorService.intermediateResult1F(
        state,
        lga,
        healthfacility,
        from,
        to
      );
      res.status(200).json({
        intermediateResult1A,
        intermediateResult1B,
        intermediateResult1C,
        intermediateResult1D,
        intermediateResult1E,
        intermediateResult1F,
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
  intermediateResult2 = async (req: any, res: Response) => {
    const state = req.query.state || "";
    const lga = req.query.lga || "";
    const healthfacility = req.query.healthfacility || "";
    const from = req.query.from || "";
    const to = req.query.to || "";
    const connection = await db.getConnection();
    const indicatorRepo = new IndicatorRepository(connection);
    const indicatorService = new IndicatorService(indicatorRepo);
    try {
      const intermediateResult2A = await indicatorService.intermediateResult2A(
        state,
        lga,
        healthfacility,
        from,
        to
      );
      const intermediateResult2B = await indicatorService.intermediateResult2B(
        state,
        lga,
        healthfacility,
        from,
        to
      );
      const intermediateResult2C = await indicatorService.intermediateResult2C(
        state,
        lga,
        healthfacility,
        from,
        to
      );
      const intermediateResult2D = await indicatorService.intermediateResult2D(
        state,
        lga,
        healthfacility,
        from,
        to
      );
      const intermediateResult2E = await indicatorService.intermediateResult2E(
        state,
        lga,
        healthfacility,
        from,
        to
      );
      const intermediateResult2F = await indicatorService.intermediateResult2F(
        state,
        lga,
        healthfacility,
        from,
        to
      );
      const intermediateResult2G = await indicatorService.intermediateResult2G(
        state,
        lga,
        healthfacility,
        from,
        to
      );
      res.status(200).json({
        intermediateResult2A,
        intermediateResult2B,
        intermediateResult2C,
        intermediateResult2D,
        intermediateResult2E,
        intermediateResult2F,
        intermediateResult2G,
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
