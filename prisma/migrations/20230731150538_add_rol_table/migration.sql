-- CreateTable
CREATE TABLE `rol` (
    `idRol` INTEGER NOT NULL AUTO_INCREMENT,
    `rolName` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `rolName`(`rolName`),
    PRIMARY KEY (`idRol`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
