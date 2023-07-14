// This is a combined controller for the patients

const db = require("../../config/db");
const {
  createPatientPersonalInfoQuery,
  patientRecordQuery,
  createPatientFirstvisitDailyhabitQuery,
  createPatientFirstvisitObstetricQuery,
} = require("../../queries/user/user");

const createPatient = async (req, res, next) => {
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

  const personalRecord = () => {
    return new Promise((resolve, reject) => {
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
          if (err) {
            reject(err);
          } else {
            const user = result;
            resolve(user);
          }
        }
      );
    });
  };
  const createpatient = (personalInformation_id) => {
    const createPatientQuery = `INSERT INTO patients (healthpersonnel_id,firstVisit_date, personalInformation_id)
    VALUES ('${healthpersonnel_id}','${firstVisit_date}', '${personalInformation_id}')`;
    return new Promise((resolve, reject) => {
      db.query(createPatientQuery, (err, result) => {
        if (err) {
          reject(err);
        } else {
          const user = result;
          resolve(user);
        }
      });
    });
  };
  const createfirstvisit = (patient_id) => {
    const createFirstVisitQuery = `INSERT INTO firstVisit (patient_id, createdAt) VALUES ('${patient_id}','${firstVisit_date}')`;
    return new Promise((resolve, reject) => {
      db.query(createFirstVisitQuery, (err, result) => {
        if (err) {
          reject(err);
        } else {
          const user = result;
          resolve(user);
        }
      });
    });
  };

  const createdailyhabit = (firstVisit_id) => {
    return new Promise((resolve, reject) => {
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
          if (err) {
            reject(err);
          } else {
            const user = result;
            resolve(user);
          }
        }
      );
    });
  };
  const createobstetric = (firstVisit_id) => {
    return new Promise((resolve, reject) => {
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
          obstetricothers1,
          breastfedbefore,
          durationyoubreastfedyourbaby,
          breastfeedingproblems,
          others2
        ),
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            const user = result;
            resolve(user);
          }
        }
      );
    });
  };
  const createmedicationHistory = (firstVisit_id) => {
    const q = `INSERT INTO medicationHistory (
      firstVisit_id,
      allergies,
      symptoms
      ) 
    VALUES ('${firstVisit_id}','${allergies}', '${symptoms}')`;
    return new Promise((resolve, reject) => {
      db.query(q, (err, result) => {
        if (err) {
          reject(err);
        } else {
          const user = result;
          resolve(user);
        }
      });
    });
  };
  const createmedicationHistorypulmonary = (medicationHistory_id) => {
    const q = `INSERT INTO pulmonary (
      medicationHistory_id,
      cough,
      difficultyBreathing
      ) 
    VALUES ('${medicationHistory_id}','${cough}', '${difficultyBreathing}')`;
    return new Promise((resolve, reject) => {
      db.query(q, (err, result) => {
        if (err) {
          reject(err);
        } else {
          const user = result;
          resolve(user);
        }
      });
    });
  };
  const createmedicationHistorycardio = (medicationHistory_id) => {
    const q = `INSERT INTO cardiovascular (
      medicationHistory_id,
      palpitation,
      swellingoffeet,severechestpain,Severeepigastricpain,Severetirednesss,difficultylyingflat
      ) 
    VALUES ('${medicationHistory_id}','${palpitation}', '${swellingoffeet}', '${severechestpain}','${Severeepigastricpain}','${Severetirednesss}','${difficultylyingflat}')`;
    return new Promise((resolve, reject) => {
      db.query(q, (err, result) => {
        if (err) {
          reject(err);
        } else {
          const user = result;
          resolve(user);
        }
      });
    });
  };
  const createmedicationHistoryneuro = (medicationHistory_id) => {
    const q = `INSERT INTO neurologic (
      medicationHistory_id,
      headaches,
      dizziness
      ) 
    VALUES ('${medicationHistory_id}','${headaches}', '${dizziness}')`;
    return new Promise((resolve, reject) => {
      db.query(q, (err, result) => {
        if (err) {
          reject(err);
        } else {
          const user = result;
          resolve(user);
        }
      });
    });
  };
  const createmedicationHistoryGastro = (medicationHistory_id) => {
    const q = `INSERT INTO gastrointestinal (
      medicationHistory_id,
      severeabdominalpain, vomiting, diarrhoea
      ) 
    VALUES ('${medicationHistory_id}','${severeabdominalpain}', '${vomiting}','${diarrhoea}')`;
    return new Promise((resolve, reject) => {
      db.query(q, (err, result) => {
        if (err) {
          reject(err);
        } else {
          const user = result;
          resolve(user);
        }
      });
    });
  };
  const createmedicationHistoryUrinary = (medicationHistory_id) => {
    const q = `INSERT INTO urinary (
      medicationHistory_id,
      pain, severeflankpain, bloodinurine,swollenface
      ) 
    VALUES ('${medicationHistory_id}','${pain}', '${severeflankpain}','${bloodinurine}','${swollenface}')`;
    return new Promise((resolve, reject) => {
      db.query(q, (err, result) => {
        if (err) {
          reject(err);
        } else {
          const user = result;
          resolve(user);
        }
      });
    });
  };
  const createmedicationHistoryGynae = (medicationHistory_id) => {
    const q = `INSERT INTO gynaecological (
      medicationHistory_id,
      Vaginaldischarge,
      painduringsex,
      syphillis
      ) 
    VALUES ('${medicationHistory_id}','${Vaginaldischarge}', '${painduringsex}','${syphillis}')`;
    return new Promise((resolve, reject) => {
      db.query(q, (err, result) => {
        if (err) {
          reject(err);
        } else {
          const user = result;
          resolve(user);
        }
      });
    });
  };
  const createmedicationHistoryHistoryof = (medicationHistory_id) => {
    const q = `INSERT INTO historyof (
      medicationHistory_id,
      drycough, weightloss, nightsweat,tuberculosisdiagnosed,tuberculosistreated
      ) 
    VALUES ('${medicationHistory_id}','${drycough}', '${weightloss}','${nightsweat}','${tuberculosisdiagnosed}','${tuberculosistreated}')`;
    return new Promise((resolve, reject) => {
      db.query(q, (err, result) => {
        if (err) {
          reject(err);
        } else {
          const user = result;
          resolve(user);
        }
      });
    });
  };
  const createmedicationHistoryDiagnosedof = (medicationHistory_id) => {
    const q = `INSERT INTO diagnosedof (
      medicationHistory_id,
      heartdisease, Anaemia, kidney,sicklecell,diabetes,goitre,hiv,covid,anyother,admitted,reasonforadmission,surgery,reasonforsurgery
      ) 
    VALUES ('${medicationHistory_id}','${heartdisease}', '${Anaemia}','${kidney}','${sicklecell}','${diabetes}','${goitre}','${hiv}','${covid}','${anyother}','${admitted}','${reasonforadmission}','${surgery}','${reasonforsurgery}')`;
    return new Promise((resolve, reject) => {
      db.query(q, (err, result) => {
        if (err) {
          reject(err);
        } else {
          const user = result;
          resolve(user);
        }
      });
    });
  };
  const createmedicationHistoryOnmedications = (medicationHistory_id) => {
    const q = `INSERT INTO onmedications (
      medicationHistory_id,
      traditional, herbalremedies, vitamins,otcDrugs,dietary,others1,tetanus,tetanusdoses,lastTetanusdose,covidVaccination
      ) 
    VALUES ('${medicationHistory_id}','${traditional}', '${herbalremedies}','${vitamins}','${otcDrugs}','${dietary}','${onmedicationsothers1}','${tetanus}','${tetanusdoses}','${lastTetanusdose}','${covidVaccination}')`;
    return new Promise((resolve, reject) => {
      db.query(q, (err, result) => {
        if (err) {
          reject(err);
        } else {
          const user = result;
          resolve(user);
        }
      });
    });
  };

  //create patient personal record
  try {
    const createdrecord = await personalRecord();
    const personalInformation_id = createdrecord.insertId;
    const patientcreate = await createpatient(personalInformation_id);
    const patientID = patientcreate.insertId;
    const firstvisitcreation = await createfirstvisit(patientID);
    const firstvisitID = firstvisitcreation.insertId;
    const dailyhabitcreation = await createdailyhabit(firstvisitID);
    const obstetricCreation = await createobstetric(firstvisitID);
    const medicationCreation = await createmedicationHistory(firstvisitID);
    const medicationHistory_id = medicationCreation.insertId;
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

    res.status(201).json({
      personalInformation_id: personalInformation_id,
      patientID: patientID,
      firstvisitID: firstvisitID,
      dailyhabit: dailyhabitcreation.insertId,
      obstetric: obstetricCreation.insertId,
      medicationpulmonary: medicationpulmonary.insertId,
      medicationcardio: medicationcardio.insertId,
      medicationneuro: medicationneuro.insertId,
      medicationgastro: medicationgastro.insertId,
      medicationurinary: medicationurinary.insertId,
      medicationGynae: medicationGynae.insertId,
      medicationhistoryof: medicationhistoryof.insertId,
      medicationdiagnosedof: medicationdiagnosedof.insertId,
      medicationOnMedications: medicationOnMedications.insertId,
    });
  } catch (err) {
    console.error(err);
  }
};

const getPatientRecord = async (req, res) => {
  const { id } = req.params;
  const record = () => {
    return new Promise((resolve, reject) => {
      db.query(patientRecordQuery(id), (err, result) => {
        if (err) {
          reject(err);
        } else {
          const user = result;
          resolve(user);
        }
      });
    });
  };
  try {
    const response = await record();
    res.status(200).json(response);
  } catch (err) {}
};

const createPatientEveryVisit = async (req, res, next) => {
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
  const everyVisit = () => {
    return new Promise((resolve, reject) => {
      const q = `INSERT INTO everyVisit (
        patient_id
        ) 
      VALUES ('${patient_id}')`;
      db.query(q, (err, result) => {
        if (err) {
          reject(err);
        } else {
          const user = result;
          resolve(user);
        }
      });
    });
  };
  const facialExpression = (everyVisit_id) => {
    return new Promise((resolve, reject) => {
      const q = `INSERT INTO facialExpression (
        everyVisit_id, responsive, dull, unresponsive 
        ) 
      VALUES ('${everyVisit_id}','${responsive}','${dull}','${unresponsive}')`;
      db.query(q, (err, result) => {
        if (err) {
          reject(err);
        } else {
          const user = result;
          resolve(user);
        }
      });
    });
  };
  const herSkin = (everyVisit_id) => {
    return new Promise((resolve, reject) => {
      const q = `INSERT INTO herSkin (
        everyVisit_id, freeFromBruises, hasBruises
        ) 
      VALUES ('${everyVisit_id}','${freeFromBruises}','${hasBruises}')`;
      db.query(q, (err, result) => {
        if (err) {
          reject(err);
        } else {
          const user = result;
          resolve(user);
        }
      });
    });
  };
  const herConjunctiva = (everyVisit_id) => {
    return new Promise((resolve, reject) => {
      const q = `INSERT INTO herConjunctiva (
        everyVisit_id, pink, palePink,whiteInColour
        ) 
      VALUES ('${everyVisit_id}','${pink}','${palePink}','${whiteInColour}')`;
      db.query(q, (err, result) => {
        if (err) {
          reject(err);
        } else {
          const user = result;
          resolve(user);
        }
      });
    });
  };
  const sclera = (everyVisit_id) => {
    return new Promise((resolve, reject) => {
      const q = `INSERT INTO sclera (
        everyVisit_id, white, tinge, deepYellow,dirtyWhite
        ) 
      VALUES ('${everyVisit_id}','${white}','${tinge}','${deepYellow}','${dirtyWhite}')`;
      db.query(q, (err, result) => {
        if (err) {
          reject(err);
        } else {
          const user = result;
          resolve(user);
        }
      });
    });
  };
  const bloodpressurecall = (everyVisit_id) => {
    return new Promise((resolve, reject) => {
      const q = `INSERT INTO bloodpressure (
        everyVisit_id, bloodpressure
        ) 
      VALUES ('${everyVisit_id}','${bloodpressure}')`;
      db.query(q, (err, result) => {
        if (err) {
          reject(err);
        } else {
          const user = result;
          resolve(user);
        }
      });
    });
  };
  const adbominalExamination = (everyVisit_id) => {
    return new Promise((resolve, reject) => {
      const q = `INSERT INTO adbominalExamination (
        everyVisit_id, abdomenScars, palpateAndEstimatefundusdocumentation, distancebtwTopOfFundusinWeeks,cmFromTopfundusdocumentation ,distancebtwTopOfFundusinCM
        ) 
      VALUES ('${everyVisit_id}','${abdomenScars}','${palpateAndEstimatefundusdocumentation}','${distancebtwTopOfFundusinWeeks}','${cmFromTopfundusdocumentation}','${distancebtwTopOfFundusinCM}')`;
      db.query(q, (err, result) => {
        if (err) {
          reject(err);
        } else {
          const user = result;
          resolve(user);
        }
      });
    });
  };
  const generalCleanliness = (everyVisit_id) => {
    return new Promise((resolve, reject) => {
      const q = `INSERT INTO generalCleanliness (
        everyVisit_id, noVisibleDirt, noodour, visibleDirt, odour 
        ) 
      VALUES ('${everyVisit_id}','${noVisibleDirt}','${noodour}','${visibleDirt}','${odour}')`;
      db.query(q, (err, result) => {
        if (err) {
          reject(err);
        } else {
          const user = result;
          resolve(user);
        }
      });
    });
  };
  try {
    const everyVisitres = await everyVisit();
    const everyVisitID = everyVisitres.insertId;
    await facialExpression(everyVisitID);
    await herSkin(everyVisitID);
    await generalCleanliness(everyVisitID);
    await adbominalExamination(everyVisitID);
    await bloodpressurecall(everyVisitID);
    await sclera(everyVisitID);
    await herConjunctiva(everyVisitID);
    res.status(201).json({
      everyVisitID: everyVisitID,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = { createPatient, getPatientRecord, createPatientEveryVisit };
