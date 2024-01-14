// This is a combined controller for the patients

const db = require("../../config/db");
const logger = require("../../logger");
const {
  createPatientPersonalInfoQuery,
  patientRecordQuery,
  createPatientFirstvisitDailyhabitQuery,
  createPatientFirstvisitObstetricQuery,
} = require("../../queries/user/user");
const {
  updateSessionFirstvisit,
  updateSessionReturnvisit,
} = require("../session");

const createPatient = async (req, res, next) => {
  const connection = await db.getConnection();
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
    doyousmoke,
    doyoudrinkalcohol,
    othersubstances,
    doyounone,
    whodoyoulivewith,
    specifywhodoyoulivewith,
    stoppedfromleavingthehouse,
    threatenedyourlife,
    abusedphysically,
    didanyoneevernone,
    convulsionsduringpregnancy,
    caesarean,
    tearsthroughsphincter,
    postpartiumhaemorrghage,
    stillbirths,
    prematuredeliveries,
    lowbirthbabies,
    babieswhodied,
    miscarriages,
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
    observation,
    percussion,
    palpationchest,
    auscultationchest,
  } = req.body;

  logger.info({
    hospitalnumber: hospitalnumber,
    firstname: firstname,
    middlename: middlename,
    surname: surname,
    phone: phone,
    address: address,
    state: state,
    dateofbirth: dateofbirth,
    lga: lga,
    healthfacility: healthfacility,
    gravidity: gravidity,
    parity: parity,
    alive: alive,
    lmpknown: lmpknown,
    lmp: lmp,
    edd: edd,
    ega: ega,
    laborstarted: laborstarted,
    firstbabymovement: firstbabymovement,
    doyoufeelthebabysmovement: doyoufeelthebabysmovement,
    doyouknowdateoffirstbabymovement: doyouknowdateoffirstbabymovement,
    healthpersonnel_id: healthpersonnel_id,
    firstvisit_date: firstvisit_date,
    doyousmoke: doyousmoke,
    doyoudrinkalcohol: doyoudrinkalcohol,
    othersubstances: othersubstances,
    doyounone: doyounone,
    whodoyoulivewith: whodoyoulivewith,
    specifywhodoyoulivewith: specifywhodoyoulivewith,
    stoppedfromleavingthehouse: stoppedfromleavingthehouse,
    threatenedyourlife: threatenedyourlife,
    abusedphysically: abusedphysically,
    didanyoneevernone: didanyoneevernone,
    convulsionsduringpregnancy: convulsionsduringpregnancy,
    caesarean: caesarean,
    tearsthroughsphincter: tearsthroughsphincter,
    postpartiumhaemorrghage: postpartiumhaemorrghage,
    stillbirths: stillbirths,
    prematuredeliveries: prematuredeliveries,
    lowbirthbabies: lowbirthbabies,
    babieswhodied: babieswhodied,
    miscarriages: miscarriages,
    otherinputobstetrichistory: otherinputobstetrichistory,
    yearofpregnancy: yearofpregnancy,
    carriedtoterm: carriedtoterm,
    modeofdelivery: modeofdelivery,
    weightofbaby: weightofbaby,
    sexofbaby: sexofbaby,
    babycriedafterbirth: babycriedafterbirth,
    complicationsafterdelivery: complicationsafterdelivery,
    specifycomplicationsafterdelivery: specifycomplicationsafterdelivery,
    breastfedexclusively: breastfedexclusively,
    fever: fever,
    chills: chills,
    headaches: headaches,
    dizziness: dizziness,
    convulsions: convulsions,
    weakness: weakness,
    blurryvision: blurryvision,
    cough: cough,
    difficultybreathing: difficultybreathing,
    severechestpain: severechestpain,
    severeepigastricpain: severeepigastricpain,
    pepticulcerpatient: pepticulcerpatient,
    severetiredness: severetiredness,
    severeabdominalpain: severeabdominalpain,
    persistentvomiting: persistentvomiting,
    severediarrhoea: severediarrhoea,
    painwithurination: painwithurination,
    severeflankpain: severeflankpain,
    bloodinurine: bloodinurine,
    increasedurination: increasedurination,
    noticedantsaroundplaceurinated: noticedantsaroundplaceurinated,
    increasedthirst: increasedthirst,
    vaginaldischarge: vaginaldischarge,
    deeppelvicpain: deeppelvicpain,
    syphilis: syphilis,
    syphilistreatment: syphilistreatment,
    feveryes: feveryes,
    chillsyes: chillsyes,
    headachesyes: headachesyes,
    dizzinessyes: dizzinessyes,
    convulsionsyes: convulsionsyes,
    weaknessyes: weaknessyes,
    blurryvisionyes: blurryvisionyes,
    coughyes: coughyes,
    persistentdrycough: persistentdrycough,
    persistentdrycoughyes: persistentdrycoughyes,
    progressiveweightloss: progressiveweightloss,
    progressiveweightlossyes: progressiveweightlossyes,
    nightsweats: nightsweats,
    nightsweatsyes: nightsweatsyes,
    diagnosedwithtuberculosis: diagnosedwithtuberculosis,
    diagnosedwithtuberculosisyes: diagnosedwithtuberculosisyes,
    treatedTBpreviously: treatedTBpreviously,
    treatedTBpreviouslyyes: treatedTBpreviouslyyes,
    difficultybreathingyes: difficultybreathingyes,
    severechestpainyes: severechestpainyes,
    severeepigastricpainyes: severeepigastricpainyes,
    palpitations: palpitations,
    palpitationyes: palpitationyes,
    swellingfeet: swellingfeet,
    swellingfeetyes: swellingfeetyes,
    difficultytosleep: difficultytosleep,
    difficultytosleepyes: difficultytosleepyes,
    pepticulcerpatientyes: pepticulcerpatientyes,
    severetirednessyes: severetirednessyes,
    severeabdominalpainyes: severeabdominalpainyes,
    persistentvomitingyes: persistentvomitingyes,
    severediarrhoeayes: severediarrhoeayes,
    painwithurinationyes: painwithurinationyes,
    severeflankpainyes: severeflankpainyes,
    bloodinurineyes: bloodinurineyes,
    increasedurinationyes: increasedurinationyes,
    increasedthirstyes: increasedthirstyes,
    vaginaldischargeyes: vaginaldischargeyes,
    deeppelvicpainyes: deeppelvicpainyes,
    syphilisyes: syphilisyes,
    patienthaschildren: patienthaschildren,
    haveyoubreastfedbefore: haveyoubreastfedbefore,
    breastfeedingduration: breastfeedingduration,
    breastfeedingproblems: breastfeedingproblems,
    breastfeedingproblemsmoredetails: breastfeedingproblemsmoredetails,
    babylessthanayear: babylessthanayear,
    stillbreastfeeding: stillbreastfeeding,
    camewithachildunder5years: camewithachildunder5years,
    hasunvaccinatedchildren: hasunvaccinatedchildren,
    familyepilepsy: familyepilepsy,
    familyepilepsyyes: familyepilepsyyes,
    familyhypertension: familyhypertension,
    familyhypertensionyes: familyhypertensionyes,
    familyasthma: familyasthma,
    familyasthmayes: familyasthmayes,
    familydiabetes: familydiabetes,
    familydiabetesyes: familydiabetesyes,
    familysicklecell: familysicklecell,
    familysicklecellyes: familysicklecellyes,
    hypertension: hypertension,
    heartdisease: heartdisease,
    anaemia: anaemia,
    kidneydisease: kidneydisease,
    sicklecell: sicklecell,
    diabetes: diabetes,
    goitre: goitre,
    hivaids: hivaids,
    hivaidstreatment: hivaidstreatment,
    covid19: covid19,
    otherseriouschronicillnesses: otherseriouschronicillnesses,
    specifyseriouschronicillnesses: specifyseriouschronicillnesses,
    hadsurgery: hadsurgery,
    specifyhadsurgery: specifyhadsurgery,
    hypertensionyes: hypertensionyes,
    heartdiseaseyes: heartdiseaseyes,
    anaemiayes: anaemiayes,
    kidneydiseaseyes: kidneydiseaseyes,
    sicklecellyes: sicklecellyes,
    diabetesyes: diabetesyes,
    goitreyes: goitreyes,
    hivaidsyes: hivaidsyes,
    covid19yes: covid19yes,
    historyofallergy: historyofallergy,
    allergies: allergies,
    herbalremedies: herbalremedies,
    vitamins: vitamins,
    otcdrugs: otcdrugs,
    dietarysupplements: dietarysupplements,
    typeofdietarysupplement: typeofdietarysupplement,
    otherdrugs: otherdrugs,
    tetanus: tetanus,
    tetanusdoses: tetanusdoses,
    lasttetanusdose: lasttetanusdose,
    covidvaccination: covidvaccination,
    conjunctiva: conjunctiva,
    sclera: sclera,
    bloodpressure: bloodpressure,
    respiratoryrate: respiratoryrate,
    temperature: temperature,
    pulserate: pulserate,
    abdomenScars: abdomenScars,
    fromcaesareansection: fromcaesareansection,
    fundalheight: fundalheight,
    measurefundalheightweek: measurefundalheightweek,
    measurefundalheightcentimeter: measurefundalheightcentimeter,
    presentation: presentation,
    descent: descent,
    positionoffoetus: positionoffoetus,
    breastexamination: breastexamination,
    abnormalbreastexamination: abnormalbreastexamination,
    genitalexamination: genitalexamination,
    swelling: swelling,
    discharge: discharge,
    tenderness: tenderness,
    ulcers: ulcers,
    fistulas: fistulas,
    irregularities: irregularities,
    swellingyes: swellingyes,
    dischargeyes: dischargeyes,
    tendernessyes: tendernessyes,
    ulcersyes: ulcersyes,
    fistulasyes: fistulasyes,
    irregularitiesyes: irregularitiesyes,
    heartrate: heartrate,
    bmi: bmi,
    observation: observation,
    percussion: percussion,
    palpationchest: palpationchest,
    auscultationchest: auscultationchest,
  });

  const checkIfPatientWithPhoneNumberExists = async () => {
    const q = `SELECT * FROM personalinformation WHERE phone = ?`;
    try {
      const result = await connection.execute(q, [phone]);
      if (result[0].length) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      logger.error({
        method: "checkIfPatientWithPhoneNumberExists",
        error: error,
      });
    }
  };

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

    const patientexists = await checkIfPatientWithPhoneNumberExists();
    if (!patientexists) {
      const result = await connection.execute(query, values);
      return result;
    } else {
      return;
    }
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
      doyousmoke,
      doyoudrinkalcohol,
      othersubstances,
      doyounone,
      whodoyoulivewith,
      specifywhodoyoulivewith,
      stoppedfromleavingthehouse,
      threatenedyourlife,
      abusedphysically,
      didanyoneevernone
      ) 
    VALUES (?,?,?,?,?,?,?,?,?,?,?)`;
    const values = [
      firstvisit_id,
      doyousmoke,
      doyoudrinkalcohol,
      othersubstances,
      doyounone,
      whodoyoulivewith,
      specifywhodoyoulivewith,
      stoppedfromleavingthehouse,
      threatenedyourlife,
      abusedphysically,
      didanyoneevernone,
    ];
    const result = await connection.execute(q, values);
    return result;
  };
  const createobstetric = async (firstvisit_id) => {
    const values = [
      firstvisit_id,
      convulsionsduringpregnancy,
      caesarean,
      tearsthroughsphincter,
      postpartiumhaemorrghage,
      stillbirths,
      prematuredeliveries,
      lowbirthbabies,
      babieswhodied,
      miscarriages,
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
      observation,
      percussion,
      palpationchest,
      auscultationchest,
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
      bmi,
      observation,
      percussion,
      palpationchest,
      auscultationchest
    ) 
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    const result = await connection.execute(q, values);
    return result;
  };

  const getnewlycreatedpatientrecord = async (patient_id) => {
    const q = `SELECT
    p.*,
    pi.*,
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
JOIN 
    personalinformation pi ON p.id = pi.id
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
    //session
    // await updateSessionFirstvisit(firstvisitID, healthpersonnel_id);
    await createpastmedicalHistory(firstvisitID);
    await createfamilyHistory(firstvisitID);
    await createdailyhabit(firstvisitID);
    await createobstetric(firstvisitID);
    await createmedicationHistory(firstvisitID);
    await createdrugHistory(firstvisitID);
    await createphysicalexamination(firstvisitID);

    await connection.commit();

    const newpatientrecord = await getnewlycreatedpatientrecord(patientID);
    const result = newpatientrecord[0];

    res.status(201).json({
      statusCode: "201",
      message: "successful",
      result,
    });
  } catch (error) {
    if (connection) {
      try {
        await connection.rollback();
      } catch (rollbackError) {
        console.error("Rollback error:", rollbackError);
      } finally {
        connection.release();
      }

      res.status(error.statusCode || 500).json({
        statusCode: error.statusCode || "500",
        error: error.sqlMessage ? error.sqlMessage : error,
      });
    }
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
  const getpatientlastvisit = `SELECT MAX(visit_date) AS lastvisit
  FROM (
      SELECT firstvisit_date AS visit_date FROM firstvisit WHERE patient_id = ?
      UNION
      SELECT returnvisit_date AS visit_date FROM returnvisit WHERE patient_id = ?
  ) AS all_dates;
`;
  const record = async () => {
    const result = await connection.execute(patientRecordQuery(id));
    return result[0];
  };
  try {
    const result = await connection.execute(patientRecordQuery(id));
    const data = result[0][0];
    if (!result[0].length) {
      res.status(404).json({
        statusCode: "404",
        message: `Patient with ID of ${id} not found`,
      });
    } else {
      const patientfirstvisit = await connection.execute(
        patientfirstvisitquery,
        [id]
      );
      const patientreturnvisit = await connection.execute(
        patientreturnvisitquery,
        [id]
      );
      const patientlastvisit = await connection.execute(getpatientlastvisit, [
        id,
        id,
      ]);

      res.status(200).json({
        statusCode: "200",
        message: "successful",
        result: {
          data,
          firstvisit: patientfirstvisit[0],
          returnvisit: patientreturnvisit[0],
          lastvisit: patientlastvisit[0],
        },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
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
            'doyousmoke',dhal.doyousmoke,
            'doyoudrinkalcohol',dhal.doyoudrinkalcohol,
            'othersubstances',dhal.othersubstances,
            'doyounone',dhal.doyounone,
            'whodoyoulivewith',dhal.whodoyoulivewith,
            'specifywhodoyoulivewith',dhal.specifywhodoyoulivewith,
            'stoppedfromleavingthehouse',dhal.stoppedfromleavingthehouse,
            'threatenedyourlife',dhal.threatenedyourlife,
            'abusedphysically',dhal.abusedphysically,
            'didanyoneevernone',dhal.didanyoneevernone
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
  let connection;

  try {
    connection = await db.getConnection();

    const q = `
      SELECT patients.*, personalinformation.*,healthpersonnel.state, healthpersonnel.lga, healthpersonnel.healthfacility
      FROM patients
      LEFT JOIN healthpersonnel ON patients.healthpersonnel_id = healthpersonnel.id
      INNER JOIN personalinformation ON patients.personalinformation_id = personalinformation.id
    `;

    const [result] = await connection.execute(q);

    res.status(200).json({ statusCode: "200", message: "successful", result });
  } catch (err) {
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
const getAllPatientstate = async (req, res) => {
  const { state } = req.query;
  let connection;

  try {
    connection = await db.getConnection();

    const q = `
      SELECT patients.*, personalinformation.*,healthpersonnel.state, healthpersonnel.lga, healthpersonnel.healthfacility
      FROM patients
      LEFT JOIN healthpersonnel ON patients.healthpersonnel_id = healthpersonnel.id
      INNER JOIN personalinformation ON patients.personalinformation_id = personalinformation.id
      WHERE healthpersonnel.state = ?
    `;

    const [result] = await connection.execute(q, [state]);

    res.status(200).json({ statusCode: "200", message: "successful", result });
  } catch (err) {
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
const getAllPatientlga = async (req, res) => {
  const { lga } = req.query;
  let connection;

  try {
    connection = await db.getConnection();

    const q = `
      SELECT patients.*, personalinformation.*,healthpersonnel.state, healthpersonnel.lga, healthpersonnel.healthfacility
      FROM patients
      LEFT JOIN healthpersonnel ON patients.healthpersonnel_id = healthpersonnel.id
      INNER JOIN personalinformation ON patients.personalinformation_id = personalinformation.id
      WHERE healthpersonnel.lga = ?
    `;

    const [result] = await connection.execute(q, [lga]);

    res.status(200).json({ statusCode: "200", message: "successful", result });
  } catch (err) {
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
  const healthpersonnel_id = req.user.id;
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
    sclera,
    conjuctiva,
    chill,
    bloodpressdia,
    bloodpresssis,
    chestpaindiscuss,
    epigastricpaindiscuss,
    severetireddisuss,
    severediarrhoeadiscuss,
    swellingfeetdiscuss,
    sputrumcolor,
    sputrum,
    lmp,
    lmpdate,
    edd,
    ega,
    laborstarted,
    selectedbabymovement,
    selectedfirstbabymovement,
    selectedfirstbabymovementdate,
    observelookpatient,
    documentpercussion,
    palpatediscuss,
    auscultationdiscuss,
    breast,
    breastdiscuss,
    severabdodisuss,
  } = req.body;
  const mydata = {
    patient_id: patient_id,
    returnvisit_date: returnvisit_date,
    state: state,
    lga: lga,
    healthfacility: healthfacility,
    fever: fever,
    headache: headache,
    dizziness: dizziness,
    convulsions: convulsions,
    weakness: weakness,
    blurryvision: blurryvision,
    cough: cough,
    difficultybreathing: difficultybreathing,
    palpitation: palpitation,
    swellingoffeet: swellingoffeet,
    severechestpain: severechestpain,
    severeepigastricpain: severeepigastricpain,
    pepticulcerpatient: pepticulcerpatient,
    severetirednesss: severetirednesss,
    difficultylyingflat: difficultylyingflat,
    severeabdominalpain: severeabdominalpain,
    vomiting: vomiting,
    diarrhoea: diarrhoea,
    urinarypain: urinarypain,
    severeflankpain: severeflankpain,
    bloodinurine: bloodinurine,
    increasedurination: increasedurination,
    antsaroundurine: antsaroundurine,
    increasedthirst: increasedthirst,
    vaginaldischarge: vaginaldischarge,
    painduringsex: painduringsex,
    syphillis: syphillis,
    receivedcaresincelastvisit: receivedcaresincelastvisit,
    whoprovidedthecare: whoprovidedthecare,
    whatcarewasprovided: whatcarewasprovided,
    outcomeofthecare: outcomeofthecare,
    takingprescribeddrugs: takingprescribeddrugs,
    problemtakingdrugs: problemtakingdrugs,
    followadvice: followadvice,
    reactionorsideeffects: reactionorsideeffects,
    anythingrelatedtopregnancy: anythingrelatedtopregnancy,
    pink: pink,
    palepink: palepink,
    whiteincolour: whiteincolour,
    white: white,
    tinge: tinge,
    deepyellow: deepyellow,
    dirtywhite: dirtywhite,
    bloodpressure: bloodpressure,
    respiratoryrate: respiratoryrate,
    temperature: temperature,
    pulserate: pulserate,
    abdomenScars: abdomenScars,
    palpateAndEstimatefundusdocumentation:
      palpateAndEstimatefundusdocumentation,
    distancebtwtopdffundus: distancebtwtopdffundus,
    cmfromtopfundusdocumentation: cmfromtopfundusdocumentation,
    cmfromuppersymphysis: cmfromuppersymphysis,
    presentation: presentation,
    descent: descent,
    positionoffoetus: positionoffoetus,
    persisitentdrycough: persisitentdrycough,
    unexplainedweightloss: unexplainedweightloss,
    nightsweats: nightsweats,
    diagnosedwithtuberculosis: diagnosedwithtuberculosis,
    treatedfortuberculosis: treatedfortuberculosis,
    heartrate: heartrate,
    complaint: complaint,
    stategenobser: stategenobser,
    generalwellchoice: generalwellchoice,
    syphillistreatment: syphillistreatment,
    pregnancydiscuss: pregnancydiscuss,
    wakeuptourinate: wakeuptourinate,
    problemmedication: problemmedication,
    bmi: bmi,
    sclera: sclera,
    conjuctiva: conjuctiva,
    chill: chill,
    bloodpressdia: bloodpressdia,
    bloodpresssis: bloodpresssis,
    chestpaindiscuss: chestpaindiscuss,
    epigastricpaindiscuss: epigastricpaindiscuss,
    severetireddisuss: severetireddisuss,
    severediarrhoeadiscuss: severediarrhoeadiscuss,
    swellingfeetdiscuss: swellingfeetdiscuss,
    sputrumcolor: sputrumcolor,
    sputrum: sputrum,
    lmp: lmp,
    lmpdate: lmpdate,
    edd: edd,
    ega: ega,
    laborstarted: laborstarted,
    selectedbabymovement: selectedbabymovement,
    selectedfirstbabymovement: selectedfirstbabymovement,
    selectedfirstbabymovementdate: selectedfirstbabymovementdate,
    observelookpatient: observelookpatient,
    documentpercussion: documentpercussion,
    palpatediscuss: palpatediscuss,
    auscultationdiscuss: auscultationdiscuss,
    breast: breast,
    breastdiscuss: breastdiscuss,
    severabdodisuss: severabdodisuss,
  };
  logger.info(mydata);
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
      sclera,
      conjuctiva,
      chill,
      bloodpressdia,
      bloodpresssis,
      chestpaindiscuss,
      epigastricpaindiscuss,
      severetireddisuss,
      severediarrhoeadiscuss,
      swellingfeetdiscuss,
      sputrumcolor,
      sputrum,
      lmp,
      lmpdate,
      edd,
      ega,
      laborstarted,
      selectedbabymovement,
      selectedfirstbabymovement,
      selectedfirstbabymovementdate,
      observelookpatient,
      documentpercussion,
      palpatediscuss,
      auscultationdiscuss,
      breast,
      breastdiscuss,
      severabdodisuss,
    ];

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
        sclera,
        conjuctiva,
        chill,
        bloodpressdia,
        bloodpresssis,
        chestpaindiscuss,
        epigastricpaindiscuss,
        severetireddisuss,
        severediarrhoeadiscuss,
        swellingfeetdiscuss,
        sputrumcolor,
        sputrum,
        lmp,
        lmpdate,
        edd,
        ega,
        laborstarted,
        selectedbabymovement,
        selectedfirstbabymovement,
        selectedfirstbabymovementdate,
        observelookpatient,
        documentpercussion,
        palpatediscuss,
        auscultationdiscuss,
        breast,
        breastdiscuss,
        severabdodisuss
      ) VALUES (
        ?,?,?,?,?,?,?,?,?,?,
        ?,?,?,?,?,?,?,?,?,?,
        ?,?,?,?,?,?,?,?,?,?,
        ?,?,?,?,?,?,?,?,?,?,
        ?,?,?,?,?,?,?,?,?,?,
        ?,?,?,?,?,?,?,?,?,?,
        ?,?,?,?,?,?,?,?,?,?,
        ?,?,?,?,?,?,?,?,?,?,
        ?,?,?,?,?,?,?,?,?,?,
        ?,?,?,?,?,?,?,?,?,?,
        ?)`;
    const result = await connection.execute(q, values);
    const returnvisitid = result[0];

    // await updateSessionReturnvisit(returnvisitid, healthpersonnel_id);

    await connection.commit();

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
      SELECT patient_id, MAX(visit_date) AS last_visit
      FROM (
        SELECT patient_id, returnvisit_date AS visit_date FROM returnvisit
        UNION ALL
        SELECT patient_id, firstvisit_date AS visit_date FROM firstvisit
      ) AS combined_visits
      GROUP BY patient_id
    ) AS last_visits ON p.id = last_visits.patient_id;
    `;
    const q2 = `SELECT COUNT(*) AS patient_count FROM patients;
    `;

    const result = await connection.execute(q);
    const [result2] = await connection.execute(q2);
    res.status(200).json({
      statusCode: "200",
      result: result[0],
      count: result2[0].patient_count,
    });
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
const getAllPatientsAndHealthworkerpaginated = async (req, res) => {
  const connection = await db.getConnection();
  const { queryid } = req.query;
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
    SELECT patient_id, MAX(visit_date) AS last_visit
    FROM (
        SELECT patient_id, returnvisit_date AS visit_date FROM returnvisit
        UNION ALL
        SELECT patient_id, firstvisit_date AS visit_date FROM firstvisit
    ) AS combined_visits
    GROUP BY patient_id
) AS last_visits ON p.id = last_visits.patient_id
WHERE
    p.id > ?
ORDER BY
    p.id
LIMIT 10;

    `;

    const result = await connection.execute(q, [queryid]);
    res.status(200).json({ statusCode: "200", result: result[0] });
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
    res.status(200).json({ statusCode: "200", result: result[0] });
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
    res.status(200).json({ statusCode: "200", result: result[0] });
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
const getAllPatientReturnVisit = async (req, res) => {
  const connection = await db.getConnection();
  try {
    const q = `SELECT * FROM returnvisit; 
  `;
    const result = await connection.execute(q);
    res.status(200).json(result[0]);
  } catch (error) {
    connection.release();
    res.status(500).json(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const getAllPatientFirstVisits = async (req, res) => {
  const connection = await db.getConnection();
  try {
    const q = `SELECT
    fv.*,
    dhal.*,
    oh.*,mh.*,pmh.*,dh.*,fh.*,pe.*,pi.*
  FROM
    firstvisit fv
  LEFT JOIN
    personalinformation pi ON fv.patient_id = pi.id
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
    physicalexamination pe ON fv.id = pe.firstvisit_id; 
  `;
    const result = await connection.execute(q);
    res.status(200).json({ statusCode: "200", result: result[0] });
  } catch (error) {
    connection.release();
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
    requestedtest_id,
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
    leukocytes,
    nitrites,
    urobilinogen,
    protein,
    pH,
    blood,
    specificgravity,
    ketones,
    bilirubin,
    glucoseUrinary,
    neutrophils,
    lymphocytes,
    monocytes,
    eosinophils,
    basophils,
    Haematocrit,
    mch,
    reticulocytecount,
    hbsag,
    hcv,
  } = req.body;
  const values = [
    healthpersonnel_id,
    requestedtest_id,
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
    leukocytes,
    nitrites,
    urobilinogen,
    protein,
    pH,
    blood,
    specificgravity,
    ketones,
    bilirubin,
    glucoseUrinary,
    neutrophils,
    lymphocytes,
    monocytes,
    eosinophils,
    basophils,
    Haematocrit,
    mch,
    reticulocytecount,
    hbsag,
    hcv,
  ];
  try {
    const q = `INSERT INTO testresult (
      healthpersonnel_id,
      requestedtest_id,
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
      leukocytes,
      nitrites,
      urobilinogen,
      protein,
      pH,
      blood,
      specificgravity,
      ketones,
      bilirubin,
      glucoseUrinary,
      neutrophils,
      lymphocytes,
      monocytes,
      eosinophils,
      basophils,
      Haematocrit,
      mch,
      reticulocytecount,
      hbsag,
      hcv
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    const result = await connection.execute(q, values);
    const testresultid = result[0].insertId;
    const q2 = `SELECT * FROM testresult WHERE id = ?`;
    const result2 = await connection.execute(q2, [testresultid]);
    res
      .status(200)
      .json({ statusCode: "200", message: "successful", result: result2[0] });
  } catch (error) {
    if (connection) {
      connection.rollback();
    }
    res.status(500).json({ statusCode: "500", message: error });
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
    res
      .status(200)
      .json({ statusCode: "200", message: "successful", result: result[0] });
  } catch (error) {
    res.status(500).json({ statusCode: "500", error: error });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getAllTests = async (req, res) => {
  const connection = await db.getConnection();
  try {
    const q = `SELECT 
    testresult.*,
    personalinformation.firstname,
    personalinformation.surname
  FROM
    testresult
  JOIN
    patients ON testresult.patient_id = patients.id
  JOIN
    personalinformation ON patients.personalinformation_id = personalinformation.id;
  `;
    const result = await connection.execute(q);
    res
      .status(200)
      .json({ statusCode: "200", message: "successful", result: result[0] });
  } catch (error) {
    res.status(500).json({ statusCode: "500", error: error });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getATestByAUser = async (req, res) => {
  const connection = await db.getConnection();
  const { patient_id } = req.body;
  const { id } = req.params;
  try {
    const q = `SELECT * FROM testresult WHERE id = ? AND patient_id = ?`;
    const result = await connection.execute(q, [id, patient_id]);
    res
      .status(200)
      .json({ statusCode: "200", message: "successful", result: result[0] });
  } catch (error) {
    res.status(500).json({ statusCode: "500", error: error });
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
    // const result2 = await connection.execute(q2, [req.params.id]);
    res
      .status(200)
      .json({ statusCode: "200", message: "succcessfull", result: result[0] });
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
    firstname,
    lastname,
    deliverydata,
    numberofchildren,
    deliverydate,
    deliverytime,
  } = req.body;
  const values = [
    healthpersonnel_id,
    firstname,
    lastname,
    deliverydata,
    numberofchildren,
    deliverydate,
    deliverytime,
  ];
  try {
    const q = `INSERT INTO deliveryreport (
      healthpersonnel_id,
      firstname,
      lastname,
      deliverydata,
      numberofchildren,
      deliverydate,
      deliverytime
      ) VALUES (?,?,?,?,?,?,?)`;
    const result = await connection.execute(q, values);
    const testresultid = result[0].insertId;
    const q2 = `SELECT * FROM deliveryreport WHERE id = ?`;
    const result2 = await connection.execute(q2, [testresultid]);
    res.status(200).json({ statusCode: "200", result: result2[0] });
  } catch (error) {
    if (connection) {
      connection.rollback();
    }
    res.status(500).json({ statusCode: "500", message: error });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const getAllDeliveryreports = async (req, res) => {
  const connection = await db.getConnection();
  try {
    const q = `SELECT * FROM deliveryreport`;
    const result = await connection.execute(q);
    res.status(200).json({ statusCode: "200", result: result[0] });
  } catch (error) {
    res.status(500).json({ statusCode: "500", message: error });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getAllDeliveryreportsByAWorker = async (req, res) => {
  const connection = await db.getConnection();
  const { id } = req.user;
  try {
    const q = `SELECT * FROM deliveryreport WHERE healthpersonnel_id = ?`;
    const result = await connection.execute(q, [id]);
    res.status(200).json({ statusCode: "200", result: result[0] });
  } catch (error) {
    res.status(500).json({ statusCode: "500", message: error });
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
    res.status(200).json({ statusCode: "200", result: result[0] });
  } catch (error) {
    res.status(500).json({ statusCode: "500", message: error });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const requestingatest = async (req, res) => {
  const connection = await db.getConnection();
  const { healthpersonnel_id, testoption, patient_id } = req.body;
  const values = [healthpersonnel_id, testoption, patient_id];
  try {
    const q = `INSERT INTO requestedtest (healthpersonnel_id, testoption, patient_id) VALUES (?,?,?)`;
    const resultquery = `SELECT * FROM requestedtest WHERE id = ?`;
    const requestatest = await connection.execute(q, values);
    const newlycreatedtest = await connection.execute(resultquery, [
      requestatest[0].insertId,
    ]);
    res.status(201).json({
      statusCode: "201",
      message: "successful",
      result: newlycreatedtest[0],
    });
  } catch (error) {
    res.status(500).json({ statusCode: "500", message: error });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getrequestedtests = async (req, res) => {
  const connection = await db.getConnection();
  try {
    const q = `SELECT
    requestedtest.*,
    personalinformation.firstname,
    personalinformation.surname
  FROM
    requestedtest
  JOIN
    patients ON requestedtest.patient_id = patients.id
  JOIN
    personalinformation ON patients.personalinformation_id = personalinformation.id;
  `;
    const requestedtests = await connection.execute(q);
    res.status(200).json({
      statusCode: "200",
      message: "successful",
      result: requestedtests[0],
    });
  } catch (error) {
    res.status(500).json({ statusCode: "500", message: error });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const updaterequestedtest = async (req, res) => {
  const connection = await db.getConnection();
  const { id } = req.params;
  const { healthpersonnel_id, completed, testoption, patient_id } = req.body;
  const values = [healthpersonnel_id, completed, testoption, patient_id, id];
  try {
    const q = `UPDATE requestedtest
    SET
      healthpersonnel_id = IFNULL(?,healthpersonnel_id),
      completed = IFNULL(?, completed),
      testoption = IFNULL(?, testoption),
      patient_id = IFNULL(?, patient_id)
    WHERE id = ?;
    ;`;
    const resultquery = `SELECT * FROM requestedtest WHERE id = ?`;
    const updatetest = await connection.execute(q, values);
    const updatedtest = await connection.execute(resultquery, [id]);
    res.status(201).json({
      statusCode: "201",
      message: "successful",
      result: updatedtest[0],
    });
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
    const deliveryreportcount = `SELECT COALESCE(SUM(CAST(numberofchildren AS SIGNED)), 0) AS delivery FROM deliveryreport
    ;
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
      result: {
        firstvisit,
        returnvisit,
        testresult,
        schedule,
        delivery,
      },
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
  getAllPatientstate,
  getAllPatientlga,
  getAllPatientsAndHealthworker,
  getAllPatientsAndHealthworkerpaginated,
  getPatientPersonalinfo,
  createTest,
  updateTest,
  getATestByAUser,
  getAllTests,
  requestingatest,
  getrequestedtests,
  updaterequestedtest,
  createtestoptions,
  getAPatientsTest,
  createdeliveryreport,
  getAPatientsDeliveryreport,
  getAllDeliveryreports,
  getAllDeliveryreportsByAWorker,
  datanumbers,
  getAllPatientFirstVisits,
  getAllPatientReturnVisit,
};
