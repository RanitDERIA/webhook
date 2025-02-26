/*
  Warnings:

  - You are about to drop the column `ZapRunId` on the `ZapRunOutbox` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[zapRunId]` on the table `ZapRunOutbox` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `zapRunId` to the `ZapRunOutbox` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ZapRunOutbox" DROP CONSTRAINT "ZapRunOutbox_ZapRunId_fkey";

-- DropIndex
DROP INDEX "ZapRunOutbox_ZapRunId_key";

-- AlterTable
ALTER TABLE "ZapRunOutbox" DROP COLUMN "ZapRunId",
ADD COLUMN     "zapRunId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ZapRunOutbox_zapRunId_key" ON "ZapRunOutbox"("zapRunId");

-- AddForeignKey
ALTER TABLE "ZapRunOutbox" ADD CONSTRAINT "ZapRunOutbox_zapRunId_fkey" FOREIGN KEY ("zapRunId") REFERENCES "ZapRun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
