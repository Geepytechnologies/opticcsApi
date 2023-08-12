// -- Table: healthpersonnel
`CREATE TABLE healthpersonnel (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(50),
  password VARCHAR(255),
  phone VARCHAR(255),
  state VARCHAR(255),
  lga VARCHAR(255),
  ward VARCHAR(50),
  healthfacility VARCHAR(255),
  healthworker VARCHAR(255),
  verified BOOLEAN DEFAULT 0,
  cadre VARCHAR(255),
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

// -- Table: personalinformation
`CREATE TABLE personalinformation (
  id INT PRIMARY KEY AUTO_INCREMENT,
  hospitalnumber VARCHAR(20),
  firstname VARCHAR(30),
  middlename VARCHAR(30),
  surname VARCHAR(30),
  phone VARCHAR(255),
  address VARCHAR(255),
  state VARCHAR(30),
  dateofbirth DATE,
  lga VARCHAR(50),
  healthfacility VARCHAR(50),
  gravidity VARCHAR(50),
  parity VARCHAR(50),
  alive VARCHAR(20),
  lmpknown VARCHAR(20),
  lmp DATE,
  edd DATE,
  ega VARCHAR(20),
  laborstarted VARCHAR(20),
  firstbabymovement VARCHAR(50),
  doyoufeelthebabysmovement VARCHAR(255),
  doyouknowdateoffirstbabymovement VARCHAR(20),
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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

// -- Table: updateddailyHabitsAndLifestyle
`CREATE TABLE dailyhabitsandlifestyle (
  id INT PRIMARY KEY AUTO_INCREMENT,
  firstvisit_id INT,
  doyou VARCHAR(255),
  whodoyoulivewith VARCHAR(255),
  specifywhodoyoulivewith VARCHAR(255),
  didanyoneever VARCHAR(255),
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (firstvisit_id) REFERENCES firstvisit(id) ON DELETE CASCADE
)`;

// -- Table: medicalhistory
`CREATE TABLE medicalhistory (
  id INT PRIMARY KEY AUTO_INCREMENT,
  firstvisit_id INT,
  fever VARCHAR(20),
  chills VARCHAR(20),
  headaches VARCHAR(20),
  dizziness VARCHAR(20),
  convulsions VARCHAR(20),
  weakness VARCHAR(20),
  blurryvision VARCHAR(20),
  cough VARCHAR(20),
  difficultybreathing VARCHAR(20),
  severechestpain VARCHAR(20),
  severeepigastricpain VARCHAR(20),
  pepticulcerpatient VARCHAR(20),
  severetiredness VARCHAR(20),
  severeabdominalpain VARCHAR(20),
  persistentvomiting VARCHAR(20),
  severediarrhoea VARCHAR(20),
  painwithurination VARCHAR(20),
  severeflankpain VARCHAR(20),
  bloodinurine VARCHAR(20),
  increasedurination VARCHAR(20),
  noticedantsaroundplaceurinated VARCHAR(20),
  increasedthirst VARCHAR(20),
  vaginaldischarge VARCHAR(20),
  deeppelvicpain VARCHAR(20),
  syphilis VARCHAR(20),
  syphilistreatment VARCHAR(20),
  feveryes VARCHAR(20),
  chillsyes VARCHAR(20),
  headachesyes VARCHAR(20),
  dizzinessyes VARCHAR(20),
  convulsionsyes VARCHAR(20),
  weaknessyes VARCHAR(20),
  blurryvisionyes VARCHAR(20),
  coughyes VARCHAR(20),
  persistentdrycough VARCHAR(20),
  persistentdrycoughyes VARCHAR(20),
  progressiveweightloss VARCHAR(20),
  progressiveweightlossyes VARCHAR(20),
  nightsweats VARCHAR(20),
  nightsweatsyes VARCHAR(20),
  diagnosedwithtuberculosis VARCHAR(20),
  diagnosedwithtuberculosisyes VARCHAR(20),
  treatedTBpreviously VARCHAR(20),
  treatedTBpreviouslyyes VARCHAR(20),
  difficultybreathingyes VARCHAR(20),
  severechestpainyes VARCHAR(20),
  severeepigastricpainyes VARCHAR(20),
  palpitations VARCHAR(20),
  palpitationyes VARCHAR(20),
  swellingfeet VARCHAR(20),
  swellingfeetyes VARCHAR(20),
  difficultytosleep VARCHAR(20),
  difficultytosleepyes VARCHAR(20),
  pepticulcerpatientyes VARCHAR(20),
  severetirednessyes VARCHAR(20),
  severeabdominalpainyes VARCHAR(20),
  persistentvomitingyes VARCHAR(20),
  severediarrhoeayes VARCHAR(20),
  painwithurinationyes VARCHAR(20),
  severeflankpainyes VARCHAR(20),
  bloodinurineyes VARCHAR(20),
  increasedurinationyes VARCHAR(20),
  increasedthirstyes VARCHAR(20),
  vaginaldischargeyes VARCHAR(20),
  deeppelvicpainyes VARCHAR(20),
  syphilisyes VARCHAR(20),
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (firstvisit_id) REFERENCES firstvisit(id) ON DELETE CASCADE
)`;

// -- Table: obstetricHistory i made a change here
`CREATE TABLE obstetrichistory (
  id INT PRIMARY KEY AUTO_INCREMENT,
  firstvisit_id INT,
  obstetrichistory VARCHAR(255),
  otherinputobstetrichistory VARCHAR(255),
  yearofpregnancy VARCHAR(10),
  carriedtoterm VARCHAR(20),
  modeofdelivery VARCHAR(50),
  weightofbaby VARCHAR(30),
  sexofbaby VARCHAR(30),
  babycriedafterbirth VARCHAR(50),
  complicationsafterdelivery VARCHAR(255),
  specifycomplicationsafterdelivery VARCHAR(255),
  breastfedexclusively VARCHAR(50),
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (firstvisit_id) REFERENCES firstvisit(id) ON DELETE CASCADE
)`;

// -- Table: drughistory
`CREATE TABLE drughistory (
  id INT PRIMARY KEY AUTO_INCREMENT,
  firstvisit_id INT,
  historyofallergy TEXT,
  allergies TEXT,
  herbalremedies TEXT,
  vitamins VARCHAR(255),
  otcdrugs VARCHAR(255),
  dietarysupplements VARCHAR(255),
  typeofdietarysupplement VARCHAR(50),
  otherdrugs TEXT,
  tetanus VARCHAR(255),
  tetanusdoses VARCHAR(255),
  lasttetanusdose VARCHAR(255),
  covidvaccination VARCHAR(255),
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (firstvisit_id) REFERENCES firstvisit(id) ON DELETE CASCADE
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
  hivaids VARCHAR(255),
  hivaidstreatment VARCHAR(50),
  covid19 VARCHAR(50),
  otherseriouschronicillnesses VARCHAR(255),
  specifyseriouschronicillnesses VARCHAR(255),
  hadsurgery VARCHAR(255),
  specifyhadsurgery VARCHAR(255),
  hypertensionyes VARCHAR(50), 
  heartdiseaseyes VARCHAR(50),
  anaemiayes VARCHAR(50),
  kidneydiseaseyes VARCHAR(50),
  sicklecellyes VARCHAR(50),
  diabetesyes VARCHAR(50),
  goitreyes VARCHAR(50),
  hivaidsyes VARCHAR(50),
  covid19yes VARCHAR(50),
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (firstvisit_id) REFERENCES firstvisit(id) ON DELETE CASCADE)`;

// -- Table: familyHistory
`CREATE TABLE familyhistory (
  id INT PRIMARY KEY AUTO_INCREMENT,
  firstvisit_id INT,
  patienthaschildren VARCHAR(50),
  haveyoubreastfedbefore VARCHAR(50),
  breastfeedingduration VARCHAR(50),
  breastfeedingproblems VARCHAR(255),
  breastfeedingproblemsmoredetails VARCHAR(255),
  babylessthanayear VARCHAR(50),
  stillbreastfeeding VARCHAR(50),
  camewithachildunder5years VARCHAR(50),
  hasunvaccinatedchildren VARCHAR(255),
  familyepilepsy VARCHAR(50),
  familyepilepsyyes VARCHAR(50),
  familyhypertension VARCHAR(50),
  familyhypertensionyes VARCHAR(50),
  familyasthma VARCHAR(50),
  familyasthmayes VARCHAR(50),
  familydiabetes VARCHAR(50),
  familydiabetesyes VARCHAR(50),
  familysicklecell VARCHAR(50),
  familysicklecellyes VARCHAR(50),
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (firstvisit_id) REFERENCES firstvisit(id) ON DELETE CASCADE)`;

//physical examination
`CREATE TABLE physicalexamination (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstvisit_id INT,
    conjunctiva VARCHAR(255),
    sclera VARCHAR(255),
    bloodpressure VARCHAR(255),
    respiratoryrate VARCHAR(255),
    temperature VARCHAR(255),
    pulserate VARCHAR(255),
    abdomenScars VARCHAR(255),
    fromcaesareansection VARCHAR(255),
    fundalheight VARCHAR(255),
    measurefundalheightweek VARCHAR(255),
    measurefundalheightcentimeter VARCHAR(255),
    presentation VARCHAR(255),
    descent VARCHAR(255),
    positionoffoetus VARCHAR(255),
    breastexamination VARCHAR(255),
    abnormalbreastexamination VARCHAR(255),
    genitalexamination VARCHAR(255),
    swelling VARCHAR(255),
    discharge VARCHAR(255),
    tenderness VARCHAR(255),
    ulcers VARCHAR(255),
    fistulas VARCHAR(255),
    irregularities VARCHAR(255),
    swellingyes VARCHAR(255),
    dischargeyes VARCHAR(255),
    tendernessyes VARCHAR(255),
    ulcersyes VARCHAR(255),
    fistulasyes VARCHAR(255),
    irregularitiesyes VARCHAR(255),
    heartrate VARCHAR(255),
    bmi VARCHAR(255),
    createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (firstvisit_id) REFERENCES firstvisit(id) ON DELETE CASCADE
    )`;

// -- Table: returnVisit
`CREATE TABLE returnvisit (
  id INT PRIMARY KEY AUTO_INCREMENT,
  patient_id INT,
  returnvisit_date DATE,
  state VARCHAR(20),
  lga VARCHAR(40),
  healthfacility VARCHAR(20),
  fever VARCHAR(20),
  headache VARCHAR(20),
  dizziness VARCHAR(20),
  convulsions VARCHAR(20),
  weakness VARCHAR(20),
  blurryvision VARCHAR(20),
  cough VARCHAR(20),
  difficultybreathing VARCHAR(20),
  palpitation VARCHAR(20),
  swellingoffeet VARCHAR(20),
  severechestpain VARCHAR(20),
  severeepigastricpain VARCHAR(20),
  pepticulcerpatient VARCHAR(20),
  severetirednesss VARCHAR(20),
  difficultylyingflat VARCHAR(20),
  severeabdominalpain VARCHAR(20),
  vomiting VARCHAR(20),
  diarrhoea VARCHAR(20),
  urinarypain VARCHAR(20),
  severeflankpain VARCHAR(20),
  bloodinurine VARCHAR(20),
  increasedurination VARCHAR(20),
  antsaroundurine VARCHAR(20),
  increasedthirst VARCHAR(20),
  vaginaldischarge VARCHAR(20),
  painduringsex VARCHAR(20),
  syphillis VARCHAR(20),
  receivedcaresincelastvisit VARCHAR(20),
  whoprovidedthecare VARCHAR(50),
  whatcarewasprovided VARCHAR(255),
  outcomeofthecare VARCHAR(255),
  takingprescribeddrugs VARCHAR(255),
  problemtakingdrugs VARCHAR(255),
  followadvice VARCHAR(255),
  reactionorsideeffects VARCHAR(255),
  anythingrelatedtopregnancy VARCHAR(255),
  pink VARCHAR(20),
  palepink VARCHAR(20),
  whiteincolour VARCHAR(20),
  white VARCHAR(20),
  tinge VARCHAR(20),
  deepyellow VARCHAR(20),
  dirtywhite VARCHAR(20),
  bloodpressure VARCHAR(20),
  respiratoryrate VARCHAR(20),
  temperature VARCHAR(20),
  pulserate VARCHAR(20),
  abdomenScars VARCHAR(20),
  palpateAndEstimatefundusdocumentation VARCHAR(255),
  distancebtwtopdffundus VARCHAR(255),
  cmfromtopfundusdocumentation VARCHAR(255),
  cmfromuppersymphysis VARCHAR(255),
  presentation VARCHAR(255),
  descent VARCHAR(255),
  positionoffoetus VARCHAR(255),
  persisitentdrycough VARCHAR(255),
  persisitentdrycoughyes VARCHAR(50),
  unexplainedweightloss VARCHAR(255),
  nightsweats VARCHAR(255),
  diagnosedwithtuberculosis VARCHAR(255),
  treatedfortuberculosis VARCHAR(255),
  heartrate VARCHAR(255),
  complaint TEXT,
  stategenobser TEXT,
  generalwellchoice TEXT,
  syphillistreatment TEXT,
  pregnancydiscuss TEXT,
  wakeuptourinate VARCHAR(50),
  problemmedication TEXT,
  bmi VARCHAR(50),
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
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
  bodytemp VARCHAR(255),
  heartrate VARCHAR(255),
  respiratoryrate VARCHAR(255),
  bodypressure VARCHAR(255),
  malariarapid VARCHAR(255),
  status VARCHAR(50),
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
  FOREIGN KEY (healthpersonnel_id) REFERENCES healthpersonnel(id) ON DELETE CASCADE
)`;

//testoption
`CREATE TABLE testoption(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
)` // -- Table: requestedtest
`CREATE TABLE requestedtest (
  id INT PRIMARY KEY AUTO_INCREMENT,
  healthpersonnel_id INT,
  testoption_id INT,
  patient_id INT,
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (testoption_id) REFERENCES testoption(id) ON DELETE CASCADE,
  FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
  FOREIGN KEY (healthpersonnel_id) REFERENCES healthpersonnel(id) ON DELETE CASCADE
)`;

// -- Table: deliveryReport
`CREATE TABLE deliveryreport (
  id INT PRIMARY KEY AUTO_INCREMENT,
  healthpersonnel_id INT,
  patient_id VARCHAR(255),
  gendermale VARCHAR(50),
  genderfemale VARCHAR(50),
  numberofchildren VARCHAR(255),
  deliverydate DATE,
  deliverytime VARCHAR(255),
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (healthpersonnel_id) REFERENCES healthpersonnel(id) ON DELETE CASCADE
)`;

//national
const createNationalAdminTable = `CREATE TABLE nationaladmin (
  id INT AUTO_INCREMENT PRIMARY KEY,
  state VARCHAR(50),
  staffname VARCHAR(255),
  staffid VARCHAR(50),
  gender VARCHAR(50),
  phone VARCHAR(50),
  email VARCHAR(100),
  cadre VARCHAR(50),
  userid VARCHAR(255),
  password VARCHAR(255),
  accounttype VARCHAR(255),
  refreshtoken VARCHAR(255),
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`;

//STATE
const createStateAdminTable = `CREATE TABLE stateadmin (
  id INT AUTO_INCREMENT PRIMARY KEY,
  state VARCHAR(50),
  staffname VARCHAR(255),
  staffid VARCHAR(50),
  gender VARCHAR(30),
  phone VARCHAR(255),
  email VARCHAR(255),
  cadre VARCHAR(50),
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
)
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
)
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
)
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
)
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
)
`;
