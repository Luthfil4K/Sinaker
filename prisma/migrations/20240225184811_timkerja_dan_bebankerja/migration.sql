-- AlterTable
ALTER TABLE `timkerja` ADD COLUMN `ketuaTim` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `beban_kerja_pegawai` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `bebanKerja` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `beban_kerja_tim_pegawai` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `bebanKerjaTim` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `beban_kerja_mitra` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mitraId` INTEGER NOT NULL,
    `bebanKerja` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kriteria_beban_kerja_pegawai` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kriteria1` DECIMAL(65, 30) NOT NULL,
    `kriteria2` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kriteria_beban_kerja_mitra` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kriteria1` DECIMAL(65, 30) NOT NULL,
    `kriteria2` DECIMAL(65, 30) NOT NULL,
    `kriteria3` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TimKerja` ADD CONSTRAINT `TimKerja_ketuaTim_fkey` FOREIGN KEY (`ketuaTim`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `beban_kerja_pegawai` ADD CONSTRAINT `beban_kerja_pegawai_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `beban_kerja_tim_pegawai` ADD CONSTRAINT `beban_kerja_tim_pegawai_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `beban_kerja_mitra` ADD CONSTRAINT `beban_kerja_mitra_mitraId_fkey` FOREIGN KEY (`mitraId`) REFERENCES `Mitra`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
