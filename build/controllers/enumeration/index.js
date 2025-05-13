"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../logger"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const json2csv_1 = require("json2csv");
class EnumerationController {
    constructor() {
        this.createEnumerator = (req, res) => __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("createEnumerator");
            const { name, phone, gender, state, lga, ward, settlement, password } = req.body;
            console.log(settlement);
            try {
                // Get the last enumerator's userID
                const lastEnumerator = yield prisma.enumerator.findFirst({
                    orderBy: { createdAt: "desc" },
                });
                // Generate the new userID
                let nextNumber = 1;
                if (lastEnumerator) {
                    const lastNumber = parseInt(lastEnumerator.userID.split("/")[2], 10);
                    nextNumber = lastNumber + 1;
                }
                const userID = `IANC/EM/${String(nextNumber).padStart(4, "0")}`;
                const salt = bcryptjs_1.default.genSaltSync(10);
                const hashedpassword = bcryptjs_1.default.hashSync(password, salt);
                // Create the enumerator
                const enumerator = yield prisma.enumerator.create({
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
            }
            catch (error) {
                logger_1.default.error("Error creating enumerator:", error);
                res
                    .status(500)
                    .json({ statusCode: 500, message: "Something went wrong" });
            }
        });
        this.getEnumerator = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const enumerator = yield prisma.enumerator.findUnique({
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
            }
            catch (error) {
                console.error("Error fetching enumerator:", error);
                res
                    .status(500)
                    .json({ statusCode: 500, message: "Something went wrong" });
            }
        });
        this.loginEnumerator = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { enumeratorId } = req.body;
            try {
                // Find the enumerator by userID
                const enumerator = yield prisma.enumerator.findFirst({
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
                const accessToken = jsonwebtoken_1.default.sign({ id: enumerator.userID }, process.env.ACCESS_SECRET, {
                    expiresIn: "1d",
                });
                // Generate Refresh Token
                const refreshToken = jsonwebtoken_1.default.sign({ id: enumerator.userID }, process.env.REFRESH_SECRET, {
                    expiresIn: "7d", // Refresh token expires in 7 days
                });
                const { password } = enumerator, others = __rest(enumerator, ["password"]);
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
            }
            catch (error) {
                console.error("Error logging in:", error);
                res
                    .status(500)
                    .json({ statusCode: 500, message: "Something went wrong" });
            }
        });
        this.getAllEnumerators = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { state, lga, ward, settlement, createdAt, pageNumber = "1", pageSize = "20", } = req.query;
            const filters = {};
            if (state)
                filters.state = state;
            if (lga)
                filters.lga = lga;
            if (ward)
                filters.ward = ward;
            if (settlement)
                filters.settlement = settlement;
            if (createdAt)
                filters.createdAt = { gte: new Date(createdAt) };
            const pageNum = parseInt(pageNumber, 10);
            const pageSz = parseInt(pageSize, 10);
            try {
                // Get total count of enumerators matching filters
                const totalCount = yield prisma.enumerator.count({
                    where: filters,
                });
                // Fetch enumerators with pagination
                const enumerators = yield prisma.enumerator.findMany({
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
            }
            catch (error) {
                console.error("Error fetching enumerators:", error);
                res
                    .status(500)
                    .json({ statusCode: 500, message: "Something went wrong" });
            }
        });
        this.toggleEnumeratorStatus = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const enumerator = yield prisma.enumerator.findUnique({
                    where: { id: parseInt(id) },
                });
                if (!enumerator) {
                    return res
                        .status(404)
                        .json({ statusCode: 404, message: "Enumerator not found" });
                }
                const updatedEnumerator = yield prisma.enumerator.update({
                    where: { id: parseInt(id) },
                    data: { isActive: !enumerator.isActive },
                });
                res.status(200).json({
                    statusCode: 200,
                    message: "Successful",
                    result: updatedEnumerator,
                });
            }
            catch (error) {
                console.error("Error toggling enumerator status:", error);
                res
                    .status(500)
                    .json({ statusCode: 500, message: "Something went wrong" });
            }
        });
        this.deleteEnumerator = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield prisma.enumerator.delete({
                    where: { id: parseInt(id) },
                });
                res.status(204).json({
                    statusCode: 204,
                    message: "Enumerator deleted successfully",
                });
            }
            catch (error) {
                console.error("Error deleting enumerator:", error);
                res
                    .status(500)
                    .json({ statusCode: 500, message: "Something went wrong" });
            }
        });
        this.createEnumerationData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const UserId = req.user.id;
            console.log("Enumeration data: ", req.body);
            const { clientNumber, firstName, middleName, surName, phone, alternatePhone, address, state, lga, age, ward, settlement, servingHealthcareFacility, gravidity, parity, lmp, edd, ega, attendedAncVisit, numberOfAncVisits, ancVisits, receivedTetanusVaccination, tetanusVaccinationReceived, latitude, longitude, } = req.body;
            // const lmp = new Date(req.body.lmp).toISOString();
            // const edd = new Date(req.body.edd).toISOString();
            // const ega = new Date(req.body.ega).toISOString();
            try {
                const enumerationData = yield prisma.enumerationData.create({
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
                        ancVisits: {
                            create: ancVisits,
                        },
                        tetanusVaccinationReceived: {
                            create: tetanusVaccinationReceived,
                        },
                    },
                    include: {
                        ancVisits: true,
                        tetanusVaccinationReceived: true,
                    },
                });
                res.status(201).json({
                    statusCode: 201,
                    message: "Enumeration data created successfully!",
                    data: enumerationData,
                });
            }
            catch (error) {
                logger_1.default.error("error in creating enumeration data: ", error);
                console.log("error in creating enumeration data: ", error);
                res.status(500).json({
                    statusCode: 500,
                    message: "Failed to create enumeration data",
                    error: error.message,
                });
            }
        });
        this.getAllEnumerationData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { dateCreated, state, lga, ward, settlement, pageNumber = 1, pageSize = 20, } = req.query;
            const skip = (Number(pageNumber) - 1) * Number(pageSize);
            const take = Number(pageSize);
            const filters = {};
            // if (dateCreated) {
            //   filters.createdAt = {
            //     gte: new Date(`${dateCreated}T00:00:00.000Z`),
            //   };
            // }
            if (state)
                filters.state = state;
            if (lga)
                filters.lga = lga;
            if (ward)
                filters.ward = ward;
            if (settlement)
                filters.settlement = settlement;
            try {
                const enumerationData = yield prisma.enumerationData.findMany({
                    where: filters,
                    skip,
                    take,
                    orderBy: {
                        createdAt: "desc",
                    },
                    include: {
                        ancVisits: true,
                        tetanusVaccinationReceived: true,
                    },
                });
                const totalCount = yield prisma.enumerationData.count({ where: filters });
                res.status(200).json({
                    statusCode: 200,
                    message: "Enumeration data retrieved successfully!",
                    data: enumerationData,
                    pagination: {
                        pageNumber: Number(pageNumber),
                        pageSize: Number(pageSize),
                        totalCount,
                        totalPages: Math.ceil(totalCount / Number(pageSize)),
                    },
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    statusCode: 500,
                    message: "Failed to retrieve enumeration data",
                    error: error.message,
                });
            }
        });
        this.downloadEnumerationData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const enumerationData = yield prisma.enumerationData.findMany({
                    orderBy: {
                        createdAt: "desc",
                    },
                    include: {
                        ancVisits: true,
                        tetanusVaccinationReceived: true,
                    },
                });
                const csv = (0, json2csv_1.parse)(enumerationData);
                // Set the response headers to trigger file download
                res.header("Content-Type", "text/csv");
                res.attachment("EnumerationData.csv");
                res.setHeader("Content-Disposition", "attachment; filename=EnumerationData.csv");
                res.status(200).send(csv);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    statusCode: 500,
                    message: "Failed to download enumeration data",
                    error: error.message,
                });
            }
        });
        this.getEnumerationDataById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const enumerationData = yield prisma.enumerationData.findUnique({
                    where: { id: Number(id) },
                    include: {
                        ancVisits: true,
                        tetanusVaccinationReceived: true,
                    },
                });
                if (!enumerationData) {
                    return res.status(404).json({
                        statusCode: 404,
                        message: "Enumeration data not found",
                    });
                }
                res.status(200).json({
                    statusCode: 200,
                    message: "Enumeration data retrieved successfully!",
                    data: enumerationData,
                });
            }
            catch (error) {
                res.status(500).json({
                    statusCode: 500,
                    message: "Failed to retrieve enumeration data",
                    error: error.message,
                });
            }
        });
        this.getAllStates = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const states = yield prisma.enumerationSettlements.findMany({
                    select: {
                        state: true,
                    },
                    distinct: ["state"],
                });
                res.status(200).json(states.map((s) => s.state));
            }
            catch (error) {
                console.error("Error fetching states:", error);
                res.status(500).json({ error: "Failed to fetch states" });
            }
        });
        this.getAllLgas = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //const { state } = req.params;
            const { state, pageNumber = 1, pageSize = 10 } = req.query;
            try {
                const lgas = yield prisma.enumerationSettlements.findMany({
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
            }
            catch (error) {
                console.error("Error fetching LGAs:", error);
                res.status(500).json({ error: "Failed to fetch LGAs" });
            }
        });
        this.getAllWards = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { state, lga, pageNumber = 1, pageSize = 10 } = req.query;
            try {
                const wards = yield prisma.enumerationSettlements.findMany({
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
            }
            catch (error) {
                console.error("Error fetching wards:", error);
                res.status(500).json({ error: "Failed to fetch wards" });
            }
        });
        this.getActiveStates = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { state, lga, ward, date } = req.query;
                const { pageNumber = 1, pageSize = 10 } = req.query;
                // Build the filter condition dynamically
                const filters = {};
                if (state)
                    filters.state = state;
                if (lga)
                    filters.lga = lga;
                if (ward)
                    filters.ward = ward;
                if (date) {
                    filters.createdAt = {
                        gte: new Date(date),
                    };
                }
                const states = yield prisma.enumerationSettlements.findMany({
                    where: Object.keys(filters).length ? filters : undefined,
                });
                const totalCount = yield prisma.enumerationSettlements.count({
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
            }
            catch (error) {
                console.error("Error fetching active states:", error);
                res.status(500).json({ message: "Error fetching active states" });
            }
        });
        this.getAllSettlements = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { state, lga, ward } = req.query;
            try {
                const settlements = yield prisma.enumerationSettlements.findMany({
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
            }
            catch (error) {
                console.error("Error fetching settlements:", error);
                res.status(500).json({ error: "Failed to fetch settlements" });
            }
        });
        this.getTotalSubmissions = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const totalSubmissions = yield prisma.enumerationData.count();
                const totalActiveStates = yield prisma.enumerationSettlements
                    .groupBy({
                    by: ["state"],
                })
                    .then((states) => states.length);
                const totalClientNumber = yield prisma.enumerationData
                    .groupBy({
                    by: ["clientNumber"],
                })
                    .then((clientNumber) => clientNumber.length);
                res
                    .status(200)
                    .json({ totalSubmissions, totalActiveStates, totalClientNumber });
            }
            catch (error) {
                console.error("Error fetching total submissions:", error);
                res.status(500).json({ error: "Failed to fetch widgetdata" });
            }
        });
        this.getActivityLog = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const user = req.user.id;
            try {
                const totalSubmissions = yield prisma.enumerationData.findMany({
                    where: {
                        submittedById: user,
                    },
                });
                const numberOfWomen = yield prisma.enumerationData.aggregate({
                    where: {
                        submittedById: user,
                    },
                    _sum: {
                        numberOfAncVisits: true,
                    },
                });
                const total = (_a = numberOfWomen._sum.numberOfAncVisits) !== null && _a !== void 0 ? _a : 0;
                const totalClientNumber = yield prisma.enumerationData
                    .groupBy({
                    by: ["clientNumber"],
                })
                    .then((clientNumber) => clientNumber.length);
                res.status(200).json({
                    totalSubmissions: totalSubmissions.length,
                    numberOfAncVisits: total,
                    numberOfWomen: totalSubmissions.length,
                });
            }
            catch (error) {
                console.error("Error fetching activity log:", error);
                res.status(500).json({ error: "Failed to fetch activity log" });
            }
        });
        this.getLoginCredentials = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { state, lga, ward, settlement, createdAt, pageNumber = "1", pageSize = "20", } = req.query;
            const filters = {};
            if (state)
                filters.state = state;
            if (lga)
                filters.lga = lga;
            if (ward)
                filters.ward = ward;
            if (settlement)
                filters.settlement = settlement;
            if (createdAt)
                filters.createdAt = { gte: new Date(createdAt) };
            const pageNum = parseInt(pageNumber, 10);
            const pageSz = parseInt(pageSize, 10);
            try {
                const totalCount = yield prisma.enumerator.count({
                    where: filters,
                });
                const enumerators = yield prisma.enumerator.findMany({
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
            }
            catch (error) {
                console.error("Error fetching enumerator credentials:", error);
                res.status(500).json({
                    statusCode: 500,
                    message: "An error occurred while retrieving enumerator credentials",
                });
            }
        });
    }
}
exports.default = new EnumerationController();
