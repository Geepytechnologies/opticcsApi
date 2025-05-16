import { Request, Response } from "express";
import logger from "../../logger";
import { Filters, QueryParams } from "../../interfaces/enumeration.interface";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { parse } from "json2csv";
import { SmsService } from "../../services/sms.service";

class EnumerationController {
  createEnumerator = async (req: Request, res: Response) => {
    logger.info("createEnumerator");
    const { name, phone, gender, state, lga, ward, settlement, password } =
      req.body;
    console.log(settlement);
    try {
      // Get the last enumerator's userID
      const lastEnumerator = await prisma.enumerator.findFirst({
        orderBy: { createdAt: "desc" },
      });

      // Generate the new userID
      let nextNumber = 1;
      if (lastEnumerator) {
        const lastNumber = parseInt(lastEnumerator.userID.split("/")[2], 10);
        nextNumber = lastNumber + 1;
      }
      const userID = `IANC/EM/${String(nextNumber).padStart(4, "0")}`;
      const salt = bcrypt.genSaltSync(10);
      const hashedpassword = bcrypt.hashSync(password, salt);
      // Create the enumerator
      const enumerator = await prisma.enumerator.create({
        data: {
          name,
          phone,
          gender,
          state,
          lga,
          ward,
          settlement: JSON.stringify(settlement),
          password,
          userID,
        },
      });

      res.status(201).json({
        statusCode: 201,
        message: "Enumerator created",
        result: enumerator,
      });
    } catch (error) {
      logger.error("Error creating enumerator:", error);
      res
        .status(500)
        .json({ statusCode: 500, message: "Something went wrong" });
    }
  };
  getEnumerator = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const enumerator = await prisma.enumerator.findUnique({
        where: { id: parseInt(id) },
      });

      if (!enumerator) {
        return res
          .status(404)
          .json({ statusCode: 404, result: "Enumerator not found" });
      }

      res
        .status(200)
        .json({ statusCode: 200, message: "successful", result: enumerator });
    } catch (error) {
      console.error("Error fetching enumerator:", error);
      res
        .status(500)
        .json({ statusCode: 500, message: "Something went wrong" });
    }
  };
  loginEnumerator = async (req: Request, res: Response) => {
    const { enumeratorId } = req.body;

    try {
      // Find the enumerator by userID
      const enumerator = await prisma.enumerator.findFirst({
        where: { userID: enumeratorId },
      });

      // If enumerator doesn't exist, return 401 Unauthorized
      if (!enumerator) {
        return res
          .status(401)
          .json({ statusCode: 401, message: "Invalid credentials" });
      }

      // Compare the provided password with the hashed password in the database
      const isPasswordValid = req.body.password == enumerator.password;
      // If password is invalid, return 401 Unauthorized
      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ statusCode: 401, message: "Invalid credentials" });
      }

      // Generate Access Token
      const accessToken = jwt.sign(
        { id: enumerator.userID },
        process.env.ACCESS_SECRET!,
        {
          expiresIn: "1d",
        }
      );

      // Generate Refresh Token
      const refreshToken = jwt.sign(
        { id: enumerator.userID },
        process.env.REFRESH_SECRET!,
        {
          expiresIn: "7d", // Refresh token expires in 7 days
        }
      );
      const { password, ...others } = enumerator;
      // Return success response with tokens and enumerator data (excluding password)
      res.status(200).json({
        statusCode: 200,
        message: "Login successful",
        result: {
          enumerator: others,
          accessToken,
          refreshToken,
        },
      });
    } catch (error) {
      console.error("Error logging in:", error);
      res
        .status(500)
        .json({ statusCode: 500, message: "Something went wrong" });
    }
  };

  getAllEnumerators = async (req: Request, res: Response) => {
    const {
      state,
      lga,
      ward,
      settlement,
      createdAt,
      pageNumber = "1",
      pageSize = "20",
    }: QueryParams = req.query;

    const filters: Filters = {};
    if (state) filters.state = state;
    if (lga) filters.lga = lga;
    if (ward) filters.ward = ward;
    if (settlement) filters.settlement = settlement;
    if (createdAt) filters.createdAt = { gte: new Date(createdAt) };

    const pageNum = parseInt(pageNumber, 10);
    const pageSz = parseInt(pageSize, 10);

    try {
      // Get total count of enumerators matching filters
      const totalCount = await prisma.enumerator.count({
        where: filters,
      });

      // Fetch enumerators with pagination
      const enumerators = await prisma.enumerator.findMany({
        where: filters,
        orderBy: {
          createdAt: "desc", // Ensures the latest records appear first
        },
        skip: (pageNum - 1) * pageSz,
        take: pageSz,
      });
      // Calculate total pages
      const totalPages = Math.ceil(totalCount / pageSz);

      res.status(200).json({
        statusCode: 200,
        message: "successful",
        result: enumerators,
        pagination: {
          totalRecords: totalCount,
          totalPages,
          currentPage: pageNum,
          pageSize: pageSz,
        },
      });
    } catch (error) {
      console.error("Error fetching enumerators:", error);
      res
        .status(500)
        .json({ statusCode: 500, message: "Something went wrong" });
    }
  };

  toggleEnumeratorStatus = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const enumerator = await prisma.enumerator.findUnique({
        where: { id: parseInt(id) },
      });

      if (!enumerator) {
        return res
          .status(404)
          .json({ statusCode: 404, message: "Enumerator not found" });
      }

      const updatedEnumerator = await prisma.enumerator.update({
        where: { id: parseInt(id) },
        data: { isActive: !enumerator.isActive },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Successful",
        result: updatedEnumerator,
      });
    } catch (error) {
      console.error("Error toggling enumerator status:", error);
      res
        .status(500)
        .json({ statusCode: 500, message: "Something went wrong" });
    }
  };
  deleteEnumerator = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      await prisma.enumerator.delete({
        where: { id: parseInt(id) },
      });

      res.status(204).json({
        statusCode: 204,
        message: "Enumerator deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting enumerator:", error);
      res
        .status(500)
        .json({ statusCode: 500, message: "Something went wrong" });
    }
  };
  createenumerationdata = async (req: any, res: Response) => {
    const UserId = req.user.id;
    console.log("Enumeration data: ", req.body);
    const {
      clientNumber,
      firstName,
      middleName,
      surName,
      phone,
      alternatePhone,
      address,
      state,
      lga,
      age,
      ward,
      settlement,
      servingHealthcareFacility,
      gravidity,
      parity,
      lmp,
      edd,
      ega,
      attendedAncVisit,
      numberOfAncVisits,
      ancVisits,
      receivedTetanusVaccination,
      tetanusVaccinationReceived,
      latitude,
      longitude,
    } = req.body;
    // const lmp = new Date(req.body.lmp).toISOString();
    // const edd = new Date(req.body.edd).toISOString();
    // const ega = new Date(req.body.ega).toISOString();
    try {
      const enumerationdata = await prisma.enumerationdata.create({
        data: {
          clientNumber,
          firstName,
          middleName,
          surName,
          phone,
          alternatePhone,
          address,
          age,
          state,
          lga,
          ward,
          settlement,
          servingHealthcareFacility,
          gravidity,
          parity,
          lmp,
          edd,
          ega,
          attendedAncVisit,
          numberOfAncVisits,
          receivedTetanusVaccination,
          latitude,
          longitude,
          submittedById: UserId,
          enumerationancvisitdata: {
            create: ancVisits,
          },
          enumerationttdata: {
            create: tetanusVaccinationReceived,
          },
        },
        include: {
          enumerationancvisitdata: true,
          enumerationttdata: true,
        },
      });

      res.status(201).json({
        statusCode: 201,
        message: "Enumeration data created successfully!",
        data: enumerationdata,
      });
    } catch (error: any) {
      logger.error("error in creating enumeration data: ", error);
      console.log("error in creating enumeration data: ", error);
      res.status(500).json({
        statusCode: 500,
        message: "Failed to create enumeration data",
        error: error.message,
      });
    }
  };
  getAllenumerationdata = async (req: Request, res: Response) => {
    const {
      dateCreated,
      state,
      lga,
      ward,
      settlement,
      pageNumber = 1,
      pageSize = 20,
    } = req.query;

    const skip = (Number(pageNumber) - 1) * Number(pageSize);
    const take = Number(pageSize);

    const filters: any = {};

    // if (dateCreated) {
    //   filters.createdAt = {
    //     gte: new Date(`${dateCreated}T00:00:00.000Z`),
    //   };
    // }

    if (state) filters.state = state;
    if (lga) filters.lga = lga;
    if (ward) filters.ward = ward;
    if (settlement) filters.settlement = settlement;

    try {
      const enumerationdata = await prisma.enumerationdata.findMany({
        where: filters,

        skip,
        take,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          enumerationancvisitdata: true,
          enumerationttdata: true,
        },
      });

      const totalCount = await prisma.enumerationdata.count({ where: filters });

      res.status(200).json({
        statusCode: 200,
        message: "Enumeration data retrieved successfully!",
        data: enumerationdata,
        pagination: {
          pageNumber: Number(pageNumber),
          pageSize: Number(pageSize),
          totalCount,
          totalPages: Math.ceil(totalCount / Number(pageSize)),
        },
      });
    } catch (error: any) {
      console.log(error);
      res.status(500).json({
        statusCode: 500,
        message: "Failed to retrieve enumeration data",
        error: error.message,
      });
    }
  };
  downloadenumerationdata = async (req: Request, res: Response) => {
    try {
      const enumerationdata = await prisma.enumerationdata.findMany({
        orderBy: {
          createdAt: "desc",
        },
        include: {
          enumerationancvisitdata: true,
          enumerationttdata: true,
        },
      });
      const csv = parse(enumerationdata);

      // Set the response headers to trigger file download
      res.header("Content-Type", "text/csv");
      res.attachment("enumerationdata.csv");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=enumerationdata.csv"
      );

      res.status(200).send(csv);
    } catch (error: any) {
      console.log(error);
      res.status(500).json({
        statusCode: 500,
        message: "Failed to download enumeration data",
        error: error.message,
      });
    }
  };
  getenumerationdataById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const enumerationdata = await prisma.enumerationdata.findUnique({
        where: { id: Number(id) },
        include: {
          enumerationancvisitdata: true,
          enumerationttdata: true,
        },
      });

      if (!enumerationdata) {
        return res.status(404).json({
          statusCode: 404,

          message: "Enumeration data not found",
        });
      }

      res.status(200).json({
        statusCode: 200,
        message: "Enumeration data retrieved successfully!",
        data: enumerationdata,
      });
    } catch (error: any) {
      res.status(500).json({
        statusCode: 500,
        message: "Failed to retrieve enumeration data",
        error: error.message,
      });
    }
  };

  getAllStates = async (req: Request, res: Response) => {
    try {
      const states = await prisma.enumerationsettlements.findMany({
        select: {
          state: true,
        },
        distinct: ["state"],
      });
      res.status(200).json(states.map((s) => s.state));
    } catch (error) {
      console.error("Error fetching states:", error);
      res.status(500).json({ error: "Failed to fetch states" });
    }
  };

  getAllLgas = async (req: Request, res: Response) => {
    //const { state } = req.params;
    const { state, pageNumber = 1, pageSize = 10 } = req.query;

    try {
      const lgas = await prisma.enumerationsettlements.findMany({
        where: {
          state: String(state),
        },
        select: {
          lga: true,
        },
        distinct: ["lga"],
        skip: (Number(pageNumber) - 1) * Number(pageSize),
        take: Number(pageSize),
      });
      res.status(200).json(lgas.map((l) => l.lga));
    } catch (error) {
      console.error("Error fetching LGAs:", error);
      res.status(500).json({ error: "Failed to fetch LGAs" });
    }
  };
  getAllWards = async (req: Request, res: Response) => {
    const { state, lga, pageNumber = 1, pageSize = 10 } = req.query;

    try {
      const wards = await prisma.enumerationsettlements.findMany({
        where: {
          state: String(state),
          lga: String(lga),
        },
        select: {
          ward: true,
        },
        distinct: ["ward"],
        skip: (Number(pageNumber) - 1) * Number(pageSize),
        take: Number(pageSize),
      });
      res.status(200).json(wards.map((w) => w.ward));
    } catch (error) {
      console.error("Error fetching wards:", error);
      res.status(500).json({ error: "Failed to fetch wards" });
    }
  };

  getActiveStates = async (req: Request, res: Response) => {
    try {
      const { state, lga, ward, date } = req.query;
      const { pageNumber = 1, pageSize = 10 } = req.query;

      // Build the filter condition dynamically
      const filters: any = {};

      if (state) filters.state = state;
      if (lga) filters.lga = lga;
      if (ward) filters.ward = ward;
      if (date) {
        filters.createdAt = {
          gte: new Date(date as string),
        };
      }

      const states = await prisma.enumerationsettlements.findMany({
        where: Object.keys(filters).length ? filters : undefined,
      });
      const totalCount = await prisma.enumerationsettlements.count({
        where: filters,
      });

      res.status(200).json({
        statusCode: 200,
        message: "Active states retrieved successfully!",
        result: states,
        pagination: {
          pageNumber: Number(pageNumber),
          pageSize: Number(pageSize),
          totalCount,
          totalPages: Math.ceil(totalCount / Number(pageSize)),
        },
      });
    } catch (error) {
      console.error("Error fetching active states:", error);
      res.status(500).json({ message: "Error fetching active states" });
    }
  };

  getAllSettlements = async (req: Request, res: Response) => {
    const { state, lga, ward } = req.query;

    try {
      const settlements = await prisma.enumerationsettlements.findMany({
        where: {
          state: String(state),
          lga: String(lga),
          ward: String(ward),
        },
        select: {
          settlement: true,
        },
        distinct: ["settlement"],
      });
      res.status(200).json(settlements.map((s) => s.settlement));
    } catch (error) {
      console.error("Error fetching settlements:", error);
      res.status(500).json({ error: "Failed to fetch settlements" });
    }
  };
  getTotalSubmissions = async (req: Request, res: Response) => {
    try {
      const totalSubmissions = await prisma.enumerationdata.count();
      const totalActiveStates = await prisma.enumerationsettlements
        .groupBy({
          by: ["state"],
        })
        .then((states) => states.length);
      const totalClientNumber = await prisma.enumerationdata
        .groupBy({
          by: ["clientNumber"],
        })
        .then((clientNumber) => clientNumber.length);
      res
        .status(200)
        .json({ totalSubmissions, totalActiveStates, totalClientNumber });
    } catch (error) {
      console.error("Error fetching total submissions:", error);
      res.status(500).json({ error: "Failed to fetch widgetdata" });
    }
  };
  getActivityLog = async (req: any, res: Response) => {
    const user = req.user.id;
    try {
      const totalSubmissions = await prisma.enumerationdata.findMany({
        where: {
          submittedById: user,
        },
      });
      const numberOfWomen = await prisma.enumerationdata.aggregate({
        where: {
          submittedById: user,
        },
        _sum: {
          numberOfAncVisits: true,
        },
      });
      const total = numberOfWomen._sum.numberOfAncVisits ?? 0;

      const totalClientNumber = await prisma.enumerationdata
        .groupBy({
          by: ["clientNumber"],
        })
        .then((clientNumber) => clientNumber.length);
      res.status(200).json({
        totalSubmissions: totalSubmissions.length,
        numberOfAncVisits: total,
        numberOfWomen: totalSubmissions.length,
      });
    } catch (error) {
      console.error("Error fetching activity log:", error);
      res.status(500).json({ error: "Failed to fetch activity log" });
    }
  };
  getLoginCredentials = async (req: Request, res: Response) => {
    const {
      state,
      lga,
      ward,
      settlement,
      createdAt,
      pageNumber = "1",
      pageSize = "20",
    }: QueryParams = req.query;

    const filters: Filters = {};
    if (state) filters.state = state;
    if (lga) filters.lga = lga;
    if (ward) filters.ward = ward;
    if (settlement) filters.settlement = settlement;

    if (createdAt) filters.createdAt = { gte: new Date(createdAt) };

    const pageNum = parseInt(pageNumber, 10);
    const pageSz = parseInt(pageSize, 10);
    try {
      const totalCount = await prisma.enumerator.count({
        where: filters,
      });
      const enumerators = await prisma.enumerator.findMany({
        where: filters,
        orderBy: {
          createdAt: "desc", // Ensures the latest records appear first
        },
        skip: (pageNum - 1) * pageSz,
        take: pageSz,
        select: {
          name: true,
          userID: true,
          password: true,
        },
      });

      const credentials = enumerators.map(({ name, userID, password }) => ({
        name,
        userID,
        password,
      }));
      const totalPages = Math.ceil(totalCount / pageSz);
      res.status(200).json({
        statusCode: 200,
        message: "Enumerator credentials retrieved successfully!",
        result: credentials,
        pagination: {
          totalRecords: totalCount,
          totalPages,
          currentPage: pageNum,
          pageSize: pageSz,
        },
      });
    } catch (error) {
      console.error("Error fetching enumerator credentials:", error);
      res.status(500).json({
        statusCode: 500,
        message: "An error occurred while retrieving enumerator credentials",
      });
    }
  };
  verifyPhoneNumberAvailability = async (req: Request, res: Response) => {
    const service = new SmsService();
    const { phone } = req.body;
    try {
      const response = await service.verifyPhone({ phone: phone });
      const isValid = response.result[0].status === 200;
      res.status(200).json({
        statusCode: 200,
        message: "successfully",
        result: isValid,
      });
    } catch (error) {
      console.error("Failed to verify phone number:", error);
      res.status(500).json({ error: "Failed to verify phone number" });
    }
  };
}

export default new EnumerationController();
