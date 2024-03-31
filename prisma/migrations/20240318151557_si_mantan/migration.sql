/*
  Warnings:

  - You are about to alter the column `startDate` on the `meet` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `endDate` on the `meet` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the `project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `task` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `taskorganik` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `taskpeserta` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userproject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userproject_member` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `pekerjaan_harian` DROP FOREIGN KEY `pekerjaan_harian_taskId_fkey`;

-- DropForeignKey
ALTER TABLE `project` DROP FOREIGN KEY `Project_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `project` DROP FOREIGN KEY `Project_projectLeaderId_fkey`;

-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_projectId_fkey`;

-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_userId_fkey`;

-- DropForeignKey
ALTER TABLE `taskorganik` DROP FOREIGN KEY `TaskOrganik_organikId_fkey`;

-- DropForeignKey
ALTER TABLE `taskorganik` DROP FOREIGN KEY `TaskOrganik_taskId_fkey`;

-- DropForeignKey
ALTER TABLE `taskperusahaanproduksi` DROP FOREIGN KEY `TaskPerusahaanProduksi_taskId_fkey`;

-- DropForeignKey
ALTER TABLE `taskpeserta` DROP FOREIGN KEY `TaskPeserta_mitraId_fkey`;

-- DropForeignKey
ALTER TABLE `taskpeserta` DROP FOREIGN KEY `TaskPeserta_taskId_fkey`;

-- DropForeignKey
ALTER TABLE `userproject` DROP FOREIGN KEY `UserProject_projectId_fkey`;

-- DropForeignKey
ALTER TABLE `userproject` DROP FOREIGN KEY `UserProject_userId_fkey`;

-- DropForeignKey
ALTER TABLE `userproject_member` DROP FOREIGN KEY `UserProject_member_projectId_fkey`;

-- DropForeignKey
ALTER TABLE `userproject_member` DROP FOREIGN KEY `UserProject_member_userId_fkey`;

-- AlterTable
ALTER TABLE `meet` MODIFY `startDate` DATETIME NOT NULL,
    MODIFY `endDate` DATETIME NOT NULL;

-- DropTable
DROP TABLE `project`;

-- DropTable
DROP TABLE `task`;

-- DropTable
DROP TABLE `taskorganik`;

-- DropTable
DROP TABLE `taskpeserta`;

-- DropTable
DROP TABLE `userproject`;

-- DropTable
DROP TABLE `userproject_member`;

-- CreateTable
CREATE TABLE `kegiatan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(128) NOT NULL,
    `rentangWaktu` VARCHAR(128) NOT NULL,
    `fungsi` INTEGER NOT NULL,
    `startdate` DATE NOT NULL,
    `enddate` DATE NOT NULL,
    `description` TEXT NULL,
    `isArchived` SMALLINT NOT NULL,
    `projectLeaderId` INTEGER NOT NULL,
    `createdById` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kegiatan_user_leader` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `projectId` INTEGER NOT NULL,
    `isLeader` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kegiatan_user_member` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `projectId` INTEGER NOT NULL,
    `isLeader` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sub_kegiatan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(128) NOT NULL,
    `jenisKeg` INTEGER NOT NULL,
    `duedate` DATE NOT NULL,
    `description` TEXT NULL,
    `notes` TEXT NULL,
    `month` INTEGER NOT NULL,
    `jenisSample` INTEGER NOT NULL,
    `year` INTEGER NOT NULL,
    `target` INTEGER NOT NULL,
    `realisasi` INTEGER NOT NULL,
    `unitTarget` VARCHAR(128) NOT NULL,
    `projectId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sub_kegiatan_mitra` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `taskId` INTEGER NOT NULL,
    `mitraId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sub_kegiatan_user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `taskId` INTEGER NOT NULL,
    `organikId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `kegiatan` ADD CONSTRAINT `kegiatan_projectLeaderId_fkey` FOREIGN KEY (`projectLeaderId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kegiatan` ADD CONSTRAINT `kegiatan_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kegiatan_user_leader` ADD CONSTRAINT `kegiatan_user_leader_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kegiatan_user_leader` ADD CONSTRAINT `kegiatan_user_leader_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `kegiatan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kegiatan_user_member` ADD CONSTRAINT `kegiatan_user_member_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kegiatan_user_member` ADD CONSTRAINT `kegiatan_user_member_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `kegiatan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sub_kegiatan` ADD CONSTRAINT `sub_kegiatan_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `kegiatan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sub_kegiatan` ADD CONSTRAINT `sub_kegiatan_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskPerusahaanProduksi` ADD CONSTRAINT `TaskPerusahaanProduksi_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `sub_kegiatan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sub_kegiatan_mitra` ADD CONSTRAINT `sub_kegiatan_mitra_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `sub_kegiatan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sub_kegiatan_mitra` ADD CONSTRAINT `sub_kegiatan_mitra_mitraId_fkey` FOREIGN KEY (`mitraId`) REFERENCES `Mitra`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sub_kegiatan_user` ADD CONSTRAINT `sub_kegiatan_user_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `sub_kegiatan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sub_kegiatan_user` ADD CONSTRAINT `sub_kegiatan_user_organikId_fkey` FOREIGN KEY (`organikId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pekerjaan_harian` ADD CONSTRAINT `pekerjaan_harian_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `sub_kegiatan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
