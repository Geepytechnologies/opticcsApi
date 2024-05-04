import { Request, Response } from "express";
import { SmsService } from "../../services/sms.service";
import logger from "../../logger";
import db from "../../config/db";
import { UserService } from "../../services/user.service";

class SmScontroller {
  scheduledvisitSMSforPatient = async (req: Request, res: Response) => {
    const smsService = new SmsService();

    try {
      const response = await smsService.scheduledvisitSMSforPatient(req.body);
      const body = await response.json();
      if (!response.ok) {
        return res.status(response.status).json({
          error: "An error occurred while sending OTP.",
        });
      }

      res.status(response.status).json({
        statusCode: response.status.toString(),
        result: body,
      });
    } catch (error) {
      logger.error("Error:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  };
  scheduledvisitmissedSMSforPatient = async (req: Request, res: Response) => {
    const smsService = new SmsService();

    try {
      const response = await smsService.scheduledvisitmissedSMSforPatient(
        req.body
      );
      const body = await response.json();
      if (!response.ok) {
        return res.status(response.status).json({
          error: "An error occurred while sending OTP.",
        });
      }

      res.status(response.status).json({
        statusCode: response.status.toString(),
        result: body,
      });
    } catch (error) {
      logger.error("Error:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  };
  scheduledvisitreminderSMSforPatient = async (req: Request, res: Response) => {
    const smsService = new SmsService();

    try {
      const response = await smsService.scheduledvisitreminderSMSforPatient(
        req.body
      );
      const body = await response.json();
      if (!response.ok) {
        return res.status(response.status).json({
          error: "An error occurred while sending OTP.",
        });
      }

      res.status(response.status).json({
        statusCode: response.status.toString(),
        result: body,
      });
    } catch (error) {
      logger.error("Error:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  };
  sendOtp = async (req: Request, res: Response) => {
    const smsService = new SmsService();

    try {
      const response = await smsService.sendOtp(req.body);

      const body = await response.json();
      if (!response.ok) {
        return res.status(response.status).json({
          error: "An error occurred while sending OTP.",
        });
      }

      res.status(response.status).json({
        statusCode: response.status.toString(),
        result: body,
      });
    } catch (error) {
      logger.error("Error:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  };

  voiceOtp = async (req: Request, res: Response) => {
    const smsService = new SmsService();

    try {
      const response = await smsService.voiceOtp(req.body);

      const body = await response.json();
      if (!response.ok) {
        return res.status(response.status).json({
          error: "An error occurred while sending OTP.",
        });
      }

      res.status(response.status).json({
        statusCode: response.status.toString(),
        result: body,
      });
    } catch (error) {
      logger.error("Error:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  };

  confirmOtp = async (req: Request, res: Response) => {
    const smsService = new SmsService();

    try {
      const response = await smsService.confirmOtp(req.body);
      const result = await response.json();

      res.status(response.status).json({
        statusCode: response.status.toString(),
        result: result,
      });
    } catch (error) {
      logger.error(error);
      res.status(500).json({
        statusCode: "500",
        error: "Error confirming OTP.",
      });
    }
  };

  sendPasswordresetOtp = async (req: Request, res: Response) => {
    const smsService = new SmsService();
    const connection = await db.getConnection();
    const userService = new UserService(connection);
    const { mobile_number } = req.body;

    const checkuserExists = async () => {
      try {
        const user = await userService.getUserByPhone(mobile_number);
        if (Array.isArray(user)) {
          if (!user.length)
            return { statusCode: "404", message: "User not found" };
          if (user.length) return { statusCode: "200", message: "User exists" };
        }
      } catch (error: any) {
        throw new Error(error);
      } finally {
        if (connection) {
          connection.release();
        }
      }
    };

    const userExists = await checkuserExists();

    if (userExists && userExists.statusCode === "200") {
      try {
        const response = await smsService.sendPasswordresetOtp(req.body);
        const body = await response.json();
        if (!response.ok) {
          return res.status(response.status).json({
            error: "An error occurred while sending OTP.",
          });
        }

        res.status(response.status).json({
          statusCode: response.status.toString(),
          result: body,
        });
      } catch (error) {
        res.status(500).json({ error: "An error occurred while sending OTP." });
      }
    } else {
      if (userExists) {
        res.status(+userExists.statusCode).json(userExists);
      }
    }
  };

  confirmpasswordresetOtp = async (req: Request, res: Response) => {
    const smsService = new SmsService();

    try {
      const response = await smsService.confirmpasswordresetOtp(req.body);
      const body = await response.json();

      res.status(response.status).json({
        statusCode: response.status.toString(),
        result: body,
      });
    } catch (error) {
      res.status(500).json({
        statusCode: "500",
        error: "Error confirming OTP.",
      });
    }
  };
}

export default new SmScontroller();
