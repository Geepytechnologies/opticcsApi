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
    firstVisit_date,
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
    convulsionduringapregnancy,
    caesareansection,
    tearsthroughsphincter,
    haemorrhage,
    Stillbirths,
    prematureDeliveries,
    lowbirthweightbabies,
    deadbabies,
    obstetricothers1,
    breastfedbefore,
    durationyoubreastfedyourbaby,
    breastfeedingproblems,
    others2,
    allergies,
    symptoms,
    cough,
    difficultyBreathing,
    palpitation,
    swellingoffeet,
    severechestpain,
    Severeepigastricpain,
    Severetirednesss,
    difficultylyingflat,
    headaches,
    dizziness,
    severeabdominalpain,
    vomiting,
    diarrhoea,
    pain,
    severeflankpain,
    bloodinurine,
    swollenface,
    Vaginaldischarge,
    painduringsex,
    syphillis,
    drycough,
    weightloss,
    nightsweat,
    tuberculosisdiagnosed,
    tuberculosistreated,
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
    traditional,
    herbalremedies,
    vitamins,
    otcDrugs,
    dietary,
    onmedicationsothers1,
    tetanus,
    tetanusdoses,
    lastTetanusdose,
    covidVaccination,
  } = req.body;

  // Replacing the individual db.query with pool.query for connection pooling
  const personalRecord = async () => {
    const query = createPatientPersonalInfoQuery(
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
    );
    const result = await connection.execute(query); // Use connection.execute
    return result;
  };
  const createpatient = async (personalInformation_id) => {
    const createPatientQuery = `INSERT INTO patients (healthpersonnel_id,firstVisit_date, personalInformation_id)
    VALUES ('${healthpersonnel_id}','${firstVisit_date}', '${personalInformation_id}')`;
    const result = await connection.execute(createPatientQuery); // Use connection.execute
    return result;
  };
  const createfirstvisit = async (patient_id) => {
    const createFirstVisitQuery = `INSERT INTO firstVisit (patient_id, createdAt) VALUES ('${patient_id}','${firstVisit_date}')`;
    const result = await connection.execute(createFirstVisitQuery); // Use connection.execute
    return result;
  };

  const createdailyhabit = async (firstVisit_id) => {
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
    return result;
  };
  const createobstetric = async (firstVisit_id) => {
    const result = await connection.execute(
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
        obstetricothers1,
        breastfedbefore,
        durationyoubreastfedyourbaby,
        breastfeedingproblems,
        others2
      )
    );
    return result;
  };
  const createmedicationHistory = async (firstVisit_id) => {
    const q = `INSERT INTO medicationHistory (
      firstVisit_id,
      allergies,
      symptoms
      ) 
    VALUES ('${firstVisit_id}','${allergies}', '${symptoms}')`;
    const result = await connection.execute(q);
    return result;
  };
  const createmedicationHistorypulmonary = async (medicationHistory_id) => {
    const q = `INSERT INTO pulmonary (
      medicationHistory_id,
      cough,
      difficultyBreathing
      ) 
    VALUES ('${medicationHistory_id}','${cough}', '${difficultyBreathing}')`;
    const result = await connection.execute(q);
    return result;
  };
  const createmedicationHistorycardio = async (medicationHistory_id) => {
    const q = `INSERT INTO cardiovascular (
      medicationHistory_id,
      palpitation,
      swellingoffeet,severechestpain,Severeepigastricpain,Severetirednesss,difficultylyingflat
      ) 
    VALUES ('${medicationHistory_id}','${palpitation}', '${swellingoffeet}', '${severechestpain}','${Severeepigastricpain}','${Severetirednesss}','${difficultylyingflat}')`;
    const result = await connection.execute(q);
    return result;
  };
  const createmedicationHistoryneuro = async (medicationHistory_id) => {
    const q = `INSERT INTO neurologic (
      medicationHistory_id,
      headaches,
      dizziness
      ) 
    VALUES ('${medicationHistory_id}','${headaches}', '${dizziness}')`;
    const result = await connection.execute(q);
    return result;
  };
  const createmedicationHistoryGastro = async (medicationHistory_id) => {
    const q = `INSERT INTO gastrointestinal (
      medicationHistory_id,
      severeabdominalpain, vomiting, diarrhoea
      ) 
    VALUES ('${medicationHistory_id}','${severeabdominalpain}', '${vomiting}','${diarrhoea}')`;
    const result = await connection.execute(q);
    return result;
  };
  const createmedicationHistoryUrinary = async (medicationHistory_id) => {
    const q = `INSERT INTO urinary (
      medicationHistory_id,
      pain, severeflankpain, bloodinurine,swollenface
      ) 
    VALUES ('${medicationHistory_id}','${pain}', '${severeflankpain}','${bloodinurine}','${swollenface}')`;
    const result = await connection.execute(q);
    return result;
  };
  const createmedicationHistoryGynae = async (medicationHistory_id) => {
    const q = `INSERT INTO gynaecological (
      medicationHistory_id,
      Vaginaldischarge,
      painduringsex,
      syphillis
      ) 
    VALUES ('${medicationHistory_id}','${Vaginaldischarge}', '${painduringsex}','${syphillis}')`;
    const result = await connection.execute(q);
    return result;
  };
  const createmedicationHistoryHistoryof = async (medicationHistory_id) => {
    const q = `INSERT INTO historyof (
      medicationHistory_id,
      drycough, weightloss, nightsweat,tuberculosisdiagnosed,tuberculosistreated
      ) 
    VALUES ('${medicationHistory_id}','${drycough}', '${weightloss}','${nightsweat}','${tuberculosisdiagnosed}','${tuberculosistreated}')`;
    const result = await connection.execute(q);
    return result;
  };
  const createmedicationHistoryDiagnosedof = async (medicationHistory_id) => {
    const q = `INSERT INTO diagnosedof (
      medicationHistory_id,
      heartdisease, Anaemia, kidney,sicklecell,diabetes,goitre,hiv,covid,anyother,admitted,reasonforadmission,surgery,reasonforsurgery
      ) 
    VALUES ('${medicationHistory_id}','${heartdisease}', '${Anaemia}','${kidney}','${sicklecell}','${diabetes}','${goitre}','${hiv}','${covid}','${anyother}','${admitted}','${reasonforadmission}','${surgery}','${reasonforsurgery}')`;
    const result = await connection.execute(q);
    return result;
  };
  const createmedicationHistoryOnmedications = async (medicationHistory_id) => {
    const q = `INSERT INTO onmedications (
      medicationHistory_id,
      traditional, herbalremedies, vitamins,otcDrugs,dietary,others1,tetanus,tetanusdoses,lastTetanusdose,covidVaccination
      ) 
    VALUES ('${medicationHistory_id}','${traditional}', '${herbalremedies}','${vitamins}','${otcDrugs}','${dietary}','${onmedicationsothers1}','${tetanus}','${tetanusdoses}','${lastTetanusdose}','${covidVaccination}')`;
    const result = await connection.execute(q);
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
    const dailyhabitcreation = await createdailyhabit(firstvisitID);
    const obstetricCreation = await createobstetric(firstvisitID);
    const medicationCreation = await createmedicationHistory(firstvisitID);
    const medicationHistory_id = medicationCreation[0].insertId;
    const medicationpulmonary = await createmedicationHistorypulmonary(
      medicationHistory_id
    );
    const medicationcardio = await createmedicationHistorycardio(
      medicationHistory_id
    );
    const medicationneuro = await createmedicationHistoryneuro(
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
    const medicationhistoryof = await createmedicationHistoryHistoryof(
      medicationHistory_id
    );
    const medicationdiagnosedof = await createmedicationHistoryDiagnosedof(
      medicationHistory_id
    );
    const medicationOnMedications = await createmedicationHistoryOnmedications(
      medicationHistory_id
    );

    await connection.commit();
    connection.release();
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
        medicationneuro: medicationneuro[0].insertId,
        medicationgastro: medicationgastro[0].insertId,
        medicationurinary: medicationurinary[0].insertId,
        medicationGynae: medicationGynae[0].insertId,
        medicationhistoryof: medicationhistoryof[0].insertId,
        medicationdiagnosedof: medicationdiagnosedof[0].insertId,
        medicationOnMedications: medicationOnMedications[0].insertId,
      },
    });
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
      res
        .status(404)
        .json({
          statusCode: "404",
          message: `Patient with ID of ${id} not found`,
        });
    }
    connection.release();
    res
      .status(200)
      .json({ statusCode: "200", message: "successful", result: response });
  } catch (err) {}
};

const getAllPatients = async (req, res) => {
  try {
    const connection = await db.getConnection();

    const record = async () => {
      const q = `SELECT * FROM patients`;
      const result = await connection.execute(q);
      return result[0];
    };

    const users = await record();

    connection.release();
    res
      .status(200)
      .json({ statusCode: "200", message: "successful", result: users });
  } catch (err) {
    console.error("Error acquiring connection from pool:", err);
    res
      .status(500)
      .json({ statusCode: "500", error: "Database connection or query error" });
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

const numberofPatientswith4visits = async (req, res) => {
  const q = `SELECT COUNT(*) AS patient_count
    FROM (
      SELECT patients.id
      FROM patients
      INNER JOIN firstVisit ON patients.id = firstVisit.patient_id
      GROUP BY patients.id
      HAVING COUNT(firstVisit.id) >= 4
    ) AS subquery;
  `;

  try {
    const result = await db.execute(q);
    const patient_count = result[0].patient_count;
    res.status(200).json({ patient_count });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while executing the query." });
  }
};

module.exports = {
  createPatient,
  getPatientRecord,
  createPatientEveryVisit,
  getAllPatients,
  numberofPatientswith4visits,
};
