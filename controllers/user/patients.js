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
  // const {
  //   healthpersonnel_id,
  //   firstvisit_date,
  //   hospitalnumber,
  //   firstname,
  //   middlename,
  //   surname,
  //   phone,
  //   address,
  //   state,
  //   lga,
  //   healthfacility,
  //   gravidity,
  //   parity,
  //   lmp,
  //   edd,
  //   ega,
  //   doyoufeelthebabysmovement,
  //   doyouknowdateoffirstbabymovement,
  //   doyouknowdateoflastbabymovement,
  //   doyousmoke,
  //   doyoudrinkalcohol,
  //   doyouuseharmfulsubstances,
  //   whodoyoulivewith,
  //   stoppedfromleavingthehouse,
  //   threatenedyourlife,
  //   abusedphysicallyorsexually,
  //   fever,
  //   chills,
  //   headaches,
  //   dizziness,
  //   convulsions,
  //   weakness,
  //   blurryvision,
  //   cough,
  //   difficultybreathing,
  //   severechestpain,
  //   severeepigastricpain,
  //   pepticulcerpatient,
  //   severetiredness,
  //     severeabdominalpain,
  //     persistentvomiting,
  //     severediarrhoea,
  //     painwithurination,
  //     severeflankpain,
  //     bloodinurine,
  //     increasedurination,
  //     noticedantsaroundplaceurinated,
  //     increasedthirst,
  //     vaginaldischarge,
  //     deeppelvicpain,
  //     syphilis,
  //     syphilistreatment,
  //     feveryes,
  //     chillsyes,
  //     headachesyes,
  //     dizzinessyes,
  //     convulsionsyes,
  //     weaknessyes,
  //     blurryvisionyes,
  //     coughyes,
  //     persistentdrycough,
  //     persistentdrycoughyes,
  //     progressiveweightloss,
  //     progressiveweightlossyes,
  //     nightsweats,
  //     nightsweatsyes,
  //     diagnosedwithtuberculosis,
  //     diagnosedwithtuberculosisyes,
  //     treatedTBpreviously,
  //     treatedTBpreviouslyyes,
  //     difficultybreathingyes,
  //     severechestpainyes,
  //     severeepigastricpainyes,
  //     palpitations,
  //     palpitationyes,
  //     swellingfeet,
  //     swellingfeetyes,
  //     difficultytosleep,
  //     difficultytosleepyes,
  //     pepticulcerpatientyes,
  //     severetirednessyes,
  //     severeabdominalpainyes,
  //     persistentvomitingyes,
  //     severediarrhoeayes,
  //     painwithurinationyes,
  //     severeflankpainyes,
  //     bloodinurineyes,
  //     increasedurinationyes,
  //     increasedthirstyes,
  //     vaginaldischargeyes,
  //     deeppelvicpainyes,
  //     syphilisyes,
  //   convulsionduringapregnancy,
  //   caesareansection,
  //   tearsthroughsphincter,
  //   haemorrhage,
  //   stillbirths,
  //   prematureDeliveries,
  //   lowbirthweightbabies,
  //   deadbabies,
  //   miscarriages,
  //   others,
  //   hypertension,
  //   heartdisease,
  //   anaemia,
  //   kidneydisease,
  //   sicklecell,
  //   diabetes,
  //   goitre,
  //   hiv,
  //   currentlyontreatmentforhiv,
  //   seriouschronicillness,
  //   covidvaccinationpast,
  //   everhadsurgery,
  //   haveyoubreastfedbefore,
  //   lengthofbreastfeeding,
  //   problemsbreastfeeding,
  //   babylessthanayear,
  //   areyoustillbreastfeeding,
  //   camewithachildunder5years,
  //   immunisationstatus,
  //   unvaccinatedchildrenathome,
  // } = req.body;

  // Replacing the individual db.query with pool.query for connection pooling
  const {
    hospitalnumber,
    firstname,
    middlename,
    surname,
    phone,
    address,
    state,
    dateofbirth,
    lga,
    healthfacility,
    gravidity,
    parity,
    alive,
    lmpknown,
    lmp,
    edd,
    ega,
    laborstarted,
    firstbabymovement,
    doyoufeelthebabysmovement,
    doyouknowdateoffirstbabymovement,
    healthpersonnel_id,
    firstvisit_date,
    doyou,
    whodoyoulivewith,
    specifywhodoyoulivewith,
    didanyoneever,
    obstetrichistory,
    otherinputobstetrichistory,
    yearofpregnancy,
    carriedtoterm,
    modeofdelivery,
    weightofbaby,
    sexofbaby,
    babycriedafterbirth,
    complicationsafterdelivery,
    specifycomplicationsafterdelivery,
    breastfedexclusively,
    fever,
    chills,
    headaches,
    dizziness,
    convulsions,
    weakness,
    blurryvision,
    cough,
    difficultybreathing,
    severechestpain,
    severeepigastricpain,
    pepticulcerpatient,
    severetiredness,
    severeabdominalpain,
    persistentvomiting,
    severediarrhoea,
    painwithurination,
    severeflankpain,
    bloodinurine,
    increasedurination,
    noticedantsaroundplaceurinated,
    increasedthirst,
    vaginaldischarge,
    deeppelvicpain,
    syphilis,
    syphilistreatment,
    feveryes,
    chillsyes,
    headachesyes,
    dizzinessyes,
    convulsionsyes,
    weaknessyes,
    blurryvisionyes,
    coughyes,
    persistentdrycough,
    persistentdrycoughyes,
    progressiveweightloss,
    progressiveweightlossyes,
    nightsweats,
    nightsweatsyes,
    diagnosedwithtuberculosis,
    diagnosedwithtuberculosisyes,
    treatedTBpreviously,
    treatedTBpreviouslyyes,
    difficultybreathingyes,
    severechestpainyes,
    severeepigastricpainyes,
    palpitations,
    palpitationyes,
    swellingfeet,
    swellingfeetyes,
    difficultytosleep,
    difficultytosleepyes,
    pepticulcerpatientyes,
    severetirednessyes,
    severeabdominalpainyes,
    persistentvomitingyes,
    severediarrhoeayes,
    painwithurinationyes,
    severeflankpainyes,
    bloodinurineyes,
    increasedurinationyes,
    increasedthirstyes,
    vaginaldischargeyes,
    deeppelvicpainyes,
    syphilisyes,
    patienthaschildren,
    haveyoubreastfedbefore,
    breastfeedingduration,
    breastfeedingproblems,
    breastfeedingproblemsmoredetails,
    babylessthanayear,
    stillbreastfeeding,
    camewithachildunder5years,
    hasunvaccinatedchildren,
    familyepilepsy,
    familyepilepsyyes,
    familyhypertension,
    familyhypertensionyes,
    familyasthma,
    familyasthmayes,
    familydiabetes,
    familydiabetesyes,
    familysicklecell,
    familysicklecellyes,
    hypertension,
    heartdisease,
    anaemia,
    kidneydisease,
    sicklecell,
    diabetes,
    goitre,
    hivaids,
    hivaidstreatment,
    covid19,
    otherseriouschronicillnesses,
    specifyseriouschronicillnesses,
    hadsurgery,
    specifyhadsurgery,
    hypertensionyes,
    heartdiseaseyes,
    anaemiayes,
    kidneydiseaseyes,
    sicklecellyes,
    diabetesyes,
    goitreyes,
    hivaidsyes,
    covid19yes,
    historyofallergy,
    allergies,
    herbalremedies,
    vitamins,
    otcdrugs,
    dietarysupplements,
    typeofdietarysupplement,
    otherdrugs,
    tetanus,
    tetanusdoses,
    lasttetanusdose,
    covidvaccination,
    conjunctiva,
    sclera,
    bloodpressure,
    respiratoryrate,
    temperature,
    pulserate,
    abdomenScars,
    fromcaesareansection,
    fundalheight,
    measurefundalheightweek,
    measurefundalheightcentimeter,
    presentation,
    descent,
    positionoffoetus,
    breastexamination,
    abnormalbreastexamination,
    genitalexamination,
    swelling,
    discharge,
    tenderness,
    ulcers,
    fistulas,
    irregularities,
    swellingyes,
    dischargeyes,
    tendernessyes,
    ulcersyes,
    fistulasyes,
    irregularitiesyes,
    heartrate,
    bmi,
  } = req.body;

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
      dateofbirth,
      lga,
      healthfacility,
      gravidity,
      parity,
      alive,
      lmpknown,
      lmp,
      edd,
      ega,
      laborstarted,
      firstbabymovement,
      doyoufeelthebabysmovement,
      doyouknowdateoffirstbabymovement,
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
    const values = [patient_id, firstvisit_date];
    const createFirstVisitQuery = `INSERT INTO firstvisit (patient_id, firstvisit_date) VALUES (?,?)`;
    const result = await connection.execute(createFirstVisitQuery, values); // Use connection.execute
    return result;
  };

  const createdailyhabit = async (firstvisit_id) => {
    const q = `
    INSERT INTO dailyhabitsandlifestyle (
      firstvisit_id,
      doyou,
      whodoyoulivewith,
      specifywhodoyoulivewith,
      didanyoneever
      ) 
    VALUES (?,?,?,?,?)`;
    const values = [
      firstvisit_id,
      doyou,
      whodoyoulivewith,
      specifywhodoyoulivewith,
      didanyoneever,
    ];
    const result = await connection.execute(q, values);
    return result;
  };
  const createobstetric = async (firstvisit_id) => {
    const values = [
      firstvisit_id,
      obstetrichistory,
      otherinputobstetrichistory,
      yearofpregnancy,
      carriedtoterm,
      modeofdelivery,
      weightofbaby,
      sexofbaby,
      babycriedafterbirth,
      complicationsafterdelivery,
      specifycomplicationsafterdelivery,
      breastfedexclusively,
    ];
    const result = await connection.execute(
      createPatientFirstvisitObstetricQuery(),
      values
    );
    return result;
  };
  const createmedicationHistory = async (firstVisit_id) => {
    const values = [
      firstVisit_id,
      fever,
      chills,
      headaches,
      dizziness,
      convulsions,
      weakness,
      blurryvision,
      cough,
      difficultybreathing,
      severechestpain,
      severeepigastricpain,
      pepticulcerpatient,
      severetiredness,
      severeabdominalpain,
      persistentvomiting,
      severediarrhoea,
      painwithurination,
      severeflankpain,
      bloodinurine,
      increasedurination,
      noticedantsaroundplaceurinated,
      increasedthirst,
      vaginaldischarge,
      deeppelvicpain,
      syphilis,
      syphilistreatment,
      feveryes,
      chillsyes,
      headachesyes,
      dizzinessyes,
      convulsionsyes,
      weaknessyes,
      blurryvisionyes,
      coughyes,
      persistentdrycough,
      persistentdrycoughyes,
      progressiveweightloss,
      progressiveweightlossyes,
      nightsweats,
      nightsweatsyes,
      diagnosedwithtuberculosis,
      diagnosedwithtuberculosisyes,
      treatedTBpreviously,
      treatedTBpreviouslyyes,
      difficultybreathingyes,
      severechestpainyes,
      severeepigastricpainyes,
      palpitations,
      palpitationyes,
      swellingfeet,
      swellingfeetyes,
      difficultytosleep,
      difficultytosleepyes,
      pepticulcerpatientyes,
      severetirednessyes,
      severeabdominalpainyes,
      persistentvomitingyes,
      severediarrhoeayes,
      painwithurinationyes,
      severeflankpainyes,
      bloodinurineyes,
      increasedurinationyes,
      increasedthirstyes,
      vaginaldischargeyes,
      deeppelvicpainyes,
      syphilisyes,
    ];
    const q = `INSERT INTO medicalhistory (
      firstVisit_id,
      fever,
      chills,
      headaches,
      dizziness,
      convulsions,
      weakness,
      blurryvision,
      cough,
      difficultybreathing,
      severechestpain,
      severeepigastricpain,
      pepticulcerpatient,
      severetiredness,
      severeabdominalpain,
      persistentvomiting,
      severediarrhoea,
      painwithurination,
      severeflankpain,
      bloodinurine,
      increasedurination,
      noticedantsaroundplaceurinated,
      increasedthirst,
      vaginaldischarge,
      deeppelvicpain,
      syphilis,
      syphilistreatment,
      feveryes,
      chillsyes,
      headachesyes,
      dizzinessyes,
      convulsionsyes,
      weaknessyes,
      blurryvisionyes,
      coughyes,
      persistentdrycough,
      persistentdrycoughyes,
      progressiveweightloss,
      progressiveweightlossyes,
      nightsweats,
      nightsweatsyes,
      diagnosedwithtuberculosis,
      diagnosedwithtuberculosisyes,
      treatedTBpreviously,
      treatedTBpreviouslyyes,
      difficultybreathingyes,
      severechestpainyes,
      severeepigastricpainyes,
      palpitations,
      palpitationyes,
      swellingfeet,
      swellingfeetyes,
      difficultytosleep,
      difficultytosleepyes,
      pepticulcerpatientyes,
      severetirednessyes,
      severeabdominalpainyes,
      persistentvomitingyes,
      severediarrhoeayes,
      painwithurinationyes,
      severeflankpainyes,
      bloodinurineyes,
      increasedurinationyes,
      increasedthirstyes,
      vaginaldischargeyes,
      deeppelvicpainyes,
      syphilisyes
      ) 
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
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
      hivaids,
      hivaidstreatment,
      covid19,
      otherseriouschronicillnesses,
      specifyseriouschronicillnesses,
      hadsurgery,
      specifyhadsurgery,
      hypertensionyes,
      heartdiseaseyes,
      anaemiayes,
      kidneydiseaseyes,
      sicklecellyes,
      diabetesyes,
      goitreyes,
      hivaidsyes,
      covid19yes,
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
      hivaids,
      hivaidstreatment,
      covid19,
      otherseriouschronicillnesses,
      specifyseriouschronicillnesses,
      hadsurgery,
      specifyhadsurgery,
      hypertensionyes, 
      heartdiseaseyes,
      anaemiayes,
      kidneydiseaseyes,
      sicklecellyes,
      diabetesyes,
      goitreyes,
      hivaidsyes,
      covid19yes
      ) 
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    const result = await connection.execute(q, values);
    return result;
  };
  const createfamilyHistory = async (firstvisit_id) => {
    const values = [
      firstvisit_id,
      patienthaschildren,
      haveyoubreastfedbefore,
      breastfeedingduration,
      breastfeedingproblems,
      breastfeedingproblemsmoredetails,
      babylessthanayear,
      stillbreastfeeding,
      camewithachildunder5years,
      hasunvaccinatedchildren,
      familyepilepsy,
      familyepilepsyyes,
      familyhypertension,
      familyhypertensionyes,
      familyasthma,
      familyasthmayes,
      familydiabetes,
      familydiabetesyes,
      familysicklecell,
      familysicklecellyes,
    ];
    const q = `INSERT INTO familyhistory (
      firstvisit_id,
      patienthaschildren,
      haveyoubreastfedbefore,
      breastfeedingduration,
      breastfeedingproblems ,
      breastfeedingproblemsmoredetails ,
      babylessthanayear,
      stillbreastfeeding,
      camewithachildunder5years,
      hasunvaccinatedchildren ,
      familyepilepsy,
      familyepilepsyyes,
      familyhypertension,
      familyhypertensionyes,
      familyasthma,
      familyasthmayes,
      familydiabetes,
      familydiabetesyes,
      familysicklecell,
      familysicklecellyes
      ) 
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    const result = await connection.execute(q, values);
    return result;
  };
  const createdrugHistory = async (firstvisit_id) => {
    const values = [
      firstvisit_id,
      historyofallergy,
      allergies,
      herbalremedies,
      vitamins,
      otcdrugs,
      dietarysupplements,
      typeofdietarysupplement,
      otherdrugs,
      tetanus,
      tetanusdoses,
      lasttetanusdose,
      covidvaccination,
    ];
    const q = `INSERT INTO drughistory (
      firstvisit_id,
      historyofallergy,
      allergies,
      herbalremedies,
      vitamins,
      otcdrugs,
      dietarysupplements,
      typeofdietarysupplement,
      otherdrugs,
      tetanus,
      tetanusdoses,
      lasttetanusdose,
      covidvaccination
      ) 
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    const result = await connection.execute(q, values);
    return result;
  };
  const createphysicalexamination = async (firstvisit_id) => {
    const values = [
      firstvisit_id,
      conjunctiva,
      sclera,
      bloodpressure,
      respiratoryrate,
      temperature,
      pulserate,
      abdomenScars,
      fromcaesareansection,
      fundalheight,
      measurefundalheightweek,
      measurefundalheightcentimeter,
      presentation,
      descent,
      positionoffoetus,
      breastexamination,
      abnormalbreastexamination,
      genitalexamination,
      swelling,
      discharge,
      tenderness,
      ulcers,
      fistulas,
      irregularities,
      swellingyes,
      dischargeyes,
      tendernessyes,
      ulcersyes,
      fistulasyes,
      irregularitiesyes,
      heartrate,
      bmi,
    ];
    const q = `INSERT INTO physicalexamination (
      firstvisit_id,
      conjunctiva,
      sclera,
      bloodpressure,
      respiratoryrate,
      temperature,
      pulserate,
      abdomenScars,
      fromcaesareansection,
      fundalheight,
      measurefundalheightweek,
      measurefundalheightcentimeter,
      presentation,
      descent,
      positionoffoetus,
      breastexamination,
      abnormalbreastexamination,
      genitalexamination,
      swelling,
      discharge,
      tenderness,
      ulcers,
      fistulas,
      irregularities,
      swellingyes,
      dischargeyes,
      tendernessyes,
      ulcersyes,
      fistulasyes,
      irregularitiesyes,
      heartrate,
      bmi
    ) 
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    const result = await connection.execute(q, values);
    return result;
  };

  const getnewlycreatedpatientrecord = async (patient_id) => {
    const q = `SELECT
    p.*,
    fv.*,
    dhal.*,
    oh.*,
    mh.*,
    pmh.*,
    dh.*,
    fh.*,
    pe.*
FROM
    patients p
JOIN
    firstvisit fv ON p.id = fv.patient_id
LEFT JOIN
    dailyhabitsandlifestyle dhal ON fv.id = dhal.firstvisit_id
LEFT JOIN
    obstetrichistory oh ON fv.id = oh.firstvisit_id
LEFT JOIN
    medicalhistory mh ON fv.id = mh.firstvisit_id
LEFT JOIN
    pastmedicalhistory pmh ON fv.id = pmh.firstvisit_id
LEFT JOIN
    drughistory dh ON fv.id = dh.firstvisit_id
LEFT JOIN
    familyhistory fh ON fv.id = fh.firstvisit_id
LEFT JOIN
    physicalexamination pe ON fv.id = pe.firstvisit_id
WHERE
    p.id = ?;

  `;
    const result = await connection.execute(q, [patient_id]);
    return result[0];
  };

  try {
    await connection.beginTransaction();
    const createdrecord = await personalRecord();
    const personalInformation_id = createdrecord[0].insertId;
    const patientcreate = await createpatient(personalInformation_id);
    const patientID = patientcreate[0].insertId;
    const firstvisitcreation = await createfirstvisit(patientID);
    const firstvisitID = firstvisitcreation[0].insertId;
    await createpastmedicalHistory(firstvisitID);
    await createfamilyHistory(firstvisitID);
    await createdailyhabit(firstvisitID);
    await createobstetric(firstvisitID);
    await createmedicationHistory(firstvisitID);
    await createdrugHistory(firstvisitID);
    await createphysicalexamination(firstvisitID);
    const newpatientrecord = await getnewlycreatedpatientrecord(patientID);

    await connection.commit();
    res.status(201).json({
      statusCode: "201",
      message: "successful",
      result: {
        newpatientrecord,
      },
    });
    connection.release();
  } catch (error) {
    if (connection) {
      await connection.rollback();
      connection.release();
    }
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
  const patientfirstvisitquery = `SELECT
  fv.*,
  dhal.*,
  oh.*,mh.*,pmh.*,dh.*,fh.*,pe.*
FROM
  firstvisit fv
LEFT JOIN
  dailyhabitsandlifestyle dhal ON fv.id = dhal.firstvisit_id
LEFT JOIN
  obstetrichistory oh ON fv.id = oh.firstvisit_id
LEFT JOIN
  medicalhistory mh ON fv.id = mh.firstvisit_id
LEFT JOIN
  pastmedicalhistory pmh ON fv.id = pmh.firstvisit_id
LEFT JOIN
  drughistory dh ON fv.id = dh.firstvisit_id
LEFT JOIN
  familyhistory fh ON fv.id = fh.firstvisit_id
LEFT JOIN
  physicalexamination pe ON fv.id = pe.firstvisit_id
WHERE
  fv.patient_id = ?`;
  const patientreturnvisitquery = `SELECT * from returnvisit WHERE patient_id = ?`;
  const getpatientlastvisit = `SELECT GREATEST(
    (SELECT firstvisit_date FROM firstvisit WHERE patient_id = ?),
    COALESCE((SELECT returnvisit_date FROM returnvisit WHERE patient_id = ?), '1900-01-01')
) AS lastvisit;


`;
  const record = async () => {
    const result = await connection.execute(patientRecordQuery(id));
    return result[0];
  };
  try {
    const response = await record();
    const patientfirstvisit = await connection.execute(patientfirstvisitquery, [
      id,
    ]);
    const patientreturnvisit = await connection.execute(
      patientreturnvisitquery,
      [id]
    );
    const patientlastvisit = await connection.execute(getpatientlastvisit, [
      id,
      id,
    ]);
    if (!response.length) {
      res.status(404).json({
        statusCode: "404",
        message: `Patient with ID of ${id} not found`,
      });
    }
    res.status(200).json({
      statusCode: "200",
      message: "successful",
      result: {
        data: response,
        firstvisit: patientfirstvisit[0],
        returnvisit: patientreturnvisit[0],
        lastvisit: patientlastvisit[0],
      },
    });
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
const getPatientRecordWithVisits = async (req, res) => {
  const connection = await db.getConnection();
  const { id } = req.params;
  const q = `SELECT
  p.*,
  JSON_ARRAYAGG(
      JSON_OBJECT(
          'id', fv.id,
          'dailyhabitsandlifestyle', JSON_OBJECT(
            'doyou',dhal.doyou,
            'whodoyoulivewith',dhal.whodoyoulivewith,
            'specifywhodoyoulivewith',dhal.specifywhodoyoulivewith,
            'didanyoneever',dhal.didanyoneever
          ),
          'medicalhistory', JSON_OBJECT(
            'fever',mh.fever,
            'chills',mh.chills,
            'headaches', mh.headaches,
            'dizziness', mh.dizziness,
            'convulsions', mh.convulsions,
            'weakness', mh.weakness,
            'blurryvision', mh.blurryvision,
            'cough', mh.cough,
            'difficultybreathing', mh.difficultybreathing,
            'severechestpain', mh.severechestpain,
            'severepigastricpain', mh.severepigastricpain,
            'pepticulcerpatient', mh.pepticulcerpatient,
            'severetiredness', mh.severetiredness,
            'severeabdominalpain', mh.severeabdominalpain,
            'persistentvomiting', mh.persistentvomiting,
            'severediarrhoea', mh.severediarrhoea,
            'painwithurination', mh.painwithurination,
            'severeflankpain', mh.severeflankpain,
            'bloodinurine', mh.bloodinurine,
            'increasedurination', mh.increasedurination,
            'noticedantsaroundplaceurinated', mh.noticedantsaroundplaceurinated,
            'increasedthirst', mh.increasedthirst,
            'vaginaldischarge', mh.vaginaldischarge,
            'deeppelvicpain', mh.deeppelvicpain,
            'syphilis', mh.syphilis,
            'syphilistreatment', mh.syphilistreatment,
            'feveryes', mh.feveryes,
            'chillsyes', mh.chillsyes,
            'headachesyes', mh.headachesyes,
            'dizzinessyes', mh.dizzinessyes,
            'convulsionsyes', mh.convulsionsyes,
            'weaknessyes', mh.weaknessyes,
            'blurryvisionyes', mh.blurryvisionyes,
            'coughyes', mh.coughyes,
            'persistentdrycough', mh.persistentdrycough,
            'persistentdrycoughyes', mh.persistentdrycoughyes,
            'progressiveweightloss', mh.progressiveweightloss,
            'progressiveweightlossyes', mh.progressiveweightlossyes,
            'nightsweats', mh.nightsweats,
            'nightsweatsyes', mh.nightsweatsyes,
            'diagnosedwithtuberculosis', mh.diagnosedwithtuberculosis,
            'diagnosedwithtuberculosisyes', mh.diagnosedwithtuberculosisyes,
            'treatedTBpreviously', mh.treatedTBpreviously,
            'treatedTBpreviouslyyes', mh.treatedTBpreviouslyyes,
            'difficultybreathingyes', mh.difficultybreathingyes,
            'severechestpainyes', mh.severechestpainyes,
            'severeepigastricpainyes', mh.severeepigastricpainyes,
            'palpitations', mh.palpitations,
            'palpitationyes', mh.palpitationyes,
            'swellingfeet', mh.swellingfeet,
            'swellingfeetyes', mh.swellingfeetyes,
            'difficultytosleep', mh.difficultytosleep,
            'difficultytosleepyes', mh.difficultytosleepyes,
            'pepticulcerpatientyes', mh.pepticulcerpatientyes,
            'severetirednessyes', mh.severetirednessyes,
            'severeabdominalpainyes', mh.severeabdominalpainyes,
            'persistentvomitingyes', mh.persistentvomitingyes,
            'severediarrhoeayes', mh.severediarrhoeayes,
            'painwithurinationyes', mh.painwithurinationyes,
            'severeflankpainyes', mh.severeflankpainyes,
            'bloodinurineyes', mh.bloodinurineyes,
            'increasedurinationyes', mh.increasedurinationyes,
            'increasedthirstyes', mh.increasedthirstyes,
            'vaginaldischargeyes', mh.vaginaldischargeyes,
            'deeppelvicpainyes', mh.deeppelvicpainyes,
            'syphilisyes', mh.syphilisyes
          ),
      )
  ) AS firstvisit,
  JSON_ARRAYAGG(
      JSON_OBJECT(
          'id', rv.id,
          'returnvisit_date', rv.returnvisit_date,
            'state', rv.state,
            'lga', rv.lga,
            'healthfacility', rv.healthfacility,
            'fever', rv.fever,
            'headache', rv.headache,
            'dizziness', rv.dizziness,
            'convulsions', rv.convulsions,
            'weakness', rv.weakness,
            'blurryvision', rv.blurryvision,
            'cough', rv.cough,
            'difficultybreathing', rv.difficultybreathing,
            'palpitation', rv.palpitation,
            'swellingoffeet', rv.swellingoffeet,
            'severechestpain', rv.severechestpain,
            'severeepigastricpain', rv.severeepigastricpain,
            'pepticulcerpatient', rv.pepticulcerpatient,
            'severetirednesss', rv.severetirednesss,
            'difficultylyingflat', rv.difficultylyingflat,
            'severeabdominalpain', rv.severeabdominalpain,
            'vomiting', rv.vomiting,
            'diarrhoea', rv.diarrhoea,
            'urinarypain', rv.urinarypain,
            'severeflankpain', rv.severeflankpain,
            'bloodinurine', rv.bloodinurine,
            'increasedurination', rv.increasedurination,
            'antsaroundurine', rv.antsaroundurine,
            'increasedthirst', rv.increasedthirst,
            'vaginaldischarge', rv.vaginaldischarge,
            'painduringsex', rv.painduringsex,
            'syphillis', rv.syphillis,
            'receivedcaresincelastvisit', rv.receivedcaresincelastvisit,
            'whoprovidedthecare', rv.whoprovidedthecare,
            'whatcarewasprovided', rv.whatcarewasprovided,
            'outcomeofthecare', rv.outcomeofthecare,
            'takingprescribeddrugs', rv.takingprescribeddrugs,
            'problemtakingdrugs', rv.problemtakingdrugs,
            'followadvice', rv.followadvice,
            'reactionorsideeffects', rv.reactionorsideeffects,
            'anythingrelatedtopregnancy', rv.anythingrelatedtopregnancy,
            'pink', rv.pink,
            'palepink', rv.palepink,
            'whiteincolour', rv.whiteincolour,
            'white', rv.white,
            'tinge', rv.tinge,
            'deepyellow', rv.deepyellow,
            'dirtywhite', rv.dirtywhite,
            'bloodpressure', rv.bloodpressure,
            'respiratoryrate', rv.respiratoryrate,
            'temperature', rv.temperature,
            'pulserate', rv.pulserate,
            'abdomenScars', rv.abdomenScars,
            'palpateAndEstimatefundusdocumentation', rv.palpateAndEstimatefundusdocumentation,
            'distancebtwtopdffundus', rv.distancebtwtopdffundus,
            'cmfromtopfundusdocumentation', rv.cmfromtopfundusdocumentation,
            'cmfromuppersymphysis', rv.cmfromuppersymphysis,
            'presentation', rv.presentation,
            'descent', rv.descent,
            'positionoffoetus', rv.positionoffoetus,
            'persisitentdrycough', rv.persisitentdrycough,
            'unexplainedweightloss', rv.unexplainedweightloss,
            'nightsweats', rv.nightsweats,
            'diagnosedwithtuberculosis', rv.diagnosedwithtuberculosis,
            'treatedfortuberculosis', rv.treatedfortuberculosis,
            'heartrate', rv.heartrate,
            'complaint', rv.complaint,
            'stategenobser', rv.stategenobser,
            'generalwellchoice', rv.generalwellchoice,
            'syphillistreatment', rv.syphillistreatment,
            'pregnancydiscuss', rv.pregnancydiscuss,
            'wakeuptourinate', rv.wakeuptourinate,
            'problemmedication', rv.problemmedication,
            'bmi', rv.bmi
      )
  ) AS returnvisit,
  CASE
      WHEN p.firstvisit_date IS NULL THEN NULL
      ELSE GREATEST(p.firstvisit_date, COALESCE(MAX(rv.returnvisit_date), '1900-01-01'), COALESCE(MAX(fv.firstvisit_date), '1900-01-01'))
  END AS lastvisit
FROM (
  SELECT
      p.*
  FROM patients p
  WHERE p.id = ?
) p
LEFT JOIN firstvisit fv ON p.id = fv.patient_id
LEFT JOIN returnvisit rv ON p.id = rv.patient_id
LEFT JOIN dailyhabitsandlifestyle dhal ON fv.id = dhal.firstvisit_id
LEFT JOIN obstetrichistory oh ON fv.id = oh.firstvisit_id
LEFT JOIN drughistory dh ON fv.id = dh.firstvisit_id
LEFT JOIN medicalhistory mh ON fv.id = mh.firstvisit_id
LEFT JOIN pastmedicalhistory pmh ON fv.id = pmh.firstvisit_id
LEFT JOIN familyhistory fh ON fv.id = fh.firstvisit_id
LEFT JOIN physicalexamination pe ON fv.id = pe.firstvisit_id
GROUP BY p.id;


`;
  const record = async () => {
    const result = await connection.execute(q, [id]);
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
    returnvisit_date,
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
    complaint,
    stategenobser,
    generalwellchoice,
    syphillistreatment,
    pregnancydiscuss,
    wakeuptourinate,
    problemmedication,
    bmi,
  } = req.body;

  try {
    const values = [
      patient_id,
      returnvisit_date,
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
      complaint,
      stategenobser,
      generalwellchoice,
      syphillistreatment,
      pregnancydiscuss,
      wakeuptourinate,
      problemmedication,
      bmi,
    ];

    const connection = await db.getConnection();

    const q = `INSERT INTO returnvisit (
        patient_id,
        returnvisit_date,
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
        pregnancydiscuss,
        wakeuptourinate,
        problemmedication,
        bmi
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
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
        SELECT patient_id, returnvisit_date FROM returnvisit
        UNION ALL
        SELECT patient_id, firstvisit_date FROM firstvisit
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
    oh.*,mh.*,pmh.*,dh.*,fh.*,pe.*
  FROM
    firstvisit fv
  LEFT JOIN
    dailyhabitsandlifestyle dhal ON fv.id = dhal.firstvisit_id
  LEFT JOIN
    obstetrichistory oh ON fv.id = oh.firstvisit_id
  LEFT JOIN
    medicalhistory mh ON fv.id = mh.firstvisit_id
  LEFT JOIN
    pastmedicalhistory pmh ON fv.id = pmh.firstvisit_id
  LEFT JOIN
    drughistory dh ON fv.id = dh.firstvisit_id
  LEFT JOIN
    familyhistory fh ON fv.id = fh.firstvisit_id
  LEFT JOIN
    physicalexamination pe ON fv.id = pe.firstvisit_id
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

const createdeliveryreport = async (req, res) => {
  const connection = await db.getConnection();
  const {
    healthpersonnel_id,
    patient_id,
    gendermale,
    genderfemale,
    numberofchildren,
    deliverydate,
    deliverytime,
  } = req.body;
  const values = [
    healthpersonnel_id,
    patient_id,
    gendermale,
    genderfemale,
    numberofchildren,
    deliverydate,
    deliverytime,
  ];
  try {
    const q = `INSERT INTO deliveryreport (
      healthpersonnel_id,
      patient_id,
      gendermale,
      genderfemale,
      numberofchildren,
      deliverydate,
      deliverytime
      ) VALUES (?,?,?,?,?,?,?)`;
    const result = await connection.execute(q, values);
    const testresultid = result[0].insertId;
    const q2 = `SELECT * FROM deliveryreport WHERE id = ?`;
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

const getAPatientsDeliveryreport = async (req, res) => {
  const connection = await db.getConnection();
  const patient_id = req.query.patient_id;
  try {
    const q = `SELECT * FROM deliveryreport WHERE patient_id = ?`;
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

const requestingatest = async (req, res) => {
  const connection = await db.getConnection();
  const { healthpersonnel_id, testoption_id, patient_id } = req.body;
  const values = [healthpersonnel_id, testoption_id, patient_id];
  try {
    const q = `INSERT INTO requestedtest (healthpersonnel_id, testoption_id, patient_id) VALUES (?,?,?)`;
    const requestatest = await connection.execute(q, values);
    res.status(201).json({ statusCode: "201", message: "successful" });
  } catch (error) {
    res.status(500).json({ statusCode: "500", message: error });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const createtestoptions = async (req, res) => {
  const connection = await db.getConnection();
  const { name } = req.body;
  const values = [name];
  try {
    const q = `INSERT INTO testoption (name) VALUES (?)`;
    const testoption = await connection.execute(q, values);
    res.status(201).json({ statusCode: "201", message: "successful" });
  } catch (error) {
    res.status(500).json({ statusCode: "500", message: error });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const datanumbers = async (req, res) => {
  const connection = await db.getConnection();
  try {
    const firstvisitcount = `SELECT COUNT(*) AS firstvisit FROM firstvisit;
    `;
    const returnvisitcount = `SELECT COUNT(*) AS returnvisit FROM returnvisit;
    `;
    const testresultcount = `SELECT COUNT(*) AS testresult FROM testresult;
    `;
    const schedulecount = `SELECT COUNT(*) AS schedule FROM schedule;
    `;
    const deliveryreportcount = `SELECT COUNT(*) AS deliveryreport FROM deliveryreport;
    `;
    const fv = await connection.execute(firstvisitcount);
    const rv = await connection.execute(returnvisitcount);
    const tr = await connection.execute(testresultcount);
    const sch = await connection.execute(schedulecount);
    const dr = await connection.execute(deliveryreportcount);
    const { firstvisit } = fv[0][0];
    const { returnvisit } = rv[0][0];
    const { testresult } = tr[0][0];
    const { schedule } = sch[0][0];
    const { delivery } = dr[0][0];
    res.status(200).json({
      statusCode: "200",
      result: { firstvisit, returnvisit, testresult, schedule, delivery },
    });
  } catch (error) {
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
  getPatientRecordWithVisits,
  createPatientEveryVisit,
  getPatientFirstVisit,
  getPatientReturnVisit,
  getAllPatients,
  getAllPatientsAndHealthworker,
  getPatientPersonalinfo,
  createTest,
  updateTest,
  requestingatest,
  createtestoptions,
  getAPatientsTest,
  createdeliveryreport,
  getAPatientsDeliveryreport,
  datanumbers,
};
