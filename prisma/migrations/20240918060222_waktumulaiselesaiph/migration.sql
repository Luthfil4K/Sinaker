/*
  Warnings:

  - You are about to drop the column `kriteria3` on the `kriteria_beban_kerja_mitra` table. All the data in the column will be lost.
  - You are about to alter the column `tanggalMulai` on the `pencairan` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `tanggalSelesai` on the `pencairan` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `tanggalSPM` on the `pencairan` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `importStatus` on the `taskperusahaanproduksi` table. All the data in the column will be lost.
  - Added the required column `month` to the `data_target_realisasi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusSendEmail` to the `meet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mulai` to the `pekerjaan_harian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `selesai` to the `pekerjaan_harian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `honor` to the `sub_kegiatan_mitra` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `data_target_realisasi` ADD COLUMN `month` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `kriteria_beban_kerja_mitra` DROP COLUMN `kriteria3`;

-- AlterTable
ALTER TABLE `meet` ADD COLUMN `statusSendEmail` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `pekerjaan_harian` ADD COLUMN `mulai` DATE NOT NULL,
    ADD COLUMN `selesai` DATE NOT NULL;

-- AlterTable
ALTER TABLE `pencairan` MODIFY `tanggalMulai` DATETIME NOT NULL,
    MODIFY `tanggalSelesai` DATETIME NOT NULL,
    MODIFY `tanggalSPM` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `sub_kegiatan_mitra` ADD COLUMN `honor` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `taskperusahaanproduksi` DROP COLUMN `importStatus`;

-- CreateTable
CREATE TABLE `undangan_persetujuan_meet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `taskfile` VARCHAR(255) NULL,
    `meetId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `undangan_file` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `filename` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `meetId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `undangan_persetujuan_meet` ADD CONSTRAINT `undangan_persetujuan_meet_meetId_fkey` FOREIGN KEY (`meetId`) REFERENCES `meet`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `undangan_file` ADD CONSTRAINT `undangan_file_meetId_fkey` FOREIGN KEY (`meetId`) REFERENCES `meet`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
