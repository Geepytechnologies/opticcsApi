// This is a combined controller for the patients

const db = require("../../config/db");
const {
  createPatientPersonalInfoQuery,
  patientRecordQuery,
  createPatientFirstvisitDailyhabitQuery,
  createPatientFirstvisitObstetricQuery,
} = require("../../queries/user/user");

const createPatient = async (req, res, next) => {
  const connection = await db.getConnection();
  const {
    healthpersonnel_id,
    firstvisit_date,
    hospitalnumber,
    firstname,
    middlename,
    surname,
    phone,
    address,
    gravidity,
    parity,
    lmp,
    edd,
    ega,
    doyoufeelthebabysmovement,
    doyouknowdateoffirtbabymovement,
    doyouknowdateoflastbabymovement,
    doyousmoke,
    doyoudrinkalcohol,
    doyouuseharmfulsubstances,
    whodoyoulivewith,
    stoppedfromleavingthehouse,
    threatenedyourlife,
    abusedphysicallyorsexually,
    fever,
    headache,
    dizziness,
    convulsions,
    weakness,
    blurryvision,
    cough,
    difficultybreathing,
    palpitation,
    swellingoffeet,
    severechestpain,
    severeepigastricpain,
    pepticulcerpatient,
    severetirednesss,
    difficultylyingflat,
    severeabdominalpain,
    vomiting,
    diarrhoea,
    urinarypain,
    severeflankpain,
    bloodinurine,
    increasedurination,
    antsaroundurine,
    increasedthirst,
    vaginaldischarge,
    painduringsex,
    syphillis,
    convulsionduringapregnancy,
    caesareansection,
    tearsthroughsphincter,
    haemorrhage,
    stillbirths,
    prematureDeliveries,
    lowbirthweightbabies,
    deadbabies,
    miscarriages,
    others,
    allergies,
    herbalremedies,
    vitamins,
    otcdrugs,
    dietary,
    othersdrughistory,
    tetanus,
    tetanusdoses,
    lasttetanusdose,
    covidvaccination,
    hypertension,
    heartdisease,
    anaemia,
    kidneydisease,
    sicklecell,
    diabetes,
    goitre,
    hiv,
    currentlyontreatmentforhiv,
    seriouschronicillness,
    covidvaccinationpast,
    everhadsurgery,
    haveyoubreastfedbefore,
    lengthofbreastfeeding,
    problemsbreastfeeding,
    babylessthanayear,
    areyoustillbreastfeeding,
    camewithachildunder5years,
    immunisationstatus,
    unvaccinatedchildrenathome,
  } = req.body;

  // Replacing the individual db.query with pool.query for connection pooling
  const personalRecord = async () => {
    const query = createPatientPersonalInfoQuery();
    const values = [
      hospitalnumber,
      firstname,
      middlename,
      surname,
      phone,
      address,
      gravidity,
      parity,
      lmp,
      edd,
      ega,
      doyoufeelthebabysmovement,
      doyouknowdateoffirtbabymovement,
      doyouknowdateoflastbabymovement,
    ];
    const result = await connection.execute(query, values); // Use connection.execute
    return result;
  };
  const createpatient = async (personalinformation_id) => {
    const createPatientQuery = `INSERT INTO patients (healthpersonnel_id,firstvisit_date, personalinformation_id)
    VALUES (?,?, ?)`;
    const result = await connection.execute(createPatientQuery, [
      healthpersonnel_id,
      firstvisit_date,
      personalinformation_id,
    ]); // Use connection.execute
    return result;
  };
  const createfirstvisit = async (patient_id) => {
    const createFirstVisitQuery = `INSERT INTO firstvisit (patient_id, createdAt) VALUES ('${patient_id}','${firstvisit_date}')`;
    const result = await connection.execute(createFirstVisitQuery); // Use connection.execute
    return result;
  };

  const createdailyhabit = async (firstvisit_id) => {
    const values = [
      firstvisit_id,
      doyousmoke,
      doyoudrinkalcohol,
      doyouuseharmfulsubstances,
      whodoyoulivewith,
      stoppedfromleavingthehouse,
      threatenedyourlife,
      abusedphysicallyorsexually,
    ];
    const result = await connection.execute(
      createPatientFirstvisitDailyhabitQuery(),
      values
    );
    return result;
  };
  const createobstetric = async (firstvisit_id) => {
    const values = [
      firstvisit_id,
      convulsionduringapregnancy,
      caesareansection,
      tearsthroughsphincter,
      haemorrhage,
      stillbirths,
      prematureDeliveries,
      lowbirthweightbabies,
      deadbabies,
      miscarriages,
      others,
    ];
    const result = await connection.execute(
      createPatientFirstvisitObstetricQuery(),
      values
    );
    return result;
  };
  const createmedicationHistory = async (firstVisit_id) => {
    const q = `INSERT INTO medicationhistory (
      firstVisit_id
      ) 
    VALUES (?)`;
    const result = await connection.execute(q, [firstVisit_id]);
    return result;
  };
  const createmedicationHistorypulmonary = async (medicationhistory_id) => {
    const q = `INSERT INTO pulmonary (
      medicationhistory_id,
      cough,
      difficultybreathing
      ) 
    VALUES (?,?, ?)`;
    const result = await connection.execute(q, [
      medicationhistory_id,
      cough,
      difficultybreathing,
    ]);
    return result;
  };
  const createmedicationHistorycardio = async (medicationHistory_id) => {
    const values = [
      medicationHistory_id,
      palpitation,
      swellingoffeet,
      severechestpain,
      severeepigastricpain,
      pepticulcerpatient,
      severetirednesss,
      difficultylyingflat,
    ];
    const q = `INSERT INTO cardiovascular (
      medicationHistory_id,
      palpitation,
      swellingoffeet,severechestpain,severeepigastricpain,pepticulcerpatient,severetirednesss,difficultylyingflat
      ) 
    VALUES (?,?,?,?,?,?,?,?)`;
    const result = await connection.execute(q, values);
    return result;
  };
  const createmedicationHistoryGastro = async (medicationhistory_id) => {
    const values = [
      medicationhistory_id,
      severeabdominalpain,
      vomiting,
      diarrhoea,
    ];
    const q = `INSERT INTO gastrointestinal (
      medicationhistory_id,
      severeabdominalpain, vomiting, diarrhoea
      ) 
    VALUES (?,?,?,?)`;
    const result = await connection.execute(q, values);
    return result;
  };
  const createmedicationHistoryUrinary = async (medicationhistory_id) => {
    const values = [
      medicationhistory_id,
      urinarypain,
      severeflankpain,
      bloodinurine,
      increasedurination,
      antsaroundurine,
      increasedthirst,
    ];
    const q = `INSERT INTO urinary (
      medicationhistory_id,
      urinarypain, severeflankpain, bloodinurine,increasedurination,antsaroundurine,increasedthirst
      ) 
    VALUES (?,?,?,?,?,?,?)`;
    const result = await connection.execute(q, values);
    return result;
  };
  const createmedicationHistoryGynae = async (medicationhistory_id) => {
    const values = [
      medicationhistory_id,
      vaginaldischarge,
      painduringsex,
      syphillis,
    ];
    const q = `INSERT INTO gynaecological (
      medicationhistory_id,
      vaginaldischarge,
      painduringsex,
      syphillis
      ) 
    VALUES (?,?,?,?)`;
    const result = await connection.execute(q, values);
    return result;
  };
  const createmedicationHistoryOnmedications = async (medicationhistory_id) => {
    const values = [
      medicationhistory_id,
      allergies,
      herbalremedies,
      vitamins,
      otcdrugs,
      dietary,
      othersdrughistory,
      tetanus,
      tetanusdoses,
      lasttetanusdose,
      covidvaccination,
    ];
    const q = `INSERT INTO drughistory (
      medicationhistory_id,
      allergies, herbalremedies, vitamins,otcdrugs,dietary,othersdrughistory,tetanus,tetanusdoses,lasttetanusdose,covidvaccination
      ) 
    VALUES (?,?,?,?,?,?,?,?,?,?,?)`;
    const result = await connection.execute(q, values);
    return result;
  };
  const createpastmedicalHistory = async (firstvisit_id) => {
    const values = [
      firstvisit_id,
      hypertension,
      heartdisease,
      anaemia,
      kidneydisease,
      sicklecell,
      diabetes,
      goitre,
      hiv,
      currentlyontreatmentforhiv,
      seriouschronicillness,
      covidvaccinationpast,
      everhadsurgery,
    ];
    const q = `INSERT INTO pastmedicalhistory (
      firstvisit_id,
      hypertension,
      heartdisease,
      anaemia,
      kidneydisease,
      sicklecell,
      diabetes,
      goitre,
      hiv,
      currentlyontreatmentforhiv,
      seriouschronicillness,
      covidvaccinationpast,
      everhadsurgery
      ) 
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    const result = await connection.execute(q, values);
    return result;
  };
  const createfamilyHistory = async (firstvisit_id) => {
    const values = [
      firstvisit_id,
      haveyoubreastfedbefore,
      lengthofbreastfeeding,
      problemsbreastfeeding,
      babylessthanayear,
      areyoustillbreastfeeding,
      camewithachildunder5years,
      immunisationstatus,
      unvaccinatedchildrenathome,
    ];
    const q = `INSERT INTO familyhistory (
      firstvisit_id,
      haveyoubreastfedbefore,
      lengthofbreastfeeding,
      problemsbreastfeeding,
      babylessthanayear,
      areyoustillbreastfeeding,
      camewithachildunder5years,
      immunisationstatus,
      unvaccinatedchildrenathome
      ) 
    VALUES (?,?,?,?,?,?,?,?,?)`;
    const result = await connection.execute(q, values);
    return result;
  };
  const createGeneral = async (medicationhistory_id) => {
    const values = [
      medicationhistory_id,
      fever,
      headache,
      dizziness,
      convulsions,
      weakness,
      blurryvision,
    ];
    const q = `INSERT INTO general (
      medicationhistory_id,
  fever,
  headache,
  dizziness,
  convulsions,
  weakness,
  blurryvision
      ) 
    VALUES (?,?,?,?,?,?,?)`;
    const result = await connection.execute(q, values);
    return result;
  };

  try {
    await connection.beginTransaction();
    const createdrecord = await personalRecord();
    const personalInformation_id = createdrecord[0].insertId;
    const patientcreate = await createpatient(personalInformation_id);
    const patientID = patientcreate[0].insertId;
    const firstvisitcreation = await createfirstvisit(patientID);
    const firstvisitID = firstvisitcreation[0].insertId;
    const pastmedicalhistorycreation = await createpastmedicalHistory(
      firstvisitID
    );
    await createfamilyHistory(firstvisitID);
    const dailyhabitcreation = await createdailyhabit(firstvisitID);
    const obstetricCreation = await createobstetric(firstvisitID);
    const medicationCreation = await createmedicationHistory(firstvisitID);
    const medicationHistory_id = medicationCreation[0].insertId;
    const generalcreation = await createGeneral(medicationHistory_id);
    const medicationpulmonary = await createmedicationHistorypulmonary(
      medicationHistory_id
    );
    const medicationcardio = await createmedicationHistorycardio(
      medicationHistory_id
    );
    const medicationgastro = await createmedicationHistoryGastro(
      medicationHistory_id
    );
    const medicationurinary = await createmedicationHistoryUrinary(
      medicationHistory_id
    );
    const medicationGynae = await createmedicationHistoryGynae(
      medicationHistory_id
    );
    const medicationOnMedications = await createmedicationHistoryOnmedications(
      medicationHistory_id
    );

    await connection.commit();
    res.status(201).json({
      statusCode: "201",
      message: "successful",
      result: {
        personalInformation_id: personalInformation_id,
        patientID: patientID,
        firstvisitID: firstvisitID,
        dailyhabit: dailyhabitcreation[0].insertId,
        obstetric: obstetricCreation[0].insertId,
        medicationpulmonary: medicationpulmonary[0].insertId,
        medicationcardio: medicationcardio[0].insertId,
        medicationgastro: medicationgastro[0].insertId,
        medicationurinary: medicationurinary[0].insertId,
        medicationGynae: medicationGynae[0].insertId,
        medicationOnMedications: medicationOnMedications[0].insertId,
      },
    });
    connection.release();
  } catch (error) {
    if (connection) {
      await connection.rollback();
      connection.release();
    }
    console.error(error);
    res.status(500).json({
      statusCode: "500",
      error: "An error occurred while executing the transaction.",
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const getPatientRecord = async (req, res) => {
  const connection = await db.getConnection();
  const { id } = req.params;
  const record = async () => {
    const result = await connection.execute(patientRecordQuery(id));
    return result[0];
  };
  try {
    const response = await record();
    if (!response.length) {
      res.status(404).json({
        statusCode: "404",
        message: `Patient with ID of ${id} not found`,
      });
    }
    res
      .status(200)
      .json({ statusCode: "200", message: "successful", result: response });
    connection.release();
  } catch (err) {
    res.status(500).json({
      statusCode: "500",
      message: "Error getting patient record",
      error: err,
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const getAllPatients = async (req, res) => {
  const connection = await db.getConnection();

  try {
    const record = async () => {
      // const q = `SELECT * FROM patients`;
      const q = `SELECT patients.*, personalInformation.*
      FROM patients
      INNER JOIN personalInformation ON patients.personalInformation_id = personalInformation.id
      `;
      const result = await connection.execute(q);
      return result[0];
    };

    const users = await record();

    res
      .status(200)
      .json({ statusCode: "200", message: "successful", result: users });
  } catch (err) {
    connection.release();
    console.error("Error acquiring connection from pool:", err);
    res
      .status(500)
      .json({ statusCode: "500", error: "Database connection or query error" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const createPatientEveryVisit = async (req, res, next) => {
  const connection = await db.getConnection();
  const {
    patient_id,
    responsive,
    dull,
    unresponsive,
    noVisibleDirt,
    noodour,
    visibleDirt,
    odour,
    freeFromBruises,
    hasBruises,
    pink,
    palePink,
    whiteInColour,
    white,
    tinge,
    deepYellow,
    dirtyWhite,
    bloodpressure,
    abdomenScars,
    palpateAndEstimatefundusdocumentation,
    distancebtwTopOfFundusinWeeks,
    cmFromTopfundusdocumentation,
    distancebtwTopOfFundusinCM,
  } = req.body;

  try {
    const connection = await db.getConnection();
    await connection.beginTransaction();

    const everyVisit = async () => {
      const q = `INSERT INTO everyVisit (patient_id) VALUES (?)`;
      const result = await connection.execute(q, [patient_id]);
      return result;
    };

    const facialExpression = async (everyVisit_id) => {
      const q = `INSERT INTO facialExpression (everyVisit_id, responsive, dull, unresponsive) VALUES (?, ?, ?, ?)`;
      const result = await connection.execute(q, [
        everyVisit_id,
        responsive,
        dull,
        unresponsive,
      ]);
      return result;
    };

    const herSkin = async (everyVisit_id) => {
      const q = `INSERT INTO herSkin (everyVisit_id, freeFromBruises, hasBruises) VALUES (?, ?, ?)`;
      const result = await connection.execute(q, [
        everyVisit_id,
        freeFromBruises,
        hasBruises,
      ]);
      return result;
    };

    const herConjunctiva = async (everyVisit_id) => {
      const q = `INSERT INTO herConjunctiva (everyVisit_id, pink, palePink, whiteInColour) VALUES (?, ?, ?, ?)`;
      const result = await connection.execute(q, [
        everyVisit_id,
        pink,
        palePink,
        whiteInColour,
      ]);
      return result;
    };

    const sclera = async (everyVisit_id) => {
      const q = `INSERT INTO sclera (everyVisit_id, white, tinge, deepYellow, dirtyWhite) VALUES (?, ?, ?, ?, ?)`;
      const result = await connection.execute(q, [
        everyVisit_id,
        white,
        tinge,
        deepYellow,
        dirtyWhite,
      ]);
      return result;
    };

    const bloodpressurecall = async (everyVisit_id) => {
      const q = `INSERT INTO bloodpressure (everyVisit_id, bloodpressure) VALUES (?, ?)`;
      const result = await connection.execute(q, [
        everyVisit_id,
        bloodpressure,
      ]);
      return result;
    };

    const adbominalExamination = async (everyVisit_id) => {
      const q = `INSERT INTO adbominalExamination (everyVisit_id, abdomenScars, palpateAndEstimatefundusdocumentation, distancebtwTopOfFundusinWeeks, cmFromTopfundusdocumentation, distancebtwTopOfFundusinCM) VALUES (?, ?, ?, ?, ?, ?)`;
      const result = await connection.execute(q, [
        everyVisit_id,
        abdomenScars,
        palpateAndEstimatefundusdocumentation,
        distancebtwTopOfFundusinWeeks,
        cmFromTopfundusdocumentation,
        distancebtwTopOfFundusinCM,
      ]);
      return result;
    };

    const generalCleanliness = async (everyVisit_id) => {
      const q = `INSERT INTO generalCleanliness (everyVisit_id, noVisibleDirt, noodour, visibleDirt, odour) VALUES (?, ?, ?, ?, ?)`;
      const result = await connection.execute(q, [
        everyVisit_id,
        noVisibleDirt,
        noodour,
        visibleDirt,
        odour,
      ]);
      return result;
    };

    const everyVisitres = await everyVisit();
    const everyVisitID = everyVisitres[0].insertId;

    await facialExpression(everyVisitID);
    await herSkin(everyVisitID);
    await generalCleanliness(everyVisitID);
    await adbominalExamination(everyVisitID);
    await bloodpressurecall(everyVisitID);
    await sclera(everyVisitID);
    await herConjunctiva(everyVisitID);

    await connection.commit();
    connection.release();

    res.status(201).json({
      statusCode: "201",
      message: "created successfully",
      result: {
        everyVisitID: everyVisitID,
      },
    });
  } catch (err) {
    res.status(500).json({
      statusCode: "500",
      message: "Failed to create every visit for patient",
      error: err,
    });
    console.error(err);
    if (connection) {
      await connection.rollback();
      connection.release();
    }
    next(err);
  }
};

const numberofwomenwith4visits = async (req, res) => {
  const connection = await db.getConnection();
  try {
    const q = `SELECT p.id AS patient_id
    FROM patients p
    LEFT JOIN (
        SELECT patient_id, COUNT(*) AS first_visit_count
        FROM firstVisit
        GROUP BY patient_id
    ) fv ON p.id = fv.patient_id
    LEFT JOIN (
        SELECT patient_id, COUNT(*) AS every_visit_count
        FROM everyVisit
        GROUP BY patient_id
    ) ev ON p.id = ev.patient_id
    WHERE (COALESCE(fv.first_visit_count, 0) + COALESCE(ev.every_visit_count, 0)) > 4;    
    `;
    const result = await connection.execute(q);
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const getAllPatientsAndHealthworker = async (req, res) => {
  const connection = await db.getConnection();
  try {
    const q = `SELECT
    p.*,
    hp.*,
    pi.*
  FROM
    patients p
  LEFT JOIN
    healthpersonnel hp ON p.healthpersonnel_id = hp.id
  LEFT JOIN
    personalInformation pi ON p.personalInformation_id = pi.id
  `;
    const result = await connection.execute(q);
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const getPatientPersonalinfo = async (req, res) => {
  const connection = await db.getConnection();
  const id = req.params.id;
  try {
    const q = `SELECT
    pi.*
  FROM
    patients p
  JOIN
    personalInformation pi ON p.personalInformation_id = pi.id
  WHERE
    p.id = ?;  
  `;
    const result = await connection.execute(q, [id]);
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getPatientFirstVisit = async (req, res) => {
  const connection = await db.getConnection();
  const id = req.params.id;
  try {
    const q = `SELECT
    fv.*,
    dhal.*,
    oh.*,mh.*,p.*,c.*,n.*,gi.*,u.*,g.*,ho.*,do.*,om.*
  FROM
    firstVisit fv
  LEFT JOIN
    dailyHabitsAndLifestyle dhal ON fv.id = dhal.firstVisit_id
  LEFT JOIN
    obstetricHistory oh ON fv.id = oh.firstVisit_id
    LEFT JOIN
    medicationHistory mh ON fv.id = mh.firstVisit_id
  LEFT JOIN
    pulmonary p ON mh.id = p.medicationHistory_id
  LEFT JOIN
    cardiovascular c ON mh.id = c.medicationHistory_id
  LEFT JOIN
    neurologic n ON mh.id = n.medicationHistory_id
  LEFT JOIN
    gastrointestinal gi ON mh.id = gi.medicationHistory_id
  LEFT JOIN
    urinary u ON mh.id = u.medicationHistory_id
  LEFT JOIN
    gynaecological g ON mh.id = g.medicationHistory_id
  LEFT JOIN
    historyof ho ON mh.id = ho.medicationHistory_id
  LEFT JOIN
    diagnosedof do ON mh.id = do.medicationHistory_id
  LEFT JOIN
    onmedications om ON mh.id = om.medicationHistory_id
  WHERE
    fv.patient_id = ?; 
  `;
    const result = await connection.execute(q, [id]);
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getPatientEveryVisit = async (req, res) => {
  const connection = await db.getConnection();
  const id = req.params.id;
  try {
    const q = `SELECT
    ev.*,
    dhal.*,
    oh.*,mh.*,p.*,c.*,n.*,gi.*,u.*,g.*,ho.*,do.*,om.*
  FROM
  everyVisit ev
  LEFT JOIN
    dailyHabitsAndLifestyle dhal ON fv.id = dhal.firstVisit_id
  LEFT JOIN
    obstetricHistory oh ON fv.id = oh.firstVisit_id
    LEFT JOIN
    medicationHistory mh ON fv.id = mh.firstVisit_id
  LEFT JOIN
    pulmonary p ON mh.id = p.medicationHistory_id
  LEFT JOIN
    cardiovascular c ON mh.id = c.medicationHistory_id
  LEFT JOIN
    neurologic n ON mh.id = n.medicationHistory_id
  LEFT JOIN
    gastrointestinal gi ON mh.id = gi.medicationHistory_id
  LEFT JOIN
    urinary u ON mh.id = u.medicationHistory_id
  LEFT JOIN
    gynaecological g ON mh.id = g.medicationHistory_id
  LEFT JOIN
    historyof ho ON mh.id = ho.medicationHistory_id
  LEFT JOIN
    diagnosedof do ON mh.id = do.medicationHistory_id
  LEFT JOIN
    onmedications om ON mh.id = om.medicationHistory_id
  WHERE
    fv.patient_id = ?; 
  `;
    const result = await connection.execute(q, [id]);
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

module.exports = {
  createPatient,
  getPatientRecord,
  createPatientEveryVisit,
  getPatientFirstVisit,
  getAllPatients,
  numberofwomenwith4visits,
  getAllPatientsAndHealthworker,
  getPatientPersonalinfo,
};
