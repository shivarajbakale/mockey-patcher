/*
  Warnings:

  - You are about to drop the column `description` on the `Redirection` table. All the data in the column will be lost.
  - You are about to drop the column `ipAddress` on the `RedirectionLog` table. All the data in the column will be lost.
  - You are about to drop the column `userAgent` on the `RedirectionLog` table. All the data in the column will be lost.
  - Added the required column `sourceUrl` to the `RedirectionLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `success` to the `RedirectionLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetUrl` to the `RedirectionLog` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "RuleCondition" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ruleId" INTEGER NOT NULL,
    "condition" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "RuleCondition_ruleId_fkey" FOREIGN KEY ("ruleId") REFERENCES "Rule" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Rule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "RequestMetadata" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "responseBody" JSONB NOT NULL,
    "requestBody" JSONB,
    "numberOfBytes" INTEGER NOT NULL,
    "startTime" INTEGER NOT NULL,
    "endTime" INTEGER NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Redirection" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sourceUrl" TEXT NOT NULL,
    "targetUrl" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Redirection" ("createdAt", "id", "isActive", "sourceUrl", "targetUrl", "updatedAt") SELECT "createdAt", "id", "isActive", "sourceUrl", "targetUrl", "updatedAt" FROM "Redirection";
DROP TABLE "Redirection";
ALTER TABLE "new_Redirection" RENAME TO "Redirection";
CREATE TABLE "new_RedirectionLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "redirectionId" INTEGER NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sourceUrl" TEXT NOT NULL,
    "targetUrl" TEXT NOT NULL,
    "success" BOOLEAN NOT NULL,
    "errorMessage" TEXT,
    CONSTRAINT "RedirectionLog_redirectionId_fkey" FOREIGN KEY ("redirectionId") REFERENCES "Redirection" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_RedirectionLog" ("id", "redirectionId", "timestamp") SELECT "id", "redirectionId", "timestamp" FROM "RedirectionLog";
DROP TABLE "RedirectionLog";
ALTER TABLE "new_RedirectionLog" RENAME TO "RedirectionLog";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
