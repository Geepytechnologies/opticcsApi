"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patientqueries = void 0;
class Patientqueries {
    static getAllPatientsAndHealthworker() {
        return `SELECT
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
    }
    static getPatientCount() {
        return `SELECT COUNT(*) AS patient_count FROM patients;
        `;
    }
    static getPatientByPhone() {
        return `SELECT * FROM personalinformation WHERE phone = ?`;
    }
    static patientpersonalrecord() {
        return `
    INSERT INTO personalinformation (
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
      doyouknowdateoffirstbabymovement
    ) 
    VALUES (
      ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?
    )`;
    }
    static createpatient() {
        return `INSERT INTO patients (healthpersonnel_id,firstvisit_date, personalinformation_id)
    VALUES (?,?, ?)`;
    }
    static firstvisitdata() {
        return `INSERT INTO firstvisit (patient_id, firstvisit_date) VALUES (?,?)`;
    }
    static dailyhabit() {
        return `INSERT INTO dailyhabitsandlifestyle (
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
    }
    static obstetrichistory() {
        return `INSERT INTO obstetrichistory (
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
      breastfedexclusively
      ) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?,?,?)`;
    }
    static medicalhistory() {
        return `INSERT INTO medicalhistory (
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
      wakinguptopassurine
      ) 
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    }
    static familyhistory() {
        return `INSERT INTO familyhistory (
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
    }
    static pastmedicalhistory() {
        return `INSERT INTO pastmedicalhistory (
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
    }
    static drughistory() {
        return `INSERT INTO drughistory (
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
    }
    static getnewlycreatedpatientrecord() {
        return `SELECT
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
    personalinformation pi ON p.personalinformation_id = pi.id
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
    }
    static physicalexamination() {
        return `INSERT INTO physicalexamination (
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
    }
    static returnvisitinitial() {
        return `INSERT INTO returnvisit (
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
      missedAncVisit,
      contactedByPHC,
      whoContacted,
      urinaryGen,
      comeWithUnderFiveChildren,
      testedFverMalaria,
      getAppropriateTreatMalariaFever,
      recieveImmunizationAge,
      screenedMalnutrition,
      underFiveCovidVaccinated
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
      ?,?,?,?,?,?,?,?,?,?,?)`;
    }
    static returnvisitancupdated() {
        return `INSERT INTO returnvisit (
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
      missedAncVisit,
      contactedByPHC,
      whoContacted,
      urinaryGen,
      comeWithUnderFiveChildren,
      testedFverMalaria,
      getAppropriateTreatMalariaFever,
      recieveImmunizationAge,
      screenedMalnutrition,
      underFiveCovidVaccinated,
      anc
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
      ?,?,?,?,?,?,?,?,?,?,?,?)`;
    }
    static deleteAPatient() {
        return `DELETE patients, personalinformation
    FROM patients
    JOIN personalinformation ON patients.personalinformation_id = personalinformation.id
    WHERE patients.id = ?;
    `;
    }
    static getfirstvisit() {
        return `SELECT
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
    }
    static patientRecord() {
        return ``;
    }
    static getPatientsWithHealthworker(pageSize, offset) {
        return `SELECT
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
  ) AS last_visits ON p.id = last_visits.patient_id ORDER BY
  p.id DESC LIMIT ${pageSize} OFFSET ${offset};`;
    }
    static getPatientsWithHealthworkerFilteredByState(pageSize, offset) {
        return `SELECT
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
  ) AS last_visits ON p.id = last_visits.patient_id WHERE hp.state = ? ORDER BY
  p.id DESC LIMIT ${pageSize} OFFSET ${offset};`;
    }
    static getPatientsWithHealthworkerFilteredByLga(pageSize, offset) {
        return `SELECT
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
  ) AS last_visits ON p.id = last_visits.patient_id WHERE hp.lga = ? ORDER BY
  p.id DESC LIMIT ${pageSize} OFFSET ${offset};`;
    }
    static getPatientsWithHealthworkerFilteredByHealthfacility(pageSize, offset) {
        return `SELECT
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
  ) AS last_visits ON p.id = last_visits.patient_id WHERE hp.healthfacility = ? ORDER BY
  p.id DESC LIMIT ${pageSize} OFFSET ${offset};`;
    }
}
exports.Patientqueries = Patientqueries;
