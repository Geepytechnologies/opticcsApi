const createUserTable = `CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
    phone VARCHAR(255) NOT NULL
    state VARCHAR(255) NOT NULL
    lga VARCHAR(255) NOT NULL
    ward VARCHAR(255) NOT NULL
    healthFacility VARCHAR(255) NOT NULL
    healthWorker VARCHAR(255) NOT NULL
)`;

//Table: healthpersonnel
const createHealthPersonnelTable = `CREATE TABLE healthpersonnel (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255),
  password VARCHAR(255),
  phone VARCHAR(255),
  state VARCHAR(255),
  lga VARCHAR(255),
  ward VARCHAR(255),
  healthFacility VARCHAR(255),
  healthWorker VARCHAR(255),
  cadre VARCHAR(255),
  refreshToken VARCHAR(255)
)`;

//Table: healthpersonnel
const createHealthAdminTable = `CREATE TABLE healthadmin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    phone VARCHAR(255),
    staffid VARCHAR(255),
    accountType VARCHAR(255),
    refreshToken VARCHAR(255)
  );
  `;

//-- Table: patients
const createPatientsTable = `CREATE TABLE patients (
  id INT PRIMARY KEY,
  healthpersonnel_id INT,
  date DATETIME,
  hospitalNumber VARCHAR(255),
  firstName VARCHAR(255),
  middleName VARCHAR(255),
  surname VARCHAR(255),
  address VARCHAR(255),
  gravidity VARCHAR(255),
  parity VARCHAR(255),
  LMP VARCHAR(255),
  EDD VARCHAR(255),
  EGA VARCHAR(255),
  doYouFeelTheBabysMovement VARCHAR(255),
  doYouKnowDateOfFirstBabyMovement VARCHAR(255),
  doYouKnowDateOfLastBabyMovement VARCHAR(255),
  doYouWorkOutsideTheHome VARCHAR(255),
  doYouWalkLongDistances VARCHAR(255),
  durationOfWalkingDistanceInMinutes VARCHAR(255),
  heavyLoads VARCHAR(255),
  sleepHours VARCHAR(255),
  dailyMealCount VARCHAR(255),
  mealInTheLastTwoDays VARCHAR(255),
  nonFoodSubstances VARCHAR(255),
  babyLessThanAYear VARCHAR(255),
  doYou VARCHAR(255),
  whoDoYouLiveWith VARCHAR(255),
  didAnyoneEver VARCHAR(255),
  frightened VARCHAR(255),
  convulsionDuringAPregnancy VARCHAR(255),
  caesareanSection VARCHAR(255),
  tearsThroughSphincter VARCHAR(255),
  haemorrhage VARCHAR(255),
  stillbirths VARCHAR(255),
  prematureDeliveries VARCHAR(255),
  lowBirthWeightBabies VARCHAR(255),
  deadBabies VARCHAR(255),
  obstetricOthers VARCHAR(255),
  breastfedBefore VARCHAR(255),
  durationYouBreastfedYourBaby VARCHAR(255),
  breastfeedingProblems VARCHAR(255),
  medicationAllergies VARCHAR(255),
  medicationSymptoms VARCHAR(255),
  pulmonaryCough VARCHAR(255),
  pulmonaryDifficultyBreathing VARCHAR(255),
  cardiovascularPalpitation VARCHAR(255),
  cardiovascularSwellingOfFeet VARCHAR(255),
  cardiovascularSevereChestPain VARCHAR(255),
  cardiovascularSevereEpigastricPain VARCHAR(255),
  cardiovascularSevereTiredness VARCHAR(255),
  cardiovascularDifficultyLyingFlat VARCHAR(255),
  neurologicHeadaches VARCHAR(255),
  neurologicDizziness VARCHAR(255),
  neurologicConvulsions VARCHAR(255),
  gastrointestinalSevereAbdominalPain VARCHAR(255),
  gastrointestinalVomiting VARCHAR(255),
  gastrointestinalDiarrhoea VARCHAR(255),
  urinaryPain VARCHAR(255),
  urinarySevereFlankPain VARCHAR(255),
  urinaryBloodInUrine VARCHAR(255),
  urinarySwollenFace VARCHAR(255),
  gynaecologicalVaginalDischarge VARCHAR(255),
  gynaecologicalPainDuringSex VARCHAR(255),
  gynaecologicalSyphillis VARCHAR(255),
  historyOfDryCough VARCHAR(255),
  historyOfWeightLoss VARCHAR(255),
  historyOfNightSweat VARCHAR(255),
  historyOfTuberculosisDiagnosed VARCHAR(255),
  historyOfTuberculosisTreated VARCHAR(255),
  diagnosedOfHeartDisease VARCHAR(255),
  diagnosedOfAnaemia VARCHAR(255),
  diagnosedOfKidney VARCHAR(255),
  diagnosedOfSickleCell VARCHAR(255),
  diagnosedOfDiabetes VARCHAR(255),
  diagnosedOfGoitre VARCHAR(255),
  diagnosedOfHIV VARCHAR(255),
  diagnosedOfCOVID VARCHAR(255),
  diagnosedOfAnyOther VARCHAR(255),
  admitted VARCHAR(255),
  reasonForAdmission VARCHAR(255),
  surgery VARCHAR(255),
  reasonForSurgery VARCHAR(255),
  traditionalMedications VARCHAR(255),
  herbalRemedies VARCHAR(255),
  vitamins VARCHAR(255),
  otcDrugs VARCHAR(255),
  dietarySupplements VARCHAR(255),
  otherMedications VARCHAR(255),
  tetanus VARCHAR(255),
  tetanusDoses VARCHAR(255),
  lastTetanusDose VARCHAR(255),
  covidVaccination VARCHAR(255),
  FOREIGN KEY (healthpersonnel_id) REFERENCES healthpersonnel(id)
)`;

//-- Table: messages
const createMessagesTable = `CREATE TABLE messages (
  id INT PRIMARY KEY,
  healthpersonnel_id INT,
  from VARCHAR(255),
  date DATETIME,
  delivered BOOLEAN,
  FOREIGN KEY (healthpersonnel_id) REFERENCES healthpersonnel(id)
)`;

//-- Table: schedule
const createScheduleTable = `CREATE TABLE schedule (
  id INT PRIMARY KEY,
  healthpersonnel_id INT,
  name VARCHAR(255),
  state VARCHAR(255),
  lga VARCHAR(255),
  dateFrom VARCHAR(255),
  dateTo VARCHAR(255),
  completed BOOLEAN DEFAULT FALSE,
  confirmed BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (healthpersonnel_id) REFERENCES healthpersonnel(id)
)`;

//-- Table: testing
const createTestingTable = `CREATE TABLE testing (
  id INT PRIMARY KEY,
  healthpersonnel_id INT,
  patientID VARCHAR(255),
  ANCbooking VARCHAR(255),
  date VARCHAR(255),
  time VARCHAR(255),
  completed BOOLEAN DEFAULT FALSE,
  result VARCHAR(255),
  FOREIGN KEY (healthpersonnel_id) REFERENCES healthpersonnel(id)
)`;

//-- Table: myTests
const createmyTestsTable = `CREATE TABLE myTests (
  id INT PRIMARY KEY,
  healthpersonnel_id INT,
  patientID VARCHAR(255),
  ANCbooking VARCHAR(255),
  date VARCHAR(255),
  time VARCHAR(255),
  completed BOOLEAN,
  result VARCHAR(255),
  FOREIGN KEY (healthpersonnel_id) REFERENCES healthpersonnel(id)
)`;

//-- Table: deliveryReport
const createDeliveryReportTable = `CREATE TABLE deliveryReport (
  id INT PRIMARY KEY,
  healthpersonnel_id INT,
  patientID VARCHAR(255),
  gender VARCHAR(255),
  NoOfChildren VARCHAR(255),
  deliveryDate VARCHAR(255),
  deliveryTime VARCHAR(255),
  FOREIGN KEY (healthpersonnel_id) REFERENCES healthpersonnel(id)
)`;

const healthpersonnel = {
  id: id,
  name: String,
  email: String,
  password: String,
  phone: String,
  state: String,
  lga: String,
  ward: String,
  healthFacility: String,
  healthWorker: String,
  cadre: ["Midwife", "Nurse", "CHEW", "JCHEW", "CHO", "Others"],
  patients: {
    firstvisit: {
      date: createdat,
      PersonalInformation: {
        HospitalNumber: String,
        FirstName: String,
        middleName: String,
        surname: String,
        Address: String,
        Gravidity: String,
        parity: String,
        LMP: String,
        EDD: String,
        EGA: String,
        DoYouFeelthebabysmovement: String,
        doyouknowdateoffirtbabymovement: String,
        doyouknowdateoflastbabymovement: String,
      },
      dailyHabitsAndLifestyle: {
        Doyouworkoutsidethehome: String,
        Doyouwalklongdistances: String,
        durationofwalkingdistanceinminutes: String,
        heavyloads: String,
        sleephours: String,
        dailymealcount: String,
        mealinthelasttwodays: String,
        nonfoodsubstances: String,
        babylessthanayear: String,
        doYou: String,
        WhodoyouLivewith: String,
        Didanyoneever: String,
        frightened: String,
      },
      obstetricHistory: {
        convulsionduringapregnancy: String,
        caesareansection: String,
        tearsthroughsphincter: String,
        haemorrhage: String,
        Stillbirths: String,
        prematureDeliveries: String,
        lowbirthweightbabies: String,
        deadbabies: String,
        others: String,
        breastfedbefore: String,
        durationyoubreastfedyourbaby: String,
        breastfeedingproblems: String,
        others: String,
      },
      medicationhistory: {
        allergies: String,
        symptoms: string,
        pulmonary: {
          cough: String,
          difficultyBreathing: String,
        },
        cardiovascular: {
          palpitation: String,
          swellingoffeet: String,
          severechestpain: String,
          Severeepigastricpain: String,
          Severetirednesss: String,
          difficultylyingflat: String,
        },
        neurologic: {
          headaches: String,
          dizziness: String,
          convulsions: String,
        },
        gastrointestinal: {
          severeabdominalpain: String,
          vomiting: String,
          diarrhoea: String,
        },
        urinary: {
          pain: String,
          severeflankpain: String,
          bloodinurine: String,
          swollenface: String,
        },
        Gynaecological: {
          Vaginaldischarge: String,
          painduringsex: String,
          syphillis: String,
        },
        historyof: {
          drycough: String,
          weightloss: String,
          nightsweat: String,
          tuberculosisdiagnosed: String,
          tuberculosistreated: String,
        },
        diagnosedof: {
          heartdisease: String,
          Anaemia: String,
          kidney: String,
          sicklecell: String,
          diabetes: String,
          goitre: String,
          hiv: String,
          covid: String,
          anyother: String,
          admitted: String,
          reasonforadmission: String,
          surgery: String,
          reasonforsurgery: String,
        },
        onmedications: {
          traditional: String,
          herbalremedies: String,
          vitamins: String,
          otcDrugs: String,
          dietary: String,
          others: String,
          tetanus: String,
          tetanusdoses: String,
          lastTetanusdose: String,
          covidVaccination: String,
        },
      },
    },
    every: {
      healthpersonnel_id: String,
      healthFacility: String,
      facialExpression: {
        responsive: String,
        dull: String,
        unresponsive: String,
      },
      generalCleanliness: {
        noVisibleDirt: String,
        noodour: String,
        visibleDirt: String,
        odour: String,
      },
      herSkin: {
        freeFromBruises: String,
        hasBruises: String,
      },
      herConjunctiva: {
        pink: String,
        palePink: String,
        whiteInColour: String,
      },
      sclera: {
        white: String,
        tinge: String,
        deepYellow: String,
        dirtyWhite: String,
      },
      //add genital examination
      bloodpressure: String,
      adbominalExamination: {
        abdomenScars: String,
        palpateAndEstimatefundusdocumentation: String,
        distancebtwTopOfFundusinWeeks: String,
        cmFromTopfundusdocumentation: String,
        distancebtwTopOfFundusinCM: String,
      },
    },
  },
  messages: [
    {
      from: String,
      date: String,
      status: {
        delivered: Boolean,
      },
    },
  ],
  schedule: {
    name: String,
    state: String,
    lga: String,
    dateFrom: String,
    dateTo: String,
    completed: { type: Boolean, default: false },
    confirmed: { type: Boolean, default: false },
  },
  testing: {
    Test: {
      patientID: String,
      ANCbooking: String,
      date: String,
      time: String,
      completed: { type: Boolean, default: false },
      testResult: {
        result: String,
      },
    },
  },
  myTests: [
    {
      patientID: String,
      ANCbooking: String,
      date: String,
      time: String,
      completed: Boolean,
      testResult: {
        result: String,
      },
    },
  ],
  deliveryReport: {
    patientID: String,
    gender: String,
    NoOfChildren: String,
    deliveryDate: String,
    deliveryTime: String,
  },
};

// -- Table: healthpersonnel
`CREATE TABLE healthpersonnel (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255),
  password VARCHAR(255),
  phone VARCHAR(255),
  state VARCHAR(255),
  lga VARCHAR(255),
  ward VARCHAR(255),
  healthFacility VARCHAR(255),
  healthWorker VARCHAR(255),
  verified BOOLEAN DEFAULT 0,
  cadre VARCHAR(255),
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

// -- Table: patients
`CREATE TABLE patients (
  id INT PRIMARY KEY AUTO_INCREMENT,
  healthpersonnel_id INT,
  firstvisit_date DATE,
  personalinformation_id INT,
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (healthpersonnel_id) REFERENCES healthpersonnel(id) ON DELETE CASCADE,
  FOREIGN KEY (personalinformation_id) REFERENCES personalinformation(id) ON DELETE CASCADE
)`;

// -- Table: firstvisit
`CREATE TABLE firstvisit (
  id INT PRIMARY KEY AUTO_INCREMENT,
  firstvisit_date DATE,
  patient_id INT,
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
)`;

// -- Table: personalinformation
`CREATE TABLE personalinformation (
  id INT PRIMARY KEY AUTO_INCREMENT,
  hospitalnumber VARCHAR(255),
  firstname VARCHAR(255),
  middlename VARCHAR(255),
  surname VARCHAR(255),
  phone VARCHAR(255),
  address VARCHAR(255),
  gravidity VARCHAR(255),
  parity VARCHAR(255),
  lmp DATE,
  edd DATE,
  ega VARCHAR(255),
  doyoufeelthebabysmovement VARCHAR(255),
  doyouknowdateoffirtbabymovement VARCHAR(255),
  doyouknowdateoflastbabymovement VARCHAR(255),
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
)`;

// -- Table: updateddailyHabitsAndLifestyle
`CREATE TABLE dailyhabitsandlifestyle (
  id INT PRIMARY KEY AUTO_INCREMENT,
  firstvisit_id INT,
  doyousmoke VARCHAR(255),
  doyoudrinkalcohol VARCHAR(255),
  doyouuseharmfulsubstances VARCHAR(255),
  whodoyoulivewith VARCHAR(255),
  stoppedfromleavingthehouse VARCHAR(255),
  threatenedyourlife VARCHAR(255),
  abusedphysicallyorsexually VARCHAR(255),
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (firstvisit_id) REFERENCES firstvisit(id) ON DELETE CASCADE
)`;

// -- Table: medicationhistory
`CREATE TABLE medicationhistory (
  id INT PRIMARY KEY AUTO_INCREMENT,
  firstvisit_id INT,
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (firstvisit_id) REFERENCES firstvisit(id) ON DELETE CASCADE
)`;

// -- Table: General
`CREATE TABLE general (
  id INT PRIMARY KEY AUTO_INCREMENT,
  medicationhistory_id INT,
  fever VARCHAR(255),
  headache VARCHAR(255),
  dizziness VARCHAR(255),
  convulsions VARCHAR(255),
  weakness VARCHAR(255),
  blurryvision VARCHAR(255),
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (medicationhistory_id) REFERENCES medicationhistory(id) ON DELETE CASCADE
)`;

// -- Table: pulmonary
`CREATE TABLE pulmonary (
  id INT PRIMARY KEY AUTO_INCREMENT,
  medicationhistory_id INT,
  cough VARCHAR(255),
  difficultybreathing VARCHAR(255),
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (medicationhistory_id) REFERENCES medicationhistory(id) ON DELETE CASCADE
)`;

// -- Table: cardiovascular
`CREATE TABLE cardiovascular (
  id INT PRIMARY KEY AUTO_INCREMENT,
  medicationhistory_id INT,
  palpitation VARCHAR(255),
  swellingoffeet VARCHAR(255),
  severechestpain VARCHAR(255),
  severeepigastricpain VARCHAR(255),
  pepticulcerpatient VARCHAR(255),
  severetirednesss VARCHAR(255),
  difficultylyingflat VARCHAR(255),
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (medicationhistory_id) REFERENCES medicationhistory(id) ON DELETE CASCADE
)`;

// -- Table: gastrointestinal
`CREATE TABLE gastrointestinal (
  id INT PRIMARY KEY AUTO_INCREMENT,
  medicationhistory_id INT,
  severeabdominalpain VARCHAR(255),
  vomiting VARCHAR(255),
  diarrhoea VARCHAR(255),
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (medicationhistory_id) REFERENCES medicationhistory(id) ON DELETE CASCADE
)`;

// -- Table: urinary
`CREATE TABLE urinary (
  id INT PRIMARY KEY AUTO_INCREMENT,
  medicationhistory_id INT,
  urinarypain VARCHAR(255),
  severeflankpain VARCHAR(255),
  bloodinurine VARCHAR(255),
  increasedurination VARCHAR(255),
  antsaroundurine VARCHAR(255),
  increasedthirst VARCHAR(255),
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (medicationhistory_id) REFERENCES medicationhistory(id) ON DELETE CASCADE
)`;

// -- Table: gynaecological
`CREATE TABLE gynaecological (
  id INT PRIMARY KEY AUTO_INCREMENT,
  medicationhistory_id INT,
  vaginaldischarge VARCHAR(255),
  painduringsex VARCHAR(255),
  syphillis VARCHAR(255),
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (medicationhistory_id) REFERENCES medicationhistory(id) ON DELETE CASCADE
)`;

// -- Table: obstetricHistory i made a change here
`CREATE TABLE obstetrichistory (
  id INT PRIMARY KEY AUTO_INCREMENT,
  firstvisit_id INT,
  convulsionduringapregnancy VARCHAR(255),
  caesareansection VARCHAR(255),
  tearsthroughsphincter VARCHAR(255),
  haemorrhage VARCHAR(255),
  stillbirths VARCHAR(255),
  prematureDeliveries VARCHAR(255),
  lowbirthweightbabies VARCHAR(255),
  deadbabies VARCHAR(255),
  miscarriages VARCHAR(255),
  others VARCHAR(255),
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (firstvisit_id) REFERENCES firstvisit(id) ON DELETE CASCADE
)`;

// -- Table: drughistory
`CREATE TABLE drughistory (
  id INT PRIMARY KEY AUTO_INCREMENT,
  medicationhistory_id INT,
  allergies VARCHAR(255),
  herbalremedies VARCHAR(255),
  vitamins VARCHAR(255),
  otcdrugs VARCHAR(255),
  dietary VARCHAR(255),
  othersdrughistory VARCHAR(255),
  tetanus VARCHAR(255),
  tetanusdoses VARCHAR(255),
  lasttetanusdose VARCHAR(255),
  covidvaccination VARCHAR(255),
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (medicationhistory_id) REFERENCES medicationhistory(id) ON DELETE CASCADE
)`;

// -- Table: pastmedicalhistory
`CREATE TABLE pastmedicalhistory (
  id INT PRIMARY KEY AUTO_INCREMENT,
  firstvisit_id INT,
  hypertension VARCHAR(255),
  heartdisease VARCHAR(255),
  anaemia VARCHAR(255),
  kidneydisease VARCHAR(255),
  sicklecell VARCHAR(255),
  diabetes VARCHAR(255),
  goitre VARCHAR(255),
  hiv VARCHAR(255),
  currentlyontreatmentforhiv VARCHAR(255),
  seriouschronicillness VARCHAR(255),
  covidvaccinationpast VARCHAR(255),
  everhadsurgery VARCHAR(255),
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (firstvisit_id) REFERENCES firstvisit(id) ON DELETE CASCADE)`;

// -- Table: familyHistory
`CREATE TABLE familyhistory (
  id INT PRIMARY KEY AUTO_INCREMENT,
  firstvisit_id INT,
  haveyoubreastfedbefore VARCHAR(255),
  lengthofbreastfeeding VARCHAR(255),
  problemsbreastfeeding VARCHAR(255),
  babylessthanayear VARCHAR(255),
  areyoustillbreastfeeding VARCHAR(255),
  camewithachildunder5years VARCHAR(255),
  immunisationstatus VARCHAR(255),
  unvaccinatedchildrenathome VARCHAR(255),
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (firstvisit_id) REFERENCES firstvisit(id) ON DELETE CASCADE)`;

// -- Table: returnVisit
`CREATE TABLE returnvisit (
  id INT PRIMARY KEY AUTO_INCREMENT,
  patient_id INT,
  fever VARCHAR(255),
    headache VARCHAR(255),
    dizziness VARCHAR(255),
    convulsions VARCHAR(255),
    weakness VARCHAR(255),
    blurryvision VARCHAR(255),
    cough VARCHAR(255),
    difficultybreathing VARCHAR(255),
    palpitation VARCHAR(255),
    swellingoffeet VARCHAR(255),
    severechestpain VARCHAR(255),
    severeepigastricpain VARCHAR(255),
    pepticulcerpatient VARCHAR(255),
    severetirednesss VARCHAR(255),
    difficultylyingflat VARCHAR(255),
    severeabdominalpain VARCHAR(255),
    vomiting VARCHAR(255),
    diarrhoea VARCHAR(255),
    urinarypain VARCHAR(255),
    severeflankpain VARCHAR(255),
    bloodinurine VARCHAR(255),
    increasedurination VARCHAR(255),
    antsaroundurine VARCHAR(255),
    increasedthirst VARCHAR(255),
    vaginaldischarge VARCHAR(255),
    painduringsex VARCHAR(255),
    syphillis VARCHAR(255),
    receivedcaresincelastvisit VARCHAR(255),
    whoprovidedthecare VARCHAR(255),
    whatcarewasprovided VARCHAR(255),
    outcomeofthecare VARCHAR(255),
    takingprescribeddrugs VARCHAR(255),
    problemtakingdrugs VARCHAR(255),
    followadvice VARCHAR(255),
    reactionorsideeffects VARCHAR(255),
    anythingrelatedtopregnancy VARCHAR(255),
    pink VARCHAR(255),
  palepink VARCHAR(255),
  whiteincolour VARCHAR(255),
  white VARCHAR(255),
  tinge VARCHAR(255),
  deepyellow VARCHAR(255),
  dirtywhite VARCHAR(255),
  bloodpressure VARCHAR(255),
  respiratoryrate VARCHAR(255),
  temperature VARCHAR(255),
  pulserate VARCHAR(255),
  abdomenScars VARCHAR(255),
  palpateAndEstimatefundusdocumentation VARCHAR(255),
  distancebtwtopdffundus VARCHAR(255),
  cmfromtopfundusdocumentation VARCHAR(255),
  cmfromuppersymphysis VARCHAR(255),
  presentation VARCHAR(255),
  descent VARCHAR(255),
  positionoffoetus VARCHAR(255),
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
)`;

// -- Table: facialExpression
`CREATE TABLE facialexpression (
  id INT PRIMARY KEY AUTO_INCREMENT,
  returnvisit_id INT,
  responsive VARCHAR(255),
  dull VARCHAR(255),
  unresponsive VARCHAR(255),
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (returnvisit_id) REFERENCES returnvisit(id) ON DELETE CASCADE
)`;

// -- Table: generalCleanliness
`CREATE TABLE generalCleanliness (
  id INT PRIMARY KEY AUTO_INCREMENT,
  returnvisit_id INT,
  novisibledirt VARCHAR(255),
  noodour VARCHAR(255),
  visibledirt VARCHAR(255),
  odour VARCHAR(255),
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (returnvisit_id) REFERENCES returnvisit(id) ON DELETE CASCADE
)`;

// `-- Table: herConjunctiva
`CREATE TABLE herConjunctiva (
  id INT PRIMARY KEY AUTO_INCREMENT,
  returnvisit_id INT,
  pink VARCHAR(255),
  palepink VARCHAR(255),
  whiteincolour VARCHAR(255),
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (returnvisit_id) REFERENCES returnvisit(id) ON DELETE CASCADE
)`;

// -- Table: sclera
`CREATE TABLE sclera (
  id INT PRIMARY KEY AUTO_INCREMENT,
  returnvisit_id INT,
  white VARCHAR(255),
  tinge VARCHAR(255),
  deepyellow VARCHAR(255),
  dirtywhite VARCHAR(255),
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (returnvisit_id) REFERENCES returnvisit(id) ON DELETE CASCADE
)`;
// -- Table: returnvisit others
`CREATE TABLE returnvisitinfo (
  id INT PRIMARY KEY AUTO_INCREMENT,
  returnvisit_id INT,
  complaints VARCHAR(255),
  receivedcaresincelastvisit VARCHAR(255),
  whoprovidedthecare VARCHAR(255),
  whatcarewasprovided VARCHAR(255),
  outcomeofthecare VARCHAR(255),
  problemwithdrugs VARCHAR(255),
  followedrecommendations VARCHAR(255),
  reactionstodrugs VARCHAR(255),
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (returnvisit_id) REFERENCES returnvisit(id) ON DELETE CASCADE
)`;

// -- Table: bloodpressure
`CREATE TABLE bloodpressure (
  id INT PRIMARY KEY AUTO_INCREMENT,
  returnvisit_id INT,
  bloodpressure VARCHAR(255),
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (returnvisit_id) REFERENCES returnvisit(id) ON DELETE CASCADE
)`;
// -- Table: respiratoryrate new
`CREATE TABLE respiratoryrate (
  id INT PRIMARY KEY AUTO_INCREMENT,
  returnvisit_id INT,
  respiratoryrate VARCHAR(255),
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (returnvisit_id) REFERENCES returnvisit(id) ON DELETE CASCADE
)`;
// -- Table: pulserate new
`CREATE TABLE pulserate (
  id INT PRIMARY KEY AUTO_INCREMENT,
  returnvisit_id INT,
  pulserate VARCHAR(255),
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (returnvisit_id) REFERENCES returnvisit(id) ON DELETE CASCADE
)`;
// -- Table: temperature new
`CREATE TABLE temperature (
  id INT PRIMARY KEY AUTO_INCREMENT,
  returnvisit_id INT,
  temperature VARCHAR(255),
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (returnvisit_id) REFERENCES returnvisit(id) ON DELETE CASCADE
)`;

// -- Table: adbominalExamination
`CREATE TABLE adbominalExamination (
  id INT PRIMARY KEY AUTO_INCREMENT,
  returnvisit_id INT,
  abdomenScars VARCHAR(255),
  palpateAndEstimatefundusdocumentation VARCHAR(255),
  distancebtwtopdffundus VARCHAR(255),
  cmfromtopfundusdocumentation VARCHAR(255),
  cmfromuppersymphysis VARCHAR(255),
  presentation VARCHAR(255),
  descent VARCHAR(255),
  positionoffoetus VARCHAR(255),
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (returnvisit_id) REFERENCES returnvisit(id) ON DELETE CASCADE
)`;

// -- Table:visualbreastexamination new
`CREATE TABLE visualbreastexamination (
  id INT PRIMARY KEY AUTO_INCREMENT,
  returnvisit_id INT,
  firstvisit_id INT,
  normal VARCHAR(255),
  abnormal VARCHAR(255),
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (returnvisit_id) REFERENCES returnvisit(id) ON DELETE CASCADE,
  FOREIGN KEY (firstvisit_id) REFERENCES firstvisit(id) ON DELETE CASCADE)
)`;

// -- Table: genitalexamination new
`CREATE TABLE genitalexamination (
  id INT PRIMARY KEY AUTO_INCREMENT,
  returnvisit_id INT,
  firstvisit_id INT,
  normal VARCHAR(255),
  abnormal VARCHAR(255),
  discharge VARCHAR(255),
  tenderness VARCHAR(255),
  ulcers VARCHAR(255),
  fistulas VARCHAR(255),
  irregularities VARCHAR(255),
  swelling VARCHAR(255),
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (returnvisit_id) REFERENCES returnvisit(id) ON DELETE CASCADE,
  FOREIGN KEY (firstvisit_id) REFERENCES firstvisit(id) ON DELETE CASCADE)
)`;

// -- Table: messages
`CREATE TABLE messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  healthpersonnel_id INT,
  messagefrom VARCHAR(255),
  date VARCHAR(255),
  status BOOLEAN,
  message VARCHAR(255),
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (healthpersonnel_id) REFERENCES healthpersonnel(id) ON DELETE CASCADE
)`;

// `-- Table: schedule
`CREATE TABLE schedule (
  id INT PRIMARY KEY AUTO_INCREMENT,
  healthpersonnel_id INT,
  patient_id INT,
  firstname VARCHAR(255),
  middlename VARCHAR(255),
  lastname VARCHAR(255),
  phone VARCHAR(255),
  datefrom VARCHAR(255),
  dateto VARCHAR(255),
  completed BOOLEAN DEFAULT FALSE,
  upcoming BOOLEAN DEFAULT TRUE,
  missed BOOLEAN DEFAULT FALSE,
  flagged BOOLEAN DEFAULT FALSE,
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (healthpersonnel_id) REFERENCES healthpersonnel(id) ON DELETE CASCADE,
  FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
)`;

// -- Table: testing
`CREATE TABLE testresult (
  id INT PRIMARY KEY AUTO_INCREMENT,
  healthpersonnel_id INT,
  hb VARCHAR(255),
  wcc VARCHAR(255),
  rcc VARCHAR(255),
  pcv VARCHAR(255),
  mcv VARCHAR(255),
  platelet VARCHAR(255),
  glucose VARCHAR(255),
  hiv VARCHAR(255),
  hepatitis VARCHAR(255),
  patient_id INT,
  rdt VARCHAR(255),
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
  FOREIGN KEY (healthpersonnel_id) REFERENCES healthpersonnel(id) ON DELETE CASCADE
)`;

// -- Table: myTests
`CREATE TABLE myTests (
  id INT PRIMARY KEY AUTO_INCREMENT,
  healthpersonnel_id INT,
  myTests_patientID VARCHAR(255),
  myTests_ANCbooking VARCHAR(255),
  myTests_date VARCHAR(255),
  myTests_time VARCHAR(255),
  myTests_completed BOOLEAN,
  myTests_result VARCHAR(255),
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (healthpersonnel_id) REFERENCES healthpersonnel(id) ON DELETE CASCADE
)`;

// -- Table: deliveryReport
`CREATE TABLE deliveryReport (
  id INT PRIMARY KEY AUTO_INCREMENT,
  healthpersonnel_id INT,
  patient_id VARCHAR(255),
  gender VARCHAR(255),
  numberofchildren VARCHAR(255),
  deliverydate VARCHAR(255),
  deliverytime VARCHAR(255),
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (healthpersonnel_id) REFERENCES healthpersonnel(id) ON DELETE CASCADE
)`;

//national
const createNationalAdminTable = `CREATE TABLE nationaladmin (
  id INT AUTO_INCREMENT PRIMARY KEY,
  state VARCHAR(255),
  staffname VARCHAR(255),
  staffid VARCHAR(255),
  gender VARCHAR(255),
  phone VARCHAR(255),
  email VARCHAR(255),
  cadre VARCHAR(255),
  userid VARCHAR(255),
  password VARCHAR(255),
  accounttype VARCHAR(255),
  refreshtoken VARCHAR(255),
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

//STATE
const createStateAdminTable = `CREATE TABLE stateadmin (
  id INT AUTO_INCREMENT PRIMARY KEY,
  state VARCHAR(255),
  staffname VARCHAR(255),
  staffid VARCHAR(255),
  gender VARCHAR(255),
  phone VARCHAR(255),
  email VARCHAR(255),
  cadre VARCHAR(255),
  userid VARCHAR(255),
  password VARCHAR(255),
  accounttype VARCHAR(255),
  refreshtoken VARCHAR(255),
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;
const createStateAccountTable = `CREATE TABLE stateaccount (
  id INT AUTO_INCREMENT PRIMARY KEY,
  state VARCHAR(255),
  boardname VARCHAR(255),
  stateid VARCHAR(255),
  officeaddress VARCHAR(255),
  phone VARCHAR(255),
  email VARCHAR(255),
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

//LGA
const createLgaAdminTable = `CREATE TABLE lgadmin (
  id INT AUTO_INCREMENT PRIMARY KEY,
  lga VARCHAR(255),
  staffname VARCHAR(255),
  staffid VARCHAR(255),
  gender VARCHAR(255),
  phone VARCHAR(255),
  email VARCHAR(255),
  cadre VARCHAR(255),
  userid VARCHAR(255),
  password VARCHAR(255),
  accounttype VARCHAR(255),
  refreshtoken VARCHAR(255),
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;
const createLgaAccountTable = `CREATE TABLE lgaccount (
  id INT AUTO_INCREMENT PRIMARY KEY,
  lga VARCHAR(255),
  boardname VARCHAR(255),
  lgaID VARCHAR(255),
  officeaddress VARCHAR(255),
  phone VARCHAR(255),
  email VARCHAR(255),
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;
//health Facility
const createHealthfacilityAdminTable = `CREATE TABLE healthfacilityadmin (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ward VARCHAR(255),
  staffname VARCHAR(255),
  staffid VARCHAR(255),
  gender VARCHAR(255),
  phone VARCHAR(255),
  email VARCHAR(255),
  cadre VARCHAR(255),
  userid VARCHAR(255),
  password VARCHAR(255),
  accounttype VARCHAR(255),
  refreshtoken VARCHAR(255),
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;
const createHealthfacilityAccountTable = `CREATE TABLE healthfacilityaccount (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ward VARCHAR(255),
  healthfacilityname VARCHAR(255),
  healthfacilityID VARCHAR(255),
  officeaddress VARCHAR(255),
  phone VARCHAR(255),
  email VARCHAR(255),
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;
