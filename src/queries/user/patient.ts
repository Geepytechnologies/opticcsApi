export class Patientqueries {
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
  static getPatientCountwithdate() {
    return `SELECT COUNT(*) AS patient_count FROM patients WHERE DATE(createdat) BETWEEN ? AND ?;
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
    p.id,
    p.createdat,
    pi.hospitalnumber,
      pi.firstname,
      pi.middlename,
      pi.surname,
      pi.phone,
      pi.address,
      pi.state,
      pi.dateofbirth,
      pi.lga,
      pi.healthfacility,
      pi.gravidity,
      pi.parity,
      pi.alive,
      pi.lmpknown,
      pi.lmp,
      pi.edd,
      pi.ega,
      pi.laborstarted,
      pi.firstbabymovement,
      pi.doyoufeelthebabysmovement,
      pi.doyouknowdateoffirstbabymovement,
    fv.firstvisit_date,
    dhal.firstvisit_id,
      dhal.doyousmoke,
      dhal.doyoudrinkalcohol,
      dhal.othersubstances,
      dhal.doyounone,
      dhal.whodoyoulivewith,
      dhal.specifywhodoyoulivewith,
      dhal.stoppedfromleavingthehouse,
      dhal.threatenedyourlife,
      dhal.abusedphysically,
      dhal.didanyoneevernone,
      oh.convulsionsduringpregnancy,
      oh.caesarean,
      oh.tearsthroughsphincter,
      oh.postpartiumhaemorrghage,
      oh.stillbirths,
      oh.prematuredeliveries,
      oh.lowbirthbabies,
      oh.babieswhodied,
      oh.miscarriages,
      oh.otherinputobstetrichistory,
      oh.yearofpregnancy,
      oh.carriedtoterm,
      oh.modeofdelivery,
      oh.weightofbaby,
      oh.sexofbaby,
      oh.babycriedafterbirth,
      oh.complicationsafterdelivery,
      oh.specifycomplicationsafterdelivery,
      oh.breastfedexclusively,
      mh.fever,
      mh.chills,
      mh.headaches,
      mh.dizziness,
      mh.convulsions,
      mh.weakness,
      mh.blurryvision,
      mh.cough,
      mh.difficultybreathing,
      mh.severechestpain,
      mh.severeepigastricpain,
      mh.pepticulcerpatient,
      mh.severetiredness,
      mh.severeabdominalpain,
      mh.persistentvomiting,
      mh.severediarrhoea,
      mh.painwithurination,
      mh.severeflankpain,
      mh.bloodinurine,
      mh.increasedurination,
      mh.noticedantsaroundplaceurinated,
      mh.increasedthirst,
      mh.vaginaldischarge,
      mh.deeppelvicpain,
      mh.syphilis,
      mh.syphilistreatment,
      mh.feveryes,
      mh.chillsyes,
      mh.headachesyes,
      mh.dizzinessyes,
      mh.convulsionsyes,
      mh.weaknessyes,
      mh.blurryvisionyes,
      mh.coughyes,
      mh.persistentdrycough,
      mh.persistentdrycoughyes,
      mh.progressiveweightloss,
      mh.progressiveweightlossyes,
      mh.nightsweats,
      mh.nightsweatsyes,
      mh.diagnosedwithtuberculosis,
      mh.diagnosedwithtuberculosisyes,
      mh.treatedTBpreviously,
      mh.treatedTBpreviouslyyes,
      mh.difficultybreathingyes,
      mh.severechestpainyes,
      mh.severeepigastricpainyes,
      mh.palpitations,
      mh.palpitationyes,
      mh.swellingfeet,
      mh.swellingfeetyes,
      mh.difficultytosleep,
      mh.difficultytosleepyes,
      mh.pepticulcerpatientyes,
      mh.severetirednessyes,
      mh.severeabdominalpainyes,
      mh.persistentvomitingyes,
      mh.severediarrhoeayes,
      mh.painwithurinationyes,
      mh.severeflankpainyes,
      mh.bloodinurineyes,
      mh.increasedurinationyes,
      mh.increasedthirstyes,
      mh.vaginaldischargeyes,
      mh.deeppelvicpainyes,
      mh.syphilisyes,
      mh.wakinguptopassurine,
      pmh.hypertension,
      pmh.heartdisease,
      pmh.anaemia,
      pmh.kidneydisease,
      pmh.sicklecell,
      pmh.diabetes,
      pmh.goitre,
      pmh.hivaids,
      pmh.hivaidstreatment,
      pmh.covid19,
      pmh.otherseriouschronicillnesses,
      pmh.specifyseriouschronicillnesses,
      pmh.hadsurgery,
      pmh.specifyhadsurgery,
      pmh.hypertensionyes, 
      pmh.heartdiseaseyes,
      pmh.anaemiayes,
      pmh.kidneydiseaseyes,
      pmh.sicklecellyes,
      pmh.diabetesyes,
      pmh.goitreyes,
      pmh.hivaidsyes,
      pmh.covid19yes,
      dh.historyofallergy,
      dh.allergies,
      dh.herbalremedies,
      dh.vitamins,
      dh.otcdrugs,
      dh.dietarysupplements,
      dh.typeofdietarysupplement,
      dh.otherdrugs,
      dh.tetanus,
      dh.tetanusdoses,
      dh.lasttetanusdose,
      dh.covidvaccination,
      fh.patienthaschildren,
      fh.haveyoubreastfedbefore,
      fh.breastfeedingduration,
      fh.breastfeedingproblems ,
      fh.breastfeedingproblemsmoredetails ,
      fh.babylessthanayear,
      fh.stillbreastfeeding,
      fh.camewithachildunder5years,
      fh.hasunvaccinatedchildren ,
      fh.familyepilepsy,
      fh.familyepilepsyyes,
      fh.familyhypertension,
      fh.familyhypertensionyes,
      fh.familyasthma,
      fh.familyasthmayes,
      fh.familydiabetes,
      fh.familydiabetesyes,
      fh.familysicklecell,
      fh.familysicklecellyes,
      pe.conjunctiva,
      pe.sclera,
      pe.bloodpressure,
      pe.respiratoryrate,
      pe.temperature,
      pe.pulserate,
      pe.abdomenScars,
      pe.fromcaesareansection,
      pe.fundalheight,
      pe.measurefundalheightweek,
      pe.measurefundalheightcentimeter,
      pe.presentation,
      pe.descent,
      pe.positionoffoetus,
      pe.breastexamination,
      pe.abnormalbreastexamination,
      pe.genitalexamination,
      pe.swelling,
      pe.discharge,
      pe.tenderness,
      pe.ulcers,
      pe.fistulas,
      pe.irregularities,
      pe.swellingyes,
      pe.dischargeyes,
      pe.tendernessyes,
      pe.ulcersyes,
      pe.fistulasyes,
      pe.irregularitiesyes,
      pe.heartrate,
      pe.bmi,
      pe.observation,
      pe.percussion,
      pe.palpationchest,
      pe.auscultationchest
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
  static getPatientsWithHealthworker(pageSize: number, offset: number) {
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
  static getPatientsWithHealthworkerwithdate(pageSize: number, offset: number) {
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
  ) AS last_visits ON p.id = last_visits.patient_id AND DATE(p.createdat) BETWEEN ? AND ? ORDER BY
  p.id DESC LIMIT ${pageSize} OFFSET ${offset};`;
  }
  static getPatientsWithHealthworkerFilteredByState(
    pageSize: number,
    offset: number
  ) {
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
  static getPatientsWithHealthworkerFilteredByStateCount() {
    return `SELECT COUNT(*) AS total_count FROM (
      SELECT
          p.*,
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
      WHERE hp.state = ?
  ) AS subquery;
  `;
  }
  static getPatientsWithHealthworkerFilteredByStatewithdate(
    pageSize: number,
    offset: number
  ) {
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
  ) AS last_visits ON p.id = last_visits.patient_id WHERE hp.state = ? AND DATE(p.createdat) BETWEEN ? AND ? ORDER BY
  p.id DESC LIMIT ${pageSize} OFFSET ${offset};`;
  }
  static getPatientsWithHealthworkerFilteredByStateCountwithdate() {
    return `SELECT COUNT(*) AS total_count FROM (
      SELECT
          p.*,
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
      WHERE hp.state = ? AND DATE(p.createdat) BETWEEN ? AND ?
  ) AS subquery;
  `;
  }
  static getPatientsWithHealthworkerFilteredByLga(
    pageSize: number,
    offset: number
  ) {
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
  ) AS last_visits ON p.id = last_visits.patient_id WHERE hp.state = ? AND hp.lga = ? ORDER BY
  p.id DESC LIMIT ${pageSize} OFFSET ${offset};`;
  }
  static getPatientsWithHealthWorkerFilteredByLgaCount() {
    return `SELECT COUNT(*) AS total_count FROM (
      SELECT
          p.*,
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
      WHERE hp.state = ? AND hp.lga = ?
  ) AS subquery;
  `;
  }
  static getPatientsWithHealthworkerFilteredByLgawithdate(
    pageSize: number,
    offset: number
  ) {
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
  ) AS last_visits ON p.id = last_visits.patient_id WHERE hp.state = ? AND hp.lga = ? AND DATE(p.createdat) BETWEEN ? AND ? ORDER BY
  p.id DESC LIMIT ${pageSize} OFFSET ${offset};`;
  }
  static getPatientsWithHealthWorkerFilteredByLgaCountwithdate() {
    return `SELECT COUNT(*) AS total_count FROM (
      SELECT
          p.*,
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
      WHERE hp.state = ? AND hp.lga = ? AND DATE(p.createdat) BETWEEN ? AND ?
  ) AS subquery;
  `;
  }
  static getPatientsWithHealthworkerFilteredByHealthfacility(
    pageSize: number,
    offset: number
  ) {
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
  ) AS last_visits ON p.id = last_visits.patient_id WHERE hp.state = ? AND hp.lga = ? AND hp.healthfacility = ? ORDER BY
  p.id DESC LIMIT ${pageSize} OFFSET ${offset};`;
  }
  static getPatientsWithHealthworkerFilteredByHealthfacilityCount() {
    return `SELECT COUNT(*) AS total_count FROM (
      SELECT
          p.*,
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
      WHERE hp.state = ? AND hp.lga = ? AND hp.healthfacility = ?
  ) AS subquery;
  `;
  }
  static getPatientsWithHealthworkerFilteredByHealthfacilitywithdate(
    pageSize: number,
    offset: number
  ) {
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
  ) AS last_visits ON p.id = last_visits.patient_id WHERE hp.state = ? AND hp.lga = ? AND hp.healthfacility = ? AND DATE(p.createdat) BETWEEN ? AND ? ORDER BY
  p.id DESC LIMIT ${pageSize} OFFSET ${offset};`;
  }
  static getPatientsWithHealthworkerFilteredByHealthfacilityCountwithdate() {
    return `SELECT COUNT(*) AS total_count FROM (
      SELECT
          p.*,
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
      WHERE hp.state = ? AND hp.lga = ? AND hp.healthfacility = ? AND DATE(p.createdat) BETWEEN ? AND ?
  ) AS subquery;
  `;
  }
  static numberofwomenwith4visits() {
    return `SELECT COUNT(*) AS count
    FROM returnvisit WHERE anc = 4;    
    `;
  }
  static numberofwomenwith4visitswithdate() {
    return `SELECT COUNT(*) AS count
    FROM returnvisit WHERE anc = 4 AND DATE(createdat) BETWEEN ? AND ?;    
    `;
  }
  static numberofwomenwith4visitsforstate() {
    return `SELECT COUNT(*) AS count
    FROM returnvisit WHERE state = ? AND anc = 4;    
    `;
  }

  static numberofwomenwith4visitsforstatewithdate() {
    return `SELECT COUNT(*) AS count
    FROM returnvisit WHERE state = ? AND anc = 4 AND DATE(createdat) BETWEEN ? AND ?;    
    `;
  }
  static numberofwomenwith4visitsforlga() {
    return `SELECT COUNT(*) AS count
    FROM returnvisit WHERE state = ? AND lga = ? AND anc = 4;    
    `;
  }
  static numberofwomenwith4visitsforlgawithdate() {
    return `SELECT COUNT(*) AS count
    FROM returnvisit WHERE state = ? AND lga = ? AND anc = 4 AND DATE(createdat) BETWEEN ? AND ?;    
    `;
  }
  static numberofwomenwith4visitsforhealthfacility() {
    return `SELECT COUNT(*) AS count
    FROM returnvisit WHERE state = ? AND healthfacility = ? AND anc = 4;    
    `;
  }
  static numberofwomenwith4visitsforhealthfacilitywithdate() {
    return `SELECT COUNT(*) AS count
    FROM returnvisit WHERE state = ? AND healthfacility = ? AND anc = 4 AND DATE(createdat) BETWEEN ? AND ?;    
    `;
  }
}
