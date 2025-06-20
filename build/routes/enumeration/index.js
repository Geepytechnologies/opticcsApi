"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const enumeration_1 = __importDefault(require("../../controllers/enumeration"));
const verifyToken_1 = require("../../middlewares/verifyToken");
const validate_1 = require("../../middlewares/validate");
const enumeration_2 = require("../../validations/enumeration");
const router = express_1.default.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     EnumerationAncVisitData:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         anc:
 *           type: string
 *           example: "ANC Visit 1"
 *         date:
 *           type: string
 *           format: date-time
 *           example: "2023-10-01T12:00:00Z"
 *         enumerationDataId:
 *           type: integer
 *           example: 1
 *
 *     EnumerationTTData:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "TT Vaccine 1"
 *         date:
 *           type: string
 *           format: date-time
 *           example: "2023-10-01T12:00:00Z"
 *         enumerationDataId:
 *           type: integer
 *           example: 1
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     EnumerationData:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         clientNumber:
 *           type: string
 *           example: "CL12345"
 *         firstName:
 *           type: string
 *           example: "John"
 *         middleName:
 *           type: string
 *           example: "Doe"
 *         surName:
 *           type: string
 *           example: "Smith"
 *         phone:
 *           type: string
 *           example: "+1234567890"
 *         alternatePhone:
 *           type: string
 *           example: "+0987654321"
 *         age:
 *           type: number
 *           example: 20
 *         address:
 *           type: string
 *           example: "123 Main St"
 *         state:
 *           type: string
 *           example: "Lagos"
 *         lga:
 *           type: string
 *           example: "Ikeja"
 *         ward:
 *           type: string
 *           example: "Ward A"
 *         settlement:
 *           type: string
 *           example: "Settlement 1"
 *         servingHealthcareFacility:
 *           type: string
 *           example: "General Hospital"
 *         gravidity:
 *           type: string
 *           example: "1"
 *         parity:
 *           type: string
 *           example: "0"
 *         lmp:
 *           type: string
 *           example: "2023-01-01"
 *         edd:
 *           type: string
 *           example: "2023-10-01"
 *         ega:
 *           type: string
 *           example: "30 weeks"
 *         attendedAncVisit:
 *           type: string
 *           example: "Yes"
 *         numberOfAncVisits:
 *           type: integer
 *           example: 3
 *         receivedTetanusVaccination:
 *           type: string
 *           example: "Yes"
 *         latitude:
 *           type: number
 *           example: 6.5244
 *         longitude:
 *           type: number
 *           example: 3.3792
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-10-01T12:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-10-01T12:00:00Z"
 *         ancVisits:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/EnumerationAncVisitData"
 *         tetanusVaccinationReceived:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/EnumerationTTData"
 */
/**
 * @swagger
 * /api/enumeration/enumerators:
 *   post:
 *     summary: Create a new enumerator
 *     tags: [Enumerator]
 *     description: Create a new enumerator with a unique userID in the format IANC/EM/0001. Requires Authorization header
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               gender:
 *                 type: string
 *               state:
 *                 type: string
 *               lga:
 *                 type: string
 *               ward:
 *                 type: string
 *               settlement:
 *                 type: array
 *               healthFacility:
 *                 type: array
 *               password:
 *                 type: string
 *             example:
 *               name: John Doe
 *               phone: 1234567890
 *               gender: Male
 *               state: Lagos
 *               lga: Ikeja
 *               ward: Ward 1
 *               settlement: ["Settlement A", "Settlement B"]
 *               healthFacility: ["Health Facility A", "Health Facility B"]
 *               password: password123
 *     responses:
 *       201:
 *         description: Enumerator created successfully
 *       500:
 *         description: Something went wrong
 */
router.post("/enumerators", enumeration_1.default.createEnumerator);
/**
 * @swagger
 * /api/enumeration/enumerators:
 *   put:
 *     summary: Update an enumerator
 *     tags: [Enumerator]
 *     description: Update an enumerator with a unique userID in the format IANC/EM/0001. Requires Authorization header
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               gender:
 *                 type: string
 *               state:
 *                 type: string
 *               lga:
 *                 type: string
 *               ward:
 *                 type: string
 *               settlement:
 *                 type: array
 *               healthfacility:
 *                 type: array
 *               password:
 *                 type: string
 *             example:
 *               name: John Doe
 *               phone: 1234567890
 *               gender: Male
 *               state: Lagos
 *               lga: Ikeja
 *               ward: Ward 1
 *               settlement: ["Settlement A", "Settlement B"]
 *               healthfacility: ["Health Facility A", "Health Facility B"]
 *               password: password123
 *     responses:
 *       200:
 *         description: Enumerator updated successfully
 *       500:
 *         description: Something went wrong
 */
router.put("/enumerators", verifyToken_1.verifyToken, enumeration_1.default.updateEnumerator);
/**
 * @swagger
 * /api/enumeration/enumerators/{id}:
 *   get:
 *     summary: Get an enumerator by ID
 *     tags: [Enumerator]
 *     description: Retrieve an enumerator by their unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the enumerator
 *     responses:
 *       200:
 *         description: Enumerator retrieved successfully
 *       404:
 *         description: Enumerator not found
 *       500:
 *         description: Something went wrong
 */
router.get("/enumerators/:id", enumeration_1.default.getEnumerator);
/**
 * @swagger
 * /api/enumeration/enumerators-credentials:
 *   get:
 *     summary: Get an enumerator credentials
 *     tags: [Enumerator]
 *     parameters:
 *       - in: query
 *         name: state
 *         schema:
 *           type: string
 *         description: Filter by state
 *       - in: query
 *         name: lga
 *         schema:
 *           type: string
 *         description: Filter by LGA
 *       - in: query
 *         name: ward
 *         schema:
 *           type: string
 *         description: Filter by ward
 *       - in: query
 *         name: settlement
 *         schema:
 *           type: string
 *         description: Filter by settlement
 *       - in: query
 *         name: createdAt
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by creation date
 *       - in: query
 *         name: pageNumber
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Number of items per page
 *     description: Retrieve an enumerator credential.
 *     responses:
 *       200:
 *         description: Enumerator retrieved successfully
 *       404:
 *         description: Enumerator not found
 *       500:
 *         description: Something went wrong
 */
router.get("/enumerators-credentials", enumeration_1.default.getLoginCredentials);
/**
 * @swagger
 * /api/enumeration/enumerators/{id}:
 *   get:
 *     summary: Get an enumerator by ID
 *     tags: [Enumerator]
 *     description: Retrieve an enumerator by their unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the enumerator
 *     responses:
 *       200:
 *         description: Enumerator retrieved successfully
 *       404:
 *         description: Enumerator not found
 *       500:
 *         description: Something went wrong
 */
router.get("/enumerators/:id", enumeration_1.default.getEnumerator);
/**
 * @swagger
 * /api/enumeration/enumerators/login:
 *   post:
 *     summary: Log in an enumerator
 *     tags: [Enumerator]
 *     description: Authenticate an enumerator using their phone and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               enumeratorId:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               enumeratorId: IANC/EM/0001
 *               password: password123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Something went wrong
 */
router.post("/enumerators/login", enumeration_1.default.loginEnumerator);
/**
 * @swagger
 * /api/enumeration/enumerators:
 *   get:
 *     summary: Get all enumerators
 *     tags: [Enumerator]
 *     description: Retrieve a list of enumerators with optional filtering and pagination.
 *     parameters:
 *       - in: query
 *         name: state
 *         schema:
 *           type: string
 *         description: Filter by state
 *       - in: query
 *         name: lga
 *         schema:
 *           type: string
 *         description: Filter by LGA
 *       - in: query
 *         name: ward
 *         schema:
 *           type: string
 *         description: Filter by ward
 *       - in: query
 *         name: settlement
 *         schema:
 *           type: string
 *         description: Filter by settlement
 *       - in: query
 *         name: createdAt
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by creation date
 *       - in: query
 *         name: pageNumber
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of enumerators retrieved successfully
 *       500:
 *         description: Something went wrong
 */
router.get("/enumerators", enumeration_1.default.getAllEnumerators);
/**
 * @swagger
 * /api/enumeration/enumerators/{id}/toggle-status:
 *   patch:
 *     summary: Toggle enumerator status
 *     tags: [Enumerator]
 *     description: Activate or deactivate an enumerator by toggling their `isActive` status.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the enumerator
 *     responses:
 *       200:
 *         description: Enumerator status updated successfully
 *       404:
 *         description: Enumerator not found
 *       500:
 *         description: Something went wrong
 */
router.patch("/enumerators/:id/toggle-status", enumeration_1.default.toggleEnumeratorStatus);
/**
 * @swagger
 * /api/enumeration/enumerators/{id}:
 *   delete:
 *     summary: Delete an enumerator
 *     tags: [Enumerator]
 *     description: Delete an enumerator by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the enumerator
 *     responses:
 *       204:
 *         description: Enumerator deleted successfully
 *       500:
 *         description: Something went wrong
 */
router.delete("/enumerators/:id", enumeration_1.default.deleteEnumerator);
/**
 * @swagger
 * /api/enumeration/data:
 *   post:
 *     summary: Create a new enumeration data record
 *     tags: [Enumeration Data]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientNumber:
 *                 type: string
 *               firstName:
 *                 type: string
 *               middleName:
 *                 type: string
 *               surName:
 *                 type: string
 *               phone:
 *                 type: string
 *               age:
 *                 type: number
 *               alternatePhone:
 *                 type: string
 *               address:
 *                 type: string
 *               state:
 *                 type: string
 *               lga:
 *                 type: string
 *               ward:
 *                 type: string
 *               settlement:
 *                 type: string
 *               servingHealthcareFacility:
 *                 type: string
 *               gravidity:
 *                 type: string
 *               parity:
 *                 type: string
 *               lmp:
 *                 type: string
 *               edd:
 *                 type: string
 *               ega:
 *                 type: string
 *               attendedAncVisit:
 *                 type: string
 *               numberOfAncVisits:
 *                 type: integer
 *               ancVisits:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     anc:
 *                       type: string
 *                     date:
 *                       type: string
 *                       format: date-time
 *               receivedTetanusVaccination:
 *                 type: string
 *               tetanusVaccinationReceived:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     date:
 *                       type: string
 *                       format: date-time
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *     responses:
 *       201:
 *         description: Enumeration data created successfully
 *       500:
 *         description: Failed to create enumeration data
 */
router.post("/data", verifyToken_1.verifyToken, enumeration_1.default.createenumerationdata);
/**
 * @swagger
 * /api/enumeration/data:
 *   patch:
 *     summary: Update existing enumeration data by client number
 *     tags: [Enumeration Data]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - clientNumber
 *             properties:
 *               clientNumber:
 *                 type: string
 *                 description: Unique identifier for the enumeration record
 *               firstName:
 *                 type: string
 *               middleName:
 *                 type: string
 *               surName:
 *                 type: string
 *               phone:
 *                 type: string
 *               age:
 *                 type: number
 *               alternatePhone:
 *                 type: string
 *               address:
 *                 type: string
 *               state:
 *                 type: string
 *               lga:
 *                 type: string
 *               ward:
 *                 type: string
 *               settlement:
 *                 type: string
 *               servingHealthcareFacility:
 *                 type: string
 *               gravidity:
 *                 type: string
 *               parity:
 *                 type: string
 *               lmp:
 *                 type: string
 *               edd:
 *                 type: string
 *               ega:
 *                 type: string
 *               attendedAncVisit:
 *                 type: string
 *               numberOfAncVisits:
 *                 type: integer
 *               ancVisits:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     anc:
 *                       type: string
 *                     date:
 *                       type: string
 *                       format: date-time
 *               receivedTetanusVaccination:
 *                 type: string
 *               tetanusVaccinationReceived:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     date:
 *                       type: string
 *                       format: date-time
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *     responses:
 *       200:
 *         description: Enumeration data updated successfully
 *       404:
 *         description: Enumeration data not found
 *       500:
 *         description: Failed to update enumeration data
 */
router.patch("/data", verifyToken_1.verifyToken, (0, validate_1.validateBody)(enumeration_2.EnumerationUpdateSchema), enumeration_1.default.updateEnumerationData);
/**
 * @swagger
 * /api/enumeration/data:
 *   get:
 *     summary: Get all enumeration data with optional filters and pagination
 *     tags: [Enumeration Data]
 *     parameters:
 *       - in: query
 *         name: dateCreated
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by creation date (e.g., "2023-10-01")
 *       - in: query
 *         name: state
 *         schema:
 *           type: string
 *         description: Filter by state
 *       - in: query
 *         name: lga
 *         schema:
 *           type: string
 *         description: Filter by Local Government Area (LGA)
 *       - in: query
 *         name: ward
 *         schema:
 *           type: string
 *         description: Filter by ward
 *       - in: query
 *         name: settlement
 *         schema:
 *           type: string
 *         description: Filter by settlement
 *       - in: query
 *         name: pageNumber
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Enumeration data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Enumeration data retrieved successfully!"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/EnumerationData"
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     pageNumber:
 *                       type: integer
 *                       example: 1
 *                     pageSize:
 *                       type: integer
 *                       example: 20
 *                     totalCount:
 *                       type: integer
 *                       example: 100
 *                     totalPages:
 *                       type: integer
 *                       example: 5
 *       500:
 *         description: Failed to retrieve enumeration data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to retrieve enumeration data"
 *                 error:
 *                   type: string
 *                   example: "Error message details"
 */
router.get("/data", enumeration_1.default.getAllenumerationdata);
/**
 * @swagger
 * /api/enumeration/enumerator/data:
 *   get:
 *     summary: Get all enumeration data for enumerator
 *     tags: [Enumeration Data]
 *     parameters:
 *       - in: query
 *         name: dateCreated
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by creation date (e.g., "2023-10-01")
 *       - in: query
 *         name: state
 *         schema:
 *           type: string
 *         description: Filter by state
 *       - in: query
 *         name: lga
 *         schema:
 *           type: string
 *         description: Filter by Local Government Area (LGA)
 *       - in: query
 *         name: ward
 *         schema:
 *           type: string
 *         description: Filter by ward
 *       - in: query
 *         name: settlement
 *         schema:
 *           type: string
 *         description: Filter by settlement
 *       - in: query
 *         name: pageNumber
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Enumeration data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Enumeration data retrieved successfully!"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/EnumerationData"
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     pageNumber:
 *                       type: integer
 *                       example: 1
 *                     pageSize:
 *                       type: integer
 *                       example: 20
 *                     totalCount:
 *                       type: integer
 *                       example: 100
 *                     totalPages:
 *                       type: integer
 *                       example: 5
 *       500:
 *         description: Failed to retrieve enumeration data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to retrieve enumeration data"
 *                 error:
 *                   type: string
 *                   example: "Error message details"
 */
router.get("/enumerator/data", verifyToken_1.verifyToken, enumeration_1.default.getAllEnumeratorData);
/**
 * @swagger
 * /api/enumeration/data/{id}:
 *   get:
 *     summary: Get enumeration data by ID
 *     tags: [Enumeration Data]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the enumeration data to retrieve
 *     responses:
 *       200:
 *         description: Enumeration data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Enumeration data retrieved successfully!"
 *                 data:
 *                   $ref: "#/components/schemas/EnumerationData"
 *       404:
 *         description: Enumeration data not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Enumeration data not found"
 *       500:
 *         description: Failed to retrieve enumeration data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to retrieve enumeration data"
 *                 error:
 *                   type: string
 *                   example: "Error message details"
 */
router.get("/data/:id", enumeration_1.default.getenumerationdataById);
/**
 * @swagger
 * /api/enumeration/states:
 *   get:
 *     summary: Get all unique states
 *     tags: [Settlements]
 *     description: Retrieve a list of all unique states from the EnumerationSettlements table.
 *     responses:
 *       200:
 *         description: A list of unique states
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       500:
 *         description: Internal server error
 */
router.get("/states", enumeration_1.default.getAllStates);
/**
 * @swagger
 * /api/enumeration/lgas:
 *   get:
 *     summary: Get all LGAs for a specific state
 *     tags: [Settlements]
 *     description: Retrieve a list of all unique LGAs for a given state, with pagination.
 *     parameters:
 *       - in: query
 *         name: state
 *         required: true
 *         schema:
 *           type: string
 *         description: The state to filter by
 *       - in: query
 *         name: pageNumber
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number for pagination
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of items per page
 *     responses:
 *       200:
 *         description: A list of unique LGAs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       500:
 *         description: Internal server error
 */
router.get("/lgas", enumeration_1.default.getAllLgas);
/**
 * @swagger
 * /api/enumeration/wards:
 *   get:
 *     summary: Get all wards for a specific state and LGA
 *     tags: [Settlements]
 *     description: Retrieve a list of all unique wards for a given state and LGA, with pagination.
 *     parameters:
 *       - in: query
 *         name: state
 *         required: true
 *         schema:
 *           type: string
 *         description: The state to filter by
 *       - in: query
 *         name: lga
 *         required: true
 *         schema:
 *           type: string
 *         description: The LGA to filter by
 *       - in: query
 *         name: pageNumber
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number for pagination
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of items per page
 *     responses:
 *       200:
 *         description: A list of unique wards
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       500:
 *         description: Internal server error
 */
router.get("/wards", enumeration_1.default.getAllWards);
/**
 * @swagger
 * /api/enumeration/settlements:
 *   get:
 *     summary: Get all settlements for a specific state, LGA, and ward
 *     tags: [Settlements]
 *     description: Retrieve a list of all unique settlements for a given state, LGA, and ward.
 *     parameters:
 *       - in: query
 *         name: state
 *         required: true
 *         schema:
 *           type: string
 *         description: The state to filter by
 *       - in: query
 *         name: lga
 *         required: true
 *         schema:
 *           type: string
 *         description: The LGA to filter by
 *       - in: query
 *         name: ward
 *         required: true
 *         schema:
 *           type: string
 *         description: The ward to filter by
 *     responses:
 *       200:
 *         description: A list of unique settlements
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       500:
 *         description: Internal server error
 */
router.get("/settlements", enumeration_1.default.getAllSettlements);
/**
 * @swagger
 * /api/enumeration/activestates:
 *   get:
 *     summary: Get all active states
 *     tags: [Settlements]
 *     description: Retrieve a list of all active states.
 *     parameters:
 *       - in: path
 *         name: state
 *         required: true
 *         schema:
 *           type: string
 *         description: The state to filter by
 *       - in: path
 *         name: lga
 *         required: true
 *         schema:
 *           type: string
 *         description: The LGA to filter by
 *       - in: path
 *         name: ward
 *         required: true
 *         schema:
 *           type: string
 *         description: The ward to filter by
 *     responses:
 *       200:
 *         description: A list of active states
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       500:
 *         description: Internal server error
 */
router.get("/activeStates", enumeration_1.default.getActiveStates);
/**
 * @swagger
 * /api/enumeration/analytics/widgetdata:
 *   get:
 *     summary: Get webUi Enumeration widget data
 *     tags: [Enumeration Analytics]
 *     description: Retrieve specific widget data.
 *     responses:
 *       200:
 *         description: An object of widget data
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               items:
 *                 type: string
 *       500:
 *         description: Internal server error
 */
router.get("/analytics/widgetdata", enumeration_1.default.getTotalSubmissions);
/**
 * @swagger
 * /api/enumeration/activitylog:
 *   get:
 *     summary: Get Enumeration activity log
 *     tags: [Enumeration Analytics]
 *     description: Retrieve activity log.
 *     responses:
 *       200:
 *         description: Requires Authorization header
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               items:
 *                 type: string
 *       500:
 *         description: Internal server error
 */
router.get("/activitylog", verifyToken_1.verifyToken, enumeration_1.default.getActivityLog);
/**
 * @swagger
 * /api/enumeration/data/download:
 *   get:
 *     summary: Download Enumeration data
 *     tags: [Enumeration Analytics]
 *     description: Download Enumeration Data.
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               items:
 *                 type: string
 *       500:
 *         description: Internal server error
 */
router.get("/download/data", enumeration_1.default.downloadenumerationdata);
/**
 * @swagger
 * /api/enumeration/service-delivery:
 *   post:
 *     summary: Create Enumeration Service Delivery
 *     tags: [Enumeration Data]
 *     description: Creates a new service delivery record including optional ANC, Labour, PNC, and Other visit data.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientNumber:
 *                 type: string
 *               nameOfHealthFacility:
 *                 type: string
 *               howclientcametoseekcareatfacility:
 *                 type: string
 *               purposeOfVisit:
 *                 type: string
 *               anc:
 *                 type: object
 *                 properties:
 *                   dateOfVisit:
 *                     type: string
 *                     format: date-time
 *                   ancVisit:
 *                     type: string
 *                   servicesProvided:
 *                     type: array
 *                     items:
 *                       type: string
 *                   commoditiesDispensed:
 *                     type: array
 *                     items:
 *                       type: string
 *                   outcomeOfVisit:
 *                     type: array
 *                     items:
 *                       type: string
 *                   dateOfNextAppointment:
 *                     type: string
 *                     format: date-time
 *               labour:
 *                 type: object
 *                 properties:
 *                   dateOfVisit:
 *                     type: string
 *                     format: date-time
 *                   commoditiesDispensed:
 *                     type: array
 *                     items:
 *                       type: string
 *                   otherCommodities:
 *                     type: string
 *                   receivedMamaKit:
 *                     type: string
 *                   pregnancyOutcome:
 *                     type: array
 *                     items:
 *                       type: string
 *                   deliveryDate:
 *                     type: string
 *                     format: date-time
 *                   NumberOfNewBorn:
 *                     type: integer
 *                   outcomeOfVisit:
 *                     type: array
 *                     items:
 *                       type: string
 *               pnc:
 *                 type: object
 *                 properties:
 *                   dateOfVisit:
 *                     type: string
 *                     format: date-time
 *                   detailsOfVisit:
 *                     type: string
 *                   whatNumberIsThisVisit:
 *                     type: string
 *                   whatServicesWereProvided:
 *                     type: string
 *                   outcomeOfVisit:
 *                     type: array
 *                     items:
 *                       type: string
 *                   dateOfNextAppointment:
 *                     type: string
 *                     format: date-time
 *               others:
 *                 type: object
 *                 properties:
 *                   dateOfVisit:
 *                     type: string
 *                     format: date-time
 *                   detailsOfVisit:
 *                     type: string
 *                   purposeOfUnscheduledVisit:
 *                     type: string
 *                   outcomeOfVisit:
 *                     type: array
 *                     items:
 *                       type: string
 *     responses:
 *       201:
 *         description: Service delivery created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Service Deliveries Retrieved
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       clientNumber:
 *                         type: string
 *                       nameOfHealthFacility:
 *                         type: string
 *                       purposeOfVisit:
 *                         type: string
 *                       submittedBy:
 *                         type: object
 *                         properties:
 *                           userID:
 *                             type: string
 *                           name:
 *                             type: string
 *                       anc:
 *                         type: object
 *                         nullable: true
 *                       deliveryAndLabour:
 *                         type: object
 *                         nullable: true
 *                       pnc:
 *                         type: object
 *                         nullable: true
 *                       others:
 *                         type: object
 *                         nullable: true
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/service-delivery", verifyToken_1.verifyToken, enumeration_1.default.createServiceDelivery);
/**
 * @swagger
 * /api/enumeration/client/service-delivery:
 *   get:
 *     summary: Get Service Deliveries by Client Number
 *     tags: [Enumeration Data]
 *     description: Retrieves all service delivery records (ANC, Labour, PNC, Others) associated with the specified client number.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: clientNumber
 *         required: true
 *         schema:
 *           type: string
 *         description: The client number used to fetch the service delivery records.
 *     responses:
 *       200:
 *         description: Successfully retrieved service deliveries
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Service Deliveries Retrieved
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       clientNumber:
 *                         type: string
 *                       nameOfHealthFacility:
 *                         type: string
 *                       purposeOfVisit:
 *                         type: string
 *                       submittedBy:
 *                         type: object
 *                         properties:
 *                           userID:
 *                             type: string
 *                           name:
 *                             type: string
 *                       anc:
 *                         type: object
 *                         nullable: true
 *                       deliveryAndLabour:
 *                         type: object
 *                         nullable: true
 *                       pnc:
 *                         type: object
 *                         nullable: true
 *                       others:
 *                         type: object
 *                         nullable: true
 *       400:
 *         description: Client number is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Client Number is Required
 *                 result:
 *                   type: string
 *                   nullable: true
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: An error occurred while creating service delivery
 */
router.get("/client/service-delivery", enumeration_1.default.getServiceDeliveryByClientNumberRequest);
/**
 * @swagger
 * /api/enumeration/referrals:
 *   post:
 *     summary: Create a new referral
 *     tags: [Enumeration Data]
 *     description: Creates a referral for a client.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientNumber:
 *                 type: string
 *                 example: "123456"
 *               referralReason:
 *                 type: string
 *                 example: "High blood pressure"
 *               referredTo:
 *                 type: string
 *                 example: "General Hospital"
 *               nameOfReferralFacility:
 *                 type: string
 *                 example: "General Hospital"
 *               modeOfTransportation:
 *                 type: string
 *                 example: "Ambulance"
 *               otherModeOfTransportation:
 *                 type: string
 *                 example: "Taxi"
 *               reasonForReferral:
 *                 type: string
 *                 example: "Emergency treatment required"
 *               otherReasonForReferral:
 *                 type: string
 *                 example: "Patient request"
 *               dateOfReferral:
 *                 type: string
 *                 format: date
 *                 example: "2025-05-16"
 *             required:
 *               - clientNumber
 *               - referralReason
 *               - referredTo
 *               - nameOfReferralFacility
 *               - dateOfReferral
 *     responses:
 *       201:
 *         description: Referral successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: Referral Created
 *                 result:
 *                   type: object
 *       500:
 *         description: Server error while creating referral
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: An error occurred while creating referral
 */
router.post("/referrals", verifyToken_1.verifyToken, enumeration_1.default.createReferral);
/**
 * @swagger
 * /api/enumeration/client-referrals:
 *   get:
 *     summary: Get referrals for a client
 *     tags: [Enumeration Data]
 *     description: Retrieves all referrals associated with the specified client number.
 *     parameters:
 *       - in: query
 *         name: clientNumber
 *         required: true
 *         schema:
 *           type: string
 *         description: The client number to fetch referrals for.
 *     responses:
 *       200:
 *         description: Referrals retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Referrals Retrieved
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Client number is missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Client Number is Required
 *                 result:
 *                   type: string
 *                   nullable: true
 *       500:
 *         description: Server error while retrieving referrals
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: An error occurred while getting referral
 */
router.get("/client-referrals", enumeration_1.default.getClientReferrals);
/**
 * @swagger
 * /api/enumeration/client-data:
 *   get:
 *     summary: Get enumeration data for a client
 *     tags: [Enumeration Data]
 *     description: Retrieves enumeration details for the given client number.
 *     parameters:
 *       - in: query
 *         name: clientNumber
 *         required: true
 *         schema:
 *           type: string
 *         description: The client number used to fetch enumeration data.
 *     responses:
 *       200:
 *         description: Enumeration data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Enumeration data for client-123456 Retrieved
 *                 result:
 *                   type: object
 *       400:
 *         description: Client number is missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Client Number is Required
 *                 result:
 *                   type: string
 *                   nullable: true
 *       500:
 *         description: Server error while retrieving enumeration data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: An error occurred while getting enumeration data
 */
router.get("/client-data", enumeration_1.default.getClientEnumerationData);
/**
 * @swagger
 * /api/enumeration/client-schedules:
 *   get:
 *     summary: Get schedule for a client
 *     tags: [Enumeration Data]
 *     description: Retrieves enumeration schedule for the given client number.
 *     parameters:
 *       - in: query
 *         name: clientNumber
 *         required: true
 *         schema:
 *           type: string
 *         description: The client number used to fetch enumeration schedule.
 *     responses:
 *       200:
 *         description: Enumeration schedule retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Enumeration data for client-123456 Retrieved
 *                 result:
 *                   type: object
 *       400:
 *         description: Client number is missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Client Number is Required
 *                 result:
 *                   type: string
 *                   nullable: true
 *       500:
 *         description: Server error while retrieving enumeration data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: An error occurred while getting client schedule
 */
router.get("/client-schedules", enumeration_1.default.getClientSchedules);
exports.default = router;
