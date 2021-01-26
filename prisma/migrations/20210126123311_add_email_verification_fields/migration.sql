/*
  Warnings:

  - Added the required column `VerificationToken` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "Id" TEXT NOT NULL PRIMARY KEY,
    "Email" TEXT NOT NULL,
    "PasswordHash" TEXT NOT NULL,
    "FirstName" TEXT NOT NULL,
    "Surname" TEXT NOT NULL,
    "EmailVerifiedAt" DATETIME,
    "VerificationToken" TEXT NOT NULL
);
INSERT INTO "new_User" ("Id", "Email", "PasswordHash", "FirstName", "Surname") SELECT "Id", "Email", "PasswordHash", "FirstName", "Surname" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User.Email_unique" ON "User"("Email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
