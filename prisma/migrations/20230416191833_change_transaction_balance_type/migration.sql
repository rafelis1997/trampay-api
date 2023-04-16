/*
  Warnings:

  - You are about to alter the column `balance` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_transactions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "balance" INTEGER NOT NULL,
    "userDocument" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" DATETIME,
    CONSTRAINT "transactions_userDocument_fkey" FOREIGN KEY ("userDocument") REFERENCES "users" ("document") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_transactions" ("balance", "createdAt", "deletedAt", "id", "userDocument") SELECT "balance", "createdAt", "deletedAt", "id", "userDocument" FROM "transactions";
DROP TABLE "transactions";
ALTER TABLE "new_transactions" RENAME TO "transactions";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
