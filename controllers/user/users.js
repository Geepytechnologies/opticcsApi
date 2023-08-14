const db = require("../../config/db");
const {
  getAUserByPhone,
  getUserPatients,
  createPatientPersonalInfoQuery,
  createPatientFirstvisitDailyhabitQuery,
  createPatientFirstvisitObstetricQuery,
} = require("../../queries/user/user");
const request = require("request");

// send users a message
const patientscheduledvisitsms = async (req, res) => {
  const { mobile_number, firstname, lastname, day, date, healthfacilityname } =
    req.body;
  const options = {
    method: "POST",
    url: "https://control.msg91.com/api/v5/flow/",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authkey: process.env.MSGAUTHKEY,
    },
    body: {
      template_id: "64d69114d6fc0516725eb0d3",
      sender: "Opticcs",
      short_url: "1",
      mobiles: mobile_number,
      firstname: firstname,
      lastname: lastname,
      day: day,
      date: date,
      healthfacilityname: healthfacilityname,
    },
    json: true,
  };
  request(options, (error, response, body) => {
    if (error) {
      return res.status(response.statusCode).json({
        statusCode: response.statusCode.toString(),
        error: "An error occurred while sending Message.",
      });
    }
    res.json({ statusCode: response.statusCode.toString(), result: body });
  });
};
const patientscheduledvisitremindersms = async (req, res) => {
  const { mobile_number, firstname, lastname, date, healthfacilityname } =
    req.body;
  const options = {
    method: "POST",
    url: "https://control.msg91.com/api/v5/flow/",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authkey: "394982AVwwiRgqf64d2116bP1",
    },
    body: {
      template_id: "64d691aad6fc052a1473dc42",
      sender: "Opticcs",
      short_url: "1",
      mobiles: mobile_number,
      firstname: firstname,
      lastname: lastname,
      date: date,
      healthfacilityname: healthfacilityname,
    },
    json: true,
  };
  request(options, (error, response, body) => {
    if (error) {
      return res.status(response.statusCode).json({
        statusCode: response.statusCode.toString(),
        error: "An error occurred while sending Message.",
      });
    }
    res.json({ statusCode: response.statusCode.toString(), result: body });
  });
};
const patientscheduledvisitmissedsms = async (req, res) => {
  const { mobile_number, firstname, lastname, day, date, healthfacilityname } =
    req.body;
  const options = {
    method: "POST",
    url: "https://control.msg91.com/api/v5/flow/",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authkey: process.env.MSGAUTHKEY,
    },
    body: {
      template_id: "64d6923ed6fc05311c3659f2",
      sender: "Opticcs",
      short_url: "1",
      mobiles: mobile_number,
      firstname: firstname,
      lastname: lastname,
      day: day,
      date: date,
      healthfacilityname: healthfacilityname,
    },
    json: true,
  };
  request(options, (error, response, body) => {
    if (error) {
      return res.status(response.statusCode).json({
        statusCode: response.statusCode.toString(),
        error: "An error occurred while sending Message.",
      });
    }
    res.json({ statusCode: response.statusCode.toString(), result: body });
  });
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
  }
};

const getUserByPhone = async (req, res, next) => {
  const connection = await db.getConnection();
  const { phone } = req.body;
  try {
    const result = await connection.execute(getAUserByPhone(phone));
    connection.release();
    res
      .status(200)
      .json({ statusCode: "200", message: "successful", result: result[0] });
  } catch (err) {
    res.status(500).json(err);
    next(err);
  }
};
const getUsersPatients = async (req, res, next) => {
  const connection = await db.getConnection();
  const { id } = req.params;
  try {
    const result = await connection.execute(getUserPatients(id));
    connection.release();
    res
      .status(200)
      .json({ statusCode: "200", message: "successful", result: result[0] });
  } catch (err) {
    res.status(500).json(err);
    next(err);
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
  VALUES ('${id}', '${message_from}', '${message_date}', '${message_status_delivered}','${message}')`;
  try {
    const result = await connection.execute(q);
    connection.release();
    res.status(200).json(result[0]);
  } catch (err) {
    res.status(500).json(err);
    next(err);
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
  VALUES ('${id}', '${schedule_name}', '${schedule_state}', '${schedule_lga}', '${schedule_dateFrom}','${schedule_dateTo}','${schedule_completed}','${schedule_confirmed}')`;
  try {
    const result = await connection.execute(q);
    connection.release();
    res.status(201).json(result[0]);
  } catch (err) {
    res.status(500).json(err);
    next(err);
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
  VALUES ('${id}', '${Test_patientID}', '${Test_ANCbooking}', '${Test_date}', '${Test_time}','${Test_completed}','${Test_result}')`;
  try {
    const result = await connection.execute(q);
    connection.release();
    res.status(201).json(result[0]);
  } catch (err) {
    res.status(500).json(err);
    next(err);
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
  VALUES ('${id}', '${deliveryReport_patientID}', '${gender}', '${NoOfChildren}', '${deliveryDate}','${deliveryTime}')`;
  try {
    const result = await connection.execute(q);
    connection.release();
    res.status(201).json(result[0]);
    db.query(q, (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    });
  } catch (err) {
    res.status(500).json(err);
    next(err);
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
//i stopped here in the editing
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

const getUnverifiedworkers = async (req, res) => {
  const connection = await db.getConnection();
  try {
    const q = `SELECT * FROM healthpersonnel WHERE verified = 0`;
    const result = await connection.execute(q);
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
    const q = `SELECT * FROM schedule WHERE flagged = 1 AND healthpersonnel_id = ?`;
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
  const { completed, upcoming, missed, flagged } = req.body;
  const values = [completed, upcoming, missed, flagged, id];
  try {
    const q = `UPDATE schedule
    SET
      completed = IFNULL(?, completed),
      upcoming = IFNULL(?, upcoming),
      missed = IFNULL(?, missed),
      flagged = IFNULL(?, flagged)
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
    const q = `SELECT
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

module.exports = {
  patientscheduledvisitsms,
  patientscheduledvisitremindersms,
  patientscheduledvisitmissedsms,
  getHealthworkerInfo,
  sendAMessageToWorker,
  getAllUsers,
  getUnverifiedworkers,
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
  getMissedSchedulewithWorker,
  createDeliveryReport,
  createATest,
  getUserByPhone,
  getUsersPatients,
  createPatientFirstvisitPersonalInfo,
  createPatient,
};
