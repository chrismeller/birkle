-- CreateTable
CREATE TABLE "Timer" (
    "Id" TEXT NOT NULL PRIMARY KEY,
    "UserId" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "StartedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "EndedAt" DATETIME,
    FOREIGN KEY ("UserId") REFERENCES "User" ("Id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "Id" TEXT NOT NULL PRIMARY KEY,
    "Email" TEXT NOT NULL,
    "FirstName" TEXT NOT NULL,
    "Surname" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "Timer.StartedAt_EndedAt_index" ON "Timer"("StartedAt", "EndedAt");

-- CreateIndex
CREATE UNIQUE INDEX "User.Email_unique" ON "User"("Email");
