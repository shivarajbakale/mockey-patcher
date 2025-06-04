/*
  Warnings:

  - You are about to alter the column `endTime` on the `Request` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Float`.
  - You are about to alter the column `numberOfBytes` on the `Request` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Float`.
  - You are about to alter the column `startTime` on the `Request` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Float`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Request" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "responseBody" JSONB NOT NULL,
    "requestBody" JSONB,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "startTime" REAL NOT NULL,
    "endTime" REAL NOT NULL,
    "numberOfBytes" REAL NOT NULL
);
INSERT INTO "new_Request" ("createdAt", "duration", "endTime", "id", "method", "numberOfBytes", "requestBody", "responseBody", "startTime", "status", "updatedAt", "url") SELECT "createdAt", "duration", "endTime", "id", "method", "numberOfBytes", "requestBody", "responseBody", "startTime", "status", "updatedAt", "url" FROM "Request";
DROP TABLE "Request";
ALTER TABLE "new_Request" RENAME TO "Request";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
