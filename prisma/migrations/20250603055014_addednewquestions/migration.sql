-- AlterTable
ALTER TABLE `enumerationservicedelivery` ADD COLUMN `howclientcametoseekcareatfacility` VARCHAR(191) NOT NULL DEFAULT 'N/A';

-- AlterTable
ALTER TABLE `enumerationservicedeliveryothers` ADD COLUMN `purposeOfUnscheduledVisit` VARCHAR(191) NOT NULL DEFAULT 'N/A';

-- AlterTable
ALTER TABLE `enumerationservicedeliverypnc` ADD COLUMN `whatNumberIsThisVisit` VARCHAR(191) NOT NULL DEFAULT 'N/A',
    ADD COLUMN `whatServicesWereProvided` VARCHAR(191) NOT NULL DEFAULT 'N/A';
