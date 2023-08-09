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
    state,
    lga,
    healthfacility,
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
      state,
      lga,
      healthfacility,
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
  const createmedicationHistorycardio = async (medicationhistory_id) => {
    const values = [
      medicationhistory_id,
      palpitation,
      swellingoffeet,
      severechestpain,
      severeepigastricpain,
      pepticulcerpatient,
      severetirednesss,
      difficultylyingflat,
    ];
    const q = `INSERT INTO cardiovascular (
      medicationhistory_id,
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
    const medicationhistory_id = medicationCreation[0].insertId;
    const generalcreation = await createGeneral(medicationhistory_id);
    const medicationpulmonary = await createmedicationHistorypulmonary(
      medicationhistory_id
    );
    const medicationcardio = await createmedicationHistorycardio(
      medicationhistory_id
    );
    const medicationgastro = await createmedicationHistoryGastro(
      medicationhistory_id
    );
    const medicationurinary = await createmedicationHistoryUrinary(
      medicationhistory_id
    );
    const medicationGynae = await createmedicationHistoryGynae(
      medicationhistory_id
    );
    const medicationOnMedications = await createmedicationHistoryOnmedications(
      medicationhistory_id
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
      error: error.sqlMessage ? error.sqlMessage : error,
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
      const q = `SELECT patients.*, personalinformation.*,healthpersonnel.state,healthpersonnel.lga,healthpersonnel.healthfacility
      FROM patients
      LEFT JOIN healthpersonnel ON patients.healthpersonnel_id = healthpersonnel.id
      INNER JOIN personalinformation ON patients.personalinformation_id = personalinformation.id
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
    state,
    lga,
    healthfacility,
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
    receivedcaresincelastvisit,
    whoprovidedthecare,
    whatcarewasprovided,
    outcomeofthecare,
    takingprescribeddrugs,
    problemtakingdrugs,
    followadvice,
    reactionorsideeffects,
    anythingrelatedtopregnancy,
    pink,
    palepink,
    whiteincolour,
    white,
    tinge,
    deepyellow,
    dirtywhite,
    bloodpressure,
    respiratoryrate,
    temperature,
    pulserate,
    abdomenScars,
    palpateAndEstimatefundusdocumentation,
    distancebtwtopdffundus,
    cmfromtopfundusdocumentation,
    cmfromuppersymphysis,
    presentation,
    descent,
    positionoffoetus,
    persisitentdrycough,
    unexplainedweightloss,
    nightsweats,
    diagnosedwithtuberculosis,
    treatedfortuberculosis,
    heartrate,
  } = req.body;

  try {
    const values = [
      patient_id,
      state,
      lga,
      healthfacility,
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
      receivedcaresincelastvisit,
      whoprovidedthecare,
      whatcarewasprovided,
      outcomeofthecare,
      takingprescribeddrugs,
      problemtakingdrugs,
      followadvice,
      reactionorsideeffects,
      anythingrelatedtopregnancy,
      pink,
      palepink,
      whiteincolour,
      white,
      tinge,
      deepyellow,
      dirtywhite,
      bloodpressure,
      respiratoryrate,
      temperature,
      pulserate,
      abdomenScars,
      palpateAndEstimatefundusdocumentation,
      distancebtwtopdffundus,
      cmfromtopfundusdocumentation,
      cmfromuppersymphysis,
      presentation,
      descent,
      positionoffoetus,
      persisitentdrycough,
      unexplainedweightloss,
      nightsweats,
      diagnosedwithtuberculosis,
      treatedfortuberculosis,
      heartrate,
    ];

    const connection = await db.getConnection();

    const q = `INSERT INTO returnvisit (
        patient_id,
        state,
        lga,
        healthfacility,
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
        receivedcaresincelastvisit,
        whoprovidedthecare,
        whatcarewasprovided,
        outcomeofthecare,
        takingprescribeddrugs,
        problemtakingdrugs,
        followadvice,
        reactionorsideeffects,
        anythingrelatedtopregnancy,
        pink,
      palepink,
      whiteincolour,
      white,
      tinge,
      deepyellow,
      dirtywhite,
      bloodpressure,
      respiratoryrate,
      temperature,
      pulserate,
      abdomenScars,
      palpateAndEstimatefundusdocumentation,
      distancebtwtopdffundus,
      cmfromtopfundusdocumentation,
      cmfromuppersymphysis,
      presentation,
      descent,
      positionoffoetus,persisitentdrycough,
      unexplainedweightloss,
      nightsweats,
      diagnosedwithtuberculosis,
      treatedfortuberculosis,
      heartrate,
      complaint,
      stategenobser,
      generalwellchoice,
      syphillistreatment,
      pregnancydiscuss
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    const result = await connection.execute(q, values);
    const returnvisitid = result[0];

    await connection.commit();
    connection.release();

    res.status(201).json({
      statusCode: "201",
      message: "created successfully",
      result: {
        returnvisitid,
      },
    });
  } catch (err) {
    res.status(500).json({
      statusCode: "500",
      message: "Failed to create return visit for patient",
      error: err,
    });
    console.error(err);
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
      pi.*,
      last_visits.last_visit
    FROM
      patients p
    LEFT JOIN
      healthpersonnel hp ON p.healthpersonnel_id = hp.id
    LEFT JOIN
      personalinformation pi ON p.personalinformation_id = pi.id
    LEFT JOIN (
      SELECT patient_id, MAX(createdat) AS last_visit
      FROM (
        SELECT patient_id, createdat FROM returnvisit
        UNION ALL
        SELECT patient_id, createdat FROM firstvisit
      ) AS combined_visits
      GROUP BY patient_id
    ) AS last_visits ON p.id = last_visits.patient_id;
    `;

    const result = await connection.execute(q);
    res.status(200).json({ result: result[0] });
  } catch (error) {
    if (connection) {
      connection.rollback();
    }
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
    personalinformation pi ON p.personalinformation_id = pi.id
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
    oh.*,mh.*,p.*,c.*,gi.*,u.*,g.*,om.*
  FROM
    firstvisit fv
  LEFT JOIN
    dailyhabitsandlifestyle dhal ON fv.id = dhal.firstvisit_id
  LEFT JOIN
    obstetrichistory oh ON fv.id = oh.firstvisit_id
    LEFT JOIN
    medicationhistory mh ON fv.id = mh.firstvisit_id
  LEFT JOIN
    pulmonary p ON mh.id = p.medicationhistory_id
  LEFT JOIN
    cardiovascular c ON mh.id = c.medicationhistory_id
  LEFT JOIN
    gastrointestinal gi ON mh.id = gi.medicationhistory_id
  LEFT JOIN
    urinary u ON mh.id = u.medicationhistory_id
  LEFT JOIN
    gynaecological g ON mh.id = g.medicationhistory_id
  LEFT JOIN
    drughistory om ON mh.id = om.medicationhistory_id
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
const getPatientReturnVisit = async (req, res) => {
  const connection = await db.getConnection();
  const id = req.params.id;
  try {
    const q = `SELECT * FROM returnvisit
  WHERE
    patient_id = ?; 
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

const createTest = async (req, res) => {
  const connection = await db.getConnection();
  const {
    healthpersonnel_id,
    hb,
    wcc,
    rcc,
    pcv,
    mcv,
    platelet,
    glucose,
    hiv,
    hepatitis,
    patient_id,
    rdt,
    bodytemp,
    heartrate,
    respiratoryrate,
    bodypressure,
    malariarapid,
  } = req.body;
  const values = [
    healthpersonnel_id,
    hb,
    wcc,
    rcc,
    pcv,
    mcv,
    platelet,
    glucose,
    hiv,
    hepatitis,
    patient_id,
    rdt,
    bodytemp,
    heartrate,
    respiratoryrate,
    bodypressure,
    malariarapid,
  ];
  try {
    const q = `INSERT INTO testresult (
      healthpersonnel_id,
      hb,
      wcc,
      rcc,
      pcv,
      mcv,
      platelet,
      glucose,
      hiv,
      hepatitis,
      patient_id,
      rdt,
      bodytemp,
  heartrate,
  respiratoryrate,
  bodypressure,
  malariarapid
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    const result = await connection.execute(q, values);
    const testresultid = result[0].insertId;
    const q2 = `SELECT * FROM testresult WHERE id = ?`;
    const result2 = await connection.execute(q2, [testresultid]);
    res.status(200).json(result2[0]);
  } catch (error) {
    if (connection) {
      connection.rollback();
    }
    res.status(500).json({ statusCode: 500, message: error });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getAPatientsTest = async (req, res) => {
  const connection = await db.getConnection();
  const patient_id = req.query.patient_id;
  try {
    const q = `SELECT * FROM testresult WHERE patient_id = ?`;
    const result = await connection.execute(q, [patient_id]);
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json({ statusCode: 500, error: error });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const updateTest = async (req, res) => {
  const connection = await db.getConnection();
  const {
    healthpersonnel_id,
    hb,
    wcc,
    rcc,
    pcv,
    mcv,
    platelet,
    glucose,
    hiv,
    hepatitis,
    rdt,
  } = req.body;
  const values = [
    healthpersonnel_id,
    hb,
    wcc,
    rcc,
    pcv,
    mcv,
    platelet,
    glucose,
    hiv,
    hepatitis,
    rdt,
    req.params.id,
  ];
  try {
    const q = `UPDATE testresult
    SET
      healthpersonnel_id = IFNULL(?,healthpersonnel_id),
      hb = IFNULL(?, hb),
      wcc = IFNULL(?, wcc),
      rcc = IFNULL(?, rcc),
      pcv = IFNULL(?, pcv),
      mcv = IFNULL(?, mcv),
      platelet = IFNULL(?, platelet),
      glucose = IFNULL(?, glucose),
      hiv = IFNULL(?, hiv),
      hepatitis = IFNULL(?, hepatitis),
      rdt = IFNULL(?, rdt)
    WHERE id = ?;
    ;`;
    const q2 = `SELECT * FROM testresult where id = ?`;
    const result = await connection.execute(q, values);
    const result2 = await connection.execute(q2, [req.params.id]);
    res.status(200).json(result2[0]);
  } catch (error) {
    if (connection) {
      connection.rollback();
    }
    res.status(500).json(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const getAllSchedule = async (req, res) => {
  const connection = await db.getConnection();
  try {
    const q = `SELECT * FROM schedule`;
    const result = await connection.execute(q);
    res.status(200).json(result[0]);
  } catch (error) {
  } finally {
  }
};

module.exports = {
  createPatient,
  getPatientRecord,
  createPatientEveryVisit,
  getPatientFirstVisit,
  getPatientReturnVisit,
  getAllPatients,
  getAllPatientsAndHealthworker,
  getPatientPersonalinfo,
  createTest,
  updateTest,
  getAPatientsTest,
};
