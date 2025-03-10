//@ts-nocheck
import db from "../../config/db";
import {
  getAUserByPhone,
  getUserPatients,
  createPatientPersonalInfoQuery,
  createPatientFirstvisitDailyhabitQuery,
  createPatientFirstvisitObstetricQuery,
} from "../../queries/user/user";
import request from "request";
import { updateSessionSchedule } from "../session";
import { UserService } from "../../services/user.service";
import logger from "../../logger";

// send users a message
const patientscheduledvisitsms = async (req, res) => {
  const { mobile_number, firstname, lastname, day, date, healthfacilityname } =
    req.body;
  const url = `https://api.ng.termii.com/api/sms/send`;

  const data = {
    api_key: process.env.TERMIIKEY,
    type: "plain",
    to: `${mobile_number}`,
    from: "opticcs",
    channel: "generic",
    sms: `${firstname} ${lastname} you have been scheduled for antenatal visit on ${day} ${date} at ${healthfacilityname}`,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": ["application/json", "application/json"],
      },
      body: JSON.stringify(data),
    });

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
const patientscheduledvisitremindersms = async (req, res) => {
  const { mobile_number, firstname, lastname, date, healthfacilityname } =
    req.body;
  const url = `https://api.ng.termii.com/api/sms/send`;

  const data = {
    api_key: process.env.TERMIIKEY,
    type: "plain",
    to: `${mobile_number}`,
    from: "opticcs",
    channel: "generic",
    sms: `${firstname} ${lastname} this is to remind you of your scheduled antenatal visit tomorrow ${date} at ${healthfacilityname}`,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": ["application/json", "application/json"],
      },
      body: JSON.stringify(data),
    });

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
const patientscheduledvisitmissedsms = async (req, res) => {
  const { mobile_number, firstname, lastname, date, day, healthfacilityname } =
    req.body;
  const url = `https://api.ng.termii.com/api/sms/send`;

  const data = {
    api_key: process.env.TERMIIKEY,
    type: "plain",
    to: `${mobile_number}`,
    from: "opticcs",
    channel: "generic",
    sms: `${firstname} ${lastname} You missed your scheduled antenatal visit on ${day}, ${date} at ${healthfacilityname}`,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": ["application/json", "application/json"],
      },
      body: JSON.stringify(data),
    });

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

// healthPersonnels
const getAllUsers = async (req, res, next) => {
  const connection = await db.getConnection();
  try {
    const q = `SELECT * FROM healthpersonnel`;
    const result = await connection.execute(q);
    connection.release();
    res
      .status(200)
      .json({ statusCode: "200", message: "successful", result: result[0] });
  } catch (err) {
    res.status(500).json({ statusCode: "500", error: err });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const deleteAUser = async (req, res, next) => {
  const connection = await db.getConnection();
  const userService = new UserService(connection);
  const id = req.params.id;
  try {
    const result = await userService.deleteAUser(id);
    res
      .status(200)
      .json({ statusCode: "200", message: "successful", result: result });
  } catch (err) {
    res.status(500).json({ statusCode: "500", error: err });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getAllUsersFiltered = async (req, res, next) => {
  const page = req.query.page || 1;
  const pageSize = 20;
  const offset = (page - 1) * pageSize;
  const state = req.query.state || "";
  const lga = req.query.lga || "";
  const healthfacility = req.query.healthfacility || "";
  const from = req.query.from || "";
  const to = req.query.to || "";
  const filter = req.query.filter;
  const connection = await db.getConnection();
  const userService = new UserService(connection);
  try {
    const result = await userService.getAllUsers(
      pageSize,
      offset,
      filter,
      state,
      lga,
      healthfacility,
      from,
      to
    );
    res.status(200).json({ result: result.result, count: result.count });
  } catch (err) {
    res.status(500).json({ statusCode: "500", error: err });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const getUserByPhone = async (req, res, next) => {
  const connection = await db.getConnection();
  const { phone } = req.body;
  const q = `SELECT * FROM healthpersonnel WHERE phone = ?`;

  try {
    const [result] = await connection.execute(q, [phone]);
    if (result.length) {
      res.status(409).json({
        statusCode: "409",
        message: "User already Exists",
        result: null,
      });
    } else {
      res
        .status(200)
        .json({ statusCode: "200", message: "successful", result: null });
    }
  } catch (err) {
    res.status(500).json(err);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getUsersPatients = async (req, res, next) => {
  const connection = await db.getConnection();
  const { id } = req.params;
  const q = getUserPatients();
  try {
    const result = await connection.execute(q, [id]);
    connection.release();
    res
      .status(200)
      .json({ statusCode: "200", message: "successful", result: result[0] });
  } catch (err) {
    res.status(500).json(err);
    next(err);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const sendAMessageToWorker = async (req, res, next) => {
  const connection = await db.getConnection();
  const { id } = req.params;
  const { message_from, message_date, message_status_delivered, message } =
    req.body;
  const q = `
  INSERT INTO messages (
    healthpersonnel_id,
    message_from,
    message_date,
    message_status_delivered,
    message
    ) 
  VALUES (?, ?, ?, ?,?)`;
  try {
    const result = await connection.execute(q, [
      id,
      message_from,
      message_date,
      message_status_delivered,
      message,
    ]);
    connection.release();
    res.status(200).json(result[0]);
  } catch (err) {
    res.status(500).json(err);
    next(err);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const createASchedule = async (req, res, next) => {
  const connection = await db.getConnection();
  const { id } = req.params;
  const {
    schedule_name,
    schedule_state,
    schedule_lga,
    schedule_dateFrom,
    schedule_dateTo,
    schedule_completed,
    schedule_confirmed,
  } = req.body;
  const q = `
  INSERT INTO schedule (
    healthpersonnel_id,
    schedule_name,
    schedule_state,
    schedule_lga,schedule_dateFrom,schedule_dateTo,schedule_completed,schedule_confirmed
    ) 
  VALUES (?, ?, ?, ?, ?,?,?,?)`;
  try {
    const result = await connection.execute(q, [
      id,
      schedule_name,
      schedule_state,
      schedule_lga,
      schedule_dateFrom,
      schedule_dateTo,
      schedule_completed,
      schedule_confirmed,
    ]);
    //session
    await updateSessionSchedule(result[0].insertId, healthpersonnel_id);
    res.status(201).json(result[0]);
  } catch (err) {
    res.status(500).json(err);
    next(err);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const createATest = async (req, res, next) => {
  const connection = await db.getConnection();
  const { id } = req.params;
  const {
    Test_patientID,
    Test_ANCbooking,
    Test_date,
    Test_time,
    Test_completed,
    Test_result,
  } = req.body;
  const q = `
  INSERT INTO testing (
    healthpersonnel_id,
    Test_patientID,
    Test_ANCbooking,
    Test_date,Test_time,Test_completed,Test_result
    ) 
  VALUES (?, ?, ?, ?, ?,?,?)`;
  try {
    const result = await connection.execute(q, [
      id,
      Test_patientID,
      Test_ANCbooking,
      Test_date,
      Test_time,
      Test_completed,
      Test_result,
    ]);
    connection.release();
    res.status(201).json(result[0]);
  } catch (err) {
    res.status(500).json(err);
    next(err);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const createDeliveryReport = async (req, res, next) => {
  const connection = await db.getConnection();
  const { id } = req.params;
  const {
    deliveryReport_patientID,
    gender,
    NoOfChildren,
    deliveryDate,
    deliveryTime,
  } = req.body;
  const q = `
  INSERT INTO deliveryReport (
    healthpersonnel_id,
    deliveryReport_patientID,
    gender,
    NoOfChildren,deliveryDate,deliveryTime
    ) 
  VALUES (?, ?, ?, ?, ?,?)`;
  try {
    const result = await connection.execute(q, [
      id,
      deliveryReport_patientID,
      gender,
      NoOfChildren,
      deliveryDate,
      deliveryTime,
    ]);
    res.status(201).json(result[0]);
    db.query(q, (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    });
  } catch (err) {
    res.status(500).json(err);
    next(err);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

//patients

const createPatientFirstvisitPersonalInfo = async (req, res, next) => {
  const connection = await db.getConnection();
  const {
    HospitalNumber,
    FirstName,
    middleName,
    surname,
    Address,
    Gravidity,
    parity,
    LMP,
    EDD,
    EGA,
    DoYouFeelthebabysmovement,
    doyouknowdateoffirtbabymovement,
    doyouknowdateoflastbabymovement,
  } = req.body;
  try {
    const result = await connection.execute(
      createPatientPersonalInfoQuery(
        HospitalNumber,
        FirstName,
        middleName,
        surname,
        Address,
        Gravidity,
        parity,
        LMP,
        EDD,
        EGA,
        DoYouFeelthebabysmovement,
        doyouknowdateoffirtbabymovement
      )
    );
    connection.release();
    res.status(201).json(result[0]);
  } catch (err) {
    res.status(500).json(err);
    next(err);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const createPatientFirstvisitDailyhabits = async (req, res, next) => {
  const connection = await db.getConnection();
  const {
    firstVisit_id,
    Doyouworkoutsidethehome,
    Doyouwalklongdistances,
    durationofwalkingdistanceinminutes,
    heavyloads,
    sleephours,
    dailymealcount,
    mealinthelasttwodays,
    nonfoodsubstances,
    babylessthanayear,
    doYou,
    WhodoyouLivewith,
    Didanyoneever,
    frightened,
  } = req.body;
  try {
    const result = await connection.execute(
      createPatientFirstvisitDailyhabitQuery(
        firstVisit_id,
        Doyouworkoutsidethehome,
        Doyouwalklongdistances,
        durationofwalkingdistanceinminutes,
        heavyloads,
        sleephours,
        dailymealcount,
        mealinthelasttwodays,
        nonfoodsubstances,
        babylessthanayear,
        doYou,
        WhodoyouLivewith,
        Didanyoneever,
        frightened
      )
    );
    connection.release();
    res.status(201).json(result[0]);
  } catch (err) {
    res.status(500).json(err);
    next(err);
  }
};
const createPatientFirstvisitObstetric = (req, res, next) => {
  const {
    firstVisit_id,
    convulsionduringapregnancy,
    caesareansection,
    tearsthroughsphincter,
    haemorrhage,
    Stillbirths,
    prematureDeliveries,
    lowbirthweightbabies,
    deadbabies,
    others1,
    breastfedbefore,
    durationyoubreastfedyourbaby,
    breastfeedingproblems,
    others2,
  } = req.body;
  try {
    db.query(
      createPatientFirstvisitObstetricQuery(
        firstVisit_id,
        convulsionduringapregnancy,
        caesareansection,
        tearsthroughsphincter,
        haemorrhage,
        Stillbirths,
        prematureDeliveries,
        lowbirthweightbabies,
        deadbabies,
        others1,
        breastfedbefore,
        durationyoubreastfedyourbaby,
        breastfeedingproblems,
        others2
      ),
      (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
      }
    );
  } catch (err) {
    next(err);
  }
};
const createPatientFirstvisitMedication = (req, res, next) => {
  const { firstVisit_id, allergies, symptoms } = req.body;
  const q = `INSERT INTO medicationHistory (
    firstVisit_id,
    allergies,
    symptoms
    ) 
  VALUES ('${firstVisit_id}','${allergies}', '${symptoms}')`;
  try {
    db.query(q, (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    });
  } catch (err) {
    next(err);
  }
};
const createPatientFirstvisitMedicationPulmonary = (req, res, next) => {
  const { medicationHistory_id, cough, difficultyBreathings } = req.body;
  const q = `INSERT INTO pulmonary (
    medicationHistory_id,
    cough,
    difficultyBreathing
    ) 
  VALUES ('${medicationHistory_id}','${cough}', '${difficultyBreathings}')`;
  try {
    db.query(q, (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    });
  } catch (err) {
    next(err);
  }
};
const createPatientFirstvisitMedicationCardiovascular = (req, res, next) => {
  const {
    medicationHistory_id,
    palpitation,
    swellingoffeet,
    severechestpain,
    Severeepigastricpain,
    Severetirednesss,
    difficultylyingflat,
  } = req.body;
  const q = `INSERT INTO cardiovascular (
    medicationHistory_id,
    palpitation,
    swellingoffeet,severechestpain,Severeepigastricpain,Severetirednesss,difficultylyingflat
    ) 
  VALUES ('${medicationHistory_id}','${palpitation}', '${swellingoffeet}', '${severechestpain}','${Severeepigastricpain}','${Severetirednesss}','${difficultylyingflat}')`;
  try {
    db.query(q, (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    });
  } catch (err) {
    next(err);
  }
};
const createPatientFirstvisitMedicationNeuro = (req, res, next) => {
  const { medicationHistory_id, headaches, dizziness } = req.body;
  const q = `INSERT INTO neurologic (
    medicationHistory_id,
    headaches,
    dizziness
    ) 
  VALUES ('${medicationHistory_id}','${headaches}', '${dizziness}')`;
  try {
    db.query(q, (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    });
  } catch (err) {
    next(err);
  }
};
const createPatientFirstvisitMedicationGastro = (req, res, next) => {
  const { medicationHistory_id, severeabdominalpain, vomiting, diarrhoea } =
    req.body;
  const q = `INSERT INTO gastrointestinal (
    medicationHistory_id,
    severeabdominalpain, vomiting, diarrhoea
    ) 
  VALUES ('${medicationHistory_id}','${severeabdominalpain}', '${vomiting}','${diarrhoea}')`;
  try {
    db.query(q, (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    });
  } catch (err) {
    next(err);
  }
};
const createPatientFirstvisitMedicationUrinary = (req, res, next) => {
  const {
    medicationHistory_id,
    pain,
    severeflankpain,
    bloodinurine,
    swollenface,
  } = req.body;
  const q = `INSERT INTO urinary (
    medicationHistory_id,
    pain, severeflankpain, bloodinurine,swollenface
    ) 
  VALUES ('${medicationHistory_id}','${pain}', '${severeflankpain}','${bloodinurine}','${swollenface}')`;
  try {
    db.query(q, (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    });
  } catch (err) {
    next(err);
  }
};
const createPatientFirstvisitMedicationGynae = (req, res, next) => {
  const { medicationHistory_id, Vaginaldischarge, painduringsex, syphillis } =
    req.body;
  const q = `INSERT INTO gynaecological (
    medicationHistory_id,
    Vaginaldischarge,
    painduringsex,
    syphillis
    ) 
  VALUES ('${medicationHistory_id}','${Vaginaldischarge}', '${painduringsex}','${syphillis}')`;
  try {
    db.query(q, (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    });
  } catch (err) {
    next(err);
  }
};
const createPatientFirstvisitMedicationHistoryof = (req, res, next) => {
  const {
    medicationHistory_id,
    drycough,
    weightloss,
    nightsweat,
    tuberculosisdiagnosed,
    tuberculosistreated,
  } = req.body;
  const q = `INSERT INTO historyof (
    medicationHistory_id,
    drycough, weightloss, nightsweat,tuberculosisdiagnosed,tuberculosistreated
    ) 
  VALUES ('${medicationHistory_id}','${drycough}', '${weightloss}','${nightsweat}','${tuberculosisdiagnosed}','${tuberculosistreated}')`;
  try {
    db.query(q, (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    });
  } catch (err) {
    next(err);
  }
};
const createPatientFirstvisitMedicationDiagnosedof = (req, res, next) => {
  const {
    medicationHistory_id,
    heartdisease,
    Anaemia,
    kidney,
    sicklecell,
    diabetes,
    goitre,
    hiv,
    covid,
    anyother,
    admitted,
    reasonforadmission,
    surgery,
    reasonforsurgery,
  } = req.body;
  const q = `INSERT INTO diagnosedof (
    medicationHistory_id,
    heartdisease, Anaemia, kidney,sicklecell,diabetes,goitre,hiv,covid,anyother,admitted,reasonforadmission,surgery,reasonforsurgery
    ) 
  VALUES ('${medicationHistory_id}','${heartdisease}', '${Anaemia}','${kidney}','${sicklecell}','${diabetes}','${goitre}','${hiv}','${covid}','${anyother}','${admitted}','${reasonforadmission}','${surgery}','${reasonforsurgery}')`;
  try {
    db.query(q, (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    });
  } catch (err) {
    next(err);
  }
};
const createPatientFirstvisitMedicationOnmedications = (req, res, next) => {
  const {
    medicationHistory_id,
    traditional,
    herbalremedies,
    vitamins,
    otcDrugs,
    dietary,
    others1,
    tetanus,
    tetanusdoses,
    lastTetanusdose,
    covidVaccination,
  } = req.body;
  const q = `INSERT INTO onmedications (
    medicationHistory_id,
    traditional, herbalremedies, vitamins,otcDrugs,dietary,others1,tetanus,tetanusdoses,lastTetanusdose,covidVaccination
    ) 
  VALUES ('${medicationHistory_id}','${traditional}', '${herbalremedies}','${vitamins}','${otcDrugs}','${dietary}','${others1}','${tetanus}','${tetanusdoses}','${lastTetanusdose}','${covidVaccination}')`;
  try {
    db.query(q, (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    });
  } catch (err) {
    next(err);
  }
};

const createPatient = (req, res, next) => {
  const { healthpersonnel_id, firstVisit_date, personalInformation_id } =
    req.body;
  try {
    const q = `INSERT INTO patients (
      healthpersonnel_id,
      firstVisit_date,
      personalInformation_id,
      ) 
    VALUES ('${healthpersonnel_id}','${firstVisit_date}', '${personalInformation_id}')`;

    db.query(q, (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    });
  } catch (err) {
    next(err);
  }
};
const createPatientFirstVisit = (req, res, next) => {
  const { patient_id, createdAt } = req.body;
  try {
    const q = `INSERT INTO firstVisit (
      patient_id,
      createdAt,
      ) 
    VALUES ('${patient_id}','${createdAt}')`;

    db.query(q, (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    });
  } catch (err) {
    next(err);
  }
};

const deVerifyAUser = async (req, res) => {
  const connection = await db.getConnection();
  const id = req.query.id;
  try {
    const q = `UPDATE healthpersonnel SET verified = 0 WHERE id = ?`;
    const result = await connection.execute(q, [id]);
    res
      .status(200)
      .json({ statusCode: "200", message: "successful", result: result[0] });
  } catch (error) {
    res.status(500).json({ error });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const getAllUnverifiedworkers = async (req, res) => {
  const connection = await db.getConnection();
  try {
    const q = `SELECT * FROM healthpersonnel WHERE verified = 0`;
    const result = await connection.execute(q);
    res
      .status(200)
      .json({ statusCode: "200", message: "successful", result: result[0] });
  } catch (error) {
    console.log(error);
    logger.error(error);
    res.status(500).json({ error });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getUnverifiedworkers = async (req, res) => {
  const connection = await db.getConnection();
  const healthfacility = req.query.healthfacility;
  logger.info(healthfacility);
  try {
    const q = `SELECT * FROM healthpersonnel WHERE verified = 0 AND healthfacility = ?`;
    const result = await connection.execute(q, [healthfacility]);
    console.log(result, "   healthfacility");
    res
      .status(200)
      .json({ statusCode: "200", message: "successful", result: result[0] });
  } catch (error) {
    res.status(500).json({ error });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getHealthworkerInfo = async (req, res, next) => {
  const connection = await db.getConnection();
  const userid = req.user.id;
  try {
    const q = `SELECT * FROM healthpersonnel WHERE id = ?`;
    const result = await connection.execute(q, [userid]);
    res
      .status(200)
      .json({ statusCode: "200", message: "successful", result: result[0] });
  } catch (error) {
    res.status(500).json({ error });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

//schedule
const createHealthworkerSchedule = async (req, res, next) => {
  const connection = await db.getConnection();
  const userid = req.user.id;
  const { id } = req.params;
  const { dateFrom, dateTo, firstname, middlename, lastname, phone } = req.body;
  const values = [
    userid,
    id,
    dateFrom,
    dateTo,
    firstname,
    middlename,
    lastname,
    phone,
  ];
  try {
    const q = `INSERT INTO schedule (healthpersonnel_id, patient_id, dateFrom, dateTo, firstname, middlename, lastname, phone) VALUES (?, ?, ?, ?,?,?,?,?)`;
    const resultquery = `SELECT * FROM schedule WHERE id = ?`;
    const create = await connection.execute(q, values);
    const result = await connection.execute(resultquery, [create[0].insertId]);
    logger.info("Schedule created successfully");
    res
      .status(200)
      .json({ statusCode: "200", message: "successful", result: create[0] });
  } catch (error) {
    console.log("error from creating schedule" + " :" + error);
    logger.error(error);
    res.status(500).json({ error: error });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getAllCompletedSchedule = async (req, res) => {
  const connection = await db.getConnection();
  const userid = req.user.id;
  try {
    const q = `SELECT * FROM schedule WHERE completed = 1 AND healthpersonnel_id = ?`;
    const result = await connection.execute(q, [userid]);
    res
      .status(200)
      .json({ statusCode: "200", message: "successful", result: result[0] });
  } catch (error) {
    res.status(500).json({ error: error });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getAPatientSchedule = async (req, res) => {
  const connection = await db.getConnection();
  const { patientid } = req.query;
  try {
    const q = `SELECT * FROM schedule WHERE patient_id = ?`;
    const result = await connection.execute(q, [patientid]);
    res
      .status(200)
      .json({ statusCode: "200", message: "successful", result: result[0] });
  } catch (error) {
    res.status(500).json({ error: error });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getAllMissedSchedule = async (req, res) => {
  const connection = await db.getConnection();
  const userid = req.user.id;
  try {
    const q = `SELECT * FROM schedule WHERE missed = 1 AND healthpersonnel_id = ?`;
    const result = await connection.execute(q, [userid]);
    res
      .status(200)
      .json({ statusCode: "200", message: "successful", result: result[0] });
  } catch (error) {
    res.status(500).json({ error: error });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getAllFlaggedSchedule = async (req, res) => {
  const connection = await db.getConnection();
  const userid = req.user.id;
  try {
    const q = `SELECT s.*,
    (SELECT COUNT(*) FROM schedule WHERE missed = 1 AND patient_id = s.patient_id) AS numberofmissed
      FROM schedule s
      WHERE s.flagged = 1 AND s.healthpersonnel_id = ?;
    `;
    const q2 = `SELECT * FROM schedule WHERE missed = 1 AND healthpersonnel_id = ?`;
    const result = await connection.execute(q, [userid]);
    const result2 = await connection.execute(q2, [userid]);
    res
      .status(200)
      .json({ statusCode: "200", message: "successful", result: result[0] });
  } catch (error) {
    res.status(500).json({ error: error });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getAllUpcomingSchedule = async (req, res) => {
  const connection = await db.getConnection();
  const userid = req.user.id;
  try {
    const q = `SELECT * FROM schedule WHERE upcoming = 1 AND healthpersonnel_id = ?`;
    const result = await connection.execute(q, [userid]);
    res
      .status(200)
      .json({ statusCode: "200", message: "successful", result: result[0] });
  } catch (error) {
    res.status(500).json({ error: error });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getAllHealthworkersSchedule = async (req, res) => {
  const connection = await db.getConnection();
  const userid = req.user.id;
  const values = [userid];
  try {
    const q = `SELECT * FROM schedule WHERE healthpersonnel_id = ?`;
    const result = await connection.execute(q, values);
    res
      .status(200)
      .json({ statusCode: "200", message: "successful", result: result[0] });
  } catch (error) {
    res.status(500).json({ error: error });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getMissedSchedulewithWorker = async (req, res) => {
  const connection = await db.getConnection();
  const userid = req.user.id;
  const { patient_id } = req.query;
  const values = [userid, patient_id];
  try {
    const q = `SELECT * FROM schedule WHERE healthpersonnel_id = ? AND patient_id = ?`;
    const result = await connection.execute(q, values);
    res
      .status(200)
      .json({ statusCode: "200", message: "successful", result: result[0] });
  } catch (error) {
    res.status(500).json(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const updateHealthworkerScheduleCompleted = async (req, res, next) => {
  const connection = await db.getConnection();
  const userid = req.user.id;
  const { id } = req.params;
  const {
    completed = null,
    upcoming = null,
    missed = null,
    missedsms = null,
    flagged = null,
    datefrom = null,
    dateto = null,
  } = req.body;
  const values = [
    completed,
    upcoming,
    missed,
    missedsms,
    flagged,
    datefrom,
    dateto,
    id,
  ];
  try {
    const q = `UPDATE schedule
    SET
      completed = IFNULL(?, completed),
      upcoming = IFNULL(?, upcoming),
      missed = IFNULL(?, missed),
      missedsms = IFNULL(?, missedsms),
      flagged = IFNULL(?, flagged),
      datefrom = IFNULL(?, datefrom), 
      dateto = IFNULL(?, dateto)
    WHERE id = ?;
    `;
    const resultquery = `SELECT * FROM schedule WHERE id = ?;`;
    const result = await connection.execute(q, values);
    // await connection.execute(resultquery, [id]);
    res
      .status(200)
      .json({ statusCode: "200", message: "successful", result: result[0] });
  } catch (error) {
    console.log({ errorfromupdate: error });
    res.status(500).json(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const deleteAHealthworkerSchedule = async (req, res, next) => {
  const connection = await db.getConnection();
  const userid = req.user.id;
  const { id } = req.params;
  const values = [id];
  try {
    const q = `DELETE FROM schedule
    WHERE id = ?;    
    `;
    const result = await connection.execute(q, values);
    res
      .status(200)
      .json({ statusCode: "200", message: "successful", result: result[0] });
  } catch (error) {
    res.status(500).json({ error: error });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const getAllSchedule = async (req, res) => {
  const connection = await db.getConnection();
  try {
    const q = `
    SELECT
    schedule.*,
    healthpersonnel.healthFacility,
    healthpersonnel.state, healthpersonnel.lga
    FROM
      schedule
    LEFT JOIN
    healthpersonnel ON schedule.healthpersonnel_id = healthpersonnel.id;      
    `;
    const result = await connection.execute(q);
    res
      .status(200)
      .json({ statusCode: "200", message: "successful", result: result[0] });
  } catch (error) {
    res
      .status(500)
      .json({ statusCode: "500", message: "error getting schedule", error });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export {
  patientscheduledvisitsms,
  patientscheduledvisitremindersms,
  patientscheduledvisitmissedsms,
  getHealthworkerInfo,
  sendAMessageToWorker,
  getAllUsers,
  getAllUsersFiltered,
  getUnverifiedworkers,
  getAllUnverifiedworkers,
  deVerifyAUser,
  createASchedule,
  createHealthworkerSchedule,
  getAllHealthworkersSchedule,
  getAllSchedule,
  updateHealthworkerScheduleCompleted,
  deleteAHealthworkerSchedule,
  getAllCompletedSchedule,
  getAllMissedSchedule,
  getAllFlaggedSchedule,
  getAllUpcomingSchedule,
  getAPatientSchedule,
  getMissedSchedulewithWorker,
  createDeliveryReport,
  createATest,
  getUserByPhone,
  deleteAUser,
  getUsersPatients,
  createPatientFirstvisitPersonalInfo,
  createPatient,
};
