-- CreateTable
CREATE TABLE "Token" (
    "Token" TEXT NOT NULL PRIMARY KEY,
    "Type" TEXT NOT NULL,
    "UserId" TEXT NOT NULL,
    "CreatedAt" DATETIME NOT NULL,
    "ExpiresAt" DATETIME NOT NULL,
    "RevokedAt" DATETIME
);
