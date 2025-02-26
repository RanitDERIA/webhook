-- CreateTable
CREATE TABLE "ZapRunOutbox" (
    "id" TEXT NOT NULL,
    "ZapRunId" TEXT NOT NULL,

    CONSTRAINT "ZapRunOutbox_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ZapRunOutbox_ZapRunId_key" ON "ZapRunOutbox"("ZapRunId");

-- AddForeignKey
ALTER TABLE "ZapRunOutbox" ADD CONSTRAINT "ZapRunOutbox_ZapRunId_fkey" FOREIGN KEY ("ZapRunId") REFERENCES "ZapRun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
