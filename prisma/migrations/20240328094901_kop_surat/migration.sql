/*
  Warnings:

  - You are about to alter the column `startDate` on the `meet` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `endDate` on the `meet` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `startDate` to the `sub_kegiatan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `meet` MODIFY `startDate` DATETIME NOT NULL,
    MODIFY `endDate` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `sub_kegiatan` ADD COLUMN `startDate` DATE NOT NULL;
