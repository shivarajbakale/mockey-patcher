/*
  Warnings:

  - A unique constraint covering the columns `[sourceUrl]` on the table `Redirection` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Redirection" ADD COLUMN "description" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RedirectionLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "redirectionId" INTEGER NOT NULL,
    "userAgent" TEXT,
    "ipAddress" TEXT,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sourceUrl" TEXT NOT NULL,
    "targetUrl" TEXT NOT NULL,
    "success" BOOLEAN NOT NULL DEFAULT true,
    "errorMessage" TEXT,
    CONSTRAINT "RedirectionLog_redirectionId_fkey" FOREIGN KEY ("redirectionId") REFERENCES "Redirection" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_RedirectionLog" ("errorMessage", "id", "redirectionId", "sourceUrl", "success", "targetUrl", "timestamp") SELECT "errorMessage", "id", "redirectionId", "sourceUrl", "success", "targetUrl", "timestamp" FROM "RedirectionLog";
DROP TABLE "RedirectionLog";
ALTER TABLE "new_RedirectionLog" RENAME TO "RedirectionLog";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Redirection_sourceUrl_key" ON "Redirection"("sourceUrl");
