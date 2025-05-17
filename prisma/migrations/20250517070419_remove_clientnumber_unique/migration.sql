/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `EnumerationLabourCommodity` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[outcome]` on the table `EnumerationLabourOutcome` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[outcome]` on the table `EnumerationOtherOutcome` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[outcome]` on the table `EnumerationPncOutcome` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[result]` on the table `EnumerationPregnancyOutcome` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `EnumerationVisitCommodity` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[outcome]` on the table `EnumerationVisitOutcome` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `EnumerationVisitService` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `EnumerationServiceDelivery_clientNumber_key` ON `enumerationservicedelivery`;

-- CreateIndex
CREATE UNIQUE INDEX `EnumerationLabourCommodity_name_key` ON `EnumerationLabourCommodity`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `EnumerationLabourOutcome_outcome_key` ON `EnumerationLabourOutcome`(`outcome`);

-- CreateIndex
CREATE UNIQUE INDEX `EnumerationOtherOutcome_outcome_key` ON `EnumerationOtherOutcome`(`outcome`);

-- CreateIndex
CREATE UNIQUE INDEX `EnumerationPncOutcome_outcome_key` ON `EnumerationPncOutcome`(`outcome`);

-- CreateIndex
CREATE UNIQUE INDEX `EnumerationPregnancyOutcome_result_key` ON `EnumerationPregnancyOutcome`(`result`);

-- CreateIndex
CREATE UNIQUE INDEX `EnumerationVisitCommodity_name_key` ON `EnumerationVisitCommodity`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `EnumerationVisitOutcome_outcome_key` ON `EnumerationVisitOutcome`(`outcome`);

-- CreateIndex
CREATE UNIQUE INDEX `EnumerationVisitService_name_key` ON `EnumerationVisitService`(`name`);
