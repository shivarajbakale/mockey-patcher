/*
  Warnings:

  - You are about to drop the `Redirection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RedirectionLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RequestMetadata` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Redirection";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RedirectionLog";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RequestMetadata";
PRAGMA foreign_keys=on;
