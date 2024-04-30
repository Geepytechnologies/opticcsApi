//intermediateResult1
export class IndicatorQuery {
  //:::::Intermediate result 1:::::://
  //1A Proportion of pregnant women with at least 4 ANC visits at intervention facility
  //Numerator: Number of women of reproductive age who received at least 4 ANC visits at intervention facility
  //Denominator: Total Number of pregnant women who visit intervention facilities for ANC == IntermediateResult1Cdenominator

  static IntermediateResult1A() {
    return `SELECT COUNT(*) AS total FROM ancvisit av WHERE av.anc_number >= 4 AND av.missed = 0;    
    `;
  }
  static IntermediateResult1Awithdate() {
    return `SELECT COUNT(*) AS total FROM ancvisit av WHERE av.anc_number >= 4 AND av.missed = 0; AND DATE(av.createdat) BETWEEN ? AND ?;    
    `;
  }
  static StateIntermediateResult1A() {
    return `SELECT COUNT(*)  AS total
    FROM ancvisit av
    JOIN patients p ON p.id = av.patient_id
    LEFT JOIN personalinformation pi ON p.personalinformation_id = pi.id
    WHERE av.anc_number >= 4 AND av.missed = 0 AND pi.state = ?    
    `;
  }

  static StateIntermediateResult1Awithdate() {
    return `SELECT COUNT(*)  AS total
    FROM ancvisit av
    JOIN patients p ON p.id = av.patient_id
    LEFT JOIN personalinformation pi ON p.personalinformation_id = pi.id
    WHERE av.anc_number = 8 AND av.missed = 0 AND pi.state = ? AND DATE(av.createdat) BETWEEN ? AND ?;    
    `;
  }
  static LgaIntermediateResult1A() {
    return `SELECT COUNT(*)  AS total
    FROM ancvisit av
    JOIN patients p ON p.id = av.patient_id
    LEFT JOIN personalinformation pi ON p.personalinformation_id = pi.id
    WHERE av.anc_number >= 4 AND av.missed = 0 AND pi.lga = ?    
    `;
  }
  static LgaIntermediateResult1Awithdate() {
    return `SELECT COUNT(*)  AS total
    FROM ancvisit av
    JOIN patients p ON p.id = av.patient_id
    LEFT JOIN personalinformation pi ON p.personalinformation_id = pi.id
    WHERE av.anc_number >= 4 AND av.missed = 0 AND pi.lga = ? AND DATE(av.createdat) BETWEEN ? AND ?;    
    `;
  }
  static HealthfacilityIntermediateResult1A() {
    return `SELECT COUNT(*)  AS total
    FROM ancvisit av
    JOIN patients p ON p.id = av.patient_id
    LEFT JOIN personalinformation pi ON p.personalinformation_id = pi.id
    WHERE av.anc_number >= 4 AND av.missed = 0 AND pi.healthfacility = ?    
    `;
  }
  static HealthfacilityIntermediateResult1Awithdate() {
    return `SELECT COUNT(*)  AS total
    FROM ancvisit av
    JOIN patients p ON p.id = av.patient_id
    LEFT JOIN personalinformation pi ON p.personalinformation_id = pi.id
    WHERE av.anc_number >= 4 AND av.missed = 0 AND pi.healthfacility = ? AND DATE(av.createdat) BETWEEN ? AND ?;    
    `;
  }

  //------- 1B Proportion of pregnant women who attended at least one ANC Visit and delivered at health facility -----
  // Numerator: Number of pregnant women with at least one ANC visit ie IntermediateResult1Cdenominator
  // Denominator: Total number of pregnant women who delivered at health facility
  static IntermediateResult1B() {
    return `SELECT COUNT(*) AS total FROM deliveryreport WHERE deliverAtHealthFacility = "yes" AND attendAncVisit = "yes" `;
  }
  static IntermediateResult1Bwithdate() {
    return `SELECT COUNT(*) AS total FROM deliveryreport WHERE deliverAtHealthFacility = "yes" AND attendAncVisit = "yes" AND DATE(createdat) BETWEEN ? AND ?`;
  }
  static StateIntermediateResult1B() {
    return `SELECT COUNT(*) AS total FROM deliveryreport dr  LEFT JOIN
    healthpersonnel hp ON dr.healthpersonnel_id = hp.id WHERE hp.state = ? AND dr.deliverAtHealthFacility = "yes" AND dr.attendAncVisit = "yes"`;
  }
  static StateIntermediateResult1Bwithdate() {
    return `SELECT COUNT(*) AS total FROM deliveryreport dr  LEFT JOIN
    healthpersonnel hp ON dr.healthpersonnel_id = hp.id WHERE hp.state = ? AND dr.deliverAtHealthFacility = "yes" AND dr.attendAncVisit = "yes" AND DATE(createdat) BETWEEN ? AND ?`;
  }
  static LgaIntermediateResult1B() {
    return `SELECT COUNT(*) AS total FROM deliveryreport dr  LEFT JOIN
    healthpersonnel hp ON dr.healthpersonnel_id = hp.id WHERE hp.state = ? AND hp.lga = ? AND dr.deliverAtHealthFacility = "yes" AND dr.attendAncVisit = "yes"`;
  }
  static LgaIntermediateResult1Bwithdate() {
    return `SELECT COUNT(*) AS total FROM deliveryreport dr  LEFT JOIN
    healthpersonnel hp ON dr.healthpersonnel_id = hp.id WHERE hp.state = ? AND hp.lga = ? AND dr.deliverAtHealthFacility = "yes" AND dr.attendAncVisit = "yes" AND DATE(createdat) BETWEEN ? AND ?`;
  }
  static HealthfacilityIntermediateResult1B() {
    return `SELECT COUNT(*) AS total FROM deliveryreport dr  LEFT JOIN
    healthpersonnel hp ON dr.healthpersonnel_id = hp.id WHERE hp.state = ? AND hp.healthfacility = ? AND dr.deliverAtHealthFacility = "yes" AND dr.attendAncVisit = "yes"`;
  }
  static HealthfacilityIntermediateResult1Bwithdate() {
    return `SELECT COUNT(*) AS total FROM deliveryreport dr  LEFT JOIN
    healthpersonnel hp ON dr.healthpersonnel_id = hp.id WHERE hp.state = ? AND hp.healthfacility = ? AND dr.deliverAtHealthFacility = "yes" AND dr.attendAncVisit = "yes" AND DATE(createdat) BETWEEN ? AND ?`;
  }
  //----- 1C Proportion of pregnant women at ANC 1st visit less than 20 weeks ----//
  //Numerator: Number of pregnant women with Gestational Age less than 20 weeks  == IntermediateResult1Ddenominator
  //Denominator: Total number of pregnant women at ANC 1st visit (i am counting the number of all the patients that had a first visit for this)
  //The numerator for 1C is IntermediateResult1Ddenominator

  static IntermediateResult1Cdenominator() {
    return `SELECT count(*) as total FROM patients`;
  }
  static IntermediateResult1Cdenominatorwithdate() {
    return `SELECT count(*) as total FROM patients AND DATE(firstvisit_date) BETWEEN ? AND ?`;
  }
  static StateIntermediateResult1Cdenominator() {
    return `SELECT COUNT(*) AS total FROM patients p  LEFT JOIN
    personalinformation pi ON p.personalinformation_id = pi.id WHERE pi.state = ?`;
  }
  static StateIntermediateResult1Cdenominatorwithdate() {
    return `SELECT COUNT(*) AS total FROM patients p  LEFT JOIN
    personalinformation pi ON p.personalinformation_id = pi.id WHERE pi.state = ? AND DATE(createdat) BETWEEN ? AND ?`;
  }
  static LgaIntermediateResult1Cdenominator() {
    return `SELECT COUNT(*) AS total FROM patients p  LEFT JOIN
    personalinformation pi ON p.personalinformation_id = pi.id WHERE pi.state = ? AND pi.lga = ?`;
  }
  static LgaIntermediateResult1Cdenominatorwithdate() {
    return `SELECT COUNT(*) AS total FROM patients p  LEFT JOIN
    personalinformation pi ON p.personalinformation_id = pi.id WHERE pi.state = ? AND pi.lga = ? AND DATE(createdat) BETWEEN ? AND ?`;
  }
  static HealthfacilityIntermediateResult1Cdenominator() {
    return `SELECT COUNT(*) AS total FROM patients p  LEFT JOIN
    personalinformation pi ON p.personalinformation_id = pi.id WHERE pi.state = ? AND pi.healthfacility = ?`;
  }
  static HealthfacilityIntermediateResult1Cdenominatorwithdate() {
    return `SELECT COUNT(*) AS total FROM patients p  LEFT JOIN
    personalinformation pi ON p.personalinformation_id = pi.id WHERE pi.state = ? AND pi.healthfacility = ? AND DATE(createdat) BETWEEN ? AND ?`;
  }
  //----- 1D Proportion of pregnant women at ANC 1st Vist less than 20 weeks that achieved 8 ANC visits
  // ----Numerator: Number of pregnant women who achieved 8 ANC visits                                                                                                 //----Denominator: Total number of pregnant women with gestational age less than 20 weeks
  static IntermediateResult1DNumerator() {
    return `SELECT COUNT(*) AS total FROM ancvisit av WHERE av.anc_number = 8 AND av.missed = 0`;
  }
  static IntermediateResult1DNumeratorwithdate() {
    return `SELECT COUNT(*) AS total FROM ancvisit av WHERE av.anc_number = 8 AND av.missed = 0 AND DATE(createdat) BETWEEN ? AND ?`;
  }
  static StateIntermediateResult1DNumerator() {
    return `SELECT COUNT(*)  AS total
    FROM ancvisit av
    JOIN patients p ON p.id = av.patient_id
    LEFT JOIN personalinformation pi ON p.personalinformation_id = pi.id
    WHERE av.anc_number = 8 AND av.missed = 0 AND pi.state = ?`;
  }
  static StateIntermediateResult1DNumeratorwithdate() {
    return `SELECT COUNT(*)  AS total
    FROM ancvisit av
    JOIN patients p ON p.id = av.patient_id
    LEFT JOIN personalinformation pi ON p.personalinformation_id = pi.id
    WHERE av.anc_number = 8 AND av.missed = 0 AND pi.state = ? AND DATE(av.createdat) BETWEEN ? AND ?`;
  }
  static LgaIntermediateResult1DNumerator() {
    return `SELECT COUNT(*)  AS total
    FROM ancvisit av
    JOIN patients p ON p.id = av.patient_id
    LEFT JOIN personalinformation pi ON p.personalinformation_id = pi.id
    WHERE av.anc_number = 8 AND av.missed = 0 AND pi.state = ? AND pi.lga = ?`;
  }
  static LgaIntermediateResult1DNumeratorwithdate() {
    return `SELECT COUNT(*)  AS total
    FROM ancvisit av
    JOIN patients p ON p.id = av.patient_id
    LEFT JOIN personalinformation pi ON p.personalinformation_id = pi.id
    WHERE av.anc_number = 8 AND av.missed = 0 AND pi.state = ? AND pi.lga = ? AND DATE(av.createdat) BETWEEN ? AND ?`;
  }
  static HealthfacilityIntermediateResult1DNumerator() {
    return `SELECT COUNT(*)  AS total
    FROM ancvisit av
    JOIN patients p ON p.id = av.patient_id
    LEFT JOIN personalinformation pi ON p.personalinformation_id = pi.id
    WHERE av.anc_number = 8 AND av.missed = 0 AND pi.state = ? AND pi.lga = ? AND pi.lga = ?`;
  }
  static HealthfacilityIntermediateResult1DNumeratorwithdate() {
    return `SELECT COUNT(*)  AS total
    FROM ancvisit av
    JOIN patients p ON p.id = av.patient_id
    LEFT JOIN personalinformation pi ON p.personalinformation_id = pi.id
    WHERE av.anc_number = 8 AND av.missed = 0 AND pi.state = ? AND pi.lga = ? AND pi.lga = ? AND DATE(createdat) BETWEEN ? AND ?`;
  }

  //1D denominator
  static IntermediateResult1Ddenominator() {
    return `SELECT ega FROM personalinformation`;
  }
  static IntermediateResult1Ddenominatorwithdate() {
    return `SELECT ega from personalinformation AND DATE(createdat) BETWEEN ? AND ?`;
  }
  static StateIntermediateResult1Ddenominator() {
    return `SELECT ega from personalinformation WHERE state = ?`;
  }
  static StateIntermediateResult1Ddenominatorwithdate() {
    return `SELECT ega from personalinformation WHERE state = ? AND DATE(createdat) BETWEEN ? AND ?`;
  }
  static LgaIntermediateResult1Ddenominator() {
    return `SELECT ega from personalinformation WHERE state = ? AND lga = ?`;
  }
  static LgaIntermediateResult1Ddenominatorwithdate() {
    return `SELECT ega from personalinformation WHERE state = ? AND lga = ? AND DATE(createdat) BETWEEN ? AND ?`;
  }
  static HealthfacilityIntermediateResult1Ddenominator() {
    return `SELECT ega from personalinformation WHERE state = ? AND healthfacility = ?`;
  }
  static HealthfacilityIntermediateResult1Ddenominatorwithdate() {
    return `SELECT ega from personalinformation WHERE state = ? AND healthfacility = ? AND DATE(createdat) BETWEEN ? AND ?`;
  }

  //1E Proportion of pregnant women who commenced ANC but missed more than one session
  //Numerator: Number of pregnant women who missed two or more ANC sessions
  //Denominator: Total number of pregnant women who commenced an ANC sessions (im counting all the patients)

  static IntermediateResult1ENumerator() {
    return `SELECT COUNT(*) AS total FROM ancvisit av WHERE av.missed > 2`;
  }
  static IntermediateResult1ENumeratorwithdate() {
    return `SELECT COUNT(*) AS total FROM ancvisit av WHERE av.missed > 2 AND DATE(createdat) BETWEEN ? AND ?`;
  }
  static StateIntermediateResult1ENumerator() {
    return `SELECT COUNT(*)  AS total
    FROM ancvisit av
    JOIN patients p ON p.id = av.patient_id
    LEFT JOIN personalinformation pi ON p.personalinformation_id = pi.id
    WHERE av.missed > 2 AND pi.state = ?`;
  }
  static StateIntermediateResult1ENumeratorwithdate() {
    return `SELECT COUNT(*)  AS total
    FROM ancvisit av
    JOIN patients p ON p.id = av.patient_id
    LEFT JOIN personalinformation pi ON p.personalinformation_id = pi.id
    WHERE av.missed > 2 AND pi.state = ? AND DATE(av.createdat) BETWEEN ? AND ?`;
  }
  static LgaIntermediateResult1ENumerator() {
    return `SELECT COUNT(*)  AS total
    FROM ancvisit av
    JOIN patients p ON p.id = av.patient_id
    LEFT JOIN personalinformation pi ON p.personalinformation_id = pi.id
    WHERE av.missed > 2 AND pi.state = ? AND pi.lga = ?`;
  }
  static LgaIntermediateResult1ENumeratorwithdate() {
    return `SELECT COUNT(*)  AS total
    FROM ancvisit av
    JOIN patients p ON p.id = av.patient_id
    LEFT JOIN personalinformation pi ON p.personalinformation_id = pi.id
    WHERE av.missed > 2 AND pi.state = ? AND pi.lga = ? AND DATE(av.createdat) BETWEEN ? AND ?`;
  }
  static HealthfacilityIntermediateResult1ENumerator() {
    return `SELECT COUNT(*)  AS total
    FROM ancvisit av
    JOIN patients p ON p.id = av.patient_id
    LEFT JOIN personalinformation pi ON p.personalinformation_id = pi.id
    WHERE av.missed > 2 AND pi.state = ? AND pi.lga = ? AND pi.healthfacility = ?`;
  }
  static HealthfacilityIntermediateResult1ENumeratorwithdate() {
    return `SELECT COUNT(*)  AS total
    FROM ancvisit av
    JOIN patients p ON p.id = av.patient_id
    LEFT JOIN personalinformation pi ON p.personalinformation_id = pi.id
    WHERE av.missed > 2 AND pi.state = ? AND pi.lga = ? AND pi.healthfacility = ? AND DATE(createdat) BETWEEN ? AND ?`;
  }
  //1F Proportion of pregnant women who were contacted and resumed ANC visits
  //Numerator: Number of pregnant women who resumed ANC visits after they were contacted
  //Denominator: Total number of pregnant women who missed an ANC visit

  static IntermediateResult1FNumerator() {
    return `SELECT COUNT(*) AS total FROM returnvisit rv WHERE rv.contactedByPHC = "yes"`;
  }
  static IntermediateResult1FNumeratorwithdate() {
    return `SELECT COUNT(*) AS total FROM returnvisit rv WHERE rv.contactedByPHC = "yes" AND DATE(createdat) BETWEEN ? AND ?`;
  }
  static StateIntermediateResult1FNumerator() {
    return `SELECT COUNT(*)  AS total
    FROM returnvisit rv
    JOIN patients p ON p.id = rv.patient_id
    LEFT JOIN personalinformation pi ON p.personalinformation_id = pi.id
    WHERE rv.contactedByPHC = "yes" AND pi.state = ?`;
  }
  static StateIntermediateResult1FNumeratorwithdate() {
    return `SELECT COUNT(*)  AS total
    FROM returnvisit rv
    JOIN patients p ON p.id = rv.patient_id
    LEFT JOIN personalinformation pi ON p.personalinformation_id = pi.id
    WHERE rv.contactedByPHC = "yes" AND pi.state = ? AND DATE(rv.createdat) BETWEEN ? AND ?`;
  }
  static LgaIntermediateResult1FNumerator() {
    return `SELECT COUNT(*)  AS total
    FROM returnvisit rv
    JOIN patients p ON p.id = rv.patient_id
    LEFT JOIN personalinformation pi ON p.personalinformation_id = pi.id
    WHERE rv.contactedByPHC = "yes" AND pi.state = ? AND pi.lga = ?`;
  }
  static LgaIntermediateResult1FNumeratorwithdate() {
    return `SELECT COUNT(*)  AS total
    FROM returnvisit rv
    JOIN patients p ON p.id = rv.patient_id
    LEFT JOIN personalinformation pi ON p.personalinformation_id = pi.id
    WHERE rv.contactedByPHC = "yes" AND pi.state = ? AND pi.lga = ? AND DATE(rv.createdat) BETWEEN ? AND ?`;
  }
  static HealthfacilityIntermediateResult1FNumerator() {
    return `SELECT COUNT(*)  AS total
    FROM returnvisit rv
    JOIN patients p ON p.id = rv.patient_id
    LEFT JOIN personalinformation pi ON p.personalinformation_id = pi.id
    WHERE rv.contactedByPHC = "yes" AND pi.state = ? AND pi.lga = ? AND pi.healthfacility = ?`;
  }
  static HealthfacilityIntermediateResult1FNumeratorwithdate() {
    return `SELECT COUNT(*)  AS total
    FROM returnvisit rv
    JOIN patients p ON p.id = rv.patient_id
    LEFT JOIN personalinformation pi ON p.personalinformation_id = pi.id
    WHERE rv.contactedByPHC = "yes" AND pi.state = ? AND pi.lga = ? AND pi.healthfacility = ? AND DATE(rv.createdat) BETWEEN ? AND ?`;
  }
  //1F denominator
  static IntermediateResult1Fdenominator() {
    return `SELECT COUNT(*) AS total FROM ancvisit av WHERE av.missed > 0`;
  }
  static IntermediateResult1Fdenominatorwithdate() {
    return `SELECT COUNT(*) AS total FROM ancvisit av WHERE av.missed > 0 AND DATE(createdat) BETWEEN ? AND ?`;
  }
  static StateIntermediateResult1Fdenominator() {
    return `SELECT COUNT(*)  AS total
    FROM ancvisit av
    JOIN patients p ON p.id = av.patient_id
    LEFT JOIN personalinformation pi ON p.personalinformation_id = pi.id
    WHERE av.missed > 0 AND pi.state = ?`;
  }
  static StateIntermediateResult1Fdenominatorwithdate() {
    return `SELECT COUNT(*)  AS total
    FROM ancvisit av
    JOIN patients p ON p.id = av.patient_id
    LEFT JOIN personalinformation pi ON p.personalinformation_id = pi.id
    WHERE av.missed > 0 AND pi.state = ? AND DATE(av.createdat) BETWEEN ? AND ?`;
  }
  static LgaIntermediateResult1Fdenominator() {
    return `SELECT COUNT(*)  AS total
    FROM ancvisit av
    JOIN patients p ON p.id = av.patient_id
    LEFT JOIN personalinformation pi ON p.personalinformation_id = pi.id
    WHERE av.missed > 0 AND pi.state = ? AND pi.lga = ?`;
  }
  static LgaIntermediateResult1Fdenominatorwithdate() {
    return `SELECT COUNT(*)  AS total
    FROM ancvisit av
    JOIN patients p ON p.id = av.patient_id
    LEFT JOIN personalinformation pi ON p.personalinformation_id = pi.id
    WHERE av.missed > 0 AND pi.state = ? AND pi.lga = ? AND DATE(av.createdat) BETWEEN ? AND ?`;
  }
  static HealthfacilityIntermediateResult1Fdenominator() {
    return `SELECT COUNT(*)  AS total
    FROM ancvisit av
    JOIN patients p ON p.id = av.patient_id
    LEFT JOIN personalinformation pi ON p.personalinformation_id = pi.id
    WHERE av.missed > 0 AND pi.state = ? AND pi.lga = ? AND pi.healthfacility = ?`;
  }
  static HealthfacilityIntermediateResult1Fdenominatorwithdate() {
    return `SELECT COUNT(*)  AS total
    FROM ancvisit av
    JOIN patients p ON p.id = av.patient_id
    LEFT JOIN personalinformation pi ON p.personalinformation_id = pi.id
    WHERE av.missed > 0 AND pi.state = ? AND pi.lga = ? AND pi.healthfacility = ? AND DATE(createdat) BETWEEN ? AND ?`;
  }
}
//intermediateResult2
export class IntermediateResult2Query {
  //Proportion of pregnant women that delivered in the facility and received post partum IUD
  //Numerator: Number of pregnant women that delivered at hf and received post partum IUD.
  //Denominator: Total number of pregnant women that delivered at health facility
  static IntermediateResult2ANumerator() {
    return `SELECT COUNT(*) AS total FROM deliveryreport WHERE deliverAtHealthFacility = "yes" AND givenPostPartum = "yes"`;
  }
  static IntermediateResult2ANumeratorwithdate() {
    return `SELECT COUNT(*) AS total FROM deliveryreport WHERE deliverAtHealthFacility = "yes" AND givenPostPartum = "yes" AND DATE(deliverydate) BETWEEN ? AND ?;    
    `;
  }
  static StateIntermediateResult2ANumerator() {
    return `SELECT COUNT(*)  AS total
    FROM deliveryreport dr
    LEFT JOIN healthpersonnel hp ON dr.healthpersonnel_id = hp.id
    WHERE dr.deliverAtHealthFacility = "yes" AND dr.givenPostPartum = "yes" AND hp.state = ?    
    `;
  }

  static StateIntermediateResult2ANumeratorwithdate() {
    return `SELECT COUNT(*)  AS total
    FROM deliveryreport dr
    LEFT JOIN healthpersonnel hp ON dr.healthpersonnel_id = hp.id
    WHERE dr.deliverAtHealthFacility = "yes" AND dr.givenPostPartum = "yes" AND hp.state = ? AND DATE(deliverydate) BETWEEN ? AND ?;    
    `;
  }
  static LgaIntermediateResult2A() {
    return `SELECT COUNT(*)  AS total
    FROM deliveryreport dr
    LEFT JOIN healthpersonnel hp ON dr.healthpersonnel_id = hp.id
    WHERE dr.deliverAtHealthFacility = "yes" AND dr.givenPostPartum = "yes" AND hp.state = ? AND hp.lga = ?    
    `;
  }
  static LgaIntermediateResult2Awithdate() {
    return `SELECT COUNT(*)  AS total
    FROM deliveryreport dr
    LEFT JOIN healthpersonnel hp ON dr.healthpersonnel_id = hp.id
    WHERE dr.deliverAtHealthFacility = "yes" AND dr.givenPostPartum = "yes" AND hp.state = ? AND hp.lga = ? AND DATE(deliverydate) BETWEEN ? AND ?;    
    `;
  }
  static HealthfacilityIntermediateResult2A() {
    return `SELECT COUNT(*)  AS total
    FROM deliveryreport dr
    LEFT JOIN healthpersonnel hp ON dr.healthpersonnel_id = hp.id
    WHERE dr.deliverAtHealthFacility = "yes" AND dr.givenPostPartum = "yes" AND hp.state = ? AND hp.healthfacility = ?   
    `;
  }
  static HealthfacilityIntermediateResult2Awithdate() {
    return `SELECT COUNT(*)  AS total
    FROM deliveryreport dr
    LEFT JOIN healthpersonnel hp ON dr.healthpersonnel_id = hp.id
    WHERE dr.deliverAtHealthFacility = "yes" AND dr.givenPostPartum = "yes" AND hp.state = ? AND hp.healthfacility = ? AND DATE(deliverydate) BETWEEN ? AND ?;    
    `;
  }

  //Denominator
  static IntermediateResult2Adenominator() {
    return `SELECT count(*) as total FROM deliveryreport WHERE deliverAtHealthFacility = "yes"`;
  }
  static IntermediateResult2Adenominatorwithdate() {
    return `SELECT count(*) as total FROM deliveryreport WHERE deliverAtHealthFacility = "yes" AND DATE(deliverydate) BETWEEN ? AND ?`;
  }
  static StateIntermediateResult2Adenominator() {
    return `SELECT COUNT(*)  AS total
    FROM deliveryreport dr
    LEFT JOIN healthpersonnel hp ON dr.healthpersonnel_id = hp.id
    WHERE dr.deliverAtHealthFacility = "yes" AND hp.state = ?    
    `;
  }

  static StateIntermediateResult2Adenominatorwithdate() {
    return `SELECT COUNT(*)  AS total
    FROM deliveryreport dr
    LEFT JOIN healthpersonnel hp ON dr.healthpersonnel_id = hp.id
    WHERE dr.deliverAtHealthFacility = "yes" AND hp.state = ? AND DATE(deliverydate) BETWEEN ? AND ?;    
    `;
  }
  static LgaIntermediateResult2Adenominator() {
    return `SELECT COUNT(*)  AS total
    FROM deliveryreport dr
    LEFT JOIN healthpersonnel hp ON dr.healthpersonnel_id = hp.id
    WHERE dr.deliverAtHealthFacility = "yes" AND hp.state = ? AND hp.lga = ?    
    `;
  }
  static LgaIntermediateResult2Adenominatorwithdate() {
    return `SELECT COUNT(*)  AS total
    FROM deliveryreport dr
    LEFT JOIN healthpersonnel hp ON dr.healthpersonnel_id = hp.id
    WHERE dr.deliverAtHealthFacility = "yes" AND hp.state = ? AND hp.lga = ? AND DATE(deliverydate) BETWEEN ? AND ?;    
    `;
  }
  static HealthfacilityIntermediateResult2Adenominator() {
    return `SELECT COUNT(*)  AS total
    FROM deliveryreport dr
    LEFT JOIN healthpersonnel hp ON dr.healthpersonnel_id = hp.id
    WHERE dr.deliverAtHealthFacility = "yes" AND hp.state = ? AND hp.healthfacility = ?   
    `;
  }
  static HealthfacilityIntermediateResult2Adenominatorwithdate() {
    return `SELECT COUNT(*)  AS total
    FROM deliveryreport dr
    LEFT JOIN healthpersonnel hp ON dr.healthpersonnel_id = hp.id
    WHERE dr.deliverAtHealthFacility = "yes" AND hp.state = ? AND hp.healthfacility = ? AND DATE(deliverydate) BETWEEN ? AND ?;    
    `;
  }
  //Proportion of pregnant women who visited HF with an Under 5 Child that was tested for fever/malaria.
  //Numerator: Number of pregnant women with a under 5 child tested for malaria
  //Denominator: Total number of pregnant women who attended antenatal clinic
  static IntermediateResult2BNumerator() {
    return `SELECT COUNT(*) AS total FROM returnvisit WHERE testedFverMalaria = "yes"`;
  }
  static IntermediateResult2BNumeratorwithdate() {
    return `SELECT COUNT(*) AS total FROM returnvisit WHERE testedFverMalaria = "yes" AND DATE(returnvisit_date) BETWEEN ? AND ?;    
    `;
  }
  static StateIntermediateResult2BNumerator() {
    return `SELECT COUNT(*) AS total FROM returnvisit rv WHERE testedFverMalaria = "yes" AND state = ?    
    `;
  }

  static StateIntermediateResult2BNumeratorwithdate() {
    return `SELECT COUNT(*) AS total FROM returnvisit rv WHERE testedFverMalaria = "yes" AND state = ? AND DATE(returnvisit_date) BETWEEN ? AND ?;    
    `;
  }
  static LgaIntermediateResult2B() {
    return `SELECT COUNT(*) AS total FROM returnvisit rv WHERE testedFverMalaria = "yes" AND state = ? AND lga = ?    
    `;
  }
  static LgaIntermediateResult2Bwithdate() {
    return `SELECT COUNT(*) AS total FROM returnvisit rv WHERE testedFverMalaria = "yes" AND state = ? AND lga = ? AND DATE(returnvisit_date) BETWEEN ? AND ?;    
    `;
  }
  static HealthfacilityIntermediateResult2B() {
    return `SELECT COUNT(*) AS total FROM returnvisit rv WHERE testedFverMalaria = "yes" AND state = ? AND healthfacility = ?   
    `;
  }
  static HealthfacilityIntermediateResult2Bwithdate() {
    return `SELECT COUNT(*) AS total FROM returnvisit rv WHERE testedFverMalaria = "yes" AND state = ? AND healthfacility = ? AND DATE(returnvisit_date) BETWEEN ? AND ?;    
    `;
  }

  //2B Denominator ----> IntermediateResult1Cdenominator

  //----- 2C ------//
  //Proportion of pregnant women who visited HF with a Under 5 Child that was tested for fever/malaria and received appropriate treatment.
  //Numerator: Number of pregnant women with a under 5 child tested for malaria and received treatment

  //Denominator: Total Number of pregnant women with a under 5 child tested for malaria
  static IntermediateResult2CNumerator() {
    return `SELECT COUNT(*) AS total FROM returnvisit WHERE getAppropriateTreatMalariaFever = "yes"`;
  }
  static IntermediateResult2CNumeratorwithdate() {
    return `SELECT COUNT(*) AS total FROM returnvisit WHERE getAppropriateTreatMalariaFever = "yes" AND DATE(returnvisit_date) BETWEEN ? AND ?;    
    `;
  }
  static StateIntermediateResult2CNumerator() {
    return `SELECT COUNT(*) AS total FROM returnvisit rv WHERE getAppropriateTreatMalariaFever = "yes" AND state = ?    
    `;
  }

  static StateIntermediateResult2CNumeratorwithdate() {
    return `SELECT COUNT(*) AS total FROM returnvisit rv WHERE getAppropriateTreatMalariaFever = "yes" AND state = ? AND DATE(returnvisit_date) BETWEEN ? AND ?;    
    `;
  }
  static LgaIntermediateResult2C() {
    return `SELECT COUNT(*) AS total FROM returnvisit rv WHERE getAppropriateTreatMalariaFever = "yes" AND state = ? AND lga = ?    
    `;
  }
  static LgaIntermediateResult2Cwithdate() {
    return `SELECT COUNT(*) AS total FROM returnvisit rv WHERE getAppropriateTreatMalariaFever = "yes" AND state = ? AND lga = ? AND DATE(returnvisit_date) BETWEEN ? AND ?;    
    `;
  }
  static HealthfacilityIntermediateResult2C() {
    return `SELECT COUNT(*) AS total FROM returnvisit rv WHERE getAppropriateTreatMalariaFever = "yes" AND state = ? AND healthfacility = ?   
    `;
  }
  static HealthfacilityIntermediateResult2Cwithdate() {
    return `SELECT COUNT(*) AS total FROM returnvisit rv WHERE getAppropriateTreatMalariaFever = "yes" AND state = ? AND healthfacility = ? AND DATE(returnvisit_date) BETWEEN ? AND ?;    
    `;
  }

  //2CDenominator ----> IntermediateResult2Bnumerator

  //----- 2D ------//
  //Proportion of pregnant women screened or tested for HIV.
  //Numerator: Number of pregnant women screened or tested for HIV
  //Denominator: Total number of pregnant women who attended antenatal clinic
  static IntermediateResult2DNumerator() {
    return `SELECT COUNT(*) AS total FROM pastmedicalhistory WHERE hivaids = "yes" OR hivaidstreatment = "yes"`;
  }
  static IntermediateResult2DNumeratorwithdate() {
    return `SELECT COUNT(*) AS total FROM pastmedicalhistory WHERE hivaids = "yes" OR hivaidstreatment = "yes" AND DATE(createdat) BETWEEN ? AND ?;    
    `;
  }
  static StateIntermediateResult2DNumerator() {
    return `SELECT COUNT(*) AS total FROM pastmedicalhistory pmh LEFT JOIN firstvisit fv ON pmh.firstvisit_id = fv.id LEFT JOIN patients p ON p.id = fv.patient_id LEFT JOIN personalinformation pi ON pi.id = p.personalinformation_id  WHERE (pmh.hivaids = "yes" OR pmh.hivaidstreatment = "yes") AND pi.state = ?    
    `;
  }

  static StateIntermediateResult2DNumeratorwithdate() {
    return `SELECT COUNT(*) AS total FROM pastmedicalhistory pmh LEFT JOIN firstvisit fv ON pmh.firstvisit_id = fv.id LEFT JOIN patients p ON p.id = fv.patient_id LEFT JOIN personalinformation pi ON pi.id = p.personalinformation_id  WHERE (pmh.hivaids = "yes" OR pmh.hivaidstreatment = "yes") AND pi.state = ? AND DATE(pmh.createdat) BETWEEN ? AND ?;    
    `;
  }
  static LgaIntermediateResult2D() {
    return `SELECT COUNT(*) AS total FROM pastmedicalhistory pmh LEFT JOIN firstvisit fv ON pmh.firstvisit_id = fv.id LEFT JOIN patients p ON p.id = fv.patient_id LEFT JOIN personalinformation pi ON pi.id = p.personalinformation_id  WHERE (pmh.hivaids = "yes" OR pmh.hivaidstreatment = "yes") AND pi.state = ? AND pi.lga = ?    
    `;
  }
  static LgaIntermediateResult2Dwithdate() {
    return `SELECT COUNT(*) AS total FROM pastmedicalhistory pmh LEFT JOIN firstvisit fv ON pmh.firstvisit_id = fv.id LEFT JOIN patients p ON p.id = fv.patient_id LEFT JOIN personalinformation pi ON pi.id = p.personalinformation_id  WHERE (pmh.hivaids = "yes" OR pmh.hivaidstreatment = "yes") AND pi.state = ? AND pi.lga = ? AND DATE(pmh.createdat) BETWEEN ? AND ?;    
    `;
  }
  static HealthfacilityIntermediateResult2D() {
    return `SELECT COUNT(*) AS total FROM pastmedicalhistory pmh LEFT JOIN firstvisit fv ON pmh.firstvisit_id = fv.id LEFT JOIN patients p ON p.id = fv.patient_id LEFT JOIN personalinformation pi ON pi.id = p.personalinformation_id  WHERE (pmh.hivaids = "yes" OR pmh.hivaidstreatment = "yes") AND pi.state = ? AND pi.healthfacility = ?   
    `;
  }
  static HealthfacilityIntermediateResult2Dwithdate() {
    return `SELECT COUNT(*) AS total FROM pastmedicalhistory pmh LEFT JOIN firstvisit fv ON pmh.firstvisit_id = fv.id LEFT JOIN patients p ON p.id = fv.patient_id LEFT JOIN personalinformation pi ON pi.id = p.personalinformation_id  WHERE (pmh.hivaids = "yes" OR pmh.hivaidstreatment = "yes") AND pi.state = ? AND pi.healthfacility = ? AND DATE(pmh.createdat) BETWEEN ? AND ?;    
    `;
  }

  //2D Denominator ----> IntermediateResult1Cdenominator
  //----- 2E ------//
  //Proportion of pregnant women not vaccinated for Covid-19 that received vaccination
  //Numerator: Number number of pregnant women vaccinated for Covid-19
  //Denominator: Total number of pregnant women who visited hf with no prior Covid-19 vaccination
  static IntermediateResult2ENumerator() {
    return `SELECT COUNT(*) AS total FROM pastmedicalhistory WHERE covid19 = "yes"`;
  }
  static IntermediateResult2ENumeratorwithdate() {
    return `SELECT COUNT(*) AS total FROM pastmedicalhistory WHERE covid19 = "yes" AND DATE(createdat) BETWEEN ? AND ?;    
    `;
  }
  static StateIntermediateResult2ENumerator() {
    return `SELECT COUNT(*) AS total FROM pastmedicalhistory pmh LEFT JOIN firstvisit fv ON pmh.firstvisit_id = fv.id LEFT JOIN patients p ON p.id = fv.patient_id LEFT JOIN personalinformation pi ON pi.id = p.personalinformation_id  WHERE covid19 = "yes" AND pi.state = ?    
    `;
  }

  static StateIntermediateResult2ENumeratorwithdate() {
    return `SELECT COUNT(*) AS total FROM pastmedicalhistory pmh LEFT JOIN firstvisit fv ON pmh.firstvisit_id = fv.id LEFT JOIN patients p ON p.id = fv.patient_id LEFT JOIN personalinformation pi ON pi.id = p.personalinformation_id  WHERE covid19 = "yes" AND pi.state = ? AND DATE(pmh.createdat) BETWEEN ? AND ?;    
    `;
  }
  static LgaIntermediateResult2E() {
    return `SELECT COUNT(*) AS total FROM pastmedicalhistory pmh LEFT JOIN firstvisit fv ON pmh.firstvisit_id = fv.id LEFT JOIN patients p ON p.id = fv.patient_id LEFT JOIN personalinformation pi ON pi.id = p.personalinformation_id  WHERE covid19 = "yes" AND pi.state = ? AND pi.lga = ?    
    `;
  }
  static LgaIntermediateResult2Ewithdate() {
    return `SELECT COUNT(*) AS total FROM pastmedicalhistory pmh LEFT JOIN firstvisit fv ON pmh.firstvisit_id = fv.id LEFT JOIN patients p ON p.id = fv.patient_id LEFT JOIN personalinformation pi ON pi.id = p.personalinformation_id  WHERE covid19 = "yes" AND pi.state = ? AND pi.lga = ? AND DATE(pmh.createdat) BETWEEN ? AND ?;    
    `;
  }
  static HealthfacilityIntermediateResult2E() {
    return `SELECT COUNT(*) AS total FROM pastmedicalhistory pmh LEFT JOIN firstvisit fv ON pmh.firstvisit_id = fv.id LEFT JOIN patients p ON p.id = fv.patient_id LEFT JOIN personalinformation pi ON pi.id = p.personalinformation_id  WHERE covid19 = "yes" AND pi.state = ? AND pi.healthfacility = ?   
    `;
  }
  static HealthfacilityIntermediateResult2Ewithdate() {
    return `SELECT COUNT(*) AS total FROM pastmedicalhistory pmh LEFT JOIN firstvisit fv ON pmh.firstvisit_id = fv.id LEFT JOIN patients p ON p.id = fv.patient_id LEFT JOIN personalinformation pi ON pi.id = p.personalinformation_id  WHERE covid19 = "yes" AND pi.state = ? AND pi.healthfacility = ? AND DATE(pmh.createdat) BETWEEN ? AND ?;    
    `;
  }

  //2E Denominator
  static IntermediateResult2Edenominator() {
    return `SELECT COUNT(*) AS total FROM pastmedicalhistory WHERE covid19 = "no"`;
  }
  static IntermediateResult2Edenominatorwithdate() {
    return `SELECT COUNT(*) AS total FROM pastmedicalhistory WHERE covid19 = "no" AND DATE(createdat) BETWEEN ? AND ?;    
    `;
  }
  static StateIntermediateResult2Edenominator() {
    return `SELECT COUNT(*) AS total FROM pastmedicalhistory pmh LEFT JOIN firstvisit fv ON pmh.firstvisit_id = fv.id LEFT JOIN patients p ON p.id = fv.patient_id LEFT JOIN personalinformation pi ON pi.id = p.personalinformation_id  WHERE covid19 = "no" AND pi.state = ?    
    `;
  }

  static StateIntermediateResult2Edenominatorwithdate() {
    return `SELECT COUNT(*) AS total FROM pastmedicalhistory pmh LEFT JOIN firstvisit fv ON pmh.firstvisit_id = fv.id LEFT JOIN patients p ON p.id = fv.patient_id LEFT JOIN personalinformation pi ON pi.id = p.personalinformation_id  WHERE covid19 = "no" AND pi.state = ? AND DATE(pmh.createdat) BETWEEN ? AND ?;    
    `;
  }
  static LgaIntermediateResult2Edenominator() {
    return `SELECT COUNT(*) AS total FROM pastmedicalhistory pmh LEFT JOIN firstvisit fv ON pmh.firstvisit_id = fv.id LEFT JOIN patients p ON p.id = fv.patient_id LEFT JOIN personalinformation pi ON pi.id = p.personalinformation_id  WHERE covid19 = "no" AND pi.state = ? AND pi.lga = ?    
    `;
  }
  static LgaIntermediateResult2Edenominatorwithdate() {
    return `SELECT COUNT(*) AS total FROM pastmedicalhistory pmh LEFT JOIN firstvisit fv ON pmh.firstvisit_id = fv.id LEFT JOIN patients p ON p.id = fv.patient_id LEFT JOIN personalinformation pi ON pi.id = p.personalinformation_id  WHERE covid19 = "no" AND pi.state = ? AND pi.lga = ? AND DATE(pmh.createdat) BETWEEN ? AND ?;    
    `;
  }
  static HealthfacilityIntermediateResult2Edenominator() {
    return `SELECT COUNT(*) AS total FROM pastmedicalhistory pmh LEFT JOIN firstvisit fv ON pmh.firstvisit_id = fv.id LEFT JOIN patients p ON p.id = fv.patient_id LEFT JOIN personalinformation pi ON pi.id = p.personalinformation_id  WHERE covid19 = "no" AND pi.state = ? AND pi.healthfacility = ?   
    `;
  }
  static HealthfacilityIntermediateResult2Edenominatorwithdate() {
    return `SELECT COUNT(*) AS total FROM pastmedicalhistory pmh LEFT JOIN firstvisit fv ON pmh.firstvisit_id = fv.id LEFT JOIN patients p ON p.id = fv.patient_id LEFT JOIN personalinformation pi ON pi.id = p.personalinformation_id  WHERE covid19 = "no" AND pi.state = ? AND pi.healthfacility = ? AND DATE(pmh.createdat) BETWEEN ? AND ?;    
    `;
  }
  //----- 2F ------//
  //Proportion of pregnant women with an unimmunized Under 5 Child that was immunized
  //Numerator: Number of pregnant women with an unimmunized under 5 child that received immunization
  //Denominator:Total number of pregnant women with an unimmunized under 5 child
  static IntermediateResult2FNumerator() {
    return `SELECT COUNT(*) AS total FROM returnvisit WHERE recieveImmunizationAge = "yes"`;
  }
  static IntermediateResult2FNumeratorwithdate() {
    return `SELECT COUNT(*) AS total FROM returnvisit WHERE recieveImmunizationAge = "yes" AND DATE(createdat) BETWEEN ? AND ?;    
    `;
  }
  static StateIntermediateResult2FNumerator() {
    return `SELECT COUNT(*) AS total FROM returnvisit WHERE recieveImmunizationAge = "yes" AND state = ?    
    `;
  }

  static StateIntermediateResult2FNumeratorwithdate() {
    return `SELECT COUNT(*) AS total FROM returnvisit WHERE recieveImmunizationAge = "yes" AND state = ? AND DATE(createdat) BETWEEN ? AND ?;    
    `;
  }
  static LgaIntermediateResult2F() {
    return `SELECT COUNT(*) AS total FROM returnvisit WHERE recieveImmunizationAge = "yes" AND state = ? AND lga = ?    
    `;
  }
  static LgaIntermediateResult2Fwithdate() {
    return `SELECT COUNT(*) AS total FROM returnvisit WHERE recieveImmunizationAge = "yes" AND state = ? AND lga = ? AND DATE(createdat) BETWEEN ? AND ?;    
    `;
  }
  static HealthfacilityIntermediateResult2F() {
    return `SELECT COUNT(*) AS total FROM returnvisit WHERE recieveImmunizationAge = "yes" AND state = ? AND healthfacility = ?   
    `;
  }
  static HealthfacilityIntermediateResult2Fwithdate() {
    return `SELECT COUNT(*) AS total FROM returnvisit WHERE recieveImmunizationAge = "yes" AND state = ? AND healthfacility = ? AND DATE(createdat) BETWEEN ? AND ?;    
    `;
  }

  //2F Denominator
  static IntermediateResult2Fdenominator() {
    return `SELECT COUNT(*) AS total FROM returnvisit WHERE recieveImmunizationAge = "no"`;
  }
  static IntermediateResult2Fdenominatorwithdate() {
    return `SELECT COUNT(*) AS total FROM returnvisit WHERE recieveImmunizationAge = "no" AND DATE(createdat) BETWEEN ? AND ?;    
    `;
  }
  static StateIntermediateResult2Fdenominator() {
    return `SELECT COUNT(*) AS total FROM returnvisit WHERE recieveImmunizationAge = "no" AND state = ?    
    `;
  }

  static StateIntermediateResult2Fdenominatorwithdate() {
    return `SELECT COUNT(*) AS total FROM returnvisit WHERE recieveImmunizationAge = "no" AND state = ? AND DATE(createdat) BETWEEN ? AND ?;    
    `;
  }
  static LgaIntermediateResult2Fdenominator() {
    return `SELECT COUNT(*) AS total FROM returnvisit WHERE recieveImmunizationAge = "no" AND state = ? AND lga = ?    
    `;
  }
  static LgaIntermediateResult2Fdenominatorwithdate() {
    return `SELECT COUNT(*) AS total FROM returnvisit WHERE recieveImmunizationAge = "no" AND state = ? AND lga = ? AND DATE(createdat) BETWEEN ? AND ?;    
    `;
  }
  static HealthfacilityIntermediateResult2Fdenominator() {
    return `SELECT COUNT(*) AS total FROM returnvisit WHERE recieveImmunizationAge = "no" AND state = ? AND healthfacility = ?   
    `;
  }
  static HealthfacilityIntermediateResult2Fdenominatorwithdate() {
    return `SELECT COUNT(*) AS total FROM returnvisit WHERE recieveImmunizationAge = "no" AND state = ? AND healthfacility = ? AND DATE(createdat) BETWEEN ? AND ?;    
    `;
  }
  //----- 2G ------//
  //Proportion of pregnant women with 9-59months Child screened for Malnutrition
  //Numerator: Number of pregnant women with a Under 5 child screened for malnutrition

  //Denominator: Total number of Pregnant women who attended antenatal clinic with a Under 5 child
  static IntermediateResult2GNumerator() {
    return `SELECT COUNT(*) AS total FROM returnvisit WHERE screenedMalnutrition = "yes"`;
  }
  static IntermediateResult2GNumeratorwithdate() {
    return `SELECT COUNT(*) AS total FROM returnvisit WHERE screenedMalnutrition = "yes" AND DATE(createdat) BETWEEN ? AND ?;    
    `;
  }
  static StateIntermediateResult2GNumerator() {
    return `SELECT COUNT(*) AS total FROM returnvisit WHERE screenedMalnutrition = "yes" AND state = ?    
    `;
  }

  static StateIntermediateResult2GNumeratorwithdate() {
    return `SELECT COUNT(*) AS total FROM returnvisit WHERE screenedMalnutrition = "yes" AND state = ?     AND DATE(createdat) BETWEEN ? AND ?;    
    `;
  }
  static LgaIntermediateResult2G() {
    return `SELECT COUNT(*) AS total FROM returnvisit WHERE screenedMalnutrition = "yes" AND state = ? AND lga = ?    
    `;
  }
  static LgaIntermediateResult2Gwithdate() {
    return `SELECT COUNT(*) AS total FROM returnvisit WHERE screenedMalnutrition = "yes" AND state = ? AND lga = ? AND DATE(createdat) BETWEEN ? AND ?;    
    `;
  }
  static HealthfacilityIntermediateResult2G() {
    return `SELECT COUNT(*) AS total FROM returnvisit WHERE screenedMalnutrition = "yes" AND state = ? AND healthfacility = ?
    `;
  }
  static HealthfacilityIntermediateResult2Gwithdate() {
    return `SELECT COUNT(*) AS total FROM returnvisit WHERE screenedMalnutrition = "yes" AND state = ? AND healthfacility = ? AND DATE(createdat) BETWEEN ? AND ?;    
    `;
  }

  //2G Denominator
  static IntermediateResult2Gdenominator() {
    return `SELECT COUNT(*) AS total FROM returnvisit WHERE comeWithUnderFiveChildren = "yes"`;
  }
  static IntermediateResult2Gdenominatorwithdate() {
    return `SELECT COUNT(*) AS total FROM returnvisit WHERE comeWithUnderFiveChildren = "yes" AND DATE(createdat) BETWEEN ? AND ?;    
    `;
  }
  static StateIntermediateResult2Gdenominator() {
    return `SELECT COUNT(*) AS total FROM returnvisit WHERE comeWithUnderFiveChildren = "yes" AND state = ?    
    `;
  }

  static StateIntermediateResult2Gdenominatorwithdate() {
    return `SELECT COUNT(*) AS total FROM returnvisit WHERE comeWithUnderFiveChildren = "yes" AND state = ? AND DATE(createdat) BETWEEN ? AND ?;    
    `;
  }
  static LgaIntermediateResult2Gdenominator() {
    return `SELECT COUNT(*) AS total FROM returnvisit WHERE comeWithUnderFiveChildren = "yes" AND state = ? AND lga = ?    
    `;
  }
  static LgaIntermediateResult2Gdenominatorwithdate() {
    return `SELECT COUNT(*) AS total FROM returnvisit WHERE comeWithUnderFiveChildren = "yes" AND state = ? AND lga = ? AND DATE(createdat) BETWEEN ? AND ?;    
    `;
  }
  static HealthfacilityIntermediateResult2Gdenominator() {
    return `SELECT COUNT(*) AS total FROM returnvisit WHERE comeWithUnderFiveChildren = "yes" AND state = ? AND healthfacility = ?  
    `;
  }
  static HealthfacilityIntermediateResult2Gdenominatorwithdate() {
    return `SELECT COUNT(*) AS total FROM returnvisit WHERE comeWithUnderFiveChildren = "yes" AND state = ? AND healthfacility = ? AND DATE(createdat) BETWEEN ? AND ?;    
    `;
  }
}
