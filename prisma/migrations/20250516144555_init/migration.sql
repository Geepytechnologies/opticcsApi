-- CreateTable
CREATE TABLE `Settlement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Enumerator` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(255) NOT NULL,
    `gender` VARCHAR(255) NOT NULL,
    `userID` VARCHAR(255) NOT NULL,
    `state` VARCHAR(255) NOT NULL,
    `lga` VARCHAR(255) NOT NULL,
    `ward` VARCHAR(255) NOT NULL,
    `settlement` TEXT NULL,
    `password` VARCHAR(255) NOT NULL,
    `isActive` BOOLEAN NULL DEFAULT true,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL,

    UNIQUE INDEX `phone`(`phone`),
    UNIQUE INDEX `userID`(`userID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EnumerationHealthFacility` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `enumeratorId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EnumerationSettlements` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `state` VARCHAR(255) NOT NULL,
    `lga` VARCHAR(255) NOT NULL,
    `ward` VARCHAR(255) NOT NULL,
    `settlement` VARCHAR(255) NOT NULL,
    `teamCode` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EnumerationHealthfacilities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `state` VARCHAR(255) NOT NULL,
    `lga` VARCHAR(255) NOT NULL,
    `ward` VARCHAR(255) NOT NULL,
    `facilityName` VARCHAR(255) NOT NULL,
    `geocoordinate` VARCHAR(255) NOT NULL,
    `latitude` VARCHAR(255) NOT NULL,
    `longitude` VARCHAR(255) NOT NULL,
    `altitude` VARCHAR(255) NOT NULL,
    `precision` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EnumerationData` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clientNumber` VARCHAR(255) NOT NULL,
    `firstName` VARCHAR(255) NOT NULL,
    `middleName` VARCHAR(255) NULL,
    `surName` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(255) NOT NULL,
    `alternatePhone` VARCHAR(255) NULL,
    `address` VARCHAR(255) NOT NULL,
    `state` VARCHAR(255) NOT NULL,
    `lga` VARCHAR(255) NOT NULL,
    `ward` VARCHAR(255) NOT NULL,
    `settlement` VARCHAR(255) NOT NULL,
    `servingHealthcareFacility` VARCHAR(255) NOT NULL,
    `gravidity` VARCHAR(255) NOT NULL,
    `parity` VARCHAR(255) NOT NULL,
    `lmp` VARCHAR(255) NOT NULL,
    `edd` VARCHAR(255) NOT NULL,
    `ega` VARCHAR(255) NOT NULL,
    `attendedAncVisit` VARCHAR(255) NOT NULL,
    `numberOfAncVisits` INTEGER NULL,
    `receivedTetanusVaccination` VARCHAR(255) NOT NULL,
    `latitude` FLOAT NULL,
    `longitude` FLOAT NULL,
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `age` INTEGER NULL,
    `submittedById` VARCHAR(191) NULL,

    UNIQUE INDEX `EnumerationData_clientNumber_key`(`clientNumber`),
    INDEX `fk_submittedBy`(`submittedById`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EnumerationAncVisitData` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `anc` VARCHAR(255) NOT NULL,
    `date` DATETIME(0) NOT NULL,
    `enumerationDataId` INTEGER NOT NULL,

    INDEX `enumerationDataId`(`enumerationDataId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EnumerationTTData` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `date` DATETIME(0) NOT NULL,
    `enumerationDataId` INTEGER NOT NULL,

    INDEX `enumerationDataId`(`enumerationDataId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EnumerationServiceDelivery` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clientNumber` VARCHAR(191) NOT NULL,
    `nameOfHealthFacility` VARCHAR(191) NOT NULL,
    `purposeOfVisit` VARCHAR(191) NOT NULL,
    `ancId` INTEGER NULL,
    `labourId` INTEGER NULL,
    `pncId` INTEGER NULL,
    `othersId` INTEGER NULL,
    `submittedById` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `EnumerationServiceDelivery_clientNumber_key`(`clientNumber`),
    UNIQUE INDEX `EnumerationServiceDelivery_ancId_key`(`ancId`),
    UNIQUE INDEX `EnumerationServiceDelivery_labourId_key`(`labourId`),
    UNIQUE INDEX `EnumerationServiceDelivery_pncId_key`(`pncId`),
    UNIQUE INDEX `EnumerationServiceDelivery_othersId_key`(`othersId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EnumerationServiceDeliveryVisit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `enumerationServiceDeliveryId` INTEGER NOT NULL,
    `dateOfVisit` DATETIME(3) NOT NULL,
    `ancVisit` VARCHAR(191) NOT NULL,
    `dateOfNextAppointment` DATETIME(3) NOT NULL,

    UNIQUE INDEX `EnumerationServiceDeliveryVisit_enumerationServiceDeliveryId_key`(`enumerationServiceDeliveryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EnumerationVisitService` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `visitId` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EnumerationVisitCommodity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `visitId` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EnumerationVisitOutcome` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `visitId` INTEGER NOT NULL,
    `outcome` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EnumerationServiceDeliveryLabour` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `enumerationServiceDeliveryId` INTEGER NOT NULL,
    `dateOfVisit` DATETIME(3) NOT NULL,
    `otherCommodities` VARCHAR(191) NOT NULL,
    `receivedMamaKit` VARCHAR(191) NOT NULL,
    `deliveryDate` DATETIME(3) NOT NULL,
    `NumberOfNewBorn` INTEGER NOT NULL,

    UNIQUE INDEX `EnumerationServiceDeliveryLabour_enumerationServiceDeliveryI_key`(`enumerationServiceDeliveryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EnumerationLabourCommodity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `labourId` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EnumerationLabourOutcome` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `labourId` INTEGER NOT NULL,
    `outcome` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EnumerationPregnancyOutcome` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `labourId` INTEGER NOT NULL,
    `result` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EnumerationServiceDeliveryPnc` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `enumerationServiceDeliveryId` INTEGER NOT NULL,
    `dateOfVisit` DATETIME(3) NOT NULL,
    `detailsOfVisit` VARCHAR(191) NOT NULL,
    `dateOfNextAppointment` DATETIME(3) NOT NULL,

    UNIQUE INDEX `EnumerationServiceDeliveryPnc_enumerationServiceDeliveryId_key`(`enumerationServiceDeliveryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EnumerationPncOutcome` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pncId` INTEGER NOT NULL,
    `outcome` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EnumerationServiceDeliveryOthers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dateOfVisit` DATETIME(3) NOT NULL,
    `detailsOfVisit` VARCHAR(191) NOT NULL,
    `enumerationServiceDeliveryId` INTEGER NOT NULL,

    UNIQUE INDEX `EnumerationServiceDeliveryOthers_enumerationServiceDeliveryI_key`(`enumerationServiceDeliveryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EnumerationOtherOutcome` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `otherId` INTEGER NOT NULL,
    `outcome` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EnumerationReferrals` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clientNumber` VARCHAR(191) NOT NULL,
    `referredto` VARCHAR(191) NOT NULL,
    `nameOfReferralFacility` VARCHAR(191) NOT NULL,
    `modeOfTransportation` VARCHAR(191) NOT NULL,
    `otherModeOfTransportation` VARCHAR(191) NOT NULL,
    `reasonForReferral` VARCHAR(191) NOT NULL,
    `otherReasonForReferral` VARCHAR(191) NOT NULL,
    `dateOfReferral` DATETIME(3) NOT NULL,
    `submittedById` VARCHAR(191) NULL,

    UNIQUE INDEX `EnumerationReferrals_clientNumber_key`(`clientNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EnumerationClientSchedule` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clientNumber` VARCHAR(191) NOT NULL,
    `scheduleType` VARCHAR(191) NOT NULL,
    `scheduleDate` DATETIME(3) NOT NULL,

    UNIQUE INDEX `EnumerationClientSchedule_clientNumber_key`(`clientNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_SettlementData` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    INDEX `B`(`B`),
    PRIMARY KEY (`A`, `B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ancvisit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patient_id` INTEGER NULL,
    `healthpersonnel_id` INTEGER NULL,
    `anc_number` INTEGER NULL,
    `lastANC` INTEGER NULL,
    `missed` INTEGER NULL DEFAULT 0,
    `attended` INTEGER NULL DEFAULT 1,
    `createdat` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dailyhabitsandlifestyle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstvisit_id` INTEGER NULL,
    `doyousmoke` TEXT NULL,
    `whodoyoulivewith` TEXT NULL,
    `specifywhodoyoulivewith` TEXT NULL,
    `didanyoneevernone` TEXT NULL,
    `createdat` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `doyoudrinkalcohol` TEXT NULL,
    `othersubstances` TEXT NULL,
    `doyounone` TEXT NULL,
    `stoppedfromleavingthehouse` TEXT NULL,
    `threatenedyourlife` TEXT NULL,
    `abusedphysically` TEXT NULL,

    INDEX `firstvisit_id`(`firstvisit_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `deliveryreport` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `healthpersonnel_id` INTEGER NULL,
    `numberofchildren` VARCHAR(255) NULL,
    `deliverydate` DATE NULL,
    `deliverytime` VARCHAR(255) NULL,
    `createdat` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `firstname` VARCHAR(255) NULL,
    `lastname` VARCHAR(255) NULL,
    `deliverydata` JSON NULL,
    `deliverAtHealthFacility` VARCHAR(255) NULL,
    `givenPostPartum` VARCHAR(255) NULL,
    `attendAncVisit` VARCHAR(255) NULL,

    INDEX `healthpersonnel_id`(`healthpersonnel_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `drughistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstvisit_id` INTEGER NULL,
    `historyofallergy` TEXT NULL,
    `allergies` TEXT NULL,
    `herbalremedies` TEXT NULL,
    `vitamins` TEXT NULL,
    `otcdrugs` TEXT NULL,
    `dietarysupplements` TEXT NULL,
    `typeofdietarysupplement` TEXT NULL,
    `otherdrugs` TEXT NULL,
    `tetanus` TEXT NULL,
    `tetanusdoses` TEXT NULL,
    `lasttetanusdose` TEXT NULL,
    `covidvaccination` TEXT NULL,
    `createdat` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `firstvisit_id`(`firstvisit_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `familyhistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstvisit_id` INTEGER NULL,
    `patienthaschildren` TEXT NULL,
    `haveyoubreastfedbefore` TEXT NULL,
    `breastfeedingduration` TEXT NULL,
    `breastfeedingproblems` TEXT NULL,
    `breastfeedingproblemsmoredetails` TEXT NULL,
    `babylessthanayear` TEXT NULL,
    `stillbreastfeeding` TEXT NULL,
    `camewithachildunder5years` TEXT NULL,
    `hasunvaccinatedchildren` TEXT NULL,
    `familyepilepsy` TEXT NULL,
    `familyepilepsyyes` TEXT NULL,
    `familyhypertension` TEXT NULL,
    `familyhypertensionyes` TEXT NULL,
    `familyasthma` TEXT NULL,
    `familyasthmayes` TEXT NULL,
    `familydiabetes` TEXT NULL,
    `familydiabetesyes` TEXT NULL,
    `familysicklecell` TEXT NULL,
    `familysicklecellyes` TEXT NULL,
    `createdat` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `firstvisit_id`(`firstvisit_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `firstvisit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstvisit_date` DATE NULL,
    `patient_id` INTEGER NULL,
    `createdat` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `anc` INTEGER NULL DEFAULT 1,

    INDEX `patient_id`(`patient_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `healthfacilityaccount` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ward` VARCHAR(255) NULL,
    `healthfacilityname` VARCHAR(255) NULL,
    `healthfacilityID` VARCHAR(255) NULL,
    `officeaddress` VARCHAR(255) NULL,
    `phone` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `createdat` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `state` VARCHAR(255) NULL,
    `lga` VARCHAR(255) NULL,
    `status` BOOLEAN NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `healthfacilityadmin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ward` VARCHAR(255) NULL,
    `staffname` VARCHAR(255) NULL,
    `staffid` VARCHAR(255) NULL,
    `gender` VARCHAR(255) NULL,
    `phone` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `cadre` VARCHAR(255) NULL,
    `userid` VARCHAR(255) NULL,
    `password` VARCHAR(255) NULL,
    `healthfacility` VARCHAR(255) NULL,
    `refreshtoken` VARCHAR(255) NULL,
    `createdat` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `state` VARCHAR(255) NULL,
    `lga` VARCHAR(255) NULL,
    `status` BOOLEAN NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `healthpersonnel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(50) NULL,
    `password` VARCHAR(255) NULL,
    `phone` VARCHAR(255) NULL,
    `state` VARCHAR(255) NULL,
    `lga` VARCHAR(255) NULL,
    `ward` VARCHAR(50) NULL,
    `healthfacility` VARCHAR(255) NULL,
    `healthworker` VARCHAR(255) NULL,
    `verified` BOOLEAN NULL DEFAULT false,
    `cadre` VARCHAR(255) NULL,
    `createdat` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `currentsession` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lgaccount` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lga` VARCHAR(255) NULL,
    `boardname` VARCHAR(255) NULL,
    `lgaID` VARCHAR(255) NULL,
    `officeaddress` VARCHAR(255) NULL,
    `phone` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `createdat` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `state` VARCHAR(255) NULL,
    `status` BOOLEAN NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lgadmin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lga` VARCHAR(255) NULL,
    `staffname` VARCHAR(255) NULL,
    `staffid` VARCHAR(255) NULL,
    `gender` VARCHAR(255) NULL,
    `phone` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `cadre` VARCHAR(255) NULL,
    `userid` VARCHAR(255) NULL,
    `password` VARCHAR(255) NULL,
    `accounttype` VARCHAR(255) NULL,
    `refreshtoken` VARCHAR(255) NULL,
    `createdat` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `state` VARCHAR(255) NULL,
    `status` BOOLEAN NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `medicalhistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstvisit_id` INTEGER NULL,
    `fever` TEXT NULL,
    `chills` TEXT NULL,
    `headaches` TEXT NULL,
    `dizziness` TEXT NULL,
    `convulsions` TEXT NULL,
    `weakness` TEXT NULL,
    `blurryvision` TEXT NULL,
    `cough` TEXT NULL,
    `difficultybreathing` TEXT NULL,
    `severechestpain` TEXT NULL,
    `severeepigastricpain` TEXT NULL,
    `pepticulcerpatient` TEXT NULL,
    `severetiredness` TEXT NULL,
    `severeabdominalpain` TEXT NULL,
    `persistentvomiting` TEXT NULL,
    `severediarrhoea` TEXT NULL,
    `painwithurination` TEXT NULL,
    `severeflankpain` TEXT NULL,
    `bloodinurine` TEXT NULL,
    `increasedurination` TEXT NULL,
    `noticedantsaroundplaceurinated` TEXT NULL,
    `increasedthirst` TEXT NULL,
    `vaginaldischarge` TEXT NULL,
    `deeppelvicpain` TEXT NULL,
    `syphilis` TEXT NULL,
    `syphilistreatment` TEXT NULL,
    `feveryes` TEXT NULL,
    `chillsyes` TEXT NULL,
    `headachesyes` TEXT NULL,
    `dizzinessyes` TEXT NULL,
    `convulsionsyes` TEXT NULL,
    `weaknessyes` TEXT NULL,
    `blurryvisionyes` TEXT NULL,
    `coughyes` TEXT NULL,
    `persistentdrycough` TEXT NULL,
    `persistentdrycoughyes` TEXT NULL,
    `progressiveweightloss` TEXT NULL,
    `progressiveweightlossyes` TEXT NULL,
    `nightsweats` TEXT NULL,
    `nightsweatsyes` TEXT NULL,
    `diagnosedwithtuberculosis` TEXT NULL,
    `diagnosedwithtuberculosisyes` TEXT NULL,
    `treatedTBpreviously` TEXT NULL,
    `treatedTBpreviouslyyes` TEXT NULL,
    `difficultybreathingyes` TEXT NULL,
    `severechestpainyes` TEXT NULL,
    `severeepigastricpainyes` TEXT NULL,
    `palpitations` TEXT NULL,
    `palpitationyes` TEXT NULL,
    `swellingfeet` TEXT NULL,
    `swellingfeetyes` TEXT NULL,
    `difficultytosleep` TEXT NULL,
    `difficultytosleepyes` TEXT NULL,
    `pepticulcerpatientyes` TEXT NULL,
    `severetirednessyes` TEXT NULL,
    `severeabdominalpainyes` TEXT NULL,
    `persistentvomitingyes` TEXT NULL,
    `severediarrhoeayes` TEXT NULL,
    `painwithurinationyes` TEXT NULL,
    `severeflankpainyes` TEXT NULL,
    `bloodinurineyes` TEXT NULL,
    `increasedurinationyes` TEXT NULL,
    `increasedthirstyes` TEXT NULL,
    `vaginaldischargeyes` TEXT NULL,
    `deeppelvicpainyes` TEXT NULL,
    `syphilisyes` TEXT NULL,
    `createdat` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `wakinguptopassurine` VARCHAR(255) NULL,

    INDEX `firstvisit_id`(`firstvisit_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `messages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `healthpersonnel_id` INTEGER NULL,
    `messagefrom` VARCHAR(255) NULL,
    `date` VARCHAR(255) NULL,
    `status` BOOLEAN NULL,
    `message` VARCHAR(255) NULL,
    `createdat` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `healthpersonnel_id`(`healthpersonnel_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nationaladmin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `state` VARCHAR(50) NULL,
    `staffname` VARCHAR(255) NULL,
    `staffid` VARCHAR(50) NULL,
    `gender` VARCHAR(50) NULL,
    `phone` VARCHAR(50) NULL,
    `email` VARCHAR(100) NULL,
    `cadre` VARCHAR(50) NULL,
    `userid` VARCHAR(255) NULL,
    `password` VARCHAR(255) NULL,
    `accounttype` VARCHAR(255) NULL,
    `refreshtoken` VARCHAR(255) NULL,
    `createdat` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `obstetrichistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstvisit_id` INTEGER NULL,
    `otherinputobstetrichistory` TEXT NULL,
    `yearofpregnancy` VARCHAR(10) NULL,
    `carriedtoterm` VARCHAR(20) NULL,
    `modeofdelivery` TEXT NULL,
    `weightofbaby` TEXT NULL,
    `sexofbaby` TEXT NULL,
    `babycriedafterbirth` TEXT NULL,
    `complicationsafterdelivery` TEXT NULL,
    `specifycomplicationsafterdelivery` TEXT NULL,
    `breastfedexclusively` TEXT NULL,
    `createdat` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `caesarean` TEXT NULL,
    `tearsthroughsphincter` TEXT NULL,
    `postpartiumhaemorrghage` TEXT NULL,
    `stillbirths` TEXT NULL,
    `prematuredeliveries` TEXT NULL,
    `lowbirthbabies` TEXT NULL,
    `babieswhodied` TEXT NULL,
    `miscarriages` TEXT NULL,
    `convulsionsduringpregnancy` TEXT NULL,

    INDEX `firstvisit_id`(`firstvisit_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pastmedicalhistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstvisit_id` INTEGER NULL,
    `hypertension` TEXT NULL,
    `heartdisease` TEXT NULL,
    `anaemia` TEXT NULL,
    `kidneydisease` TEXT NULL,
    `sicklecell` TEXT NULL,
    `diabetes` TEXT NULL,
    `goitre` TEXT NULL,
    `hivaids` TEXT NULL,
    `hivaidstreatment` TEXT NULL,
    `covid19` TEXT NULL,
    `otherseriouschronicillnesses` TEXT NULL,
    `specifyseriouschronicillnesses` TEXT NULL,
    `hadsurgery` TEXT NULL,
    `specifyhadsurgery` TEXT NULL,
    `hypertensionyes` TEXT NULL,
    `heartdiseaseyes` TEXT NULL,
    `anaemiayes` TEXT NULL,
    `kidneydiseaseyes` TEXT NULL,
    `sicklecellyes` TEXT NULL,
    `diabetesyes` TEXT NULL,
    `goitreyes` TEXT NULL,
    `hivaidsyes` TEXT NULL,
    `covid19yes` TEXT NULL,
    `createdat` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `firstvisit_id`(`firstvisit_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patients` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `healthpersonnel_id` INTEGER NULL,
    `firstvisit_date` DATE NULL,
    `personalinformation_id` INTEGER NULL,
    `createdat` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `healthpersonnel_id`(`healthpersonnel_id`),
    INDEX `personalinformation_id`(`personalinformation_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `personalinformation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hospitalnumber` VARCHAR(20) NULL,
    `firstname` VARCHAR(30) NULL,
    `middlename` VARCHAR(30) NULL,
    `surname` VARCHAR(30) NULL,
    `phone` VARCHAR(255) NULL,
    `address` VARCHAR(255) NULL,
    `state` VARCHAR(30) NULL,
    `dateofbirth` DATE NULL,
    `lga` VARCHAR(50) NULL,
    `healthfacility` VARCHAR(50) NULL,
    `gravidity` VARCHAR(50) NULL,
    `parity` VARCHAR(50) NULL,
    `alive` VARCHAR(20) NULL,
    `lmpknown` VARCHAR(20) NULL,
    `lmp` DATE NULL,
    `edd` DATE NULL,
    `ega` VARCHAR(20) NULL,
    `laborstarted` VARCHAR(20) NULL,
    `firstbabymovement` VARCHAR(50) NULL,
    `doyoufeelthebabysmovement` VARCHAR(255) NULL,
    `doyouknowdateoffirstbabymovement` VARCHAR(20) NULL,
    `createdat` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `lastmonthseenperiod` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `physicalexamination` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstvisit_id` INTEGER NULL,
    `conjunctiva` TEXT NULL,
    `sclera` TEXT NULL,
    `bloodpressure` TEXT NULL,
    `respiratoryrate` TEXT NULL,
    `temperature` TEXT NULL,
    `pulserate` TEXT NULL,
    `abdomenScars` TEXT NULL,
    `fromcaesareansection` TEXT NULL,
    `fundalheight` TEXT NULL,
    `measurefundalheightweek` TEXT NULL,
    `measurefundalheightcentimeter` TEXT NULL,
    `presentation` TEXT NULL,
    `descent` TEXT NULL,
    `positionoffoetus` TEXT NULL,
    `breastexamination` TEXT NULL,
    `abnormalbreastexamination` TEXT NULL,
    `genitalexamination` TEXT NULL,
    `swelling` TEXT NULL,
    `discharge` TEXT NULL,
    `tenderness` TEXT NULL,
    `ulcers` TEXT NULL,
    `fistulas` TEXT NULL,
    `irregularities` TEXT NULL,
    `swellingyes` TEXT NULL,
    `dischargeyes` TEXT NULL,
    `tendernessyes` TEXT NULL,
    `ulcersyes` TEXT NULL,
    `fistulasyes` TEXT NULL,
    `irregularitiesyes` TEXT NULL,
    `heartrate` TEXT NULL,
    `bmi` TEXT NULL,
    `createdat` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `observation` TEXT NULL,
    `percussion` TEXT NULL,
    `palpationchest` TEXT NULL,
    `auscultationchest` TEXT NULL,

    INDEX `firstvisit_id`(`firstvisit_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `requestedtest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `healthpersonnel_id` INTEGER NULL,
    `testoption` JSON NULL,
    `patient_id` INTEGER NULL,
    `createdat` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `completed` BOOLEAN NULL DEFAULT false,

    INDEX `healthpersonnel_id`(`healthpersonnel_id`),
    INDEX `patient_id`(`patient_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `returnvisit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patient_id` INTEGER NULL,
    `returnvisit_date` DATE NULL,
    `state` VARCHAR(20) NULL,
    `lga` VARCHAR(40) NULL,
    `healthfacility` VARCHAR(20) NULL,
    `fever` TEXT NULL,
    `headache` TEXT NULL,
    `dizziness` TEXT NULL,
    `convulsions` TEXT NULL,
    `weakness` TEXT NULL,
    `blurryvision` TEXT NULL,
    `cough` TEXT NULL,
    `difficultybreathing` TEXT NULL,
    `palpitation` TEXT NULL,
    `swellingoffeet` TEXT NULL,
    `severechestpain` TEXT NULL,
    `severeepigastricpain` TEXT NULL,
    `pepticulcerpatient` TEXT NULL,
    `severetirednesss` TEXT NULL,
    `difficultylyingflat` TEXT NULL,
    `severeabdominalpain` TEXT NULL,
    `vomiting` TEXT NULL,
    `diarrhoea` TEXT NULL,
    `urinarypain` TEXT NULL,
    `severeflankpain` TEXT NULL,
    `bloodinurine` TEXT NULL,
    `increasedurination` TEXT NULL,
    `antsaroundurine` TEXT NULL,
    `increasedthirst` TEXT NULL,
    `vaginaldischarge` TEXT NULL,
    `painduringsex` TEXT NULL,
    `syphillis` TEXT NULL,
    `receivedcaresincelastvisit` TEXT NULL,
    `whoprovidedthecare` TEXT NULL,
    `whatcarewasprovided` TEXT NULL,
    `outcomeofthecare` TEXT NULL,
    `takingprescribeddrugs` TEXT NULL,
    `problemtakingdrugs` TEXT NULL,
    `followadvice` TEXT NULL,
    `reactionorsideeffects` TEXT NULL,
    `anythingrelatedtopregnancy` TEXT NULL,
    `pink` TEXT NULL,
    `palepink` TEXT NULL,
    `whiteincolour` TEXT NULL,
    `white` TEXT NULL,
    `tinge` TEXT NULL,
    `deepyellow` TEXT NULL,
    `dirtywhite` TEXT NULL,
    `bloodpressure` TEXT NULL,
    `respiratoryrate` TEXT NULL,
    `temperature` TEXT NULL,
    `pulserate` TEXT NULL,
    `abdomenScars` TEXT NULL,
    `palpateAndEstimatefundusdocumentation` TEXT NULL,
    `distancebtwtopdffundus` TEXT NULL,
    `cmfromtopfundusdocumentation` TEXT NULL,
    `cmfromuppersymphysis` TEXT NULL,
    `presentation` TEXT NULL,
    `descent` TEXT NULL,
    `positionoffoetus` TEXT NULL,
    `persisitentdrycough` TEXT NULL,
    `persisitentdrycoughyes` TEXT NULL,
    `unexplainedweightloss` TEXT NULL,
    `nightsweats` TEXT NULL,
    `diagnosedwithtuberculosis` TEXT NULL,
    `treatedfortuberculosis` TEXT NULL,
    `heartrate` TEXT NULL,
    `complaint` TEXT NULL,
    `stategenobser` TEXT NULL,
    `generalwellchoice` TEXT NULL,
    `syphillistreatment` TEXT NULL,
    `pregnancydiscuss` TEXT NULL,
    `wakeuptourinate` TEXT NULL,
    `problemmedication` TEXT NULL,
    `bmi` TEXT NULL,
    `createdat` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `sclera` TEXT NULL,
    `conjuctiva` TEXT NULL,
    `chill` TEXT NULL,
    `bloodpressdia` TEXT NULL,
    `bloodpresssis` TEXT NULL,
    `chestpaindiscuss` TEXT NULL,
    `epigastricpaindiscuss` TEXT NULL,
    `severetireddisuss` TEXT NULL,
    `severediarrhoeadiscuss` TEXT NULL,
    `swellingfeetdiscuss` TEXT NULL,
    `sputrumcolor` TEXT NULL,
    `sputrum` TEXT NULL,
    `lmp` TEXT NULL,
    `lmpdate` DATE NULL,
    `edd` DATE NULL,
    `ega` TEXT NULL,
    `laborstarted` TEXT NULL,
    `selectedbabymovement` TEXT NULL,
    `selectedfirstbabymovement` TEXT NULL,
    `observelookpatient` TEXT NULL,
    `documentpercussion` TEXT NULL,
    `palpatediscuss` TEXT NULL,
    `auscultationdiscuss` TEXT NULL,
    `breast` TEXT NULL,
    `breastdiscuss` TEXT NULL,
    `selectedfirstbabymovementdate` DATE NULL,
    `severabdodisuss` TEXT NULL,
    `missedAncVisit` VARCHAR(255) NULL,
    `contactedByPHC` VARCHAR(255) NULL,
    `whoContacted` VARCHAR(255) NULL,
    `urinaryGen` VARCHAR(255) NULL,
    `comeWithUnderFiveChildren` VARCHAR(255) NULL,
    `testedFverMalaria` VARCHAR(255) NULL,
    `getAppropriateTreatMalariaFever` VARCHAR(255) NULL,
    `recieveImmunizationAge` VARCHAR(255) NULL,
    `screenedMalnutrition` VARCHAR(255) NULL,
    `underFiveCovidVaccinated` VARCHAR(255) NULL,
    `anc` INTEGER NULL DEFAULT 2,

    INDEX `patient_id`(`patient_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `schedule` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `healthpersonnel_id` INTEGER NULL,
    `patient_id` INTEGER NULL,
    `firstname` VARCHAR(255) NULL,
    `middlename` VARCHAR(255) NULL,
    `lastname` VARCHAR(255) NULL,
    `phone` VARCHAR(255) NULL,
    `completed` BOOLEAN NULL DEFAULT false,
    `upcoming` BOOLEAN NULL DEFAULT true,
    `missed` BOOLEAN NULL DEFAULT false,
    `flagged` BOOLEAN NULL DEFAULT false,
    `createdat` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `datefrom` DATE NULL,
    `dateto` DATE NULL,
    `missedsms` BOOLEAN NULL DEFAULT false,
    `remindersms` BOOLEAN NULL DEFAULT false,

    INDEX `healthpersonnel_id`(`healthpersonnel_id`),
    INDEX `patient_id`(`patient_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sessions` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NULL,
    `session_status` TEXT NULL,
    `session_data` JSON NULL,
    `start_time` TIME(0) NULL,
    `end_time` TIME(0) NULL,
    `createdat` DATETIME(0) NULL,
    `start_date` DATE NULL,
    `end_date` DATE NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stateaccount` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `state` VARCHAR(255) NULL,
    `boardname` VARCHAR(255) NULL,
    `stateid` VARCHAR(255) NULL,
    `officeaddress` VARCHAR(255) NULL,
    `phone` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `createdat` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `status` BOOLEAN NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stateadmin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `state` VARCHAR(50) NULL,
    `staffname` VARCHAR(255) NULL,
    `staffid` VARCHAR(50) NULL,
    `gender` VARCHAR(30) NULL,
    `phone` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `cadre` VARCHAR(50) NULL,
    `userid` VARCHAR(255) NULL,
    `password` VARCHAR(255) NULL,
    `accounttype` VARCHAR(255) NULL,
    `refreshtoken` VARCHAR(255) NULL,
    `createdat` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `status` BOOLEAN NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `testoption` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NULL,
    `createdat` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `testresult` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `healthpersonnel_id` INTEGER NULL,
    `hb` TEXT NULL,
    `wcc` TEXT NULL,
    `rcc` TEXT NULL,
    `pcv` TEXT NULL,
    `mcv` TEXT NULL,
    `platelet` TEXT NULL,
    `glucose` TEXT NULL,
    `hiv` TEXT NULL,
    `hepatitis` TEXT NULL,
    `patient_id` INTEGER NULL,
    `rdt` TEXT NULL,
    `bodytemp` TEXT NULL,
    `heartrate` TEXT NULL,
    `respiratoryrate` TEXT NULL,
    `bodypressure` TEXT NULL,
    `malariarapid` TEXT NULL,
    `status` VARCHAR(50) NULL,
    `createdat` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `requestedtest_id` INTEGER NULL,
    `completed` BOOLEAN NULL DEFAULT true,
    `leukocytes` TEXT NULL,
    `nitrites` TEXT NULL,
    `urobilinogen` TEXT NULL,
    `protein` TEXT NULL,
    `pH` TEXT NULL,
    `blood` TEXT NULL,
    `specificgravity` TEXT NULL,
    `ketones` TEXT NULL,
    `bilirubin` TEXT NULL,
    `glucoseUrinary` TEXT NULL,
    `neutrophils` TEXT NULL,
    `lymphocytes` TEXT NULL,
    `monocytes` TEXT NULL,
    `eosinophils` TEXT NULL,
    `basophils` TEXT NULL,
    `Haematocrit` TEXT NULL,
    `mch` TEXT NULL,
    `reticulocytecount` TEXT NULL,
    `hbsag` TEXT NULL,
    `hcv` TEXT NULL,

    INDEX `healthpersonnel_id`(`healthpersonnel_id`),
    INDEX `patient_id`(`patient_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wards` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `state` VARCHAR(255) NULL,
    `lga` VARCHAR(255) NULL,
    `ward` VARCHAR(255) NULL,
    `createdat` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EnumerationHealthFacility` ADD CONSTRAINT `EnumerationHealthFacility_enumeratorId_fkey` FOREIGN KEY (`enumeratorId`) REFERENCES `Enumerator`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnumerationData` ADD CONSTRAINT `fk_submittedBy` FOREIGN KEY (`submittedById`) REFERENCES `Enumerator`(`userID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnumerationAncVisitData` ADD CONSTRAINT `EnumerationAncVisitData_ibfk_1` FOREIGN KEY (`enumerationDataId`) REFERENCES `EnumerationData`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnumerationTTData` ADD CONSTRAINT `EnumerationTTData_ibfk_1` FOREIGN KEY (`enumerationDataId`) REFERENCES `EnumerationData`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnumerationServiceDelivery` ADD CONSTRAINT `EnumerationServiceDelivery_submittedById_fkey` FOREIGN KEY (`submittedById`) REFERENCES `Enumerator`(`userID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnumerationServiceDeliveryVisit` ADD CONSTRAINT `EnumerationServiceDeliveryVisit_enumerationServiceDeliveryI_fkey` FOREIGN KEY (`enumerationServiceDeliveryId`) REFERENCES `EnumerationServiceDelivery`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnumerationVisitService` ADD CONSTRAINT `EnumerationVisitService_visitId_fkey` FOREIGN KEY (`visitId`) REFERENCES `EnumerationServiceDeliveryVisit`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnumerationVisitCommodity` ADD CONSTRAINT `EnumerationVisitCommodity_visitId_fkey` FOREIGN KEY (`visitId`) REFERENCES `EnumerationServiceDeliveryVisit`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnumerationVisitOutcome` ADD CONSTRAINT `EnumerationVisitOutcome_visitId_fkey` FOREIGN KEY (`visitId`) REFERENCES `EnumerationServiceDeliveryVisit`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnumerationServiceDeliveryLabour` ADD CONSTRAINT `EnumerationServiceDeliveryLabour_enumerationServiceDelivery_fkey` FOREIGN KEY (`enumerationServiceDeliveryId`) REFERENCES `EnumerationServiceDelivery`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnumerationLabourCommodity` ADD CONSTRAINT `EnumerationLabourCommodity_labourId_fkey` FOREIGN KEY (`labourId`) REFERENCES `EnumerationServiceDeliveryLabour`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnumerationLabourOutcome` ADD CONSTRAINT `EnumerationLabourOutcome_labourId_fkey` FOREIGN KEY (`labourId`) REFERENCES `EnumerationServiceDeliveryLabour`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnumerationPregnancyOutcome` ADD CONSTRAINT `EnumerationPregnancyOutcome_labourId_fkey` FOREIGN KEY (`labourId`) REFERENCES `EnumerationServiceDeliveryLabour`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnumerationServiceDeliveryPnc` ADD CONSTRAINT `EnumerationServiceDeliveryPnc_enumerationServiceDeliveryId_fkey` FOREIGN KEY (`enumerationServiceDeliveryId`) REFERENCES `EnumerationServiceDelivery`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnumerationPncOutcome` ADD CONSTRAINT `EnumerationPncOutcome_pncId_fkey` FOREIGN KEY (`pncId`) REFERENCES `EnumerationServiceDeliveryPnc`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnumerationServiceDeliveryOthers` ADD CONSTRAINT `EnumerationServiceDeliveryOthers_enumerationServiceDelivery_fkey` FOREIGN KEY (`enumerationServiceDeliveryId`) REFERENCES `EnumerationServiceDelivery`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnumerationOtherOutcome` ADD CONSTRAINT `EnumerationOtherOutcome_otherId_fkey` FOREIGN KEY (`otherId`) REFERENCES `EnumerationServiceDeliveryOthers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EnumerationReferrals` ADD CONSTRAINT `EnumerationReferrals_submittedById_fkey` FOREIGN KEY (`submittedById`) REFERENCES `Enumerator`(`userID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SettlementData` ADD CONSTRAINT `_SettlementData_ibfk_1` FOREIGN KEY (`A`) REFERENCES `Enumerator`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `_SettlementData` ADD CONSTRAINT `_SettlementData_ibfk_2` FOREIGN KEY (`B`) REFERENCES `Settlement`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dailyhabitsandlifestyle` ADD CONSTRAINT `dailyhabitsandlifestyle_ibfk_1` FOREIGN KEY (`firstvisit_id`) REFERENCES `firstvisit`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `deliveryreport` ADD CONSTRAINT `deliveryreport_ibfk_1` FOREIGN KEY (`healthpersonnel_id`) REFERENCES `healthpersonnel`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `drughistory` ADD CONSTRAINT `drughistory_ibfk_1` FOREIGN KEY (`firstvisit_id`) REFERENCES `firstvisit`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `familyhistory` ADD CONSTRAINT `familyhistory_ibfk_1` FOREIGN KEY (`firstvisit_id`) REFERENCES `firstvisit`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `firstvisit` ADD CONSTRAINT `firstvisit_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `medicalhistory` ADD CONSTRAINT `medicalhistory_ibfk_1` FOREIGN KEY (`firstvisit_id`) REFERENCES `firstvisit`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `messages` ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`healthpersonnel_id`) REFERENCES `healthpersonnel`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `obstetrichistory` ADD CONSTRAINT `obstetrichistory_ibfk_1` FOREIGN KEY (`firstvisit_id`) REFERENCES `firstvisit`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pastmedicalhistory` ADD CONSTRAINT `pastmedicalhistory_ibfk_1` FOREIGN KEY (`firstvisit_id`) REFERENCES `firstvisit`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `patients` ADD CONSTRAINT `patients_ibfk_1` FOREIGN KEY (`healthpersonnel_id`) REFERENCES `healthpersonnel`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `patients` ADD CONSTRAINT `patients_ibfk_2` FOREIGN KEY (`personalinformation_id`) REFERENCES `personalinformation`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `physicalexamination` ADD CONSTRAINT `physicalexamination_ibfk_1` FOREIGN KEY (`firstvisit_id`) REFERENCES `firstvisit`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `requestedtest` ADD CONSTRAINT `requestedtest_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `requestedtest` ADD CONSTRAINT `requestedtest_ibfk_2` FOREIGN KEY (`healthpersonnel_id`) REFERENCES `healthpersonnel`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `returnvisit` ADD CONSTRAINT `returnvisit_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `schedule` ADD CONSTRAINT `schedule_ibfk_1` FOREIGN KEY (`healthpersonnel_id`) REFERENCES `healthpersonnel`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `schedule` ADD CONSTRAINT `schedule_ibfk_2` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `testresult` ADD CONSTRAINT `testresult_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `testresult` ADD CONSTRAINT `testresult_ibfk_2` FOREIGN KEY (`healthpersonnel_id`) REFERENCES `healthpersonnel`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
