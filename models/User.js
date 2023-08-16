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
  doyou TEXT,
  whodoyoulivewith TEXT,
  specifywhodoyoulivewith TEXT,
  didanyoneever TEXT,
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (firstvisit_id) REFERENCES firstvisit(id) ON DELETE CASCADE
)`;

// -- Table: medicalhistory
`CREATE TABLE medicalhistory (
  id INT PRIMARY KEY AUTO_INCREMENT,
  firstvisit_id INT,
  fever TEXT,
  chills TEXT,
  headaches TEXT,
  dizziness TEXT,
  convulsions TEXT,
  weakness TEXT,
  blurryvision TEXT,
  cough TEXT,
  difficultybreathing TEXT,
  severechestpain TEXT,
  severeepigastricpain TEXT,
  pepticulcerpatient TEXT,
  severetiredness TEXT,
  severeabdominalpain TEXT,
  persistentvomiting TEXT,
  severediarrhoea TEXT,
  painwithurination TEXT,
  severeflankpain TEXT,
  bloodinurine TEXT,
  increasedurination TEXT,
  noticedantsaroundplaceurinated TEXT,
  increasedthirst TEXT,
  vaginaldischarge TEXT,
  deeppelvicpain TEXT,
  syphilis TEXT,
  syphilistreatment TEXT,
  feveryes TEXT,
  chillsyes TEXT,
  headachesyes TEXT,
  dizzinessyes TEXT,
  convulsionsyes TEXT,
  weaknessyes TEXT,
  blurryvisionyes TEXT,
  coughyes TEXT,
  persistentdrycough TEXT,
  persistentdrycoughyes TEXT,
  progressiveweightloss TEXT,
  progressiveweightlossyes TEXT,
  nightsweats TEXT,
  nightsweatsyes TEXT,
  diagnosedwithtuberculosis TEXT,
  diagnosedwithtuberculosisyes TEXT,
  treatedTBpreviously TEXT,
  treatedTBpreviouslyyes TEXT,
  difficultybreathingyes TEXT,
  severechestpainyes TEXT,
  severeepigastricpainyes TEXT,
  palpitations TEXT,
  palpitationyes TEXT,
  swellingfeet TEXT,
  swellingfeetyes TEXT,
  difficultytosleep TEXT,
  difficultytosleepyes TEXT,
  pepticulcerpatientyes TEXT,
  severetirednessyes TEXT,
  severeabdominalpainyes TEXT,
  persistentvomitingyes TEXT,
  severediarrhoeayes TEXT,
  painwithurinationyes TEXT,
  severeflankpainyes TEXT,
  bloodinurineyes TEXT,
  increasedurinationyes TEXT,
  increasedthirstyes TEXT,
  vaginaldischargeyes TEXT,
  deeppelvicpainyes TEXT,
  syphilisyes TEXT,
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (firstvisit_id) REFERENCES firstvisit(id) ON DELETE CASCADE
)`;

// -- Table: obstetricHistory i made a change here
`CREATE TABLE obstetrichistory (
  id INT PRIMARY KEY AUTO_INCREMENT,
  firstvisit_id INT,
  convulsionsduringpregnancy TEXT,
  caesarean TEXT,
  tearsthroughsphincter TEXT,
  postpartiumhaemorrghage TEXT,
  stillbirths TEXT,
  prematuredeliveries TEXT,
  lowbirthbabies TEXT,
  babieswhodied TEXT,
  miscarriages TEXT,
  otherinputobstetrichistory TEXT,
  yearofpregnancy TEXT,
  carriedtoterm TEXT,
  modeofdelivery TEXT,
  weightofbaby TEXT,
  sexofbaby TEXT,
  babycriedafterbirth TEXT,
  complicationsafterdelivery TEXT,
  specifycomplicationsafterdelivery TEXT,
  breastfedexclusively TEXT,
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
  vitamins  TEXT,
  otcdrugs  TEXT,
  dietarysupplements  TEXT,
  typeofdietarysupplement TEXT,
  otherdrugs TEXT,
  tetanus  TEXT,
  tetanusdoses  TEXT,
  lasttetanusdose  TEXT,
  covidvaccination  TEXT,
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (firstvisit_id) REFERENCES firstvisit(id) ON DELETE CASCADE
)`;

// -- Table: pastmedicalhistory
`CREATE TABLE pastmedicalhistory (
  id INT PRIMARY KEY AUTO_INCREMENT,
  firstvisit_id INT,
  hypertension TEXT,
  heartdisease TEXT,
  anaemia TEXT,
  kidneydisease TEXT,
  sicklecell TEXT,
  diabetes TEXT,
  goitre TEXT,
  hivaids TEXT,
  hivaidstreatment TEXT,
  covid19 TEXT,
  otherseriouschronicillnesses TEXT,
  specifyseriouschronicillnesses TEXT,
  hadsurgery TEXT,
  specifyhadsurgery TEXT,
  hypertensionyes TEXT, 
  heartdiseaseyes TEXT,
  anaemiayes TEXT,
  kidneydiseaseyes TEXT,
  sicklecellyes TEXT,
  diabetesyes TEXT,
  goitreyes TEXT,
  hivaidsyes TEXT,
  covid19yes TEXT,
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (firstvisit_id) REFERENCES firstvisit(id) ON DELETE CASCADE)`;

// -- Table: familyHistory
`CREATE TABLE familyhistory (
  id INT PRIMARY KEY AUTO_INCREMENT,
  firstvisit_id INT,
  patienthaschildren TEXT,
  haveyoubreastfedbefore TEXT,
  breastfeedingduration TEXT,
  breastfeedingproblems TEXT,
  breastfeedingproblemsmoredetails TEXT,
  babylessthanayear TEXT,
  stillbreastfeeding TEXT,
  camewithachildunder5years TEXT,
  hasunvaccinatedchildren TEXT,
  familyepilepsy TEXT,
  familyepilepsyyes TEXT,
  familyhypertension TEXT,
  familyhypertensionyes TEXT,
  familyasthma TEXT,
  familyasthmayes TEXT,
  familydiabetes TEXT,
  familydiabetesyes TEXT,
  familysicklecell TEXT,
  familysicklecellyes TEXT,
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (firstvisit_id) REFERENCES firstvisit(id) ON DELETE CASCADE)`;

//physical examination
`CREATE TABLE physicalexamination (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstvisit_id INT,
    conjunctiva TEXT,
    sclera TEXT,
    bloodpressure TEXT,
    respiratoryrate TEXT,
    temperature TEXT,
    pulserate TEXT,
    abdomenScars TEXT,
    fromcaesareansection TEXT,
    fundalheight TEXT,
    measurefundalheightweek TEXT,
    measurefundalheightcentimeter TEXT,
    presentation TEXT,
    descent TEXT,
    positionoffoetus TEXT,
    breastexamination TEXT,
    abnormalbreastexamination TEXT,
    genitalexamination TEXT,
    swelling TEXT,
    discharge TEXT,
    tenderness TEXT,
    ulcers TEXT,
    fistulas TEXT,
    irregularities TEXT,
    swellingyes TEXT,
    dischargeyes TEXT,
    tendernessyes TEXT,
    ulcersyes TEXT,
    fistulasyes TEXT,
    irregularitiesyes TEXT,
    heartrate TEXT,
    bmi TEXT,
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
  persisitentdrycough VARCHAR(255),
  persisitentdrycoughyes VARCHAR(255),
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
  wakeuptourinate VARCHAR(255),
  problemmedication TEXT,
  bmi VARCHAR(255),
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
  datefrom DATE,
  dateto DATE,
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
  requestedtest_id INT,
  completed BOOLEAN DEFAULT TRUE,
  hb TEXT,
  wcc TEXT,
  rcc TEXT,
  pcv TEXT,
  mcv TEXT,
  platelet TEXT,
  glucose TEXT,
  hiv TEXT,
  hepatitis TEXT,
  patient_id INT,
  rdt TEXT,
  bodytemp TEXT,
  heartrate TEXT,
  respiratoryrate TEXT,
  bodypressure TEXT,
  malariarapid TEXT,
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
)`;

// -- Table: requestedtest
`CREATE TABLE requestedtest (
  id INT PRIMARY KEY AUTO_INCREMENT,
  healthpersonnel_id INT,
  completed BOOLEAN DEFAULT FALSE,
  pending BOOLEAN DEFAULT TRUE, 
  testoption JSON,
  patient_id INT,
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
  FOREIGN KEY (healthpersonnel_id) REFERENCES healthpersonnel(id) ON DELETE CASCADE
)`;

// -- Table: deliveryReport
`CREATE TABLE deliveryreport (
  id INT PRIMARY KEY AUTO_INCREMENT,
  healthpersonnel_id INT,
  firstname VARCHAR(255),
  lastname VARCHAR(255),
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
  state VARCHAR(255),
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
  state VARCHAR(255),
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
  state VARCHAR(255),
  lga VARCHAR(255),
  cadre VARCHAR(255),
  userid VARCHAR(255),
  password VARCHAR(255),
  healthfacilityid VARCHAR(255),
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
  state VARCHAR(255),
  lga VARCHAR(255),
  createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`;
