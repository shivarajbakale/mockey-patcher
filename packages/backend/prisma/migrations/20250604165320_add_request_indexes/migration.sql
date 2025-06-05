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
