-- CreateTable
CREATE TABLE "Request" (
    "id" SERIAL NOT NULL,
    "requestId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "responseBody" JSONB NOT NULL,
    "requestBody" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "startTime" DOUBLE PRECISION NOT NULL,
    "endTime" DOUBLE PRECISION NOT NULL,
    "numberOfBytes" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Request_requestId_key" ON "Request"("requestId");

-- CreateIndex
CREATE INDEX "Request_url_idx" ON "Request"("url");

-- CreateIndex
CREATE INDEX "Request_method_idx" ON "Request"("method");

-- CreateIndex
CREATE INDEX "Request_startTime_idx" ON "Request"("startTime");

-- CreateIndex
CREATE INDEX "Request_endTime_idx" ON "Request"("endTime");

-- CreateIndex
CREATE INDEX "Request_status_idx" ON "Request"("status");

-- CreateIndex
CREATE INDEX "Request_url_method_idx" ON "Request"("url", "method");

-- CreateIndex
CREATE INDEX "Request_startTime_endTime_idx" ON "Request"("startTime", "endTime");

-- CreateIndex
CREATE INDEX "Request_method_status_idx" ON "Request"("method", "status");

-- CreateIndex
CREATE INDEX "Request_method_startTime_endTime_idx" ON "Request"("method", "startTime", "endTime");
