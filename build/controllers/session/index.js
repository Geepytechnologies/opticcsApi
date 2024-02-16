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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSessionSchedule = exports.getsessiongraphhealthfacility = exports.getsessiongraphlga = exports.getsessiongraphstate = exports.getsessiongraph = exports.getAllsessionshf = exports.getAllsessionsLga = exports.getAllsessionsState = exports.getAllsessions = exports.getCurrentusersessionrequest = exports.getCurrentusersession = exports.startSession = exports.updateSessionReturnvisit = exports.updateSessionFirstvisit = exports.endSession = exports.startSessionRequest = void 0;
//@ts-nocheck
const db_1 = __importDefault(require("../../config/db"));
const logger_1 = __importDefault(require("../../logger"));
const startSession = (user_id, start_time, start_date) => __awaiter(void 0, void 0, void 0, function* () {
    const sessiondata = {
        firstvisit: [],
        returnvisit: [],
        schedule: [],
    };
    const q = `INSERT INTO sessions (user_id, start_time,start_date, session_status, session_data)
  VALUES (
      ?,
      ?,
      ?,
      'active',
      ?
  )`;
    const updateuserquery = `UPDATE healthpersonnel
  SET currentsession = ?
  WHERE id = ?
  `;
    let connection = yield db_1.default.getConnection();
    try {
        const result = yield connection.execute(q, [
            user_id,
            start_time,
            start_date,
            sessiondata,
        ]);
        const updateuser = yield connection.execute(updateuserquery, [
            result[0].insertId,
            user_id,
        ]);
        return { statusCode: "200", message: "successful", result: result[0] };
    }
    catch (error) {
        connection.release();
        logger_1.default.error(error);
        return { statusCode: "500", message: "error", result: error };
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
exports.startSession = startSession;
const getCurrentusersession = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    const getuser = `
     SELECT * FROM healthpersonnel
    WHERE id = ?
   `;
    try {
        const getUsercall = yield connection.execute(getuser, [user_id]);
        const result = getUsercall[0];
        const user = result[0];
        const session = user.currentsession;
        return { statusCode: "200", message: "successful", session: session };
    }
    catch (error) {
        connection.release();
        return { statusCode: "500", message: "error", result: error };
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
exports.getCurrentusersession = getCurrentusersession;
const getCurrentusersessionrequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const connection = yield db_1.default.getConnection();
    const getuser = `
     SELECT * FROM healthpersonnel
    WHERE id = ?
   `;
    try {
        const getUsercall = yield connection.execute(getuser, [id]);
        const result = getUsercall[0];
        const user = result[0];
        const session = user.currentsession;
        res
            .status(200)
            .json({ statusCode: "200", message: "successful", session: session });
    }
    catch (error) {
        connection.release();
        res
            .status(500)
            .json({ statusCode: "500", message: "error", result: error });
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
exports.getCurrentusersessionrequest = getCurrentusersessionrequest;
const updateSessionFirstvisit = (firstvisit_id, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const q = `UPDATE sessions
SET session_data = JSON_ARRAY_APPEND(
    session_data,
    '$.firstvisit',
    ?
)
WHERE id = ?`;
    const q2 = `SELECT * FROM firstvisit where id = ?`;
    try {
        const connection = yield db_1.default.getConnection();
        logger_1.default.info(firstvisit_id);
        const usersession = yield getCurrentusersession(user_id);
        const firstvisitresult = yield connection.execute(q2, [firstvisit_id]);
        console.log({ first: firstvisitresult });
        const time = firstvisitresult[0][0].createdat;
        logger_1.default.warn(time);
        const result = yield connection.execute(q, [time, usersession.session]);
        logger_1.default.info(result[0]);
        return { status: "successful", message: result[0] };
    }
    catch (error) {
        connection.release();
        logger_1.default.error(error);
        return { status: "error", message: error };
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
exports.updateSessionFirstvisit = updateSessionFirstvisit;
const updateSessionReturnvisit = (returnvisit_id, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const q = `UPDATE sessions
SET session_data = JSON_ARRAY_APPEND(
    session_data,
    '$.returnvisit',
    ?
)
WHERE id = ?`;
    const getreturnvisit = `SELECT * FROM returnvisit where id = ?`;
    const connection = yield db_1.default.getConnection();
    try {
        const usersession = yield getCurrentusersession(user_id);
        const returnvisit = yield connection.execute(getreturnvisit, [
            returnvisit_id,
        ]);
        const time = returnvisit[0][0].createdat;
        const result = yield connection.execute(q, [time, usersession.session]);
        return { status: "successful", message: result[0] };
    }
    catch (error) {
        connection.release();
        console.log(error);
        return { status: "error", message: error };
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
exports.updateSessionReturnvisit = updateSessionReturnvisit;
const updateSessionSchedule = (schedule_id, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const q = `UPDATE sessions
SET session_data = JSON_ARRAY_APPEND(
    session_data,
    '$.schedule',
    ?
)
WHERE id = ?`;
    const getschedule = `SELECT * FROM schedule where id = ?`;
    const connection = yield db_1.default.getConnection();
    try {
        const usersession = yield getCurrentusersession(user_id);
        const schedule = yield connection.execute(getschedule, [schedule_id]);
        const time = schedule[0][0].createdat;
        const result = yield connection.execute(q, [time, usersession.session]);
        return { status: "successful", message: result[0] };
    }
    catch (error) {
        connection.release();
        console.log(error);
        return { status: "error", message: error };
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
exports.updateSessionSchedule = updateSessionSchedule;
const startSessionRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sessiondata = {
        firstvisit: [],
        returnvisit: [],
        schedule: [],
    };
    const { user_id, start_time, start_date } = req.body;
    const q = `INSERT INTO sessions (user_id, start_time,start_date, session_status, session_data)
  VALUES (
      ?,
      ?,
      ?,
      'active',
      ?
  )`;
    const updateuserquery = `UPDATE healthpersonnel
  SET currentsession = ?
  WHERE id = ?`;
    let connection = yield db_1.default.getConnection();
    try {
        const result = yield connection.execute(q, [
            user_id,
            start_time,
            start_date,
            sessiondata,
        ]);
        const updateuser = yield connection.execute(updateuserquery, [
            result[0].insertId,
            user_id,
        ]);
        res
            .status(200)
            .json({ statusCode: "200", message: "successful", result: result[0] });
    }
    catch (error) {
        connection.release();
        res.status(500).json(error);
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
exports.startSessionRequest = startSessionRequest;
const endSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { end_time, end_date, user_id } = req.body;
    const q = `UPDATE sessions
  SET
      session_status = 'completed',
      end_time = ?,
      end_date = ?
  WHERE id = ?`;
    const updateuserquery = `UPDATE healthpersonnel
  SET currentsession = ?
  WHERE id = ?`;
    const getuser = `
    SELECT * FROM healthpersonnel
    WHERE id = ?
  `;
    let connection = yield db_1.default.getConnection();
    try {
        const getUsercall = yield connection.execute(getuser, [user_id]);
        const result = getUsercall[0];
        const user = result[0];
        const updatesession = yield connection.execute(q, [
            end_time,
            end_date,
            user.currentsession,
        ]);
        const updateuser = yield connection.execute(updateuserquery, [
            null,
            user_id,
        ]);
        res
            .status(200)
            .json({ statusCode: "200", message: "successful", result: result[0] });
    }
    catch (error) {
        connection.release();
        res.status(500).json(error);
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
exports.endSession = endSession;
const getAllsessions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    const { start_date } = req.query;
    const q = `SELECT sessions.*, healthpersonnel.healthworker, healthpersonnel.state, healthpersonnel.ward, healthpersonnel.cadre, healthpersonnel.id
  FROM sessions
  INNER JOIN healthpersonnel ON sessions.user_id = healthpersonnel.id
  WHERE start_date = ?;`;
    try {
        const result = yield connection.execute(q, [start_date]);
        res
            .status(200)
            .json({ statusCode: "200", message: "successful", result: result[0] });
    }
    catch (error) {
        connection.release();
        res.status(500).json(error);
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
exports.getAllsessions = getAllsessions;
const getAllsessionsState = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    const { start_date, state } = req.query;
    const q = `SELECT sessions.*, healthpersonnel.healthworker, healthpersonnel.state, healthpersonnel.ward, healthpersonnel.cadre, healthpersonnel.id
  FROM sessions
  INNER JOIN healthpersonnel ON sessions.user_id = healthpersonnel.id
  WHERE start_date = ? AND healthpersonnel.state = ? `;
    try {
        const result = yield connection.execute(q, [start_date, state]);
        res
            .status(200)
            .json({ statusCode: "200", message: "successful", result: result[0] });
    }
    catch (error) {
        connection.release();
        res.status(500).json(error);
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
exports.getAllsessionsState = getAllsessionsState;
const getAllsessionsLga = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    const { start_date, lga } = req.query;
    const q = `SELECT sessions.*, healthpersonnel.healthworker, healthpersonnel.state, healthpersonnel.ward, healthpersonnel.cadre, healthpersonnel.id
  FROM sessions
  INNER JOIN healthpersonnel ON sessions.user_id = healthpersonnel.id
  WHERE start_date = ? AND healthpersonnel.lga = ? `;
    try {
        const result = yield connection.execute(q, [start_date, lga]);
        res
            .status(200)
            .json({ statusCode: "200", message: "successful", result: result[0] });
    }
    catch (error) {
        connection.release();
        res.status(500).json(error);
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
exports.getAllsessionsLga = getAllsessionsLga;
const getAllsessionshf = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    const { start_date, healthfacility } = req.query;
    const q = `SELECT sessions.*, healthpersonnel.healthworker, healthpersonnel.state, healthpersonnel.ward, healthpersonnel.cadre, healthpersonnel.id
  FROM sessions
  INNER JOIN healthpersonnel ON sessions.user_id = healthpersonnel.id
  WHERE start_date = ? AND healthpersonnel.healthfacility = ? `;
    try {
        const result = yield connection.execute(q, [start_date, healthfacility]);
        res
            .status(200)
            .json({ statusCode: "200", message: "successful", result: result[0] });
    }
    catch (error) {
        connection.release();
        res.status(500).json(error);
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
exports.getAllsessionshf = getAllsessionshf;
const getsessiongraph = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    const { year } = req.query;
    const q = `
SELECT
  JSON_OBJECT(
    'JANUARY', SUM(MONTH(start_date) = 1),
    'FEBRUARY', SUM(MONTH(start_date) = 2),
    'MARCH', SUM(MONTH(start_date) = 3),
    'APRIL', SUM(MONTH(start_date) = 4),
    'MAY', SUM(MONTH(start_date) = 5),
    'JUNE', SUM(MONTH(start_date) = 6),
    'JULY', SUM(MONTH(start_date) = 7),
    'AUGUST', SUM(MONTH(start_date) = 8),
    'SEPTEMBER', SUM(MONTH(start_date) = 9),
    'OCTOBER', SUM(MONTH(start_date) = 10),
    'NOVEMBER', SUM(MONTH(start_date) = 11),
    'DECEMBER', SUM(MONTH(start_date) = 12)
  ) AS count
FROM sessions
WHERE YEAR(start_date) = ?;
`;
    const values = [year];
    try {
        const [result] = yield connection.execute(q, values);
        res
            .status(200)
            .json({ statusCode: "200", message: "successful", result: result[0] });
    }
    catch (error) {
        connection.release();
        res.status(500).json(error);
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
exports.getsessiongraph = getsessiongraph;
const getsessiongraphstate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    const { state, year } = req.query;
    const q = `SELECT
  JSON_OBJECT(
    'JANUARY', SUM(MONTH(start_date) = 1),
    'FEBRUARY', SUM(MONTH(start_date) = 2),
    'MARCH', SUM(MONTH(start_date) = 3),
    'APRIL', SUM(MONTH(start_date) = 4),
    'MAY', SUM(MONTH(start_date) = 5),
    'JUNE', SUM(MONTH(start_date) = 6),
    'JULY', SUM(MONTH(start_date) = 7),
    'AUGUST', SUM(MONTH(start_date) = 8),
    'SEPTEMBER', SUM(MONTH(start_date) = 9),
    'OCTOBER', SUM(MONTH(start_date) = 10),
    'NOVEMBER', SUM(MONTH(start_date) = 11),
    'DECEMBER', SUM(MONTH(start_date) = 12)
  ) AS count FROM sessions  
INNER JOIN healthpersonnel ON sessions.user_id = healthpersonnel.id WHERE YEAR(start_date) = ?
  AND healthpersonnel.state = ?;
`;
    const values = [year, state];
    try {
        const [result] = yield connection.execute(q, values);
        res
            .status(200)
            .json({ statusCode: "200", message: "successful", result: result[0] });
    }
    catch (error) {
        connection.release();
        console.log(error);
        res.status(500).json(error);
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
exports.getsessiongraphstate = getsessiongraphstate;
const getsessiongraphlga = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    const { lga, year } = req.query;
    const q = `SELECT
  JSON_OBJECT(
    'JANUARY', SUM(MONTH(start_date) = 1),
    'FEBRUARY', SUM(MONTH(start_date) = 2),
    'MARCH', SUM(MONTH(start_date) = 3),
    'APRIL', SUM(MONTH(start_date) = 4),
    'MAY', SUM(MONTH(start_date) = 5),
    'JUNE', SUM(MONTH(start_date) = 6),
    'JULY', SUM(MONTH(start_date) = 7),
    'AUGUST', SUM(MONTH(start_date) = 8),
    'SEPTEMBER', SUM(MONTH(start_date) = 9),
    'OCTOBER', SUM(MONTH(start_date) = 10),
    'NOVEMBER', SUM(MONTH(start_date) = 11),
    'DECEMBER', SUM(MONTH(start_date) = 12)
  ) AS count
FROM sessions  
INNER JOIN healthpersonnel ON sessions.user_id = healthpersonnel.id WHERE YEAR(start_date) = ?
AND healthpersonnel.lga = ? 


`;
    const values = [year, lga];
    try {
        const [result] = yield connection.execute(q, values);
        res
            .status(200)
            .json({ statusCode: "200", message: "successful", result: result[0] });
    }
    catch (error) {
        connection.release();
        console.log(error);
        res.status(500).json(error);
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
exports.getsessiongraphlga = getsessiongraphlga;
const getsessiongraphhealthfacility = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.default.getConnection();
    const { healthfacility, year } = req.query;
    const q = `SELECT
  JSON_OBJECT(
    'JANUARY', SUM(MONTH(start_date) = 1),
    'FEBRUARY', SUM(MONTH(start_date) = 2),
    'MARCH', SUM(MONTH(start_date) = 3),
    'APRIL', SUM(MONTH(start_date) = 4),
    'MAY', SUM(MONTH(start_date) = 5),
    'JUNE', SUM(MONTH(start_date) = 6),
    'JULY', SUM(MONTH(start_date) = 7),
    'AUGUST', SUM(MONTH(start_date) = 8),
    'SEPTEMBER', SUM(MONTH(start_date) = 9),
    'OCTOBER', SUM(MONTH(start_date) = 10),
    'NOVEMBER', SUM(MONTH(start_date) = 11),
    'DECEMBER', SUM(MONTH(start_date) = 12)
  ) AS count
FROM sessions WHERE YEAR(start_date) = ?
INNER JOIN healthpersonnel ON sessions.user_id = healthpersonnel.id
WHERE healthpersonnel.healthfacility = ? 


`;
    const values = [year, healthfacility];
    try {
        const [result] = yield connection.execute(q, values);
        res
            .status(200)
            .json({ statusCode: "200", message: "successful", result: result[0] });
    }
    catch (error) {
        connection.release();
        console.log(error);
        res.status(500).json(error);
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
exports.getsessiongraphhealthfacility = getsessiongraphhealthfacility;
