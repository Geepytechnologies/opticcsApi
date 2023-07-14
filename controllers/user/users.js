const db = require("../../config/db");
const {
  getAUserByEmail,
  getAUserByPhone,
  getUserPatients,
  createPatientPersonalInfoQuery,
  createPatientFirstvisitDailyhabitQuery,
  createPatientFirstvisitObstetricQuery,
} = require("../../queries/user/user");
const request = require("request");

// send users a message
const sendMessage = async (req, res) => {
  const options = {
    method: "POST",
    url: "https://api.sendchamp.com/api/v1/sms/send",
    headers: {
      Accept: "application/json,text/plain,*/*",
      "Content-Type": "application/json",
      Authorization:
        "Bearer sendchamp_live_$2a$10$8i7elhCUcmIi2b921WjFkedBImY5YDWsZU86MNRw..wz1e11pcZDq",
    },
    body: JSON.stringify({
      to: req.body.phone,
      sender_name: "SAlert",
      route: "dnd",
      message: req.body.message,
    }),
  };

  request(options, (error, response, body) => {
    if (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "An error occurred while sending Message." });
    }
    const mydata = JSON.parse(body);
    // console.log(mydata);
    res.json(mydata);
  });
};
const sendBulkMessage = async (req, res) => {
  const options = {
    method: "POST",
    url: "https://api.sendchamp.com/api/v1/sms/send",
    headers: {
      Accept: "application/json,text/plain,*/*",
      "Content-Type": "application/json",
      Authorization:
        "Bearer sendchamp_live_$2a$10$8i7elhCUcmIi2b921WjFkedBImY5YDWsZU86MNRw..wz1e11pcZDq",
    },
    body: JSON.stringify({
      to: req.body.phone, // array of numbers ['2348106974201', '2348025645315']
      sender_name: "SAlert",
      route: "dnd",
      message: req.body.message,
    }),
  };

  request(options, (error, response, body) => {
    if (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "An error occurred while sending Message." });
    }
    const mydata = JSON.parse(body);
    console.log(mydata);
    res.json(mydata);
  });
};

// healthPersonnels
const getAllUsers = (req, res, next) => {
  try {
    const q = `SELECT * FROM healthpersonnel`;
    db.query(q, (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    });
  } catch (err) {
    next(err);
  }
};
const getUserByEmail = (req, res, next) => {
  const { email } = req.body;
  try {
    db.query(getAUserByEmail(email), (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    });
  } catch (err) {
    next(err);
  }
};
const getUserByPhone = (req, res, next) => {
  const { phone } = req.body;
  try {
    db.query(getAUserByPhone(phone), (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    });
  } catch (err) {
    next(err);
  }
};
const getUsersPatients = (req, res, next) => {
  const { id } = req.params;
  try {
    db.query(getUserPatients(id), (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    });
  } catch (err) {
    next(err);
  }
};

const sendAMessageToWorker = (req, res, next) => {
  const { id } = req.params;
  const { message_from, message_date, message_status_delivered, message } =
    req.body;
  const q = `
  INSERT INTO messages (ghrjhdc 
    healthpersonnel_id,
    message_from,
    message_date,
    message_status_delivered,
    message
    ) 
  VALUES ('${id}', '${message_from}', '${message_date}', '${message_status_delivered}','${message}')`;
  try {
    db.query(q, (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    });
  } catch (err) {
    next(err);
  }
};
const createASchedule = (req, res, next) => {
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
    db.query(q, (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    });
  } catch (err) {
    next(err);
  }
};
const createATest = (req, res, next) => {
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
    db.query(q, (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    });
  } catch (err) {
    next(err);
  }
};

const createDeliveryReport = (req, res, next) => {
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
    db.query(q, (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    });
  } catch (err) {
    next(err);
  }
};

//patients

const createPatientFirstvisitPersonalInfo = (req, res, next) => {
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
    db.query(
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
        doyouknowdateoffirtbabymovement,
        doyouknowdateoflastbabymovement
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
const createPatientFirstvisitDailyhabits = (req, res, next) => {
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
    db.query(
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

module.exports = {
  sendBulkMessage,
  sendMessage,
  sendAMessageToWorker,
  getAllUsers,
  createASchedule,
  createDeliveryReport,
  createATest,
  getUserByEmail,
  getUserByPhone,
  getUsersPatients,
  createPatientFirstvisitPersonalInfo,
  createPatient,
  createPatientFirstVisit,
  createPatientFirstvisitDailyhabits,
  createPatientFirstvisitObstetric,
  createPatientFirstvisitMedication,
  createPatientFirstvisitMedicationPulmonary,
  createPatientFirstvisitMedicationCardiovascular,
  createPatientFirstvisitMedicationNeuro,
  createPatientFirstvisitMedicationGastro,
  createPatientFirstvisitMedicationUrinary,
  createPatientFirstvisitMedicationGynae,
  createPatientFirstvisitMedicationHistoryof,
  createPatientFirstvisitMedicationDiagnosedof,
  createPatientFirstvisitMedicationOnmedications,
};
